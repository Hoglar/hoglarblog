'use strict';
import React from 'react';

import Topic from './topic.js';

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
                    <button>Create</button>
                </div>
                <div className="noteLandingPageTopic">
                    <button onClick={this.showTopicChooser.bind(this)}>
                        Topic
                    </button>
                </div>
                {(this.state.showTopicChooser) ?
                    (<div className="noteLandingPageTopicChooser">
                        {this.props.topics.map(function(topic, index) {
                            return (
                                <Topic topic={topic} />
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
