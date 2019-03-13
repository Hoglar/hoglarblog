import React from 'react';

export default class Footer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            footerState: "default"
        }
    }

    render() {
        // will show three states.
        return (
            <footer className="footer">
                {this.state.footerState === "help" ? <Help /> : null}
                {this.state.footerState === "support" ? <Support /> : null}
                {this.state.footerState === "contact" ? <Contact /> : null}
                {this.state.footerState === "default" ? <Default /> : null}
                <p>
                    
                </p>
            </footer>
        )
    }
}

//Support project with Bitcoin: 3AtBGhxf1nAYp5kHBTdivQuVfVE99cZYtj

class Default extends React.Component {
    render() {
        return (
            <div className="footerDefault">
                <h3>Help</h3>
                <h3>Support project</h3>
                <h3>Contact</h3>
            </div>
        )
    }
}
