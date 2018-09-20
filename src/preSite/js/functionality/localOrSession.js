'use strict';

// Need to make a function to determine whether i have local or session stored token.
// Function will return the token.

const localOrSessionToken = function() {

    if (window.localStorage.getItem('token')) {
        if (window.localStorage.getItem('token') !== "") {
            return window.localStorage.getItem('token');
        }

    }
    else if(window.sessionStorage.getItem('token')) {
        if (window.sessionStorage.getItem('token') !== "") {
            return window.sessionStorage.getItem('token');
        }
    }
    else {
        return "Something is wrong here!";
    }
}

module.exports = localOrSessionToken;
