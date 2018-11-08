'use strict';
import React from 'react';
import capitalizeFirstLetter from '../../functionality/capitalizeFirstLetter.js';
import updateNote from './noteFunctions/updateNote.js';

import NoteComments from './noteComments.js';

// Dett er neste nå !

export default class NoteRead extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showComments: false,
            editButton: "Edit"
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
            <div className="noteRead">
                <div className="noteReadTop">
                    {capitalizeFirstLetter(this.props.noteSearchSingleResult.title)}
                </div>
                <div className="noteReadMain">
                        {this.props.noteSearchSingleResult.note}
                </div>
                <div className="noteReadFooter">

                    {((this.props.loggedInUser === "guest") ? null :
                        <button id="noteReadFooterEditButton"
                                className="noteLandingPageButton"
                                onClick={this.editButtonClicked.bind(this)}>

                                {this.state.editButton}
                        </button>
                    )}

                    <button id="noteReadFooterDeleteButton"
                            className="noteLandingPageButton">

                            Delete
                    </button>
                    <button id="noteReadFooterMarkButton"
                            className="noteLandingPageButton">

                            Bookmark
                    </button>
                    <button id="noteReadFooterCommentButton"
                            className="noteLandingPageButton"
                            onClick={this.commentButtonClicked.bind(this)}>

                            Comments
                    </button>
                </div>

                {(this.state.showComments) ?
                    <NoteComments noteSearchSingleResult={this.props.noteSearchSingleResult}
                                  updateSearchSingleResult={this.props.updateSearchSingleResult}/>
                : null}
            </div>
        )
    }
}
