'use strict';
// What is this file contra the input file?

// What should this editor do?

// Basic
    // It should make users make text. The text should be modified in some ways.

    // We need a way to capture written innerText
        // Vi bruker save til å sende funksjon hit.

    // We need a way to prefill the text field with data from database.
        // We got two key pieces: 1: a value to represent the state of the input: this i could use for this?

import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, convertToRaw, convertFromRaw} from 'draft-js';
import updateNote from '../noteFunctions/updateNote.js';


export default class NoteEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Editor
                    className={}
                    placeholder="This is the editor"
                    editorState={this.props.editorState}
                    onChange={this.props.onChange}
                />
            </div>


        )
    }
}
