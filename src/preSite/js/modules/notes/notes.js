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
            // Prøver denne runden og putte alle subparts of notes in i skeleton.
            <div className="notesSkeleton">
                // Header kan jeg ha title og author, date kanskje

                <NoteCreate />
                // Mulighet for comments, edit, delete,
                
            </div>
        )
    }
}
