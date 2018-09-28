'use strict';

import React from 'react';


// Todo:
    // We need to signal app.js that we are showing of comments. This will
    // appair on right side of page so collitions must be resolved.

    // orange colour in background? could be cool.

    // create field at bottom.
        // Reset comment component when comment is added.


export default class NoteComments extends React.Component {

    constructor(props) {
        super(props);

    }

    submitComment(event) {
        event.preventDefault();
        console.log(this.refs.noteComment.value);

        // we need to update this note with document id.

        let data = {
            topic: this.props.noteSearchSingleResult.topic,
            document_id: this.props.noteSearchSingleResult._id,
            comment: this.refs.noteComment.value
        }

        const url = "/api/notes/updateComment";

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
                console.log("Success");
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
                    {(this.props.noteSearchSingleResult.comments) ?
                        this.props.noteSearchSingleResult.comments.map(function(comment, index) {
                            return(
                                <div className="noteCommentsSingleComment"
                                     key={index}>
                                     <p>
                                         {comment}
                                     </p>
                                </div>
                            )
                        })
                    : null}
                </div>


                <form className="noteCommentNewComment">
                    <textarea className="noteCommentNewCommentInputField"
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
