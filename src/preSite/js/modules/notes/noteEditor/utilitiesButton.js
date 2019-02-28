'use strict';

import React from 'react';
import {Editor, EditorState} from 'draft-js';

export default class UtilitiesButton extends React.Component {
    constructor(props) {
        super(props);
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }
    render() {
        let className = 'editorUtilitiesButton';
        if (this.props.active) {
            className += ' editorUtilitiesActiveButton';
    }
        return (
            <button className={className} onMouseDown={this.onToggle}>
                {this.props.label}
            </button>
        );
    }
}
