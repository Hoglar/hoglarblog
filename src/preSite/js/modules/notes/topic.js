'use strict';
import React from 'react';

import capitalizeFirstLetter from '../../functionality/capitalizeFirstLetter.js';

export default class Topic extends React.Component {

    constructor(props) {
        super(props);
    }

    selectTopic() {
        this.props.topicSelected(this.props.topic);
        this.props.hideTopicChooser();
    }


    render() {
        return (
            <li className="noteHeaderSingleTopic"
                 onClick={this.selectTopic.bind(this)}>
                {capitalizeFirstLetter(this.props.topic)}
            </li>

        )
    }
}
