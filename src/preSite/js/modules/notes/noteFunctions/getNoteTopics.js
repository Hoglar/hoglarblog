'use strict';

// getNoteTopics will call database for the topics in the note database.
// Smells like bad design.

export default function getNoteTopics() {

    const url = "/api/notes/topics";

    console.log("Sending fetch request");


    fetch(url)
    
}
