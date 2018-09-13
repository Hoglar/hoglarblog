'use strict';

// onSidebarClick belongs to app.js so this is the app.js component.
// Had to take out the function cause it will get a bit long.

export default function onSidebarClick(name) {

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
    if (name === "Notes") {
        if (this.state.showNotes) {
            this.setState({showNotes: false});
        }
        else {
            this.setState({showNotes: true});
        }
    }
}
