'use strict';
import React from 'react';

import Topic from './Topic.js';
import capitalizeFirstLetter from '../../functionality/capitalizeFirstLetter.js';
import topicSearch from './onTopicSearch.js';
export default class hideTopicChooser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showTopicChooser: false,
            topicButtonToInputField: false,
            topics: ["waitingServer"],
            showAddTopic: false,
        };
    }

    hideTopicChooser() {
        this.setState({showTopicChooser: false, topicButtonToInputField: false, showAddTopic: false, topics: ["waitingServer"]});
    }


    showTopicChooser() {
        this.setState({topicButtonToInputField: true});

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

    selectTopic(topic) {
        // this is where we return a selected topic!
        this.props.topicSelected(topic);
    }

    onTopicSearch(event) {
        event.preventDefault();
        if(event.target.value.length > 0) {
            topicSearch(event)
            .then(
                (response) => {
                    this.setState({topics: response.topics.sort(), showAddTopic: false})
                },
                (error) => {
                    this.setState({topics: [], showAddTopic: true});
                }
            )
        }
        else {
            this.setState({topics: ["waitingServer"], topicButtonToInputField: false}, () => {
                this.showTopicChooser()
            })
        }

    }

    createNewTopic(event) {
        event.preventDefault();
        this.props.createTopic(this.refs.newTopic.value);
        this.setState({topics: [], showAddTopic: false});

    }

    render() {
        return(
            <div className="topicChooser"
                 onMouseLeave={this.hideTopicChooser.bind(this)}>

                 {(this.state.topicButtonToInputField) ?

                     <input className="topicChooserSearchField"
                            placeholder="Search:"
                            ref="newTopic"
                            onChange={this.onTopicSearch.bind(this)}>
                     </input>

                     :

                     <button className="topicButton"
                             onClick={this.showTopicChooser.bind(this)}>

                         {capitalizeFirstLetter(this.props.activeTopic)}
                     </button>}

                     {(this.state.showAddTopic) ?
                         <button className="topicAdd"
                                 onClick={this.createNewTopic.bind(this)}>Add Topic</button>
                     : null}


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
                    </ul>) :
                null}
            </div>
        )
    }

}
