'use strict';
import React from 'react';
import capitalizeFirstLetter from '../../../functionality/capitalizeFirstLetter.js';

export default class DictionarySearchResults extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchResults: [],
        }

    }
    // This component needs the temorarly seatch results that gets updated every key stroke.
    // props will get searchData
    // gets handleSearchResult function which need a document.

    handleResultClick(event, searchResult) {
        event.preventDefault();

        this.props.handleFinalResult(searchResult);
    }


    componentDidUpdate(prevProps) {
        if(prevProps.searchData === this.props.searchData) {
            return;
        }
        // her kan vi gjøre api call.
        const url = "/api/dictionary/search?searchData=";
        let searchData = this.props.searchData;
        let topic = this.props.topic;
        let result = [];

        if (searchData.length > 0) {

            fetch(url + searchData + "&topic=" + topic)
                .then((response) => {
                    return response.json();
                })
                .then((searchResult) => {
                    // I do this to check if i have a kinda valid array.

                    if(searchResult.searchMessage) {

                        this.setState({searchResults: [] });
                    }
                    else {
                        this.setState({searchResults: searchResult});
                    }
                });
        }
    }

    render() {
        return(
                (this.state.searchResults.length > 0) ?
                <div className="dictionarySearchResults">
                    {this.state.searchResults.map((searchResult) => {
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
                </div> :
                <div className="dictionarySearchResults">

                </div>
        )
    }
}
