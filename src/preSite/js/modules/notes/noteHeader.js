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
        this.props.getSearchValue(event.target.value);
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
            this.props.listSuggestions();
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
    }



    createTopic(newTopic) {
        event.preventDefault();
        console.log(newTopic);
        let topic = newTopic;
        createNewTopic(topic)
        .then(
            (response) => {
                this.props.topicSelected(response);
            },
            (error) => {
                console.log(error);
            }
        )
    }

    noteLogoClicked() {
        // We make a function to function kinda like a back button.
        this.props.noteLogoClicked();

    }

    doNothing(event) {
        event.preventDefault();
    }


    render() {
        return (
            <header className="noteHeader">
                <div className="noteHeaderLogo"
                     onClick={this.noteLogoClicked.bind(this)}>
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
                                  createTopic={this.createTopic.bind(this)}
                                  inNotes={true}/>
                </nav>


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
