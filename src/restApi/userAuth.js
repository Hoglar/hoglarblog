
'use strict';
const crypto = require('crypto');
// serverUserAuth(tokenFromUser, dbs, func)
const serverUserAuth = require('../serverUtilities/userAuth.js');

module.exports = function(app, dbs) {



    // autoUserAuthentication needs some work. i only want one auth token here.
    // gets requests from many apps. Should mainly give acces to user database.
    // could make that as own function? which only returns true or false.
    app.post('/user/userAuthentication', function(req, res) {
        let token = req.body.token;

        serverUserAuth(token, dbs, (result) => {
            if(!result) {
                res.send({"failMessage": "token not found on server"});
            }
            else {
                console.log("Logged in user " + result);
                res.send({"user": result});
            }
        })

    })

    // Create user does one thing, inserting username, password and salt into the database.

    // CreateUser is the place where we create new users for our app. Humans can use the register form and send
    // Username and password, now we also want an alpha key.
    // createUser Api will save username and save a hashed and salted password on the database.
    app.post('/user/createUser', function(req, res) {
        console.log("Getting user creation request!");

        let username = req.body.username.toLowerCase();

        //First we check username so that all have a unique username.
        dbs.users.collection('userAuth').findOne({"username": username})
            .then(function(doc) {
                if(doc) {
                    res.send({"failMessage": "username already taken"});
                }
                else {

                        console.log("Creating account!");
                        // The password needs to be salted and hashed before database insertion.
                        let salt = Math.random().toString();
                        let password = crypto.createHash('sha256').update(req.body.password + salt).digest('hex');

                        // The database gets username, password and salt. We only interact with this values when login in.

                        dbs.users.collection('userAuth').insertOne({
                            username: username,
                            password: password,
                            salt: salt
                        }, function(error, response) {
                            if(error) {
                                res.send({"failMessage": "Something went wrong inserting database document in user creation"});
                            }
                            else {
                                console.log("Account created!");
                                res.send({"successMessage": "Account created"});
                            }
                        })
                }
            });
    });

    // We need a login api. The login endpoint should do two things: 1: return a valid auth token to the client! 2: update database with authtoken.

    app.post('/user/login', function(req, res) {
        // Login needs to get the real username and password, this should be the only place we handle those after register.
        let username = req.body.username.toLowerCase();
        let password = req.body.password;
        // we need to check this aginst database
        dbs.users.collection('userAuth').findOne({"username": username})
            .then(function(doc) {
                if(!doc) {
                    res.send({"failMessage": "Could not find username"});
                }
                else {
                    let salt = doc.salt.toString();
                    let passwordHashed = crypto.createHash('sha256').update(password + salt).digest('hex');

                    if(passwordHashed === doc.password) {
                        // Only when the real user is logging in we can create a token.
                        let randomNumber =  Math.random().toString();
                        // We need to create the token based on the hashed password. a hashed password should be unique.
                        let clientToken = crypto.createHash('sha256').update(passwordHashed + randomNumber).digest('hex');
                        let databaseToken = crypto.createHash('sha256').update(clientToken).digest('hex');

                        // We should create a unique token based on the hashed password. then we hash a version of this and save at the
                        // database. when we have this pair, we dont need anything else to find a user.
                        // Need to update database.
                        dbs.users.collection('userAuth').updateOne(
                            {"username": username},
                            { $set: {"authToken": databaseToken},
                              $currentDate: {lastModified: true } })
                        .then(function(result) {
                            console.log("Database successfully updated");
                            res.send({"successMessage": "User login completed!","token": clientToken});
                        }, function(err) {
                            console.log(err);
                            res.send({"failMessage": "Something went wrong updating database with token."})
                        })
                    }
                    else {
                        res.send({"failMessage": "password did not match"});
                    }
                }
            })
    });

    return app;
};
