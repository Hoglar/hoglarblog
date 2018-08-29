"use strict";
// This component contains the edit feautures of the dictionary documents.
// We need the ability to delete and edit pur documents.
// The component is used in the finalResult component( Should be called finalDocument? )
import React from "react";
import localOrSessionToken from '../../../functionality/localOrSession.js';

export default class EditDocument extends React.Component {


    handleDeleteButton(e) {
        e.preventDefault()

        // need to fetch, but to an address.

        //Data the server needs
        let data = {
            title: this.props.title,
            topic: this.props.document.topic,
            auth: {
                "token": localOrSessionToken()
            }
        }

        //Fetch returns a promise
        fetch("/api/dictionary/delete", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        }).then(
            // Fullfilment
            function(response) {
                return response = response.json();
            },
            function( err ) {
                console.error("Something went wrong on server", err);
            }
        )
        .then(
            function(response) {
                console.log("succsess deletion", response)
            },
            function(err) {
                console.error("Error in converting response to json", err);
            }
        )
    }


    render() {
        return (
            <div className="dictionaryEditDocument">
                <button className="dictionaryDocumentDeleteButton"
                        onClick={this.handleDeleteButton.bind(this)}>Delete</button>
            </div>
        )
    }
}
