'use strict';

import React from 'react'
import ReactDOM from 'react-dom'
import {Editor, EditorState, EditorBlock} from 'draft-js'


export default class EditorLineNumber extends React.Component {
    render() {
        const { block, contentState } = this.props;
        const lineNumber = contentState.getBlockMap().toList().findIndex(item => item.key === block.key) + 1;

        return (
            <div className="editorLineNumber" data-line-number={lineNumber}>
                <div className="line-text">
                    <EditorBlock {...this.props} />
                </div>
            </div>
        )
    }
}
