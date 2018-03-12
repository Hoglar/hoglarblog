'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import '../css/styles.css';

// importing icons from assets to gove to defaultSidebar
import homePng from '../assets/house.png';
import notesPng from '../assets/feedback.png';
import dictionaryPng from '../assets/books.png';
import ideasPng from '../assets/idea.png';
import socialPng from '../assets/avatar.png';
import usersettingPng from '../assets/settings.png';
import questionPng from '../assets/question.png';
import listPng from '../assets/list.png';
import projectPng from '../assets/sketch.png';


// må også gjøre dette mer modulært.


// Sidebar indeholder sidebar boxes, det er disse boxene som er
// hovedgreia, kanskje det ikke trenger være et helt component.


// Jeg lager et object som bestemmer hvordan sidebarBoxen skal se ut,
// Objectet trenger hvilken elementer jeg vil ha i sidebaren
// objectet må også kunne si hvilken rekkefølge.

// elementene en kan velge mellom vil etterhvert være egne komponeneter,
// i sidebaren trenger jeg kun deres gjeldene bilder.


// Notes, glossary

const defaultSidebar = [
    {
        // Home
        // A home button is pretty, dont know exactly
        // What it should do.
        img: homePng,
        id: 1,
    },
    {
        // Notes
        // This api is for writing notes when learning,
        // it should be topic based but freely written. and open for all.
        img: notesPng,
        id: 2,
    },
    {
        // Dictionary
        // Glossary is topic based and meant to be a short description.
        // I will make the most reviewd glossary be the default description.
        img: dictionaryPng, // Bilde noe ute av stil, kanskje bytte?
        id: 3,
    },
    {
        // Blog or ideas
        // Can be topic based but aslo just free writing.
        img: ideasPng,
        id: 4,
    },
    {
        // Social
        // Should have some sort of friend function.
        img: socialPng,
        id: 5,
    },
    {
        // Questions
        // also topic based, i want a way to write Questions
        // and which we get replyes in your own page,
        // color shoud change on update.
        img: questionPng,
        id: 6,
    },
    {

        //projects
        img: projectPng,
        id: 7,
    },
    {
        // Checklist
        img: listPng,
        id: 8,
    },
    {
        // Profile settings
        // Here we can change what api we need
        // We can also change order.
        img: usersettingPng,
        id: 9,
    }

]

// Sidebar får hittil en props. Den får et object fra Application.

class Sidebar extends React.Component {
    render() {
        return (
            <div className="sidebar">
                {this.props.sidebarLayout.map(function(api, index) {
                    return (
                        <SidebarBox
                            img={api.img}
                            key={api.id} />
                    )
                }.bind(this))}.

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
                <img src={this.props.img} className="center" />
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
                <Sidebar sidebarLayout={defaultSidebar}/>

            </div>
        )
    }
}


ReactDOM.render(<Application />, document.getElementById('root'));
