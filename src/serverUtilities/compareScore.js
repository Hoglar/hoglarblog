"use strict";

// compareScore is used to sort the returned array of dictionary documents.
// The documents have one property with name documentScore:
// It should also be able to sort based on other factors

// If username = this.user return -1

const compareScore = function(a,b) {

    let aLikes = a.score.likes.length - a.score.dislikes.length;
    let bLikes = b.score.likes.length - b.score.dislikes.length;

    if (aLikes < bLikes) {
        return 1;
    }
    if (aLikes > bLikes) {
        return -1;
    }
    return 0;
}

module.exports = compareScore;
