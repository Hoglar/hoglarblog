
import React from 'react';
// Sidebar får hittil en props. Den får et object fra Application.

import SidebarBox from './sidebarBox.js';

// Sidebar gets data from app with info on images.
// it also gets onclick fuinction

export default class Sidebar extends React.Component {

    render() {
        return (
            <aside className="sidebar">
                {sidebarBoxes.map(function(box, index) {
                    return (
                        <SidebarBox
                            key={index}
                            name={box.name}
                            className={box.className}
                            onSidebarClick={this.props.onSidebarClick} />
                    )
                }.bind(this))}

                <div className="sidebarFiller"/>
            </aside>
        )
    }
}

const sidebarBoxes = [
    {name: "user", className: "sidebarBoxSmall"},
    {name: "notes", className: "sidebarBoxBig"},
    {name: "dictionary", className: "sidebarBoxBig"}
]
