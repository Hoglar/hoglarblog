'use strict';

// This function should get like or dislike, then send this to server with user name,
// We can then update, We dont need auth for this i think.

export default function notesUpdateLikes(topic, _id, loggedInUser, update) {
    // this function needs to fetch over data with like or dislike?
    console.log("Connection established", loggedInUser);

    const url = "/api/dictionary/updateLikes";

    let data = {
        update: update,
        user: loggedInUser,
        document_id: _id,
        topic: topic
    }

    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        })
        .then(
            function(response) {
                resolve("Updated likes");
            }
        )
    })
}
