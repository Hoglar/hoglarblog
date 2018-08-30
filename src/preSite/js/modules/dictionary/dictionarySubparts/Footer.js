'use strict';
import React from "react";

// Footer now has two Props
    // 1: showCreateForm which is a function that shows the create form.
    // 2: topic which is false by default, otherwise it is a string with the name of the selected topic.

export default class DictionaryFooter extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            inCreatorMode: false,
        }
    }

    handleShowCreateForm() {
        (this.state.inCreatorMode) ? this.setState({inCreatorMode: false}) : this.setState({inCreatorMode: true});
        this.props.showCreateForm();
    }

    render() {
        return (
            <div className="dictionaryFooter">

                {this.props.topic ? (
                    <button
                        className="dictionaryFooterCreateButton"
                        onClick={this.handleShowCreateForm.bind(this)}>
                        {(this.state.inCreatorMode) ? "Return to search?" : "Add to " + this.props.topic + " dictionary?"}
                    </button>
                ) : null}
            </div>
        )
    }
}
