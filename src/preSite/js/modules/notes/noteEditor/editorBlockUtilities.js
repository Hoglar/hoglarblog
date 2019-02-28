'use strict';

import React from 'react';
import {Editor, EditorState} from 'draft-js';
import UtilitiesButton from './utilitiesButton.js'

export default class EditorBlockUtilities extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const editorState = this.props.editorState;
        const selection = editorState.getSelection();
        const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
        return (
            <div>
                {BLOCK_TYPES.map((type, index) =>
                    <UtilitiesButton
                        key={index}
                        active={type.style === blockType}
                        label={type.label}
                        onToggle={this.props.onToggle}
                        style={type.style}
              />
                )}
            </div>
        )
    }
}





const BLOCK_TYPES = [
    {label: 'H1', style: 'header-one'},
    {label: 'H2', style: 'header-two'},
    {label: 'H3', style: 'header-three'},
    {label: 'Blockquote', style: 'blockquote'},
    {label: 'UL', style: 'unordered-list-item'},
    {label: 'Code Block', style: 'code-block'},
  ];
