'use strict';

const capitalizeFirstLetter = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = capitalizeFirstLetter;
