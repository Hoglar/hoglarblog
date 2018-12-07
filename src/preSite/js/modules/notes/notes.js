'use strict';
import React from 'react';

// notes.js is the main component for the note section. It should be home for many
// components.

// Lets start by creating some notes, we need a noteCreate.js component.
import NoteHeader from './noteHeader.js';
import NoteRead from './noteRead.js';
import NoteSearchResult from './noteSearchResult.js';
import fetchUpdatedNote from './noteFunctions/fetchUpdatedNote.js'
import updateNoteScoreRead from './noteFunctions/updateNoteScoreRead.js';

// We need to get topics we can work width

// Gets some props from app.js
    // gets logged in user.
    // can i get info whether dictionary is loaded or not?
export default class Notes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showRead: false,
            editMode: false,
            showSearchResult: false,
            noteSearchResult: [],
            noteSearchSingleResult: null,
            activeTopic: "Select topic",
            topics: ["waitingServer"]
        }
    }



    // Can be many fetch requests?
    topicSelectorClicked() {
        return new Promise((resolve, reject) => {
            fetch("/api/notes/topics")
                .then((response) => {
                    return response.json();
                })
                .then((response) => {

                    this.setState({topics: response.topics.sort()})
                    resolve("ok");
                })
        })
    }


    topicSelected(topic) {

        this.setState({activeTopic: topic})
    }

    showCreate() {
        if (this.state.showCreate) {
            this.setState({showCreate: false});
        }
        else {
            this.setState({showCreate: true, showRead: false})
        }
    }

    noteUpdateSearchResults(results) {
        // One Mission! update state with the search results from landing page.
        this.setState({noteSearchResult: results, showSearchResult: true});
    }



    noteSearchSingleResultClicked(note, changeMode) {
        console.log("Changing State to", changeMode);
        updateNoteScoreRead(note);
        this.setState({
            noteSearchSingleResult: note,
            showRead: true,
            showSearchResult: false,
            editMode: changeMode
        });
    }

    reloadNote(note) {
        this.setState({showRead: false}, () => {
            if(note) {
                fetchUpdatedNote(note.topic, note._id)
                .then((updatedNote) => {
                    console.log(updatedNote);
                    this.noteSearchSingleResultClicked(updatedNote, false);
                })
            }
        })
    }
    // When we update comments in noteComments we need to update the document we use as base.
    updateSearchSingleResult(note) {
        this.setState({
            noteSearchSingleResult: note
        })
    }

    hideSearchResult() {
        this.setState({showSearchResult: false});
    }

    render() {
        return (
            <section className="notesSkeleton">
                <NoteHeader topics={this.state.topics}
                                 activeTopic={this.state.activeTopic}
                                 topicSelectorClicked={this.topicSelectorClicked.bind(this)}
                                 topicSelected={this.topicSelected.bind(this)}
                                 loggedInUser={this.props.loggedInUser}
                                 showCreate={this.showCreate.bind(this)}
                                 hideSearchResult={this.hideSearchResult.bind(this)}
                                 noteUpdateSearchResults={this.noteUpdateSearchResults.bind(this)}
                                 loadNote={this.noteSearchSingleResultClicked.bind(this)}
                             />

                {(this.state.showRead) ?
                    <NoteRead noteSearchSingleResult={this.state.noteSearchSingleResult}
                              updateSearchSingleResult={this.updateSearchSingleResult.bind(this)}
                              reloadNote={this.reloadNote.bind(this)}
                              loggedInUser={this.props.loggedInUser}
                              editMode={this.state.editMode}
                    />
                : null}
                {(this.state.showSearchResult) ?
                    <NoteSearchResult noteSearchResult={this.state.noteSearchResult}
                                      noteSearchSingleResultClicked={this.noteSearchSingleResultClicked.bind(this)}/>
                : null}

            </section>
        )
    }
}
