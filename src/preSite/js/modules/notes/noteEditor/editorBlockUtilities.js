'use strict';

import React from 'react';
import {Editor, EditorState} from 'draft-js';

export default class EditorBlockUtilities extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const editorState = this.props.editorState;
        const selection = editorState.getSelection();
        const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
        return (
            <div className="editorUtilities">
                {BLOCK_TYPES.map((type, index) =>
                    <BlockUtilitiesButton
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



class BlockUtilitiesButton extends React.Component {
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

const BLOCK_TYPES = [
    {label: 'H1', style: 'header-one'},
    {label: 'H2', style: 'header-two'},
    {label: 'H3', style: 'header-three'},
    {label: 'Blockquote', style: 'blockquote'},
    {label: 'UL', style: 'unordered-list-item'},
    {label: 'Code Block', style: 'code-block'},
  ];
