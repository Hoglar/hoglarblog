'use strict';
import React from 'react';

export default class Topic extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (

            <div className="noteLandingPageSingleTopic">
                {this.props.topic}
            </div>

        )
    }
}
