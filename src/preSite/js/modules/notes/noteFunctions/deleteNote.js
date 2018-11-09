'use strict';
import localOrSessionToken from '../../../functionality/localOrSession.js';

export default function deleteNote(activeDocument) {
    // deleteNote is used by noteRead. When called it will delete active note!
    // It needs two parameters, topic and id

    // We need to create object to pass up to the sky!
    let token = localOrSessionToken();
    let deleteData = {
        topic: activeDocument.topic,
        document_id: activeDocument._id,
        auth: {
            "token": token
        }
    }

    const url = "/api/notes/deleteNote";

    return new Promise(function(resolve, reject) {
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(deleteData),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        })
        .then((res) => res.json())
        .then((response) => {
            if(response.successMessage) {

                resolve("success");
            }
            else {
                reject("Failure deleting document");
            }
        })

    })
}
