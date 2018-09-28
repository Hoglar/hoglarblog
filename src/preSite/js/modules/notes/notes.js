'use strict';
import React from 'react';

// notes.js is the main component for the note section. It should be home for many
// components.

// Lets start by creating some notes, we need a noteCreate.js component.
import NoteLandingPage from './noteLandingPage.js';
import NoteCreate from './noteCreate.js';
import NoteRead from './noteRead.js';
import NoteSearchResult from './noteSearchResult.js';
import NoteComments from './noteComments.js';


// We need to get topics we can work width

// Gets some props from app.js
    // gets logged in user.
    // can i get info whether dictionary is loaded or not?
export default class Notes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showCreate: false,
            showRead: false,
            showSearchResult: false,
            showComments: false,
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

    noteSearchSingleResultClicked(note) {
        this.setState({
            noteSearchSingleResult: note,
            showRead: true,
            showSearchResult: false,
            showCreate: false,
        });
    }

    hideSearchResult() {
        this.setState({showSearchResult: false});
    }

    showReadComments() {
        this.setState({showComments: true})
    }

    render() {
        return (
            <div className="notesSkeleton">
                <NoteLandingPage topics={this.state.topics}
                                 activeTopic={this.state.activeTopic}
                                 topicSelectorClicked={this.topicSelectorClicked.bind(this)}
                                 topicSelected={this.topicSelected.bind(this)}
                                 loggedInUser={this.props.loggedInUser}
                                 showCreate={this.showCreate.bind(this)}
                                 hideSearchResult={this.hideSearchResult.bind(this)}
                                 noteUpdateSearchResults={this.noteUpdateSearchResults.bind(this)}
                             />

                {(this.state.showCreate) ? <NoteCreate activeTopic={this.state.activeTopic}
                /> : null}
                {(this.state.showRead) ?
                    <NoteRead noteSearchSingleResult={this.state.noteSearchSingleResult}
                              showReadComments={this.showReadComments.bind(this)}/>
                : null}
                {(this.state.showSearchResult) ?
                    <NoteSearchResult noteSearchResult={this.state.noteSearchResult}
                                      noteSearchSingleResultClicked={this.noteSearchSingleResultClicked.bind(this)}/>
                : null}

                {(this.state.showComments) ?
                    <NoteComments noteSearchSingleResult={this.state.noteSearchSingleResult}/>
                : null}

            </div>
        )
    }
}
