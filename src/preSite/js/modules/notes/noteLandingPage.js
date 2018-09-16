'use strict';
import React from 'react';

export default class NoteLandingPage extends React.Component {

    constructor(props) {
        super(props);
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
                    Topic
                </div>
                <div className="noteLandingPageSearch">
                    Search
                </div>
            </div>
        )
    }
}
