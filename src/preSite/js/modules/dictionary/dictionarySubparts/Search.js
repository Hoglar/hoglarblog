'use strict';
import React from "react";


// This component search database for documents in dictionary and returns array of results.



export default class DictionarySearch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchFormValue: "",
            searchResult: []
        };

        this.handleChange = this.handleChange.bind(this);
    }

    // Just for selection.

    // Searches dictionary and returns documents.
    searchDictionary() {
        const url = "/api/dictionary/search?searchData=";
        let searchData = this.state.searchFormValue;
        let topic = this.props.activeTopic;
        let result = [];

        if (searchData.length > 0) {

            fetch(url + searchData + "&topic=" + topic)
                .then((response) => {
                    return response.json();
                })
                .then((searchResult) => {
                    // I do this to check if i have a kinda valid array.
                    if(searchResult.searchMessage === "Nothing found") {

                        this.giveSearchResultsToDictionary([])
                    }
                    else {
                        console.log("success");
                        // We may not need this state, we can just put result into an callback
                        this.giveSearchResultsToDictionary(searchResult);
                    }
                });
        }
    }

    handleChange(event) {

        this.setState({searchFormValue: event.target.value}, () => {
            this.searchDictionary();
        });

    }


    render() {
        return (
            <form className="dictionarySearch">
                <input
                    className="dictionarySearchField"
                    placeholder="Search:"
                    type="text" name="name"
                    autoComplete="off"
                    value={this.state.value}
                    onChange={this.handleChange}
                    />
            </form>
        )
    }
}
