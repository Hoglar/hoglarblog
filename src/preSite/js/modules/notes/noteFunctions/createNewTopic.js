'use strict';

import localOrSessionToken from '../../../functionality/localOrSession.js';

export default function createNewTopic(topic) {

    let token = localOrSessionToken();
    let createData = {
        topic: topic,
        auth: {
            "token": token
        }
    }

    const url = "/api/notes/createTopic";


    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(createData),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            if(response.successMessage) {
                resolve(topic);
            }
            else {
                reject("Something went wrong creating topic");
            }
        })
    })
}
