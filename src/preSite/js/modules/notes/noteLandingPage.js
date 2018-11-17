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
            showTopicError: false,
            showTopic: true,
            showSearchField: true,
            showCreateTopic: false,
            searchFormValue: "",
            searchResults: []
        }
    }

    showTopicChooser() {

        this.props.topicSelectorClicked()
        .then((response) => {
            this.setState({showTopicChooser: true, showTopicError: false})
        })

    }

    hideTopicChooser() {
        this.setState({showTopicChooser: false});
    }


    createButtonClicked() {
        if(this.props.activeTopic === "Select topic") {
            this.setState({showTopicError: true});

        }
        else {
            this.props.showCreate()
        }
    }

    handleSearchFieldChange(event) {
        event.preventDefault();
        if(this.props.activeTopic === "Select topic") {
            this.setState({showTopicError: true});

        }
        else {
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
                <div className="noteLandingHeaderStyle"></div>
                <div className="noteLandingPageLogo">
                    Notes
                </div>

                {(this.props.loggedInUser === "guest") ?
                null :
                (<div className="noteLandingPageCreate">
                    <button className="noteLandingPageButton"
                            onClick={this.createButtonClicked.bind(this)}>
                        Create
                    </button>
                </div>)}

                {(this.state.showTopicError) ? (
                    <div className="noteLandingPageTopicError">
                        You must choose a topic!
                    </div>
                ) : null}

                {(this.state.showTopic) ? (
                    <div className="noteLandingPageTopic">
                        <button className="noteLandingPageButton"
                                onMouseOver={this.showTopicChooser.bind(this)}
                                onMouseLeave={this.hideTopicChooser.bind(this)}>

                            {capitalizeFirstLetter(this.props.activeTopic)}
                        </button>

                        {(this.state.showTopicChooser) ?
                            (<div className="noteLandingPageTopicChooser"
                                  onMouseLeave={this.hideTopicChooser.bind(this)}>
                                {this.props.topics.map(function(topic, index) {
                                    return (
                                        <Topic topic={topic}
                                               topicSelected={this.props.topicSelected}
                                               showTopicChooser={this.showTopicChooser.bind(this)}
                                               hideTopicChooser={this.hideTopicChooser.bind(this)}
                                               key={index}
                                        />
                                    )
                                }.bind(this))}

                                {(this.props.loggedInUser === "guest") ?
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

                {(this.state.showSearchField) ? (
                    <form className="noteLandingPageSearch">
                        <input  className="noteLandingPageSearchField"
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

            </div>
        )
    }
}
