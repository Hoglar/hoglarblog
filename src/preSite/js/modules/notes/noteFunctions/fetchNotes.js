'use strict';


export default function fetchNotes(searchData, topic) {

    const url = "/api/notes/notesSearch?searchData=";


    return new Promise((resolve, reject) => {

        fetch(url + searchData + "&topic=" + topic)
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
