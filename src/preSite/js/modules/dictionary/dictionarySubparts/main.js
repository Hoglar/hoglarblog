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

export default class DictionaryMain extends React.Component {
    render() {
        return (
            <div className="dictionaryMain">
                { (this.props.showMain === "empty") ? (
                    <div className="dictionaryMainEmpty">
                        <p>Dictionary</p>
                    </div>
                )
                : (
                    <div className="dictionaryMainContent">
                        <h2>Topic selected by algorithm</h2>
                        <div className="dictionaryMainExplanation">
                            <p>lorum ipsum max how long shosdasdasd asdasdasduld this be?</p>
                        </div>
                        <div className="dictionaryMainExample">
                            <p>This should kinda look good</p>
                        </div>
                        <div className="dictionaryMainReference">
                            <p>This is the easy part i guess</p>
                        </div>
                        <p>Author: Creation Date</p>
                    </div>
                )
                }

            </div>
        )
    }
}
