'use strict';
import React from 'react';

import DictionaryMain from "./dictionarySubparts/main.js";
import DictionaryFooter from "./dictionarySubparts/Footer.js";
import DictionaryTopic from "./dictionarySubparts/Topic.js";
import DictionarySearch from "./dictionarySubparts/Search.js";
import DictionaryCreate from "./dictionarySubparts/create.js";


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
        }
    }

    //showSearch needs to take the name of the pressed topic as a parameter.
    //When showSearch state is changed, it will be trusly,and we show search form.

    showSearch(topic) {
        // Maybe i should clear search field to?
        console.log(topic);
        this.setState({dictionaryTopic: topic});
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
                // This needs some error handling i guess
                this.setState({searchData: data}); // Setting searchData to the returned object. This is sent to main!

            });
    }

    showCreateForm() {
        console.log("Pressed create!");

        (this.state.createData === false) ?
        this.setState({createData: true}) :
        this.setState({createData: false})
    }


    // This functions gets parameters from form in create.js, ugly?
    handleCreateSubmit(createData) {
        console.log(createData);


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

                {this.state.dictionaryTopic ? <DictionarySearch topicSearch={this.handleTopicSearch.bind(this)} selectedTopic={this.state.dictionaryTopic}/> : null}

                {this.state.createData ?
                    <DictionaryCreate topic={this.state.dictionaryTopic} handleSubmit={this.handleCreateSubmit.bind(this)} />
                    :
                    <DictionaryMain searchData={this.state.searchData}/>}

                <DictionaryFooter showCreateForm={this.showCreateForm.bind(this)}/>

            </div>
        )
    }
}
