'use strict';
import React from 'react';
import capitalizeFirstLetter from '../../functionality/capitalizeFirstLetter.js';

// Dett er neste nå !

export default class NoteRead extends React.Component {

    constructor(props) {
        super(props);
    }

    // Note read needs data.
    // Gjøre note search først?


    render() {
        return (
            <div className="noteRead">
                <div className="noteReadTop">
                    <h1>{capitalizeFirstLetter(this.props.noteSearchSingleResult.title)}</h1>
                </div>
                <div className="noteReadMain">
                    <p>
                        {this.props.noteSearchSingleResult.note}
                    </p>
                </div>
                <div className="noteReadFooter"></div>
            </div>
        )
    }
}
