'use strict';
import React from 'react';

import Topic from './topic.js';

import capitalizeFirstLetter from '../../functionality/capitalizeFirstLetter.js';
import createNewTopic from './noteFunctions/createNewTopic.js';
import fetchNotes from './noteFunctions/fetchNotes.js';
import createNote from './noteFunctions/createNote.js';

export default class NoteLandingPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputButton: "Create",
            showTopicChooser: false,
            showTopic: true,
            showSearchField: true,
            showCreateTopic: false,
            showCreateNoteTitle: false,
            searchFormValue: "",
            searchResults: [],
            titleInput: null
        }
        // SearchState is state where we can search for notes
        this.searchState = {
            showCreateNoteTitle: false,
            showSearchField: true,
            titleInput: null,
            inputButton: "Create"
            }
        // createState is state where i can type in titleinput.
        this.createState = {
            showSearchField: false,
            showCreateNoteTitle: true,
            inputButton: "Search"
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


    changeInputButtonClicked() {

        if (this.state.showSearchField) {
            this.setState(this.createState, () => {
                               document.getElementById("noteLandingPageInputTitle").select();
                           });
        }
        else {
            this.setState(this.searchState, () => {
                               document.getElementById("noteLandingPageInputSearch").select();
                           });
        }
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

    handleTitleInputFieldChange(event) {
        event.preventDefault();
        this.setState({titleInput: event.target.value}, () => {
            console.log(this.state.titleInput);
        });

    }

    handleSaveTitle(event) {
        event.preventDefault();
        // cast funcion to create note structure. Then load create page.

        createNote(this.props.activeTopic, this.state.titleInput)
        .then(
            (insertedDocument) => {
                // Vi får her tilbake ett nytt dokument, dette kan vi mate inn i read page.
                // Det blir neste, nå hente jentungen!
                this.props.loadNote(insertedDocument);
                this.setState(this.searchState);
            }
        )
            // Function needs some data: this.state.titleInput and this.props.activeTopic

        // then!
        // Load just read with this note as base.
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
                (<div className="noteLandingPageInputChanger">
                    <button className="noteLandingPageButton"
                            onClick={this.changeInputButtonClicked.bind(this)}>
                        {this.state.inputButton}
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
                                id="noteLandingPageInputSearch"
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
                               id="noteLandingPageInputTitle"
                               type="text"
                               placeholder="Write note title here:"
                               autocomplete="off"
                               onChange={this.handleTitleInputFieldChange.bind(this)}>
                        </input>

                        {(!this.state.titleInput) ? null : (
                            <button id="noteLandingPageCreateTitleButton"
                                    type="submit"
                                    onClick={this.handleSaveTitle.bind(this)}>
                                Save
                            </button>
                        )}

                    </form>
                ): null}

            </div>
        )
    }
}
