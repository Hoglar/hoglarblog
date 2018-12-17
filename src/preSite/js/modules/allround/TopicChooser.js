'use strict';
import React from 'react';

// Propper design!
// this component does some things.

// It needs to send back topics when its updated.


export default class hideTopicChooser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showCreateTopic: false;
        };

    }

    hideTopicChooser() {
        this.setState({showTopicChooser: false});
    }



    render() {
        return(
            <div topicChooser
                 onMouseLeave={this.hideTopicChooser.bind(this)}>
                <button className="noteButton"
                        onMouseOver={this.showTopicChooser.bind(this)}>

                    {capitalizeFirstLetter(this.props.activeTopic)}
                </button>

                {(this.state.showTopicChooser) ?
                    (<ul className="noteHeaderTopicDropdown"
                          onMouseLeave={this.hideTopicChooser.bind(this)}>
                        {this.props.topics.map(function(topic, index) {
                            return (
                                <li className={this.props.dictionaryTopicSelected ? "dictionaryTopicSelected" : "dictionaryTopic"}
                                        onClick={this.topicSelector.bind(this)}
                                        key={index}>
                                        {this.props.topicData.topic}
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
