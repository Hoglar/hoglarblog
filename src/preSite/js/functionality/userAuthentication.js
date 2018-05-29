'use strict';

const userAuthentication = function() {
    console.log("Running userAuthentication");
    return sessionStorage.getItem('username');
}

module.exports = userAuthentication;
