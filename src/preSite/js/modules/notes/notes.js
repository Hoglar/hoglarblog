'use strict';
import React from 'react';

// notes.js is the main component for the note section. It should be home for many
// components.

// Lets start by creating some notes, we need a noteCreate.js component.
import NoteCreate from './noteCreate.js';

export default class Notes extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="notesSkeleton">
                <NoteLandingPage />

                <NoteCreate />
            </div>
        )
    }
}
