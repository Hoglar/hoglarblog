'use strict';
import React from "react";


// Passing on topicSearch(searchData)

export default class DictionarySearch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchFormValue: ""
        };

        this.handleChange = this.handleChange.bind(this);
    }

    // Just for selection.
    componentDidMount() {
        document.getElementById("dictionarySearchField").select();
    }

    componentDidUpdate(prevProps) {
        if(prevProps.selectedTopic !== this.props.selectedTopic) {
            document.getElementById("dictionarySearchField").select();
        }
    }

    handleChange(event) {
        this.setState({searchFormValue: event.target.value});
        this.props.topicSearch(event.target.value);
    }


    render() {
        return (
            <form className="dictionarySearch">
                <label htmlFor="dictionarySearchField" className="dictionarySearchSelectedTopic">
                    {this.props.selectedTopic}
                </label>
                <input
                    id="dictionarySearchField"
                    className="dictionarySearchField"
                    type="text" name="name"
                    autoComplete="off"
                    value={this.state.value}
                    onChange={this.handleChange}
                    />
            </form>
        )
    }
}
