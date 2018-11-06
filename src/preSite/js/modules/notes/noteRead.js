'use strict';
import React from 'react';
import capitalizeFirstLetter from '../../functionality/capitalizeFirstLetter.js';

import NoteComments from './noteComments.js';

// Dett er neste nå !

export default class NoteRead extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showComments: false,
        }
    }

    // Note read needs data.
    // Gjøre note search først?

    commentButtonClicked() {
        if (this.state.showComments === false) {
            this.setState({showComments: true});
        }
        else {
            this.setState({showComments: false});
        }
    }



    render() {
        return (
            <div className="noteRead">
                <div className="noteReadTop">
                    <h1>{capitalizeFirstLetter(this.props.noteSearchSingleResult.title)}</h1>
                </div>
                <div className="noteReadMain">
                    <p>
                        {this.props.noteSearchSingleResult.note}
                    </p>
                </div>
                <div className="noteReadFooter">
                    <button id="noteReadFooterEditButton"
                            className="noteLandingPageButton">

                            Edit
                    </button>
                    <button id="noteReadFooterDeleteButton"
                            className="noteLandingPageButton">

                            Delete
                    </button>
                    <button id="noteReadFooterMarkButton"
                            className="noteLandingPageButton">

                            Bookmark
                    </button>
                    <button id="noteReadFooterCommentButton"
                            className="noteLandingPageButton"
                            onClick={this.commentButtonClicked.bind(this)}>

                            Comments
                    </button>
                </div>

                {(this.state.showComments) ?
                    <NoteComments noteSearchSingleResult={this.props.noteSearchSingleResult}
                                  updateSearchSingleResult={this.props.updateSearchSingleResult}/>
                : null}
            </div>
        )
    }
}
