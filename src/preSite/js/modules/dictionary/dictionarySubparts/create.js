'use strict';
import React from 'react';

// Create needs some work on the text areas, i must make some limits on how to use them .

export default class DictionaryCreate extends React.Component {

    componentDidMount() {
        document.getElementById("dictionaryCreateTitle").select();
    }

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

        if (createData.topic === "false") {
            alert("Sorry for alert, but you must select topic!");
        }
        else {
            this.props.handleSubmit(createData);
        }
    }

    render() {
        return (
            <div className="dictionaryCreate">
                <form className="dictionaryCreateForm">

                    <div className="dictionaryCreateFormTop">
                        <input ref="topic" type="text" value={this.props.topic} hidden></input>

                        <input className="dictionaryCreateTitle" id="dictionaryCreateTitle" ref="title" type="text" placeholder="Title:"></input>
                    </div>

                    <div className="dictionaryCreateInputSection">
                        <textarea id="dictionaryCreateExplanation" ref="explanation" type="text" placeholder="Explanation:"/>

                        <textarea id="dictionaryCreateExample" ref="example" type="text" placeholder="Example:"/>

                        <textarea id="dictionaryCreateReference" ref="reference" type="text" placeholder="Reference:"/>
                        <button className="dictionaryCreateInputButton" type="submit" onClick={this.handleSubmit.bind(this)}>Save</button>
                    </div>
                    
                </form>
            </div>
        )
    }
}
