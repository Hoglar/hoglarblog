'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import '../css/styles.css';

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

// Sidebar får hittil en props. Den får et object fra Application.

class Sidebar extends React.Component {

    render() {
        return (
            <div className="sidebar">
                {this.props.sidebarLayout.map(function(api, index) {
                    return (
                        <SidebarBox
                            img={api.img}
                            key={api.id}
                            name={api.name} />
                    )
                }.bind(this))}

                <div className="sidebarFiller"/>
            </div>
        )
    }
}

// Sidebarboxene er på en måte like, men de skal alle være en
// forskjellig knapp for en gitt funksionalitet.

class SidebarBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hover: false,
            timedExecution: undefined,
        }
    }

    onHover() {
        this.timedExecution = setTimeout(()=>{
            this.setState({hover: true});
        }, 1200)
    }

    noHover() {
        clearTimeout(this.timedExecution);
        this.setState({hover: false});
    }

    // on hover i want to show info about the box.
    render() {
        return(
            <div className="sidebarBox" onClick={this.props.showBoxInfo}>
                <div className="sidebarBoxImg" onMouseEnter={this.onHover.bind(this)} onMouseLeave={this.noHover.bind(this)}>
                    <img src={this.props.img} className="center" />
                </div>
                {this.state.hover ? <div className="sidebarBoxInfo"> {this.props.name} </div> :null }
            </div>
        )
    }
}


class Footer extends React.Component {
    render() {
        return (
            <div className="footerWrapper">
                <div className="footerTop">

                </div>
                <div className="footerAttribution">
                    <h2 className="attributionHeader">Thank you for the images!</h2>
                    {this.props.attributionInfo.map(function(api) {
                        return (
                            <p className="attribution">
                                {api.name} icon made by <a href={api.link}>{api.creator} </a> from <a href="www.flaticon.com">www.flaticon.com | </a>
                            </p>
                        )
                    })}
                </div>
            </div>
        )
    }
}




class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showFooter: false,
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


    render() {
        return (
            <div className="wrapper">
                <Sidebar
                    sidebarLayout={defaultSidebar}
                />

                <div className="mainSection" onWheel={this.showFooter.bind(this)}>
                    { this.state.showFooter ? <Footer attributionInfo={defaultSidebar}/> : null }
                </div>
            </div>
        )
    }
}


ReactDOM.render(<Application />, document.getElementById('root'));
