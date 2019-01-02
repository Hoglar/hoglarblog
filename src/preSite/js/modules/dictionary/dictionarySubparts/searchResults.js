'use strict';
import React from 'react';
import capitalizeFirstLetter from '../../../functionality/capitalizeFirstLetter.js';

export default class DictionarySearchResults extends React.Component {

    constructor(props) {
        super(props);
        
    }
    // This component needs the temorarly seatch results that gets updated every key stroke.
    // props will get searchData
    // gets handleSearchResult function which need a document.

    handleResultClick(event, searchResult) {
        event.preventDefault();
        this.props.handleFinalResult(searchResult);
    }


    render() {
        return(
                (this.props.searchResults.length > 0) ?
                <div className="dictionarySearchResults">
                    {this.props.searchResults.map((searchResult) => {
                        return (
                            <div className="dictionarySearchSingleResult" onClick={(event) => {this.handleResultClick(event, searchResult)}}>
                                <div className="dictionarySearchSingleResultTop">
                                    <h1>{searchResult.title}</h1>

                                </div>
                                <div className="dictionarySearchSingleResultMain">
                                    <p>{searchResult.explanation.substring(0, 80)}...</p>
                                </div>
                                <div className="dictionarySearchSingleResultFooter">
                                    <p>{"By: " + (searchResult.author ? capitalizeFirstLetter(searchResult.author) : "anon")}</p>
                                    <p>{"-" + searchResult.date.substring(0, 10)}</p>
                                </div>
                            </div>
                        )
                    })}
                </div> : null
        )
    }
}
