'use strict';
// Header gets imported into app.js

import userAuthentication from '../../functionality/userAuthentication.js';
// Gets props from app: loggedInUser, registerButtonClicked()

import React from 'react';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }


    login(event) {
        event.preventDefault();

        if (this.refs.memberMeBox.checked) {
            window.localStorage.setItem('username', this.refs.username.value);
            window.localStorage.setItem('password', this.refs.password.value);
            userAuthentication((result) => {
                if(result === "guest") {
                    window.localStorage.setItem('username', "guest");
                    window.localStorage.setItem('password', "");
                    alert("Wrong username or password!");
                }
                else {
                    window.location.reload();
                }
                console.log(result);
            });
        }
        else {
            window.sessionStorage.setItem('username', this.refs.username.value);
            window.sessionStorage.setItem('password', this.refs.password.value);
            userAuthentication((result) => {
                if(result === "guest") {
                    window.sessionStorage.setItem('username', "guest");
                    window.sessionStorage.setItem('password', "");
                    alert("Wrong username or password!");
                }
                else {
                    window.location.reload();
                }
            });
        }
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
                <form className="loginForm">
                    <input type="text" ref="username" placeholder="Username:"/>
                    <input type="password" ref="password" placeholder="Password"/>
                    <button type="submit" onClick={this.login.bind(this)}>Login</button>

                </form>
                <a className="registerUser" onClick={this.props.registerButtonClicked}>Register user?</a>
                <div className="loginRememberMeCheckbox">
                    <label for="keepLoggedInnCheckbox">Remember me</label>
                    <input type="checkbox" ref="memberMeBox" id="keepLoggedInnCheckbox"/>
                </div>
                {(this.props.loggedInUser === "guest") ? null :
                <button type="submit" className="logoutUser" onClick={this.logout.bind(this)}>Logout</button>}

            </div>
        )
    }
}
