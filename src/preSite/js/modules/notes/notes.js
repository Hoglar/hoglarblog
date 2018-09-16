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
import getNoteTopics from './noteFunctions/getNoteTopics.js';

// Gets some props from app.js
    // gets logged in user.
    // can i get info whether dictionary is loaded or not?
export default class Notes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showCreate: false,
            showRead: false,
            showSearchResult: false
        }

        getNoteTopics()

    }




    render() {
        return (
            <div className="notesSkeleton">
                <NoteLandingPage />

                {(this.state.showCreate) ? <NoteCreate /> : null}
                {(this.state.showRead) ? <NoteRead /> : null}
                {(this.state.showSearchResult) ? <NoteSearchResult /> : null}


            </div>
        )
    }
}
