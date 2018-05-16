'use strict';
import React from 'react';


export default class DictionaryCreate extends React.Component {
    render() {
        return (
            <div className="dictionaryCreate">
                <form>
                    <label for="dictionaryCreateTopic">Topic</label>
                    <input id="dictionaryCreateTopic" type="text" value={(this.props.topic) ? this.props.topic : ""}></input>

                    <label for="dictionaryCreateTitle">Title</label>
                    <input id="dictionaryCreateTitle" type="text"></input>

                    <label for="dictionaryCreateExplanation">Explanation</label>
                    <input id="dictionaryCreateExplanation" type="textarea"></input>

                    <label for="dictionaryCreateExample">Example</label>
                    <input id="dictionaryCreateExample" type="textarea"></input>

                    <label for="dictionaryCreateReference">Reference</label>
                    <input id="dictionaryCreateReference" type="textarea"></input>

                    <input type="submit">Save to dictionary</input>

                </form>
            </div>
        )
    }
}
