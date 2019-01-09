'use strict';
import React from 'react';

import Topic from './Topic.js';
import capitalizeFirstLetter from '../../functionality/capitalizeFirstLetter.js';

export default class hideTopicChooser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showTopicChooser: false,
            topics: ["waitingServer"],
        };
    }

    hideTopicChooser() {
        this.setState({showTopicChooser: false});
    }


    showTopicChooser() {

        if(this.state.showTopicChooser === false) {
            if(this.state.topics[0] === "waitingServer") {
                fetch("/api/notes/topics")
                    .then((response) => {
                        return response.json();
                    })
                    .then((response) => {
                        this.setState({topics: response.topics.sort()})
                    })
                    .then(() => {
                    this.setState({showTopicChooser: true})
                    })
            } else {
                this.setState({showTopicChooser: true})
            }
        }
        else {
            this.hideTopicChooser();
        }
    }

    selectTopic(topic) {
        // this is where we return a selected topic!
        this.props.topicSelected(topic);
    }



    render() {
        return(
            <div className="topicChooser"
                 onMouseLeave={this.hideTopicChooser.bind(this)}>
                <button className="topicButton"
                        onClick={this.showTopicChooser.bind(this)}>

                    {capitalizeFirstLetter(this.props.activeTopic)}
                </button>

                {(this.state.showTopicChooser) ?
                    (<ul className="topicChooserDropdown">
                        {this.state.topics.map(function(topic, index) {
                            return (
                                <Topic topic={topic}
                                       topicSelected={this.selectTopic.bind(this)}
                                       hideTopicChooser={this.hideTopicChooser.bind(this)}
                                       key={index}/>
                            )
                        }.bind(this))}

                        {(this.props.loggedInUser === "hoglar" && this.props.inNotes === true) ?
                        (
                            <li className="topicChooserSingleTopic"
                                 onClick={this.props.newTopic.bind(this)}>
                                Add topic
                            </li>
                        ) :
                        null}
                    </ul>) :
                null}
            </div>
        )
    }

}
