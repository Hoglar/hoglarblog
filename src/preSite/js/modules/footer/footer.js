import React from 'react';

export default class Footer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            footerState: "default"
        }
    }

    showHelp() {
        this.setState({footerState: "about"})
    }

    showSupport() {
        this.setState({footerState: "support"})
    }

    showContact() {
        this.setState({footerState: "contact"})
    }

    render() {
        // will show three states.
        return (
            <footer className="footer">
                {this.state.footerState === "about" ? <About /> : null}
                {this.state.footerState === "support" ? <Support /> : null}
                {this.state.footerState === "contact" ? <Contact /> : null}

                <Default showHelp={this.showHelp.bind(this)}
                         showContact={this.showContact.bind(this)}
                         showSupport={this.showSupport.bind(this)}/>

            </footer>
        )
    }
}

//Support project with Bitcoin: 3AtBGhxf1nAYp5kHBTdivQuVfVE99cZYtj

class Default extends React.Component {
    render() {
        return (
            <div className="footerDefault">
                <h3 onClick={this.props.showHelp}>About</h3>
                <h3 onClick={this.props.showContact}>Contact</h3>
                <h3 onClick={this.props.showSupport}>Support project</h3>
            </div>
        )
    }
}

class About extends React.Component {
    render() {
        return (
            <div className="footerDefault footerAbout">
                <p>
                    Opennotes is created as learning project and is a work under
                    progress. The core idea is an open notebook where you can
                    share and read notes on different topics. The topic system is currently
                    not wery good. You are free to make notes, but dont expect them to stay forever!
                    The project is on <a href="https://github.com/Hoglar/hoglarblog"> github</a>
                    . I would be happy to get some feedback.
                </p>
            </div>
        )
    }
}
class Support extends React.Component {
    render() {
        return (
            <div className="footerDefault footerSupport">
                <h4>Support project with Bitcoin: 3AtBGhxf1nAYp5kHBTdivQuVfVE99cZYtj</h4>
            </div>
        )
    }
}
class Contact extends React.Component {
    render() {
        return (
            <div className="footerDefault footerContact">
                <h4>You can contact me on mail or discord:
                    <address>Mail: <a href="mailto:martin.hoglar@gmail.com">Martin.hoglar@gmail.com</a></address>
                    <address>Discord: Hoglar#7228</address>
                </h4>
            </div>
        )
    }
}
