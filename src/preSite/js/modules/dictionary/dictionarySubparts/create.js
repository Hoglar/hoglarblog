'use strict';
import React from 'react';


export default class DictionaryCreate extends React.Component {

    handleSubmit(event) {
        event.preventDefault();

        //handleCreateSubmit(topic, title, explanation, example, reference)

        let createData = {
            topic: this.refs.topic.value,
            title: this.refs.title.value,
            explanation: this.refs.explanation.value,
            example: this.refs.example.value,
            reference: this.refs.reference.value
        }

        this.props.handleSubmit(createData);
    }

    render() {
        return (
            <div className="dictionaryCreate">
                <form className="dictionaryCreateForm">
                    {(!this.props.topic) ? <p>Select topic from above!</p> : null}

                    <div className="dictionaryCreateFormTop">

                        <input ref="topic" type="text" value={this.props.topic} hidden></input>

                        <label for="dictionaryCreateTitle">Title</label>
                        <input id="dictionaryCreateTitle" ref="title" type="text"></input>
                    </div>


                    <label for="dictionaryCreateExplanation">Explanation</label>
                    <input id="dictionaryCreateExplanation" ref="explanation" type="textarea"></input>

                    <label for="dictionaryCreateExample">Example</label>
                    <input id="dictionaryCreateExample" ref="example" type="textarea"></input>

                    <label for="dictionaryCreateReference">Reference</label>
                    <input id="dictionaryCreateReference" ref="reference" type="textarea"></input>

                    <button type="submit" onClick={this.handleSubmit.bind(this)}>Save to dictionary</button>
                </form>
            </div>
        )
    }
}
