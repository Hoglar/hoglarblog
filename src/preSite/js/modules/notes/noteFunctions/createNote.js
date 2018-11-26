'use strict';

import localOrSessionToken from '../../../functionality/localOrSession.js';


export default function createNote(topic, title) {

    const token = localOrSessionToken();
    let createData = {
        topic: topic,
        title: title,
        auth: {
            "token": token
        }
    }

    const url = "/api/notes/create";

    return new Promise(function(resolve, reject) {
        console.log("Doning create");
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(createData),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        })
        .then(
            function(response) {
                return response.json();
            }
        )
        .then(
            function(response) {
                if (response.successMessage) {
                    resolve(response.insertedDocument);
                }
                else {
                    console.log(response);
                    reject("Something went wrong in creation");
                }
            }
        )
    })





}
