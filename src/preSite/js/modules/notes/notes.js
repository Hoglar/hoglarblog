'use strict';
import React from 'react';

// notes.js is the main component for the note section. It should be home for many
// components.

// Lets start by creating some notes, we need a noteCreate.js component.

export default class Notes extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="notesSkeleton">
                // Header kan jeg ha title og author, date kanskje
                <div className="notesHeader"></div>
                // Selve teksten, notatene.
                <div className="notesMain"></div>
                // Mulighet for comments, edit, delete,
                <div className="notesFooter"></div>

                <div className="notesRightSection"></div>
            </div>
        )
    }
}
