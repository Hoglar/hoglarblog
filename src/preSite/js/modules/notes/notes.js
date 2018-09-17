'use strict';
import React from 'react';

// notes.js is the main component for the note section. It should be home for many
// components.

// Lets start by creating some notes, we need a noteCreate.js component.
import NoteLandingPage from './noteLandingPage.js';
import NoteCreate from './noteCreate.js';
import NoteRead from './noteRead.js';
import NoteSearchResult from './noteSearchResult.js';


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

            topics: ["waitingServer"]
        }



    }

    topicSelectorClicked() {
        return new Promise((resolve, reject) => {
            fetch("/api/notes/topics")
                .then((response) => {
                    return response.json();
                })
                .then((response) => {
                    this.setState({topics: response.topics})
                    resolve("ok");
                })
        })
    }




    render() {
        return (
            <div className="notesSkeleton">
                <NoteLandingPage topics={this.state.topics}
                                 topicSelectorClicked={this.topicSelectorClicked.bind(this)}/>

                {(this.state.showCreate) ? <NoteCreate /> : null}
                {(this.state.showRead) ? <NoteRead /> : null}
                {(this.state.showSearchResult) ? <NoteSearchResult /> : null}


            </div>
        )
    }
}
