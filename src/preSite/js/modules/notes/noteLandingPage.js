'use strict';
import React from 'react';

import Topic from './topic.js';

import capitalizeFirstLetter from '../../functionality/capitalizeFirstLetter.js';
import createNewTopic from './noteFunctions/createNewTopic.js';
import fetchNotes from './noteFunctions/fetchNotes.js';

export default class NoteLandingPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showTopicChooser: false,
            showTopic: true,
            showSearchField: true,
            showCreateTopic: false,
            showCreateNoteTitle: false,
            searchFormValue: "",
            searchResults: []
        }
    }

    showTopicChooser() {

        if(this.state.showTopicChooser === false) {
            this.props.topicSelectorClicked()
            .then((response) => {
                this.setState({showTopicChooser: true})
            })
        }
        // topicSelectorClicked is asking database for topics,

    }

    hideTopicChooser() {
        this.setState({showTopicChooser: false});
    }


    createButtonClicked() {

        // This we must remove,

        // When create button is pressed we need to make the search bar title creation bar.

        // First set show search to false

        this.setState({showSearchField: false, showCreateNoteTitle: true});

            // then show createNoteTitle to true
        //this.props.showCreate()
    }

    handleSearchFieldChange(event) {
        event.preventDefault();

        this.setState({searchFormValue: event.target.value});
        // this.props.topicSearch(event.target.value);
        // We need to make a search for notes base on topic and search field value.

        // Har jeg topic her.


        // Do search then do function that shows searchForm
        if(event.target.value !== "") {
            fetchNotes(event.target.value, this.props.activeTopic)
            .then(
                (searchResult) => {
                    // Update notes.js with search results.

                    this.props.noteUpdateSearchResults(searchResult);
                },
                (error) => {
                    console.log(error);
                }
            )
        }
        else {
            this.props.hideSearchResult();
        }


    }


    noteNewTopic() {

        this.setState({
            showSearchField: false,
            showCreateTopic: true,
            showTopic: false,
            showTopicChooser: false
        }, () => {
            document.getElementById("noteLandingPageCreateTopicInput").select();
        })
    }

    createTopicSaveClicked(event) {
        event.preventDefault();
        let topic = this.refs.topicCreate.value;


        if (this.props.topics.includes(topic.toLowerCase())) {
            this.props.topicSelected(topic);
            this.setState({
                showCreateTopic: false,
                showTopicChooser: false,
                showTopic: true,
                showSearchField: true
            })
        }

        else {
            createNewTopic(topic)
            .then(
                (response) => {
                    this.props.topicSelected(response);
                    this.setState({
                        showCreateTopic: false,
                        showTopicChooser: false,
                        showTopic: true,
                        showSearchField: true
                    })
                },
                (error) => {
                    console.log(error);
                }
            )
        }
    }

    doNothing(event) {
        event.preventDefault();
    }


    render() {
        return (
            <div className="noteLandingPage">
                <div className="noteLandingPageLogo">
                    Notes
                </div>

                {(this.props.loggedInUser === "guest" || this.props.activeTopic === "Select topic") ?
                null :
                (<div className="noteLandingPageCreate">
                    <button className="noteLandingPageButton"
                            onClick={this.createButtonClicked.bind(this)}>
                        Create
                    </button>
                </div>)}

                {(this.state.showTopic) ? (
                    <div className="noteLandingPageTopic"
                         onMouseLeave={this.hideTopicChooser.bind(this)}>
                        <button className="noteLandingPageButton"
                                onMouseOver={this.showTopicChooser.bind(this)}>

                            {capitalizeFirstLetter(this.props.activeTopic)}
                        </button>

                        {(this.state.showTopicChooser) ?
                            (<div className="noteLandingPageTopicChooser"
                                  onMouseLeave={this.hideTopicChooser.bind(this)}>
                                {this.props.topics.map(function(topic, index) {
                                    return (
                                        <Topic topic={topic}
                                               topicSelected={this.props.topicSelected}
                                               hideTopicChooser={this.hideTopicChooser.bind(this)}
                                               key={index}
                                        />
                                    )
                                }.bind(this))}

                                {(this.props.loggedInUser !== "hoglar") ?
                                null : (
                                    <div className="noteLandingPageSingleTopic"
                                         onClick={this.noteNewTopic.bind(this)}>
                                        Add topic
                                    </div>
                                )}
                            </div>) :
                        null}
                    </div>
                ) : null}


                {(this.state.showCreateTopic) ? (
                    <form className="noteLandingPageCreateTopic">
                        <input id="noteLandingPageCreateTopicInput"
                               type="text"
                               placeholder="Topic name:"
                               autoComplete="off"
                               ref="topicCreate">
                        </input>
                        <button type="submit"
                                onClick={this.createTopicSaveClicked.bind(this)}>
                            Save
                        </button>
                    </form>
                ) : null}

                {(this.state.showSearchField && this.props.activeTopic !== "Select topic") ? (
                    <form className="noteLandingPageInputForm">
                        <input  className="noteLandingPageInputField"
                                type="text"
                                placeholder="Search:"
                                autoComplete="off"
                                onChange={this.handleSearchFieldChange.bind(this)}
                                onClick={this.handleSearchFieldChange.bind(this)}>
                        </input>
                        <button type="submit"
                                onClick={this.doNothing.bind(this)}
                                hidden></button>
                    </form>
                ) : null}

                {(this.state.showCreateNoteTitle) ? (
                    <form className="noteLandingPageInputForm">
                        <input className="noteLandingPageInputField"
                               ref="title"
                               type="text"
                               placeholder="Write note title here:">
                        </input>
                        <button id="noteLandingPageCreateTitleButton"
                                type="submit">
                            Save

                        </button>

                    </form>
                ): null}



            </div>
        )
    }
}
