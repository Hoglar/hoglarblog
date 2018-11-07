"use strict";

export default function fetchComments(topic, _id) {
    return new Promise((resolve, reject) => {

        let url = "/api/notes/commentSearch";

        let data = {
            topic: topic,
            _id: _id
        }

        console.log("Doing fetch for" + data._id);
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            if(response.failMessage) {
                reject("Nothing found");
            }
            else {
                resolve(response);
            }
        })
    })
}
