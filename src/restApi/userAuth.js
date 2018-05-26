// This file is not connected to file. 

'use strict';
const crypto = require('crypto');

module.exports = function(app, dbs) {


    // Create User
    app.post('/user/createUser', function(req, res) {

        if (req.body.userName.length < 4 || req.body.password.length < 8) {
            res.send("You username must be over 4 chars and you password over 8 chars!");
        }
        else {
            let userName = req.body.userName;
            let salt = Math.random().toString();
            const password = crypto.createHash('sha256').update(req.body.password + salt).digest('hex');

            // conect to db and create document in userAuth

            dbs.users.collection('userAuth').insertOne({
                username: userName,
                salt: salt,
                password: password
            }, function(err, r) {
                console.log("Something went wrong with insertion");
                res.send("Something went wrong!");
                res.redirect('/');
            }
            else {
                res.send("success");
                res.redirect('/');
            }
        )}
    });

    return app;
};
