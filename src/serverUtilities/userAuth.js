'use strict'

function serverUserAuth(username, password, dbs, func) {

    dbs.users.collection('userAuth').findOne({"username": username})
        .then(function(doc) {
            if(!doc) {
                func(false);
            }
            else {
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
