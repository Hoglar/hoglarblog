'use strict';
// Header gets imported into app.js

import userAuthentication from '../../functionality/userAuthentication.js';
// Gets props from app: loggedInUser, registerButtonClicked()

import React from 'react';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    // The login should be used to store username and auth token so that we can auto log into the page.
    // The login doesnt need to log the user in, if we get the username and token.
    // Should we make the token based on ip address?
    login(event) {
        event.preventDefault();
        // Login with remember box checked. This will save username and password in localStorage.
        // this.refs.memberMeBox.checked
        // this.refs.username.value
        // this.refs.password.value

        const url = "/user/login";
        let userData = {
            username: this.refs.username.value,
            password: this.refs.password.value,
        }

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then((response) => {
            // On success we cast a function that creates a success page
            if (response.successMessage) {
                console.log(response.successMessage);
                console.log(response.token)
                // we might get back in response an auth token.
                alert("User created: log in plz.");
            }
            else {
                if(response.failMessage) {
                    alert("Unable to log in, wrong username or password.");
                }
            }
        });

    }

    logout(event) {
        event.preventDefault();
        window.localStorage.setItem('username', "guest");
        window.localStorage.setItem('password', "");
        window.sessionStorage.setItem('username', "guest");
        window.sessionStorage.setItem('password', "");
        window.location.reload();
    }


    render() {
        return(
            <div className="header">
                <div className="loggedInAsInfo">Logged in as {this.props.loggedInUser} </div>
                {(this.props.loggedInUser === "guest") ?
                <form className="loginForm">
                    <input type="text" ref="username" placeholder="Username:"/>
                    <input type="password" ref="password" placeholder="Password"/>
                    <button type="submit" onClick={this.login.bind(this)}>Login</button>

                </form> :
                null}

                {(this.props.loggedInUser === "guest") ?
                <a className="registerUser" onClick={this.props.registerButtonClicked}>Register user?</a> :
                null}

                {(this.props.loggedInUser === "guest") ?
                <div className="loginRememberMeCheckbox">
                    <label for="keepLoggedInnCheckbox">Remember me</label>
                    <input type="checkbox" ref="memberMeBox" id="keepLoggedInnCheckbox"/>
                </div> :
                null}

                {(this.props.loggedInUser === "guest") ? null :
                <button type="submit" className="logoutUser" onClick={this.logout.bind(this)}>Logout</button>}

            </div>
        )
    }
}
