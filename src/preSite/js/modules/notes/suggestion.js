'use strict';
import React from 'react';

import capitalizeFirstLetter from '../../functionality/capitalizeFirstLetter.js';


export default class Suggestion extends React.Component {

    constructor(props) {
        super(props);
    }

    // Vi trenger liste over search results.
    render() {
        return (
            <article className="noteSuggestionWrapper">
                <header className="noteSuggestionHeader">
                    <h3>
                        {capitalizeFirstLetter(this.props.suggestion.title)}
                    </h3>
                    <h3>{capitalizeFirstLetter(this.props.suggestion.topic)}</h3>
                </header>
                <article className="noteSuggestionArticle">
                    <p>{this.props.suggestion.note.substring(0,93) +"..."}</p>
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
