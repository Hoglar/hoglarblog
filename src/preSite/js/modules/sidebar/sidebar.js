
import React from 'react';
// Sidebar får hittil en props. Den får et object fra Application.

import SidebarBox from './sidebarBox.js';

// Sidebar gets data from app with info on images.
// it also gets onclick fuinction

export default class Sidebar extends React.Component {

    render() {
        return (
            <aside className="sidebar">
                {this.props.sidebarLayout.map(function(api, index) {
                    return (
                        <SidebarBox
                            img={api.img}
                            key={api.id}
                            name={api.name}
                            onSidebarClick={this.props.onSidebarClick} />
                    )
                }.bind(this))}

                <div className="sidebarFiller"/>
            </aside>
        )
    }
}
