'use strict';
import React from 'react';

// notes.js is the main component for the note section. It should be home for many
// components.

// Lets start by creating some notes, we need a noteCreate.js component.
import NoteHeader from './noteHeader.js';
import NoteEditor from './noteEditor.js';
import fetchUpdatedNote from './noteFunctions/fetchUpdatedNote.js'
import updateNoteScoreRead from './noteFunctions/updateNoteScoreRead.js';
import getSuggestions from './noteFunctions/getSuggestions.js';
import NoteSuggestions from './noteSuggestions.js';

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
            searchMode: false,
            noteSearchValue: "",
            noteSearchResult: [],
            noteSearchSingleResult: null,
            noteSuggestions: false,
        }
    }

    componentWillMount() {
        // Get array of suggestions?
        getSuggestions(this.props.activeTopic)
        .then((suggestion) => {
            this.setState({noteSuggestions: suggestion})
        })

    }

    componentDidUpdate(prevProps) {
  // Typical usage (don't forget to compare props):
    if (this.props.activeTopic !== prevProps.activeTopic) {
            getSuggestions(this.props.activeTopic)
            .then((suggestion) => {
                this.setState({noteSuggestions: suggestion})
            })
        }
    }

    topicSelected(topic) {
        this.props.giveTopicToMainApp(topic);
        // get new array of suggestions.
        this.setState({showRead: false});
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
        this.setState({noteSuggestions: results});
    }

    noteSearchSingleResultClicked(note, changeMode) {
        this.setState({showRead: false}, ()=> {
            updateNoteScoreRead(note);
            this.setState({
                noteSearchSingleResult: note,
                showRead: true,
                editMode: changeMode
            });
        })
        document.documentElement.scrollTop = 0;
        if(this.state.searchMode === true) {
            document.getElementById("noteLandingPageInputSearch").value = "";
            this.setState({searchMode: false});
        }

    }

    reloadNote(note) {
        this.setState({showRead: false}, () => {
            if(note) {
                fetchUpdatedNote(note.topic, note._id)
                .then((updatedNote) => {
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

    getSearchValue(searchValue) {
        if(searchValue === "") {
            this.setState({searchMode: false});
        }
        else {
            this.setState({searchMode: true});
        }
    }

    listSuggestions() {
        getSuggestions(this.props.activeTopic)
        .then((suggestion) => {
            this.setState({noteSuggestions: suggestion})
        })
    }

    noteLogoClicked() {
        if(this.state.showRead) {
            this.setState({
                showRead: false,
            })
        }

        else if(this.state.noteSearchSingleResult) {
            this.setState({showRead: true})
        }

    }

    render() {
        return (
            <section className="notesSkeleton">
                <NoteHeader topics={this.state.topics}
                                 activeTopic={this.props.activeTopic}
                                 topicSelected={this.topicSelected.bind(this)}
                                 loggedInUser={this.props.loggedInUser}
                                 showCreate={this.showCreate.bind(this)}
                                 noteUpdateSearchResults={this.noteUpdateSearchResults.bind(this)}
                                 loadNote={this.noteSearchSingleResultClicked.bind(this)}
                                 getSearchValue={this.getSearchValue.bind(this)}
                                 listSuggestions={this.listSuggestions.bind(this)}
                                 noteLogoClicked={this.noteLogoClicked.bind(this)}
                             />

                {(this.state.showRead && !this.state.searchMode) ?
                    <NoteEditor noteSearchSingleResult={this.state.noteSearchSingleResult}
                              updateSearchSingleResult={this.updateSearchSingleResult.bind(this)}
                              reloadNote={this.reloadNote.bind(this)}
                              loggedInUser={this.props.loggedInUser}
                              editMode={this.state.editMode}
                              hideDictionary={this.props.hideDictionary}
                              showDictionary={this.props.showDictionary}
                              listSuggestions={this.listSuggestions.bind(this)}
                    />
                : null}

                {((!this.state.showRead && this.state.noteSuggestions) || (this.state.searchMode && this.state.noteSuggestions)) ?
                    <NoteSuggestions noteSuggestions={this.state.noteSuggestions}
                                     noteSearchSingleResultClicked={this.noteSearchSingleResultClicked.bind(this)}/>

                : null}


            </section>
        )
    }
}
