'use strict';
// Header gets imported into app.js

import userAuthentication from '../../functionality/userAuthentication.js';
import capitalizeFirstLetter from '../../functionality/capitalizeFirstLetter.js';
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
                // Need to store the token based on memberMeBox
                if(this.refs.memberMeBox.checked) {
                    window.location.reload();
                    window.localStorage.setItem("token", response.token);
                }
                else {
                    window.location.reload();
                    window.sessionStorage.setItem("token", response.token);
                }

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
        window.localStorage.setItem('token', "");
        window.sessionStorage.setItem('token', "");

        window.location.reload();
    }


    render() {
        return(
            <div className="header">
                <h3 className="loggedInAsInfo">Logged in as: {capitalizeFirstLetter(this.props.loggedInUser)}</h3>
                {(this.props.loggedInUser === "guest") ?
                // Loginform must change, make it more responsive.
                <form className="loginForm">
                    <input type="text" ref="username" placeholder="Username:"/>
                    <input type="password" ref="password" placeholder="Password"/>
                    <button type="submit" onClick={this.login.bind(this)}>Login</button>

                </form> :
                null}

                <div className="headerRightUnderLine">
                    {(this.props.loggedInUser === "guest") ?
                    <a className="registerUser" onClick={this.props.registerButtonClicked}>Register user?</a> :
                    null}

                    {(this.props.loggedInUser === "guest") ?
                    <div className="loginRememberMeCheckbox">
                        <label htmlFor="keepLoggedInnCheckbox">Remember me</label>
                        <input type="checkbox" ref="memberMeBox" id="keepLoggedInnCheckbox"/>
                    </div> :
                    null}

                    {(this.props.loggedInUser === "guest") ? null :
                    <button type="submit" className="logoutUser" onClick={this.logout.bind(this)}>Logout</button>}

                </div>



            </div>
        )
    }
}
