'use strict';

import React from 'react';
import {Editor, EditorState} from 'draft-js';
import UtilitiesButton from './utilitiesButton.js'

export default class EditorStyleUtilities extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const currentStyle = this.props.editorState.getCurrentInlineStyle();
        return (
            <div>
                {INLINE_STYLES.map((type, index) =>
                    <UtilitiesButton
                        key={index}
                        active={currentStyle.has(type.style)}
                        label={type.label}
                        onToggle={this.props.onToggle}
                        style={type.style}
              />
                )}
            </div>
        )
    }
}


const INLINE_STYLES = [
    {label: 'Bold', style: 'BOLD'},
    {label: 'Italic', style: 'ITALIC'},
    {label: 'Underline', style: 'UNDERLINE'},
    {label: 'Monospace', style: 'CODE'}
];
