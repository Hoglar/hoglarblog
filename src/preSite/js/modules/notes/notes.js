'use strict';
import React from 'react';

export default class Notes extends React.Component {

    render() {
        return (
            <div className="notesSkeleton">
                <div className="notesHeader"></div>
                <div className="notesMain"></div>
                <div className="notesFooter"></div>
            </div>
        )
    }
}
