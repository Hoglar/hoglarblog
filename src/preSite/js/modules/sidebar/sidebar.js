
import React from 'react';
// Sidebar får hittil en props. Den får et object fra Application.

import SidebarBox from './sidebarBox.js';

export default class Sidebar extends React.Component {

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
