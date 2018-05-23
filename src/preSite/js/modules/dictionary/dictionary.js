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
            statusMessage: "",
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
        // need to post data to server.
        const url = "/api/dictionary/create";
        let data = createData;



        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then((response) => {
            // On success we cast a function that creates a success page
            if (response.successMessage) {
                this.setState({createData: false, statusMessage: "Succesfully saved to database!"});
                console.log(response.successMessage);
            }
            else {
                this.setState({createData: false, statusMessage: "Failed to save to database!"});
                console.log(response.failMessage);
            }
            // On fail, we create fail page?



        });
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

                {(this.state.dictionaryTopic && (!this.state.createData)) ? <DictionarySearch topicSearch={this.handleTopicSearch.bind(this)} selectedTopic={this.state.dictionaryTopic}/> : null}

                {this.state.createData ?
                    <DictionaryCreate topic={this.state.dictionaryTopic} handleSubmit={this.handleCreateSubmit.bind(this)} />
                    :
                    <DictionaryMain searchData={this.state.searchData} statusMessage={this.state.statusMessage}/>}

                <DictionaryFooter showCreateForm={this.showCreateForm.bind(this)} topic={this.state.dictionaryTopic}/>

            </div>
        )
    }
}
