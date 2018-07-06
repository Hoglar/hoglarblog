'use strict';
import React from 'react';

import DictionaryMain from "./dictionarySubparts/main.js";
import DictionaryFooter from "./dictionarySubparts/Footer.js";
import DictionaryTopic from "./dictionarySubparts/Topic.js";
import DictionarySearch from "./dictionarySubparts/Search.js";
import DictionaryCreate from "./dictionarySubparts/create.js";
import DictionarySearchResults from "./dictionarySubparts/searchResults.js";


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

            searchData: "", // Sendt to dictionaryMain
            dictionaryTopic: false,
            createData: false,
            statusMessage: "",
            displayMain: "main",
        }
    }

    //showSearch needs to take the name of the pressed topic as a parameter.
    //When showSearch state is changed, it will be trusly,and we show search form.

    showSearch(topic) {
        // Maybe i should clear search field to?
        this.setState({dictionaryTopic: topic});
    }


    // Here i can maybe connect to a database?
    handleTopicSearch(searchData) {
        // Must get data from database based on search

        this.setState({searchData: searchData, displayMain: "searchResults"});

    }

    showCreateForm() {

        (this.state.displayMain === "main") ?
        this.setState({displayMain: "createForm"}) :
        this.setState({displayMain: "main"})
    }


    // handleCreateSubmit just takes info from create to update state. Everything with creations happends in create.js
    handleCreateSubmit(success) {
        // need to post data to server.
        if(success) {
            this.setState({displayMain: "main", statusMessage: "Succesfully saved to database!"});
        }
        else {
            this.setState({displayMain: "main", statusMessage: "Failed to save to database!"});
        }
    }

    render() {
        return (
            <div className="dictionaryWrapper">
                <div className="dictionaryTopics">
                    {dictionaryData.map((data) => {
                        return (
                            <DictionaryTopic dictionaryTopicSelected={(this.state.dictionaryTopic === data.topic) ? true : false} topicData={data} topicSelector={this.showSearch.bind(this)}/>
                        )
                    })}
                </div>

                {(this.state.dictionaryTopic && (this.state.displayMain !== "createForm")) ? <DictionarySearch topicSearch={this.handleTopicSearch.bind(this)} selectedTopic={this.state.dictionaryTopic}/> : null}

                {(this.state.displayMain === "main") ?
                    <DictionaryMain statusMessage={this.state.statusMessage}/> :
                    null}

                {(this.state.displayMain === "createForm") ?
                    <DictionaryCreate topic={this.state.dictionaryTopic} handleCreateSubmit={this.handleCreateSubmit.bind(this)}/>
                    :
                    null}

                {(this.state.displayMain === "searchResults") ?
                    <DictionarySearchResults searchData={this.state.searchData} topic={this.state.dictionaryTopic}/> :
                    null}
                {(this.props.loggedInUser !== "guest") ?
                    <DictionaryFooter showCreateForm={this.showCreateForm.bind(this)} topic={this.state.dictionaryTopic}/> :
                    null }

            </div>
        )
    }
}
