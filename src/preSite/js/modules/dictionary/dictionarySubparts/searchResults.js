'use strict';
import React from 'react';

export default class DictionarySearchResults extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchResults: [],
        }
    }
    // This component needs the temorarly seatch results that gets updated every key stroke.
    // props will get searchData

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
                        console.log(searchResult.searchMessage);
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
            <div className="dictionarySearchResults">
                {(this.state.searchResults.length > 0) ? <div>Hello</div> : <div>Noo!</div>}


            </div>
        )
    }
}
