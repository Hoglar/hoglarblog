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
]

class DictionaryMain extends React.Component {
    render() {
        return (
            <div className="dictionaryMain">

            </div>
        )
    }
}

export default class Dictionary extends React.Component {
    render() {
        return (
            <div className="dictionaryWrapper">
                <div className="dictionaryTopics">
                    {dictionaryData.map(function(data) {
                        return (
                            <h2 className="dictionaryTopic">
                                {data.topic}
                            </h2>
                        )
                    })}
                </div>
                <DictionaryMain />
                <div className="dictionaryFooter">

                </div>
            </div>
        )
    }
}
