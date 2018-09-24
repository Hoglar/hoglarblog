'use strict';
import React from 'react';

import capitalizeFirstLetter from '../../functionality/capitalizeFirstLetter.js';

export default class Topic extends React.Component {

    constructor(props) {
        super(props);
    }

    selectTopic() {
        this.props.topicSelected(this.props.topic);
        this.props.showTopicChooser();
    }


    render() {
        return (

            <div className="noteLandingPageSingleTopic"
                 onClick={this.selectTopic.bind(this)}
                 key={this.props.key}>
                {capitalizeFirstLetter(this.props.topic)}
            </div>

        )
    }
}
