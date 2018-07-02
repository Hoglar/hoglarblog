'use strict';

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
        // On success we cast a function that creates a success page
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
    if (window.sessionStorage.getItem('username')) {
        if (window.sessionStorage.getItem('username') !== "guest") {
            console.log("Found session sessionStorage");
            let username = window.sessionStorage.getItem('username');
            let password = window.sessionStorage.getItem('password');
            passwordChecker(username, password, func);
        }

        else if (window.localStorage.getItem('username') !== "guest") {
            console.log("Found localstorage");
            let username = window.localStorage.getItem('username');
            let password = window.localStorage.getItem('password');
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