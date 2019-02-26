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
        this.state = {editorState: EditorState.createEmpty()};
        this.onChange = (editorState) => this.setState({editorState});
    }

    componentDidMount() {
        console.log(this.props.noteSearchSingleResult)
        if(this.props.noteSearchSingleResult.note !== "") {
            this.setState({editorState: EditorState.createWithContent(
                convertFromRaw(JSON.parse(this.props.noteSearchSingleResult.note))
            )})
        }
    }

    saveContent() {
        this.setState({ convertedContent: convertToRaw(this.state.editorState.getCurrentContent())}, () => {
            console.log(this.state.convertedContent);
            let newNote = JSON.stringify(this.state.convertedContent);
            // UpdateNote takes 4 arguments: topic, id, new title and new content
            updateNote(this.props.noteSearchSingleResult.topic,
                       this.props.noteSearchSingleResult._id,
                       newNote)
            .then(
                (response) => {
                    console.log(response)
                    this.props.reloadNote(response);
                },
                (err) => {
                    console.error(err);
                }
            )
        });
    }


    render() {
        return (
            <div>
                <Editor
                    placeholder="This is the editor"
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                />

                <button onClick={this.saveContent.bind(this)}>Save</button>
            </div>


        )
    }
}
