
'use strict';
const crypto = require('crypto');

module.exports = function(app, dbs) {



    // autoUserAuthentication
    app.post('/user/userAuthentication', function(req, res) {
        let username = req.body.username;
        let password = req.body.password;

        dbs.users.collection('userAuth').findOne({"username": username})
            .then(function(doc) {
                if(!doc) {
                    res.send({"failMessage": "Could not find username"});
                }
                else {
                    if(password === doc.password) {
                        console.log("successfully logged in");
                        res.send({"successMessage": username});
                    }
                    else {
                        console.log("Password did not match");
                        res. send({"failMessage": "password did not match"});
                    }
                }
            })
    })



    // Create User
    app.post('/user/createUser', function(req, res) {
        console.log("Getting user creation request!");
        // first check alpha key
        let alphaKey = req.body.alphaKey;
        let username = req.body.username.toLowerCase();
        console.log(alphaKey);

        //First we check username
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
                                let salt = Math.random().toString();
                                let password = crypto.createHash('sha256').update(req.body.password + salt).digest('hex');

                                dbs.users.collection('userAuth').insertOne({
                                    username: username,
                                    password: password,
                                    salt: salt
                                }, function(error, response) {
                                    if(error) {
                                        res.send({"failMessage": "Something went wrong in database"});
                                    }
                                    else {
                                        console.log("Created account.");
                                        dbs.users.collection('alphaKeys').deleteOne({"key": alphaKey}, function(error, r) {
                                            if (error) {
                                                console.log("Failed deleting alpha-key");
                                                res.send({"failMessage": "Account created i think, try!"});
                                            }
                                            else {
                                                console.log(r.deletedCount);
                                                res.send({"successMessage": "User created!", "password": password});
                                            }
                                        });
                                    }
                                })

                            }
                        });
                }
            });
    });

    return app;
};
