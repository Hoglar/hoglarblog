"use strict";

// If username = this.user return -1

const comparePopularity = function(a,b) {

    if (a.score.popularity < b.score.popularity) {
        return 1;
    }
    if (a.score.popularity > b.score.popularity) {
        return -1;
    }


    return 0;


}

module.exports = comparePopularity;
