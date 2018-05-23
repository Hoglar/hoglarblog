'use strict';
import React from "react";

// Footer now has two Props
    // 1: showCreateForm which is a function that shows the create form.
    // 2: topic which is false by default, otherwise it is a string with the name of the selected topic.

export default class DictionaryFooter extends React.Component {

    render() {
        return (
            <div className="dictionaryFooter">
                {this.props.topic ? (
                    <button
                        className="dictionaryFooterCreateButton"
                        onClick={this.props.showCreateForm}>
                        Add to {this.props.topic} dictionary?
                    </button>
                ) : null}


            </div>
        )
    }
}
