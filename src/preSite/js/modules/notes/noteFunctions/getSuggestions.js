'use strict';

// needs some parameters?
export default function getSuggestions(topic) {
    // topic can be "Select topic"
    if(topic === "Select topic") {
        topic = false;
    }

    // we use promise, that returns a sorted array on fullfilment.
    // We use fetch post. cause post is easylife.

    const url = "/api/note/getSuggestions";
    let data = {
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
        .then((res) => res.json())
        .then((response) => {
            console.log(response.documents);
            resolve(response.documents);
        })
    })
}
