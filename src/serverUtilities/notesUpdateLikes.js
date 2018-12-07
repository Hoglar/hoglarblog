'use strict';
const mongo = require('mongodb');

function notesUpdateLikes(dbs, topic, _id, user, update) {

    // skal vi lage to ruter her.
    if(update === "like") {

        return new Promise((resolve, reject) => {
            dbs.notes.collection(topic).updateOne(
                {_id: new mongo.ObjectId(_id)},
                {$addToSet: {
                    "score.likes": user
                    }
                }
            )
            .then(
                function(result) {
                    resolve("Success");
                }
            )
            .catch(
                function(err) {
                    reject(err);
            })
        })
    }

    if(update === "dislike") {
        return new Promise((resolve, reject) => {
            dbs.notes.collection(topic).updateOne(
                {_id: new mongo.ObjectId(_id)},
                {$addToSet: {
                    "score.dislikes": user
                    }
                }
            )
            .then(
                function(result) {
                    resolve("Success");
                }
            )
            .catch(
                function(err) {
                    reject(err);
            })
        })
    }

}

module.exports = notesUpdateLikes;
