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

                </form>
            </div>
        )
    }
}
