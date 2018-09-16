'use strict';
import React from 'react';

// What does noteCreate do?
    // It needs to take user input into a form, take that input and create a
    // note document on database.
    // First lets make form.

export default class NoteCreate extends React.Component {

    render() {
        return (

            <form className="noteCreate">

                <div className="noteCreateTop">
                    <input ref="title" type="text" placeholder="Title:"></input>

                    <input ref="topic" type="text" placeholder="Topic:"></input>
                </div>


                <textarea id="noteCreateInputSection"
                    ref="note"
                    type="text"
                    placeholder="Write here!"
                    maxlength="5000"/>

                <div className="noteCreateFooter">
                    <button className="noteCreateInputButton" type="submit">Save</button>
                </div>
            </form>
        )
    }
}
