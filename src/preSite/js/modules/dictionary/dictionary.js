'use strict';
import React from 'react';

import DictionaryMain from "./dictionarySubparts/main.js";
import DictionaryFooter from "./dictionarySubparts/Footer.js";
import DictionaryTopic from "./dictionarySubparts/Topic.js";
import DictionarySearch from "./dictionarySubparts/Search.js";


import dictionaryData from "./dictionarySubparts/div.js";
//Dictionary contains user created explanations of different terms within specific topics.
//The topics must be kinda static but some choice can be made.
// Topics is like HTML, CSS, Javascript
// Maybe i should have under topics.



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
    //When showSearch state is changed, it will be trusly,and we show search form.

    showSearch(topic) {
        // Maybe i should clear search field to?
        console.log(topic);
        this.setState({showSearch: topic});
    }


    // Here i can maybe connect to a database?
    handleTopicSearch(searchData) {
        console.log("Handling search from dictionary " + searchData);

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

                {this.state.showSearch ? <DictionarySearch topicSearch={this.handleTopicSearch} selectedTopic={this.state.showSearch}/> : null}
                <DictionaryMain showMain={this.state.showMain}/>
                {this.state.showFooter ? <DictionaryFooter /> : null}

            </div>
        )
    }
}
