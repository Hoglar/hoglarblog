'use strict';
import React from 'react';

import DictionaryMain from "./dictionarySubparts/main.js";
import DictionaryFooter from "./dictionarySubparts/Footer.js";
import DictionaryTopic from "./dictionarySubparts/Topic.js";
import DictionarySearch from "./dictionarySubparts/Search.js";


import dictionaryData from "./dictionarySubparts/div.js";
//Dictionary contains user created explanations of different terms within specific topics.
//The topics must be kinda static but some choice can be made.
// Topics is like HTML, CSS, Javascript
// Maybe i should have under topics.

// Props
// loggedInUser, state in application. should reflect the user.

export default class Dictionary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchData: "",
            showFooter: false,
            showSearch: false,
        }
    }

    //showSearch needs to take the name of the pressed topic as a parameter.
    //When showSearch state is changed, it will be trusly,and we show search form.

    showSearch(topic) {
        // Maybe i should clear search field to?
        console.log(topic);
        this.setState({showSearch: topic});
    }


    // Here i can maybe connect to a database?
    handleTopicSearch(searchData) {
        console.log("Handling search from dictionary " + searchData);
        // Must get data from database based on search

        fetch("/api/dictionary/?search="+ searchData)
            .then(response => {
                return response.json()
            })
            .then(data => {
                this.setState({searchData: data});

            });

    }

    render() {
        return (
            <div className="dictionaryWrapper">
                <div className="dictionaryTopics">
                    {dictionaryData.map((data) => {
                        return (
                            <DictionaryTopic dictionaryTopicSelected={(this.state.showSearch === data.topic) ? true : false} topicData={data} topicSelector={this.showSearch.bind(this)}/>
                        )
                    })}
                </div>

                {this.state.showSearch ? <DictionarySearch topicSearch={this.handleTopicSearch.bind(this)} selectedTopic={this.state.showSearch}/> : null}

                <DictionaryMain searchData={this.state.searchData}/>
                {this.state.showFooter ? <DictionaryFooter /> : null}

            </div>
        )
    }
}
