'use strict';

// needs some parameters?
export default function getSuggestions(topic) {
    // topic can be "Select topic"
    if(topic === "Select topic") {
        topic = false;
    }

    // we use promise, that returns a sorted array on fullfilment.
    // We use fetch post. cause post is easylife.

    const url = ""
    let data = {
        topic: topic
    }

    return new Promise((resolve, reject) => {

    })
}
