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
        this.handleSubmit = this.handleSubmit.bind(this);
    }

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
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.topicSearch(this.state.searchFormValue);
    }

    render() {
        return (
            <form className="dictionarySearch">
                <label for="dictionarySearchField" className="dictionarySearchSelectedTopic">
                    {this.props.selectedTopic}
                </label>
                <input
                    id="dictionarySearchField"
                    className="dictionarySearchField"
                    type="text" name="name"
                    value={this.state.value}
                    onChange={this.handleChange}
                    />

                <button className="dictionarySearchButton" onClick={this.handleSubmit}>
                    Search
                </button>
            </form>
        )
    }
}
