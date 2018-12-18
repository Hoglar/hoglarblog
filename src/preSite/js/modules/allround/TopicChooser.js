'use strict';
import React from 'react';
import capitalizeFirstLetter from '../../functionality/capitalizeFirstLetter.js';
// Proper design!
// this component does some things.

// Inputs:
    // It needs active topic.
    // Maybe some kind of callback function

// do:
    // Show topic button,
    // show list of topics to choose from on mouseover

// Return:
    //It needs to send back topics when its updated.


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
        }
    }

    selectTopic() {
        //this.props.topicSelected(this.props.topic);
        this.hideTopicChooser();
    }



    render() {
        return(
            <div className="topicChooser"
                 onMouseLeave={this.hideTopicChooser.bind(this)}>
                <button className="noteButton"
                        onMouseOver={this.showTopicChooser.bind(this)}>

                    {capitalizeFirstLetter(this.props.activeTopic)}
                </button>

                {(this.state.showTopicChooser) ?
                    (<ul className="noteHeaderTopicDropdown"
                          onMouseLeave={this.hideTopicChooser.bind(this)}>
                        {this.state.topics.map(function(topic, index) {
                            return (
                                <li className="noteHeaderSingleTopic"
                                     onClick={this.selectTopic.bind(this)}
                                     key={index}>
                                    {capitalizeFirstLetter(topic)}
                                </li>
                            )
                        }.bind(this))}

                        {(this.props.loggedInUser !== "hoglar") ?
                        null : (
                            <li className="noteHeaderSingleTopic"
                                 onClick={this.noteNewTopic.bind(this)}>
                                Add topic
                            </li>
                        )}
                    </ul>) :
                null}
            </div>
        )
    }

}
