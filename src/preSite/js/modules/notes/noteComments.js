'use strict';

import React from 'react';

import fetchComments from './noteFunctions/fetchComments.js';
import localOrSessionToken from '../../functionality/localOrSession.js';
import capitalizeFirstLetter from '../../functionality/capitalizeFirstLetter.js';

// Todo:
    // We need to signal app.js that we are showing of comments. This will
    // appair on right side of page so collitions must be resolved.

    // orange colour in background? could be cool.

    // create field at bottom.
        // Reset comment component when comment is added.


export default class NoteComments extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            comments: this.props.noteSearchSingleResult.comments || []
        }

    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.noteSearchSingleResult.comments) {
            if(nextProps.noteSearchSingleResult.comments.length > prevState.comments.length){
                return { comments: nextProps.noteSearchSingleResult.comments};
            }
            else return null;
        }
            else return null;
    }

    submitComment(event) {
        event.preventDefault();
        console.log(this.refs.noteComment.value);

        // we need to update this note with document id.
        var token = localOrSessionToken();
        let data = {
            topic: this.props.noteSearchSingleResult.topic,
            document_id: this.props.noteSearchSingleResult._id,
            comment: {
                "text": this.refs.noteComment.value,
                "author": "",
                "date": new Date(),
            },
            auth: {
                "token": token
            }
        }

        const url = "/api/notes/updateComment";

        // We post in the query, and we get back new list of comments.
        // We are then updating state so we get instant post of comments.
        fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            console.log(response)
            if(response.successMessage) {
                fetchComments(data.topic, data.document_id)
                .then((result) => {
                    this.props.updateSearchSingleResult(result);
                    document.getElementById('noteCommentNewCommentInputField').value = "";
                })

            }
            else {
                console.log("Fail");
            }
        })
    }

    render() {
        return (
            <div className="noteComments">

                <div className="noteCommentsMain">
                    {(this.state.comments) ?
                        this.state.comments.map(function(comment, index) {
                            return(
                                <div className="noteCommentsSingleComment"
                                     key={index}>
                                        <p className="noteCommentSingleCommentAuthor">{capitalizeFirstLetter(comment.author)+": "}</p>
                                        <p className="noteCommentSingleCommentText">{capitalizeFirstLetter(comment.text)}</p>
                                        <p className="noteCommentSingleCommentDate">{comment.date.substring(0, 10)}</p>
                                </div>
                            )
                        })
                    : null}
                </div>


                <form className="noteCommentNewComment">
                    <textarea className="noteCommentNewCommentInputField"
                              id="noteCommentNewCommentInputField"
                              placeholder="Write your comment here:"
                              ref="noteComment">

                    </textarea>
                    <div className="noteCommentFooter">
                        <button className="noteLandingPageButton"
                                onClick={this.submitComment.bind(this)}>Post comment</button>
                    </div>
                </form>
            </div>
        )
    }
}
