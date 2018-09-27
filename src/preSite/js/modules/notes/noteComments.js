'use strict';

import React from 'react';


// Todo:
    // We need to signal app.js that we are showing of comments. This will
    // appair on right side of page so collitions must be resolved.

    // orange colour in background? could be cool.

    // create field at bottom.
        // Reset comment component when comment is added.


export default class NoteComments extends React.Component {


    render() {
        return (
            <div className="noteComments">


                <form className="noteCommentNewComment">
                    <textarea className="noteCommentNewCommentInputField">

                    </textarea>
                    <div className="noteCommentFooter"></div>
                </form>
            </div>
        )
    }
}
