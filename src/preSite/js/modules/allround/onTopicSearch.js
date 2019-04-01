"use strict";

export default function topicSearch(event) {

    let topicSearchValue = event.target.value;

    console.log(topicSearchValue);

    const url = "/api/notes/topicSearch?topicSearchValue=";

    return new Promise((resolve, reject) => {

        fetch(url + topicSearchValue)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            if(response.failMessage) {
                reject(response.failMessage);
            }
            else {
                resolve(response);
            }
        })
    })
}
