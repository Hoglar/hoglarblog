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
            <div className="dictionarySearchResults">
                {this.props.searchResults.map((searchResult) => {
                    return (
                        <div className="dictionarySearchSingleResult" onClick={(event) => {this.handleResultClick(event, searchResult)}}>
                            <header className="dictionarySearchSingleResultTop">
                                <h2>{capitalizeFirstLetter(searchResult.title)}</h2>
                            </header>

                            <footer className="dictionarySearchSingleResultFooter">
                                <p>{"By: " + (searchResult.author ? capitalizeFirstLetter(searchResult.author) : "anon")}</p>
                            </footer>
                        </div>
                    )
                })}
            </div>
        )
    }
}
