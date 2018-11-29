'use strict';
import React from 'react';
import capitalizeFirstLetter from '../../functionality/capitalizeFirstLetter.js';
import updateNote from './noteFunctions/updateNote.js';
import deleteNote from './noteFunctions/deleteNote.js';

import NoteComments from './noteComments.js';

// Dett er neste nå !

export default class NoteRead extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showComments: false,
            editButton: (this.props.editMode) ? "Save" : "Edit",
            editMode: this.props.editMode
        }
    }

    componentDidMount() {
        document.getElementsByClassName("noteReadMain")[0].contentEditable = this.state.editMode;
        if (this.state.editMode) {
            document.getElementsByClassName("noteReadMain")[0].focus();
        }
    }

    componentDidUpdate(prevProps) {
  // Typical usage (don't forget to compare props):
    if (this.props.editMode !== prevProps.editMode) {
        this.setState({
            editButton: (this.props.editMode) ? "Save" : "Edit",
            editMode: this.props.editMode
        }, () => {
            document.getElementsByClassName("noteReadMain")[0].contentEditable = this.state.editMode;
            if (this.state.editMode) {
                document.getElementsByClassName("noteReadMain")[0].focus();
            }
        })
    }
}

    // Note read needs data.
    // Gjøre note search først?
    editButtonClicked() {
        // We need to set the noteReadTop to editable
        // We need to set the noteReadMain to editable
        let noteReadMain = document.getElementsByClassName("noteReadMain")[0];

        if(this.state.editButton === "Edit") {
            console.log("Trying to set top to editable!");
            this.setState({editButton: "Save"});

            noteReadMain.contentEditable ="true";
        }

        if(this.state.editButton === "Save") {
            let newNote = noteReadMain.innerText;
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
            // Update mongo with new data.
            // Need to do post request. with auth
        }
    }


    deleteButtonClicked() {
        // When delete button gets clicked
        // We pass in the active document for readability!
        deleteNote(this.props.noteSearchSingleResult)
        .then(
            (response) => {
                console.log(response);
                this.props.reloadNote(null);
            },
            (error) => {
                console.error(error);
            }
        )
    }

    commentButtonClicked() {
        if (this.state.showComments === false) {
            this.setState({showComments: true});
        }
        else {
            this.setState({showComments: false});
        }
    }



    render() {
        return (
            <article className="noteRead">
                <div className="noteReadTop">
                    {capitalizeFirstLetter(this.props.noteSearchSingleResult.title)}
                </div>
                
                <div className="noteReadMain">
                        {this.props.noteSearchSingleResult.note}
                </div>
                <div className="noteReadFooter">

                    {((this.props.loggedInUser === "guest") ? null :
                        <button id="noteReadFooterEditButton"
                                className="noteButton"
                                onClick={this.editButtonClicked.bind(this)}>

                                {this.state.editButton}
                        </button>
                    )}

                    {((this.props.loggedInUser === "guest") ? null :
                        <button id="noteReadFooterDeleteButton"
                                className="noteButton"
                                onClick={this.deleteButtonClicked.bind(this)}>

                                Delete
                        </button>
                    )}


                    <button id="noteReadFooterMarkButton"
                            className="noteButton">

                            Bookmark
                    </button>
                    <button id="noteReadFooterCommentButton"
                            className="noteButton"
                            onClick={this.commentButtonClicked.bind(this)}>

                            Comments
                    </button>
                </div>

                {(this.state.showComments) ?
                    <NoteComments noteSearchSingleResult={this.props.noteSearchSingleResult}
                                  updateSearchSingleResult={this.props.updateSearchSingleResult}/>
                : null}
            </article>
        )
    }
}
