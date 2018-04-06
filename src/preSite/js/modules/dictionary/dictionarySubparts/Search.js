'use strict';
import React from "react";


export default class DictionarySearch extends React.Component {

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
