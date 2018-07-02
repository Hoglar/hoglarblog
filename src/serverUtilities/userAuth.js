'use strict'
const crypto = require('crypto');
function serverUserAuth(username, passwordFromUser, dbs, func) {

    dbs.users.collection('userAuth').findOne({"username": username})
        .then(function(doc) {
            if(!doc) {
                func(false);
            }
            else {
                let salt = doc.salt.toString();
                let password = crypto.createHash('sha256').update(passwordFromUser + salt).digest('hex');
                if(password === doc.password) {
                    func(true);
                }
                else {
                    func(false);
                }
            }
        })
}


module.exports = serverUserAuth;
