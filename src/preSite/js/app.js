'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

// Import Css files
import '../css/styles.css';
import './modules/sidebar/sidebar.css'
import './modules/dictionary/dictionary.css';

// Importing modules.

import Sidebar from './modules/sidebar/sidebar.js';
import Footer from './modules/footer/footer.js';
import Dictionary from './modules/dictionary/dictionary.js';

// importing icons from assets to gove to defaultSidebar


import homePng from '../assets/house.png';
import notesPng from '../assets/feedback.png';
import dictionaryPng from '../assets/open-book.png';
import ideasPng from '../assets/idea.png';
import socialPng from '../assets/avatar.png';
import usersettingPng from '../assets/settings.png';
import questionPng from '../assets/question.png';
import listPng from '../assets/list.png';
import projectPng from '../assets/sketch.png';


const defaultSidebar = [
    {
        // Home
        // A home button is pretty, dont know exactly
        // What it should do.
        img: homePng, // Home er fint bilde. kan bli.
        name: "Home",
        creator: "Freepik",
        link: "https://www.flaticon.com/authors/freepik",
        id: 1,
    },
    {
        // Notes
        // This api is for writing notes when learning,
        // it should be topic based but freely written. and open for all.
        img: notesPng, // liker note bildet.
        name: "Notes",
        creator: "Freepik",
        link: "https://www.flaticon.com/authors/freepik",
        id: 2,
    },
    {
        // Dictionary
        // Glossary is topic based and meant to be a short description.
        // I will make the most reviewd glossary be the default description.
        img: dictionaryPng, // helt ok. laget av  itim2101
        name: "Dictionary",
        creator: "itim2101",
        link: "https://www.flaticon.com/authors/itim2101",
        id: 3,
    },
    {
        // Blog or ideas
        // Can be topic based but aslo just free writing.
        img: ideasPng, // liker ikke stilen, kommer ikke godt
                       // frem at det er ideer.
        name: "Ideas",
        creator: "Freepik",
        link: "https://www.flaticon.com/authors/freepik",
        id: 4,
    },
    {
        // Social
        // Should have some sort of friend function.
        img: socialPng, // Liker ikke bildet.
        name: "Social",
        creator: "Becris",
        link: "https://www.flaticon.com/authors/becris",
        id: 5,
    },
    {
        // Questions
        // also topic based, i want a way to write Questions
        // and which we get replyes in your own page,
        // color shoud change on update.
        img: questionPng,
        name: "Questions",
        creator: "Freepik",
        link: "https://www.flaticon.com/authors/freepik",
        id: 6,
    },
    {

        //projects
        img: projectPng,
        name: "Projects",
        creator: "Smartline",
        link: "https://www.flaticon.com/authors/smartline",
        id: 7,
    },
    {
        // Checklist
        img: listPng,
        name: "Checklist",
        creator: "Pixel perfect",
        link: "https://www.flaticon.com/authors/pixel-perfect",
        id: 8,
    },
    {
        // Profile settings
        // Here we can change what api we need
        // We can also change order.
        img: usersettingPng,
        name: "Settings",
        creator: "Gregor Cresnar",
        link: "https://www.flaticon.com/authors/gregor-cresnar",
        id: 9,
    }

]

const dictionaryData = [
    {
        topic: "HTML",
    },
    {
        topic: "CSS",
    },
    {
        topic: "Javascript",
    },
    {
        topic: "MongoDb",
    },
]

class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showFooter: false,
            showDictionary: false,
        }
    }
    // I want the footer to show only on scrolling,
    // rest of the page is on page.
    showFooter(e) {
        if (e.deltaY === 100) {
            this.setState({showFooter: true});
        }

        if (e.deltaY === -100) {
            this.setState({showFooter: false});
        }
    }

    // This function is taking the name of the button clicked and then updates state to show that api!
    onSidebarClick(name) {
        // Checking for click.
        console.log(name);
        if (name === "Dictionary") {
            console.log("Clicked Dictionary, changing state");
            this.setState({showDictionary: true});
        }
    }

    render() {
        return (
            <div className="wrapper">
                <Sidebar
                    sidebarLayout={defaultSidebar}
                    onSidebarClick={this.onSidebarClick.bind(this)}
                />

                <div className="mainSection" onWheel={this.showFooter.bind(this)}>

                    { this.state.showDictionary ? <Dictionary dictionaryData={dictionaryData}/> : null }

                    { this.state.showFooter ? <Footer attributionInfo={defaultSidebar}/> : null }
                </div>
            </div>
        )
    }
}

ReactDOM.render(<Application />, document.getElementById('root'));
