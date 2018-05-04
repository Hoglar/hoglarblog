'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

// Import Css files
import '../css/styles.css';
import './modules/sidebar/sidebar.css'
import './modules/dictionary/dictionary.css';
import './modules/footer/footer.css'

// Importing modules.

import Sidebar from './modules/sidebar/sidebar.js';
import Footer from './modules/footer/footer.js';
import Dictionary from './modules/dictionary/dictionary.js';

// importing icons from assets to gove to defaultSidebar

import defaultSidebar from './data/sidebarData.js';


class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            //Lager en state for guest user
            loggedInUser: "guest",
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
            if (this.state.showDictionary) {
                this.setState({showDictionary: false});
            }
            else {
                this.setState({showDictionary: true});
            }
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

                    { this.state.showDictionary ? <Dictionary
                        loggedInUser={this.state.loggedInUser} />
                        : null }

                    { this.state.showFooter ? <Footer
                        attributionInfo={defaultSidebar}/>
                        : null }
                </div>
            </div>
        )
    }
}

ReactDOM.render(<Application />, document.getElementById('root'));
