'use strict';

export default function updageNoteScoreRead(note) {

    const url = "/api/note/updateScore";

    let data = {
        topic: note.topic,
        document_id: note._id
    }

    console.log("Doing Fetch");

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-type': 'application/json'
        })
    })
}
