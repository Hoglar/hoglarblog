'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

// Import Css files
import '../css/styles.css';
import './modules/sidebar/sidebar.css'
import './modules/dictionary/dictionary.css';
import './modules/footer/footer.css';
import './modules/header/header.css';
import './modules/register/register.css';

// Importing modules.
import Sidebar from './modules/sidebar/sidebar.js';
import Footer from './modules/footer/footer.js';
import Dictionary from './modules/dictionary/dictionary.js';
import Header from './modules/header/header.js';
import Register from './modules/register/register.js';

// importing icons from assets to gove to defaultSidebar

import defaultSidebar from './data/sidebarData.js';

// importing special functionality

import userAuthentication from './functionality/userAuthentication.js';

class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //Lager en state for guest user
            mode: "app", // mode can now be creative or administation. this controlls what we see on the screen.

            showHeader: false,
            showFooter: false,
            showDictionary: false,
            showRegister: false,
        }

        // userAuthentication is defined in functionality/userAuthentication.js
        // This is run when page is refreshed. It checks for data in local or session storage to auto log in user.
        // If user is not logged in, we need to do this with another function.
        userAuthentication((result) => {
            console.log("Under app constructor we set logged in user to: ", result);

            this.state.loggedInUser = result;
        });

    }

    registerButtonClicked() {
        this.setState({ mode: "administation", showRegister: true, showHeader: false})
    }

    // This function is triggered by pressing the create user button in <Register />
    userCreationIsDone() {
        console.log("refreshing");
        window.location.reload();
    }



    // This function is taking the name of the button clicked and then updates state to show that api!
    // Its from here i launch the apps
    onSidebarClick(name) {
        console.log(name);
        // Her er det noe rart som bør endres
        if (this.state.mode === "administation") {
            this.setState({mode: "app"});
        }

        if (name === "Home") {
            (this.state.showHeader === true) ? this.setState({showHeader: false}) : this.setState({showHeader: true});


        }

        if (name === "Dictionary") {
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

                <div className="mainSection">

                    { (this.state.showDictionary && (this.state.mode === "app")) ? <Dictionary
                        loggedInUser={this.state.loggedInUser} />
                        : null }

                    { this.state.showHeader ? <Header
                        loggedInUser={this.state.loggedInUser}
                        registerButtonClicked={this.registerButtonClicked.bind(this)}/> : null }


                    { ((this.state.mode === "administation") && this.state.showRegister) ? <Register userCreationIsDone={this.userCreationIsDone.bind(this)}/> : null}
                </div>

                <Footer attributionInfo={defaultSidebar}/>
            </div>
        )
    }
}

ReactDOM.render(<Application />, document.getElementById('root'));
