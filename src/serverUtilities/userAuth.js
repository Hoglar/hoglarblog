'use strict'
const crypto = require('crypto');
function serverUserAuth(tokenFromUser, dbs, func) {

    let authToken = crypto.createHash('sha256').update(tokenFromUser).digest('hex');

    dbs.users.collection('userAuth').findOne({"authToken": authToken})
        .then(function(doc) {
            if(!doc) {
                func(false);
            }
            else {
                console.log("Fount user, returning name");
                func(doc.username);
            }
        })
}


module.exports = serverUserAuth;
