"use strict";
// This component contains the edit feautures of the dictionary documents.
// We need the ability to delete and edit pur documents.
// The component is used in the finalResult component( Should be called finalDocument? )
import React from "react";

export default class EditDocument extends React.Component {


    render() {
        return (
            <div className="dictionaryEditDocument">
                <button>Delete</button>
            </div>
        )
    }
}
