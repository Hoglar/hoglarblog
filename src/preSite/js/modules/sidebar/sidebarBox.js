
import React from 'react';

import boxColorChange from "./sidebarFunc.js";

// Gets onclick and showBoxInfo
export default class SidebarBox extends React.Component {
    constructor(props) {
        super(props)
    }

    // Thos function is getting cast on box click, i make function to send the right props back to Application.
    giveNameData() {
        this.props.onSidebarClick(this.props.name);
        boxColorChange(this.props.name);

    }


    // on hover i want to show info about the box.
    render() {
        return(
            <div className="sidebarBox">
                <div className="sidebarBoxImg"
                     id={"sideBarBox" + this.props.name}
                     onClick={this.giveNameData.bind(this)}>

                    <img src={this.props.img}
                         className="center" />
                </div>
            </div>
        )
    }
}
