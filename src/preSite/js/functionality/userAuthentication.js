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

function userAuthentication(username, func) {

    // Kan prøve og droppe username, og heller her sjekke for sessionstorage eller local storage
    if(!username) {
        console.log("Could not find user");
        func("Guest");
    }
    else {
        console.log("Checking password");
        passwordChecker(username, func)
    }
}

module.exports = userAuthentication;
