'use strict';
import React from 'react';


export default class DictionaryCreate extends React.Component {
    render() {
        return (
            <div className="dictionaryCreate">
                <form>
                    <input type="text" placeholder={(this.props.topic) ? this.props.topic : "hello"}></input>

                </form>
            </div>
        )
    }
}
