'use strict';
import React from 'react';

export default class DictionarySearchResults extends React.Component {
    // This component needs the temorarly seatch results that gets updated every key stroke.
    // props will get searchData

    componentDidUpdate() {
        console.log("The props have changed to " + this.props.searchData);

        // her kan vi gjøre api call.
        const url = "/api/dictionary/search?searchData=";
        let searchData = this.props.searchData;

        fetch(url + searchData)
            .then(function(response) {

            })
    }


    render() {
        return(
            <div className="dictionarySearchResults">

            </div>
        )
    }
}
