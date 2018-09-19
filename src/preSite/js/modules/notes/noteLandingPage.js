'use strict';
import React from 'react';

import Topic from './topic.js';

import capitalizeFirstLetter from '../../functionality/capitalizeFirstLetter.js';

export default class NoteLandingPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showTopicChooser: false,
            showTopicError: false,

            searchFormValue: ""
        }
    }

    showTopicChooser() {

        if (this.state.showTopicChooser) {
            this.setState({showTopicChooser: false, showTopicError: false})
        }
        else {
            this.props.topicSelectorClicked()
            .then((response) => {
                this.setState({showTopicChooser: true})
            })
        }
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
        this.setState({searchFormValue: event.target.value});
        // this.props.topicSearch(event.target.value);
    }

    noteNewTopic() {
        console.log("Hei");
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

                {(this.state.showTopicError) ?
                    (<div className="noteLandingPageTopicError">
                        You must choose a topic!
                    </div>) :
                    null}

                <div className="noteLandingPageTopic">
                    <button className="noteLandingPageButton"
                            onClick={this.showTopicChooser.bind(this)}>
                        {capitalizeFirstLetter(this.props.activeTopic)}
                    </button>
                </div>

                {(this.state.showTopicChooser) ?
                    (<div className="noteLandingPageTopicChooser">
                        {this.props.topics.map(function(topic, index) {
                            return (
                                <Topic topic={topic}
                                       topicSelected={this.props.topicSelected}
                                       showTopicChooser={this.showTopicChooser.bind(this)}
                                />
                            )
                        }.bind(this))}
                        <div className="noteLandingPageSingleTopic"
                             onClick={this.noteNewTopic.bind(this)}>
                            Add topic
                        </div>
                    </div>) :
                null}
                

                <form className="noteLandingPageSearch">
                    <input  className="noteLandingPageSearchField"
                            type="text"
                            placeholder="Search:"
                            autocomplete="off"
                            onChange={this.handleSearchFieldChange.bind(this)}>
                    </input>
                </form>
            </div>
        )
    }
}
