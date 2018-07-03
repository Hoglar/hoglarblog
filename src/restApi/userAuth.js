
'use strict';
const crypto = require('crypto');

module.exports = function(app, dbs) {



    // autoUserAuthentication needs some work. i only want one auth token here.
    app.post('/user/userAuthentication', function(req, res) {
        let username = req.body.username.toLowerCase();
        let passwordFromUser = req.body.password;

        dbs.users.collection('userAuth').findOne({"username": username})
            .then(function(doc) {
                if(!doc) {
                    res.send({"failMessage": "Could not find username"});
                }
                else {
                    let salt = doc.salt.toString();
                    let password = crypto.createHash('sha256').update(passwordFromUser + salt).digest('hex');
                    if(password === doc.password) {
                        console.log("successfully logged in " + username);
                        res.send({"successMessage": username});
                    }
                    else {
                        console.log("Password did not match");
                        res. send({"failMessage": "password did not match"});
                    }
                }
            })
    })

    // Create user does one thing, inserting username, password and salt into the database.

    // CreateUser is the place where we create new users for our app. Humans can use the register form and send
    // Username and password, now we also want an alpha key.
    // createUser Api will save username and save a hashed and salted password on the database.
    app.post('/user/createUser', function(req, res) {
        console.log("Getting user creation request!");
        // first check alpha key
        let alphaKey = req.body.alphaKey;
        let username = req.body.username.toLowerCase();
        console.log(alphaKey);

        //First we check username so that all have a unique username.
        dbs.users.collection('userAuth').findOne({"username": username})
            .then(function(doc) {
                if(doc) {
                    res.send({"failMessage": "username already taken"});
                }
                else {
                    dbs.users.collection('alphaKeys').findOne({"key": alphaKey})
                        .then(function(doc) {
                            if(!doc) {
                                res.send({"failMessage": "The alphakey is not found!"});
                            }
                            else {
                                console.log("Found alpha key, creating account!");
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
                                        dbs.users.collection('alphaKeys').deleteOne({"key": alphaKey}, function(error, r) {
                                            if (error) {
                                                console.log("Failed deleting alpha-key");
                                                res.send({"failMessage": "Account created i think, try!"});
                                            }
                                            else {
                                                console.log(r.deletedCount);
                                                res.send({"successMessage": "User created!"});
                                            }
                                        });
                                    }
                                })

                            }
                        });
                }
            });
    });

    // We need a login api. The login endpoint should do one thing. 

    return app;
};
