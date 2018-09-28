"use strict";

export default function fetchComments(topic, _id) {
    return new Promise((resolve, reject) => {

        let url = "/api/notes/commentSearch";

        console.log("Doing fetch");
        fetch(url + _id + "&topic=" + topic)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            if(response.searchMessage) {
                reject("Nothing found");
            }
            else {

                resolve(response.comments);
            }
        })
    })
}
