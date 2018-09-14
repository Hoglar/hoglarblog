'use strict';
import React from 'react';

// What does noteCreate do?
    // It needs to take user input into a form, take that input and create a
    // note document on database.
    // First lets make form.

export default class NoteCreate extends React.Component {

    render() {
        return (
            <div className="noteCreate">
                <form className="noteCreateForm">

                    <div className="dictionaryCreateFormTop">
                        <input ref="title" type="text" placeholder="Title:"></input>

                        <input ref="topic" type="text" placeholder="Topic:"></input>
                    </div>

                    <div className="noteCreateInputSection">
                        <textarea id="noteCreateNote"
                            ref="note"
                            type="text"
                            placeholder="Write here!"
                            maxlength="2000"/>
                    </div>
                    <div>
                        <button className="noteCreateInputButton" type="submit">Save</button>
                    </div>
                </form>
            </div>
        )
    }
}
