'use strict';
import React from "react";

// Takes props from Dictionary
// Dictionary sends its showSearch state to the variable selectedTopic.
// Dictionary also gets its className from parent, its dictionaryTopic if not selectedTopic
// Dictionary gets dictionaryTopicSelected passed to it, this contains the showSearch state of Dictionary component,
// The showSearch will have the name of the selectedTopic.
export default class DictionaryTopic extends React.Component {
    // classNameSelector returns either


    topicSelector() {
        this.props.topicSelector(this.props.topicData.topic);
    }

    render() {
            return (
                <label htmlFor="dictionarySearchField" className={this.props.dictionaryTopicSelected ? "dictionaryTopicSelected" : "dictionaryTopic"} onClick={this.topicSelector.bind(this)}>
                        {this.props.topicData.topic}
                </label>
        )
    }
}
