'use strict';
import React from 'react';

import Topic from './topic.js';

import capitalizeFirstLetter from '../../functionality/capitalizeFirstLetter.js';

export default class NoteLandingPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showTopicChooser: false,
        }
    }

    showTopicChooser() {

        if (this.state.showTopicChooser) {
            this.setState({showTopicChooser: false})
        }
        else {
            this.props.topicSelectorClicked()
            .then((response) => {
                this.setState({showTopicChooser: true})
            })
        }
    }




    render() {
        return (
            <div className="noteLandingPage">
                <div className="noteLandingHeaderStyle"></div>
                <div className="noteLandingPageLogo">
                    Notes
                </div>
                <div className="noteLandingPageCreate">
                    <button className="noteLandingPageButton">Create</button>
                </div>
                <div className="noteLandingPageTopic">
                    <button className="noteLandingPageButton" onClick={this.showTopicChooser.bind(this)}>
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
                    </div>) :
                null}

                <div className="noteLandingPageSearch">
                    Search
                </div>
            </div>
        )
    }
}