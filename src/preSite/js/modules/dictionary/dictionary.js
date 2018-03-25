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

class DictionarySearch extends React.Component {
    render() {
        return (
            <form className="dictionarySearch">
                <label>
                    name:
                    <input id="dictionarySearchField" className="dictionarySearchField" type="text" name="name"/>
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
            showSearch: "CSS",
        }
    }


    render() {
        return (
            <div className="dictionaryWrapper">
                <div className="dictionaryTopics">
                    {dictionaryData.map(function(data) {
                        return (
                            <label for="dictionarySearchField" className="dictionaryTopic">
                                {data.topic}
                            </label>
                        )
                    })}
                </div>
                {this.state.showSearch ? <DictionarySearch /> : null}
                {this.state.showMain ? <DictionaryMain /> : null}
                {this.state.showFooter ? <DictionaryFooter /> : null}

            </div>
        )
    }
}
