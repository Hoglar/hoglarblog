'use strict';
import React from "react";

export default class DictionaryFooter extends React.Component {
    render() {
        return (
            <div className="dictionaryFooter">
                <button
                    className="dictionaryFooterCreateButton"
                    onClick={this.props.showCreateForm}>
                    Add to dictionary?
                </button>

            </div>
        )
    }
}
