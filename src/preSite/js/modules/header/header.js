'use strict';
// Header gets imported into app.js

// Gets props from app: loggedInUser

import React from 'react';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }


    login(event) {
        event.preventDefault();
        console.log(this.refs.username.value, this.refs.password.value);

    }


    render() {
        return(
            <div className="header">
                <div className="loggedInAsInfo">Logged in as {this.props.loggedInUser} </div>
                <div className="loginForm">
                    <form>
                        <input type="text" ref="username" placeholder="Username:"/>
                        <input type="password" ref="password" placeholder="Password"/>
                        <button type="submit" onClick={this.login.bind(this)}>Login</button>
                    </form>
                </div>
                <div className="registerUser">Register</div>
            </div>
        )
    }
}
