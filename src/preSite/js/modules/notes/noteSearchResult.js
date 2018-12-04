'use strict';
import React from 'react';
import capitalizeFirstLetter from '../../functionality/capitalizeFirstLetter.js';

// Gets props
    // showSearchResult

export default class NoteSearchResult extends React.Component {

    constructor(props) {
        super(props);
    }


    // Vi trenger liste over search results.

    render() {
        return (
            <div className="noteSearchResult">
                <div className="noteSearchResultTop"></div>
                <div className="noteSearchResultMain">
                    {this.props.noteSearchResult.map(function(note, index) {
                        return (
                            <div className="noteSearchSingleResult"
                                 key={index}
                                 onClick={() => this.props.noteSearchSingleResultClicked(note, false)}>

                                 <header>
                                    <h2>{capitalizeFirstLetter(note.title)}</h2>
                                 </header>

                                 <footer>
                                     <p>{capitalizeFirstLetter(note.author)} {note.date.substring(0, 10)}</p>
                                 </footer>
                            </div>
                        )
                    }.bind(this))}
                </div>
            </div>
        )
    }
}
