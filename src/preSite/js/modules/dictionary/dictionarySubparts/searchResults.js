'use strict';
import React from 'react';

export default class DictionarySearchResults extends React.Component {
    // This component needs the temorarly seatch results that gets updated every key stroke.
    // props will get searchData

    componentDidUpdate() {

        // her kan vi gjøre api call.
        const url = "/api/dictionary/search?searchData=";
        let searchData = this.props.searchData;
        let topic = this.props.topic;

        if (searchData.length > 0) {

            fetch(url + searchData + "&topic=" + topic)
                .then(function(response) {
                    return response.json();
                })
                .then(function(myJson) {
                    console.log(myJson);
                });
        }
    }


    render() {
        return(
            <div className="dictionarySearchResults">

            </div>
        )
    }
}
