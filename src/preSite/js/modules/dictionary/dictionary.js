'use strict';

import React from 'react';
import DictionaryMain from "./dictionarySubparts/main.js";

//Dictionary contains user created explanations of different terms within specific topics.
//The topics must be kinda static but some choice can be made.
// Topics is like HTML, CSS, Javascript
// Maybe i should have under topics.

// Dictionary takes info from database, for now an array of objects that i create in app.js.
// we call it dictionaryData in file and in this.

const dictionaryData = [
    {
        topic: "HTML",
    },
    {
        topic: "CSS",
    },
    {
        topic: "Javascript",
    },
    {
        topic: "MongoDb",
    },
    {
        topic: "Math",
    }
]

// Takes props from Dictionary
// Dictionary sends its showSearch state to the variable selectedTopic.
// Dictionary also gets its className from parent, its dictionaryTopic if not selectedTopic
// Dictionary gets dictionaryTopicSelected passed to it, this contains the showSearch state of Dictionary component,
// The showSearch will have the name of the selectedTopic.
class DictionaryTopic extends React.Component {
    // classNameSelector returns either


    topicSelector() {
        this.props.topicSelector(this.props.topicData.topic);
    }

    render() {
            return (
                <label htmlFor="dictionarySearchField" className={this.props.dictionaryTopicSelected ? "dictionaryTopicSelected" : "dictionaryTopic"} onClick={this.topicSelector.bind(this)}>
                        {this.props.topicData.topic}
                </label>
        )
    }
}

class DictionarySearch extends React.Component {

    render() {
        return (
            <form className="dictionarySearch">
                <div className="dictionarySearchSelectedTopic">
                    {this.props.selectedTopic}
                </div>
                <input id="dictionarySearchField" className="dictionarySearchField" type="text" name="name"/>

                <button className="dictionarySearchButton">
                    Search
                </button>
            </form>
        )
    }
}

class DictionaryFooter extends React.Component {
    render() {
        return (
            <div className="dictionaryFooter">

            </div>
        )
    }
}

export default class Dictionary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMain: "empty",
            showFooter: false,
            showSearch: false,
        }
    }

    //showSearch needs to take the name of the pressed topic as a parameter.
    showSearch(topic) {
        console.log(topic);
        this.setState({showSearch: topic});
    }


    render() {
        return (
            <div className="dictionaryWrapper">
                <div className="dictionaryTopics">
                    {dictionaryData.map((data) => {
                        return (
                            <DictionaryTopic dictionaryTopicSelected={(this.state.showSearch === data.topic) ? true : false} topicData={data} topicSelector={this.showSearch.bind(this)}/>
                        )
                    })}
                </div>
                {this.state.showSearch ? <DictionarySearch selectedTopic={this.state.showSearch}/> : null}
                <DictionaryMain showMain={this.state.showMain}/>
                {this.state.showFooter ? <DictionaryFooter /> : null}

            </div>
        )
    }
}
