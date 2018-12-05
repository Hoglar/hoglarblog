'use strict';
const mongo = require('mongodb');
// We need a function that runs when a post is getting read.
// Should we make a function that can do many things? it takes a input. and update based
// this input.

// The function need a database connection.
// It needs a topic to look for the note.
// It must have a unique noteId
// The like parameter is optional.

function updateNoteScoreRead(dbs, topic, noteID) {
    // Make it return a promise. Maybe we could use async await?

    // This function should give point to score.read and score.popularity.
        // I have a separate like function that giveth to score.like and popularity.
        // The comment should also give score to popularity.
    return new Promise((resolve, reject) => {

        dbs.notes.collection(topic).updateOne(
            {_id: new mongo.ObjectId(noteID)},
            {$inc: {
                "score.read": 1
                }
            }
        ).then(
            function(result) {
                console.log(result);
                resolve("Succesfully updated");
            },
            function(err) {
                console.error(err);
                reject("Something went wrong with update");
            }
        )
    })
}

module.exports = updateNoteScoreRead;
