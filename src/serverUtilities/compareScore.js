"use strict";

// compareScore is used to sort the returned array of dictionary documents.
// The documents have one property with name documentScore:
// It should also be able to sort based on other factors

// If username = this.user return -1

const compareScore = function(a,b) {
    if (a.score.popularity < b.score.popularity) {
        return 1;
    }
    if (a.score.popularity > b.score.popularity) {
        return -1;
    }
    return 0;
}

module.exports = compareScore;
