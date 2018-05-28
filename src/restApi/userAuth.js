
'use strict';
const crypto = require('crypto');

module.exports = function(app, dbs) {


    // Create User
    app.post('/user/createUser', function(req, res) {
        console.log("Getting user creation request!");
        // first check alpha key
        let alphaKey = req.body.alphaKey;
        console.log(alphaKey);

        dbs.users.collection('alphaKeys').findOne({"key": alphaKey})
            .then(function(doc) {
                if(!doc) {
                    res.send({"failMessage": "The alphakey is not found!"});
                }
                else {
                    console.log("Found alpha key, creating account!");
                    let username = req.body.username;
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
                            res.send({"successMessage": "Account created!"});
                            console.log("Created account.");
                            dbs.users.collection('alphaKeys').deleteOne({"key": alphaKey}, function(error, r) {
                                if (error) {
                                    console.log("Failed deleting alpha-key");
                                }
                                else {
                                    console.log(r.deletedCount);
                                }
                            });
                        }
                    })

                }
            });
    });

    return app;
};
