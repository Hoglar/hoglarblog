"use strict";

// If username = this.user return -1

const compareScore = function(a,b) {

    // Trenger en if check da flere av mine gamle
    // documenter ikke har likes.
    if (("likes" in a) && ("likes" in b)) {
        let aLikes = a.score.likes.length - a.score.dislikes.length;
        let bLikes = b.score.likes.length - b.score.dislikes.length;

        if (aLikes < bLikes) {
            return 1;
        }
        if (aLikes > bLikes) {
            return -1;
        }
    }

    return 0;


}

module.exports = compareScore;
