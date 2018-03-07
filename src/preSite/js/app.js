'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import '../css/styles.css';

import hoglarLogo from '../assets/hoglarLogo.png'



// Sidebar indeholder sidebar boxes, det er disse boxene som er
// hovedgreia, kanskje det ikke trenger være et helt component.

class Sidebar extends React.Component {
    render() {
        return (
            <div className="sidebar">
                <SidebarBox />
                <SidebarBox />
                <SidebarBox />
                <SidebarBox />
                <SidebarBox />
                <SidebarBox />
                <div className="sidebarFiller"/>
            </div>

        )
    }
}

// Sidebarboxene er på en måte like, men de skal alle være en
// forskjellig knapp for en gitt funksionalitet.

class SidebarBox extends React.Component {
    render() {
        return(
            <div className="sidebarBox">
                <img src={ hoglarLogo } />
            </div>
        )
    }
}

SidebarBox.propTypes = {

}


class Application extends React.Component {
    render() {
        return (
            <div className="wrapper">
                <Sidebar />
            </div>
        )
    }
}


ReactDOM.render(<Application />, document.getElementById('root'));
