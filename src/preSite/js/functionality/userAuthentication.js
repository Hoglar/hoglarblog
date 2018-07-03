'use strict';

// passwordChecker is called from the userAuthentication function.
// userAuthentication is getting username and password from localStorage or sessionStorage.

// Should maybe not get username and password but the token from local or session? If the token is unique we can use this to
// autherize. no need for password and username anywhere. 
const passwordChecker = function(username, password, func) {

    const url = "/user/userAuthentication";
    let data = {
        username: username,
        password: password
    }

    let check = fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-type': 'application/json'
        })
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then((response) => {

            if(response.failMessage){
                console.log("Doing a database search but getting fail message from server");
                func("guest");
            }
            else {
                func(username);
            }
    });
}

function userAuthentication(func) {

    // Kan prøve og droppe username, og heller her sjekke for sessionstorage eller local storage
    if (window.localStorage.getItem('username')) {
        if (window.localStorage.getItem('username') !== "guest") {
            console.log("Found local sessionStorage");
            let username = window.localStorage.getItem('username');
            let password = window.localStorage.getItem('password');
            passwordChecker(username, password, func);
        }

        else if (window.sessionStorage.getItem('username') !== "guest") {
            console.log("Found sessionstorage");
            let username = window.sessionStorage.getItem('username');
            let password = window.sessionStorage.getItem('password');
            passwordChecker(username, password, func);
        }
        else {
            console.log("Didnt found user, logging in as guest");
            func("guest");
        }
    }
    else {
        func("guest");
    }
}

module.exports = userAuthentication;
