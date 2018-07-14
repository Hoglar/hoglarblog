"use strict";

const compareScore = function(a,b) {
    if (a.documentScore < b.documentScore) {
        return -1;
    }
    if (a.documentScore > b.documentScore) {
        return 1;
    }
}

module.exports = compareScore;
