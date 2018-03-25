'use strict';

import React from 'react';

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

class DictionaryTopic extends React.Component {

    topicSelector() {
        this.props.topicSelector(this.props.topicData.topic);
    }

    render() {
            return (
                <button className="dictionaryTopic" onClick={this.topicSelector.bind(this)}>
                    {this.props.topicData.topic}
                </button>
        )
    }
}


class DictionarySearch extends React.Component {
    render() {
        return (
            <form className="dictionarySearch">
                <label>
                    {this.props.selectedTopic}
                    <input className="dictionarySearchField" type="text" name="name"/>
                </label>
            </form>
        )
    }
}

class DictionaryMain extends React.Component {
    render() {
        return (
            <div className="dictionaryMain">

            </div>
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
            showMain: false,
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
                            <DictionaryTopic topicData={data} topicSelector={this.showSearch.bind(this)}/>
                        )
                    })}
                </div>
                {this.state.showSearch ? <DictionarySearch selectedTopic={this.state.showSearch}/> : null}
                {this.state.showMain ? <DictionaryMain /> : null}
                {this.state.showFooter ? <DictionaryFooter /> : null}

            </div>
        )
    }
}
