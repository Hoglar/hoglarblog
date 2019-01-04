'use strict';
import React from 'react';

import TopicChooser from '../allround/TopicChooser.js';

import createNewTopic from './noteFunctions/createNewTopic.js';
import fetchNotes from './noteFunctions/fetchNotes.js';
import createNote from './noteFunctions/createNote.js';
import capitalizeFirstLetter from '../../functionality/capitalizeFirstLetter.js';

export default class NoteHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputButton: "Create",
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

        this.topicState = {
            showSearchField: false,
            showCreateNoteTitle: false,
            showCreateTopic: true,
        }
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
                this.props.loadNote(insertedDocument, true);
                this.setState(this.searchState);
            }
        )
            // Function needs some data: this.state.titleInput and this.props.activeTopic

        // then!
        // Load just read with this note as base.
    }

    noteNewTopic() {
        this.setState(this.topicState, () => {
            document.getElementById("noteLandingPageCreateTopicInput").select();
        })
    }

    createTopicSaveClicked(event) {
        event.preventDefault();
        let topic = this.refs.topicCreate.value;

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

    doNothing(event) {
        event.preventDefault();
    }


    render() {
        return (
            <header className="noteHeader">
                <div className="noteHeaderLogo">
                    <h1>Notes</h1>
                </div>

                {(this.props.loggedInUser === "guest" || this.props.activeTopic === "Select topic") ?
                null :
                (<div className="noteHeaderInputChanger">
                    <button className="noteButton"
                            onClick={this.changeInputButtonClicked.bind(this)}>
                        {this.state.inputButton}
                    </button>
                </div>)}

                <nav className="noteHeaderNav">
                    <TopicChooser topicSelected={this.props.topicSelected}
                                  activeTopic={this.props.activeTopic}
                                  loggedInUser={this.props.loggedInUser}
                                  newTopic={this.noteNewTopic.bind(this)}
                                  inNotes={true}/>
                </nav>


                {/* create topic form */}

                {(this.state.showCreateTopic) ? (
                    <form className="noteHeaderInputForm">
                        <input id="noteLandingPageCreateTopicInput"
                               className="noteHeaderInputField"
                               type="text"
                               placeholder="Topic name:"
                               autoComplete="off"
                               ref="topicCreate">
                        </input>
                        <button className="noteHeaderInputButton"
                                type="submit"
                                onClick={this.createTopicSaveClicked.bind(this)}>
                            Save
                        </button>
                    </form>
                ) : null}

                {/* Search form */}

                {(this.state.showSearchField && this.props.activeTopic !== "Select topic") ? (
                    <form className="noteHeaderInputForm">
                        <input  className="noteHeaderInputField"
                                id="noteLandingPageInputSearch"
                                type="text"
                                placeholder="Search:"
                                autoComplete="off"
                                onChange={this.handleSearchFieldChange.bind(this)}
                                onClick={this.handleSearchFieldChange.bind(this)}>
                        </input>
                        <button type="submit"
                                onClick={this.doNothing.bind(this)}
                                hidden>
                        </button>
                    </form>
                ) : null}

                {/* Create note title */}

                {(this.state.showCreateNoteTitle) ? (
                    <form className="noteHeaderInputForm">
                        <input className="noteHeaderInputField"
                               id="noteLandingPageInputTitle"
                               type="text"
                               placeholder="Write note title here:"
                               autoComplete="off"
                               onChange={this.handleTitleInputFieldChange.bind(this)}>
                        </input>

                        {(!this.state.titleInput) ? null : (
                            <button className="noteHeaderInputButton"
                                    type="submit"
                                    onClick={this.handleSaveTitle.bind(this)}>
                                Save
                            </button>
                        )}
                    </form>
                ): null}

            </header>
        )
    }
}
