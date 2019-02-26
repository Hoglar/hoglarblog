'use strict';
import React from 'react';
import capitalizeFirstLetter from '../../functionality/capitalizeFirstLetter.js';
import updateNote from './noteFunctions/updateNote.js';
import deleteNote from './noteFunctions/deleteNote.js';
import notesUpdateLikes from './noteFunctions/notesUpdateLikes.js';
import NoteEditor from './NoteEditor/noteEditor.js';

import NoteComments from './noteComments.js';

// Dett er neste nå !

export default class NoteRead extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showComments: false,
            editButton: (this.props.editMode) ? "Save" : "Edit",
            editMode: this.props.editMode,
            likeButton: (this.props.noteSearchSingleResult.score.likes.includes(this.props.loggedInUser) ?
                        "noteLikedByUser" : ""),
            dislikeButton: (this.props.noteSearchSingleResult.score.dislikes.includes(this.props.loggedInUser) ?
                        "noteDislikedByUser" : "")
        }
        this.boundHandleKeyDown = this.handleKeyDown.bind(this);
    }

    componentDidMount() {

        document.getElementsByClassName("noteReadMain")[0].contentEditable = this.state.editMode;
        if (this.state.editMode) {
            document.getElementsByClassName("noteReadMain")[0].focus();
        }

        // Mounting keydown functionality
        if (this.state.editMode) {
            window.addEventListener('keydown', this.boundHandleKeyDown);
        }
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.boundHandleKeyDown);
    }

    // We got here some eventhandlers to create some fancy shitt!

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

            // Add ctrl-s functionality
            window.addEventListener('keydown', this.boundHandleKeyDown);
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
        }
    }

    // We need two functions here, one for the ctrl s save method. and one for the autosave.

    // ctrl save should be easy.

    handleKeyDown(e) {
        if(e.ctrlKey === true && e.keyCode === 83) {
            e.preventDefault();
            let noteReadMain = document.getElementsByClassName("noteReadMain")[0];
            let newNote = noteReadMain.innerText;

            updateNote(this.props.noteSearchSingleResult.topic,
                       this.props.noteSearchSingleResult._id,
                       newNote)
            .then(
                (response) => {
                    console.log(response);
                    this.props.reloadNote(response);
                },
                (err) => {
                    console.error(err);
                }
            )
        }
    }

    // we make a timer function that starts a timer of 5 some minutes,
    // We then check if we are still in editmode, and in this component at all. and then updates server,
    // When update is done, we check if we still are in edit and start timer over again.





    deleteButtonClicked(e) {
        // When delete button gets clicked
        // We pass in the active document for readability!
        deleteNote(this.props.noteSearchSingleResult)
        .then(
            (response) => {
                console.log(response);
                this.props.listSuggestions();
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
            // When we press comment, we must remove dictionary!
            this.props.hideDictionary();
        }
        else {
            this.setState({showComments: false});
        }
    }

    noteLikeButtonClicked() {

        let user = this.props.loggedInUser;
        let likeArr = this.props.noteSearchSingleResult.score.likes;

        // Check if user is in likeArr
        if(!likeArr.includes(user)) {
            console.log("Did not find user")
            notesUpdateLikes(this.props.noteSearchSingleResult.topic,
                             this.props.noteSearchSingleResult._id,
                             this.props.loggedInUser,
                             "like")
            .then(()=> {
                 this.props.reloadNote(this.props.noteSearchSingleResult);
            })
        }
    }

    noteDislikeButtonClicked() {
        let user = this.props.loggedInUser;
        let dislikeArr = this.props.noteSearchSingleResult.score.dislikes;

        // Check if user is in likeArr
        if(!dislikeArr.includes(user)) {
            notesUpdateLikes(this.props.noteSearchSingleResult.topic,
                             this.props.noteSearchSingleResult._id,
                             this.props.loggedInUser,
                             "dislike")
            .then(()=> {
                this.props.reloadNote(this.props.noteSearchSingleResult);
            })
        }
    }


    render() {
        return (
            <article className="noteRead">
                <header className="noteReadHeader">
                    <h3>
                        {capitalizeFirstLetter(this.props.noteSearchSingleResult.title)}
                    </h3>
                </header>

                <article className="noteReadMain">
                    <NoteEditor noteSearchSingleResult={this.props.noteSearchSingleResult}
                                reloadNote={this.props.reloadNote}/>
                </article>

                <footer className="noteReadFooter">

                    {((this.props.loggedInUser === "guest") ? null :
                     (this.props.loggedInUser === this.props.noteSearchSingleResult.author) ?
                         <button className="noteButton"
                                 onClick={this.editButtonClicked.bind(this)}>

                                 {this.state.editButton}
                         </button> :
                         <button className={"noteButton " + this.state.likeButton}
                                 onClick={this.noteLikeButtonClicked.bind(this)}>
                                 Like
                         </button>
                    )}

                    {((this.props.loggedInUser === "guest") ? null :
                     (this.props.loggedInUser === this.props.noteSearchSingleResult.author) ?
                         <button className="noteButton noteReadDeleteButton"
                                 onClick={this.deleteButtonClicked.bind(this)}>
                                 Delete
                         </button> :
                         <button className={"noteButton " + this.state.dislikeButton}
                                 onClick={this.noteDislikeButtonClicked.bind(this)}>
                                 Dislike
                         </button>
                    )}

                    <button className="noteButton">

                            Bookmark
                    </button>
                    <button className="noteButton"
                            onClick={this.commentButtonClicked.bind(this)}>

                            Comments
                    </button>
                </footer>

                {(this.state.showComments && this.props.showDictionary === false) ?
                    <NoteComments noteSearchSingleResult={this.props.noteSearchSingleResult}
                                  updateSearchSingleResult={this.props.updateSearchSingleResult}/>
                : null}
            </article>
        )
    }
}
