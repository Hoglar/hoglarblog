"use strict";
import React from 'react';

// When the dictionary is first rendered the main will only
// hold the word Dictionary.
// Dictionary main is the section under the search function.



// DictionaryMain takes one propt from Dictionary,
// it takes the showMain attribute wich is based on the state.showMain
// if this is empty we will only show dictionaryMainEmpty

export default class DictionaryMain extends React.Component {
    render() {
        return (
            <div className="dictionaryMain">
                { (this.props.showMain === "empty") ? (
                    <div className="dictionaryMainEmpty">
                        <p>Dictionary</p>
                    </div>
                ) : null
                }

            </div>
        )
    }
}
