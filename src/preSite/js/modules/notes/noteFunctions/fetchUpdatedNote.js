"use strict";

export default function fetchUpdatedNote(topic, _id) {
    return new Promise((resolve, reject) {
        const url = "/api/note/getSingleNote";
        let data = {
            topic: topic,
            _id: _id
        }

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        })
    })
}
