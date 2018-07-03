'use strict';

import React from 'react';


// Gets props from app: userCreationIsDone
// The register form has one purpose, to send username and password to server.
// I will not make a big deal of auto login after usercreation. this might be easy to do later.
export default class Register extends React.Component {

    registerUser(event) {
        event.preventDefault();

        if(this.refs.username.value.length < 4) {
            alert("Username is to short! over 4 chars plz.");
            return;
        }

        if(this.refs.password1.value.length < 8) {
            alert("Password is to short, min 8 chars!");
            return;
        }

        if(this.refs.password1.value !== this.refs.password2.value) {
            alert("Passwords doesnt match");
            return;
        }

        if(this.refs.alphaKey.value.length < 12 ) {
            alert("Enter valid alpha key!");
            return;
        }
        // api endpoint for user creation. 
        const url = "/user/createUser";
        let userData = {
            username: this.refs.username.value,
            password: this.refs.password1.value,
            alphaKey:this.refs.alphaKey.value
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
                // we might get back in response an auth token.
                alert("User created: log in plz.");
                this.props.userCreationIsDone();
            }
            else {
                if(response.failMessage === "username already taken") {
                    alert("Username is taken");
                }
                else {
                    console.log(response.failMessage);
                    this.props.userCreationIsDone();
                }
            }
        });
    }



    render() {
        return(
            <div className="registerPage">
                <form className="registerPageForm">
                    <input type="text" ref="username" placeholder="Username:"/>
                    <input type="password" ref="password1" placeholder="Password:"/>
                    <input type="password" ref="password2" placeholder="Confirm password:"/>
                    <input type="text" ref="alphaKey" placeholder="Alpha-key:"/>
                    <button type="submit" onClick={this.registerUser.bind(this)}>Create user</button>
                </form>
            </div>
        )
    }
}
