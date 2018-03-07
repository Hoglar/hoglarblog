'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import '../css/styles.css';

class Application extends React.Component {
    render() {
        return (
            <div className="wrapper">
                <h1>Hello world!!</h1>
            </div>

        )
    }
}

ReactDOM.render(<Application /> , document.getElementById('root'));
