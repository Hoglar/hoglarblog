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
            document_id: this.props.document._id,
            topic: this.props.document.topic,
            auth: {
                "token": localOrSessionToken()
            }
        }


        deleteDocument(data)
            .then((response) => {
                console.log("response:", response)
                this.props.handleDocumentDeletion(response);
            })
            .catch((err) => {
                console.error(err);
            })
    }

    render() {
        return (
            <div className="dictionaryEditDocument">
                <button className="dictionaryFooterCreateButton"
                        onClick={this.handleDeleteButton.bind(this)}>Delete</button>
            </div>
        )
    }
}

const deleteDocument = function(data) {
    // the deleteDocument functions gets data from state and sends to server with fetch post call.
    // it returns a promise with the response object.
    return fetch("/api/dictionary/delete", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-type': 'application/json'
        })
    })
    .then((response) => { return response = response.json();})
}
