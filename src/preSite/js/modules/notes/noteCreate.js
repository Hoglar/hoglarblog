'use strict';
import React from 'react';



import localOrSessionToken from '../../functionality/localOrSession.js';
// What does noteCreate do?
    // It needs to take user input into a form, take that input and create a
    // note document on database.
    // First lets make form.

export default class NoteCreate extends React.Component {

    constructor(props) {
        super(props);

    }



    saveNote(event) {
        event.preventDefault();

        var token = localOrSessionToken();
        let createData = {
            topic: this.props.activeTopic,
            title: this.refs.title.value,
            note: this.refs.note.value,
            auth: {
                "token": token
            }
        }

        if(createData.title === "") {
            alert("You must add a title!");
        }
        else if (createData.note === "") {
            alert("Your note is empty!");
        }

        else {
            const url = "/api/notes/create";

            fetch(url, {
                method: 'POST',
                body: JSON.stringify(createData),
                headers: new Headers({
                    'Content-type': 'application/json'
                })
            })
            .then(
                function(response) {
                    return response.json();
                }
            )
            .then(
                function(response) {
                    console.log(response);
                }
            )
        }
    }

    render() {
        return (

            <form className="noteCreate">

                <div className="noteCreateTop">
                    <input className="noteCreateTitleInput" ref="title" type="text" placeholder="Title:"></input>
                </div>


                <textarea id="noteCreateInputSection"
                    ref="note"
                    type="text"
                    placeholder="Write here!"
                    maxlength="5000"/>

                <div className="noteCreateFooter">
                    <button className="noteCreateInputButton noteLandingPageButton"
                            type="submit"
                            onClick={this.saveNote.bind(this)}>
                        Save
                    </button>
                </div>
            </form>
        )
    }
}
