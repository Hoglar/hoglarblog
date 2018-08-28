'use strict';



// passwordChecker is called from the userAuthentication function.
// userAuthentication is getting username and password from localStorage or sessionStorage.

// Should maybe not get username and password but the token from local or session? If the token is unique we can use this to
// autherize. no need for password and username anywhere.
const passwordChecker = function(token, func) {

    const url = "/user/userAuthentication";
    let data = {
        token: token
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
                console.log(response.failMessage);
                func("guest");
            }
            else {
                func(response.user);
            }
    });
}



function userAuthentication(func) {


    if (window.localStorage.getItem('token')) {
        if (window.localStorage.getItem('token') !== "") {
            console.log("Found local sessionStorage");
            let token = window.localStorage.getItem('token');
            passwordChecker(token, func);
        }

    }
    else if(window.sessionStorage.getItem('token')) {
        if (window.sessionStorage.getItem('token') !== "") {
            console.log("Found sessionstorage");
            let token = window.sessionStorage.getItem('token');
            passwordChecker(token, func);
        }
    }

    else {
        func("guest");
    }
}

module.exports = userAuthentication;
