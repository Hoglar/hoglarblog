'use strict';

const passwordChecker = function(username, func) {

    const url = "/user/userAuthentication";
    let data = {
        username: username,
        password: sessionStorage.getItem('password')
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
        // On success we cast a function that creates a success page
            if(response.failMessage){
                console.log("Getting fail message from server");
                func("guests");
            }
            else {
                func(username);
            }
    });
}

function userAuthentication(func) {

    // Kan prøve og droppe username, og heller her sjekke for sessionstorage eller local storage

    if (window.sessionStorage.getItem('username')) {
        console.log("Found session sessionStorage");
        let username = window.sessionStorage.getItem('username');
        passwordChecker(username, func);
    }

    else if (window.localStorage.getItem('username')) {
        console.log("Found localstorage");
        let username = window.localStorage.getItem('username');
        passwordChecker(username, func);
    }
    else {
        console.log("Didnt found user, logging in as guest");
        func("guest");
    }
}

module.exports = userAuthentication;
