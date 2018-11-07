'use strict';

import localOrSessionToken from '../../../functionality/localOrSession.js';

export default function updateNote(topic, _id, newNote) {

    let token = localOrSessionToken();
    let updateData = {
        topic: topic,
        document_id: _id,
        newNote: newNote,
        auth: {
            "token": token
        }
    }

    const url = "/api/notes/updateNote";

    return new Promise(function(resolve, reject) {
        console.log("Doing");
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(updateData),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        })
        .then((res) => res.json())
        .then((response) => {
            if(response.successMessage) {
                resolve("Success");
            }
            else {
                reject("Failure updating document");
            }
        })

    })
}
