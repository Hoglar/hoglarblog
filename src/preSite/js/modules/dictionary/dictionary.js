'use strict';
import React from 'react';

import DictionaryMain from "./dictionarySubparts/main.js";
import DictionaryFooter from "./dictionarySubparts/Footer.js";
import DictionaryTopic from "./dictionarySubparts/Topic.js";
import DictionarySearch from "./dictionarySubparts/Search.js";
import DictionaryCreate from "./dictionarySubparts/create.js";
import DictionarySearchResults from "./dictionarySubparts/searchResults.js";
import DictionaryFinalResult from "./dictionarySubparts/finalResult.js";
import TopicChooser from '../allround/TopicChooser.js';


//Dictionary contains user created explanations of different terms within specific topics.

// Props
// loggedInUser, state in application. should reflect the user.

export default class Dictionary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //Given to us by Search
            searchResults: [],

            showTopicChooser: false,
            createData: false,
            statusMessage: "",
            displayMain: "main",
            finalResult: false,
            inCreatorMode: false
        }
    }

    //showSearch needs to take the name of the pressed topic as a parameter.
    //When showSearch state is changed, it will be trusly,and we show search form.

    giveSearchResultsToDictionary(searchResults) {
        this.setState({searchResults: searchResults});
    }

    topicSelected(topic) {
        this.props.giveTopicToMainApp(topic);
    }

    handleFinalResult(finalResult) {

        this.setState({finalResult: finalResult, displayMain: "finalResult"});
        console.log(finalResult);
    }

    showCreateForm() {
        // Denne funksjonen er litt treg, burde fikse den da det ofte blir nødvendig med 2 klikk.
        (this.state.inCreatorMode) ? this.setState({inCreatorMode: false}) : this.setState({inCreatorMode: true});

        (this.state.displayMain !== "createForm") ?
        this.setState({displayMain: "createForm"}) :
        this.setState({displayMain: "main"})
    }


    // handleCreateSubmit just takes info from create to update state. Everything with creations happends in create.js
    handleCreateSubmit(success) {
        // need to post data to server.
        (this.state.inCreatorMode) ? this.setState({inCreatorMode: false}) : this.setState({inCreatorMode: true});
        if(success) {
            this.setState({displayMain: "main", statusMessage: "Succesfully saved to database!"});
        }
        else {
            this.setState({displayMain: "main", statusMessage: "Failed to save to database!"});
        }
    }

    handleDocumentDeletion(success) {
        if(success) {
            this.setState({displayMain: "main", statusMessage: "Succesfully deleted from database!"});
        }
        else {
            this.setState({displayMain: "main", statusMessage: "Failed to delete from database!"});
        }
    }



    render() {
        return (
            <section className="dictionaryWrapper">
                <header className="dictionaryHeader">
                    <div className="dictionaryHeaderStyleBox">
                        <h1>Dictionary</h1>
                    </div>
                </header>

                <nav className="dictionaryNav">
                    {this.props.isNotesActive ? null : (
                        <TopicChooser activeTopic={this.props.activeTopic}
                                      loggedInUser={this.props.loggedInUser}
                                      topicSelected={this.topicSelected.bind(this)}
                                      inNotes={false}/>
                    )}
                    {this.props.activeTopic !== "Select topic" ? (
                        <DictionarySearch activeTopic={this.props.activeTopic}
                                          giveSearchResultsToDictionary={this.giveSearchResultsToDictionary.bind(this)}/>
                    ) : null}
                </nav>
                <article className="dictionaryMainSection">

                </article>
                <footer>

                </footer>

                {(this.state.displayMain === "main") ?
                    <DictionaryMain statusMessage={this.state.statusMessage}/> :
                    null}

                {(this.state.displayMain === "createForm") ?
                    <DictionaryCreate topic={this.props.activeTopic} handleCreateSubmit={this.handleCreateSubmit.bind(this)}/>
                    :
                    null}

                {(this.state.displayMain === "searchResults") ?
                    <DictionarySearchResults    searchData={this.state.searchData}
                                                topic={this.state.activeTopic}
                                                handleFinalResult={this.handleFinalResult.bind(this)}/> :
                    null}

                {(this.state.displayMain === "finalResult") ?
                    <DictionaryFinalResult finalResult={this.state.finalResult}
                                           loggedInUser={this.props.loggedInUser}
                                           handleDocumentDeletion={this.handleDocumentDeletion.bind(this)} /> :
                    null}

                {(this.props.loggedInUser !== "guest") ?
                    <DictionaryFooter showCreateForm={this.showCreateForm.bind(this)}
                                      topic={this.props.activeTopic}
                                      inCreatorMode={this.state.inCreatorMode}/> :
                    null }

            </section>
        )
    }
}
