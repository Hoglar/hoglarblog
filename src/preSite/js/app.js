'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import '../css/styles.css';

class Sidebar extends React.Component {
    render() {
        return (
            <div className="sidebarBox-1">
                
            </div>
        )
    }
}

class Application extends React.Component {
    render() {
        return (
            <div className="wrapper">
                <div className="sidebar">
                    <Sidebar />
                </div>
            </div>
        )
    }
}


ReactDOM.render(<Application />, document.getElementById('root'));
