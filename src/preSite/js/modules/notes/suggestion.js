'use strict';
import React from 'react';

import capitalizeFirstLetter from '../../functionality/capitalizeFirstLetter.js';
import {Editor, convertFromRaw} from 'draft-js';



export default class Suggestion extends React.Component {

    constructor(props) {
        super(props);
    }

    noteSuggestionClicked() {
        // we give this document id to clicked function.
        this.props.noteSearchSingleResultClicked(this.props.suggestion, false);
    }

    // Vi trenger liste over search results.
    render() {
        let noteText = "Empty";
        if(this.props.suggestion.note !== "") {
            const note = convertFromRaw(JSON.parse(this.props.suggestion.note))
            noteText = note.getPlainText();
        }
        return (
            <article className="noteSuggestionWrapper"
                     onClick={this.noteSuggestionClicked.bind(this)}>
                <header className="noteSuggestionHeader">
                    <h3>
                        {capitalizeFirstLetter(this.props.suggestion.title)}
                    </h3>
                    <h3>{capitalizeFirstLetter(this.props.suggestion.topic)}</h3>
                </header>
                <article className="noteSuggestionArticle">
                     <p>{noteText.substring(0,93) +"..."}</p>
                </article>
                <footer className="noteSuggestionFooter">
                    <p><i>{capitalizeFirstLetter(this.props.suggestion.author)+"."}</i></p>
                    <time>{this.props.suggestion.date.substring(0, 10)}</time>
                </footer>
                <div className="noteSuggestionScore">
                    <p>{this.props.suggestion.score.timesRead + " "} <sup>👀</sup></p>
                    <p>{this.props.suggestion.score.likes + " "} 👍</p>
                    <p>👎 {" " + this.props.suggestion.score.dislikes}</p>

                </div>
            </article>
        )
    }
}
