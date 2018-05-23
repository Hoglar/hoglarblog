"use strict";
import React from 'react';

// When the dictionary is first rendered the main will only
// hold the word Dictionary.
// Dictionary main is the section under the search function.



// DictionaryMain takes one propt from Dictionary,
// it takes the showMain attribute wich is based on the state.showMain
// if this is empty we will only show dictionaryMainEmpty


// Main should get data from dictionary, this data should come from database.
    // Maybe in three parts. 1. The description 2. the example 3. the reference

// Main gets searchData from dictionary after a search is done.
export default class DictionaryMain extends React.Component {
    render() {
        return (
            <div className="dictionaryMain">
                    <div className="dictionaryMainEmpty">
                        <p>Dictionary</p>
                        <p>{this.props.statusMessage}</p>
                    </div>
            </div>
        )
    }
}
