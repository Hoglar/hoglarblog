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
import './modules/notes/notes.css';
import './modules/allround/topicChooser.css';
import 'draft-js/dist/draft.css';

// Importing modules.
import Sidebar from './modules/sidebar/sidebar.js';
import Footer from './modules/footer/footer.js';
import Notes from './modules/notes/notes.js';
import Dictionary from './modules/dictionary/dictionary.js';
import Header from './modules/header/header.js';
import Register from './modules/register/register.js';


// importing special functionality
import boxColorChange from "./modules/sidebar/sidebarFunc.js";
import userAuthentication from './functionality/userAuthentication.js';
import onSidebarClick from './functionality/onSidebarClick.js';

class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //Lager en state for guest user
            mode: "app", // mode can now be creative or administation. this controlls what we see on the screen.
            // Should maybe drop this state option. i just make admin as high z-index?
            showHeader: false,
            showNotes: false,
            showDictionary: false,
            showRegister: false,

            // Change topic in options! default topic
            topic: "Select topic",

            dictionaryWordSearch: false
        }

        // userAuthentication is defined in functionality/userAuthentication.js
        // This is run when page is refreshed. It checks for data in local or session storage to auto log in user.
        // If user is not logged in, we need to do this with another function.
        userAuthentication((result) => {
            console.log("Under app constructor we set logged in user to: ", result);

            this.state.loggedInUser = result;
        });

    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown.bind(this));
        if(this.state.loggedInUser === "guest") {
            console.log("we have a guest");
            boxColorChange("user");
            this.setState({showHeader: true})
        }
    }

    handleKeyDown(e) {
        if(e.ctrlKey === true && e.keyCode === 68) {
            e.preventDefault();
            let copyedText = window.getSelection().toString();

            boxColorChange("dictionary")
            this.setState({showDictionary: true,
                           dictionaryWordSearch: copyedText});
        }
    }

    registerButtonClicked() {
        this.setState({ mode: "administation",
                        showRegister: true,
                        showHeader: false})
    }

    // This function is triggered by pressing the create user button in <Register />
    userCreationIsDone() {
        console.log("refreshing");
        window.location.reload();
    }

    hideDictionary() {
        this.setState({showDictionary: false});
    }

    // This function is taking the name of the button clicked and then updates state to show that api!
    // Its from here i launch the apps


    // Needs to grab selected topics here.

    giveTopicToMainApp(topic) {
        this.setState({topic: topic});
    }

    render() {
        return (
            <div className="wrapper">
                <Sidebar
                    onSidebarClick={onSidebarClick.bind(this)}
                />

                <main className="mainSection">

                    { (this.state.showNotes && (this.state.mode === "app")) ?
                        <Notes loggedInUser={this.state.loggedInUser}
                               giveTopicToMainApp={this.giveTopicToMainApp.bind(this)}
                               activeTopic={this.state.topic}
                               hideDictionary={this.hideDictionary.bind(this)}
                               showDictionary={this.state.showDictionary}/> :
                        null}

                    { (this.state.showDictionary && (this.state.mode === "app")) ?
                        <Dictionary loggedInUser={this.state.loggedInUser}
                                    activeTopic={this.state.topic}
                                    giveTopicToMainApp={this.giveTopicToMainApp.bind(this)}
                                    isNotesActive={this.state.showNotes}
                                    dictionaryWordSearch={this.state.dictionaryWordSearch}/> :
                        null }

                    { this.state.showHeader ? <Header
                        loggedInUser={this.state.loggedInUser}
                        registerButtonClicked={this.registerButtonClicked.bind(this)}/> : null }


                    { ((this.state.mode === "administation") && this.state.showRegister) ? <Register userCreationIsDone={this.userCreationIsDone.bind(this)}/> : null}
                </main>

                <Footer />
            </div>
        )
    }
}

ReactDOM.render(<Application />, document.getElementById('root'));
