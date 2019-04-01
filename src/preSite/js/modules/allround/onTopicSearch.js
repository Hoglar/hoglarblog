"use strict";

export default function topicSearch(event) {

    let topicSearchValue = event.target.value;

    console.log(topicSearchValue);

    const url = "/api/notes/topicSearch?searchData=";

    return new Promise((resolve, reject) => {

        fetch(url + searchData)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            if(response.searchMessage) {
                reject("Nothing found");
            }
            else {
                resolve(response);
            }
        })
    })
}
