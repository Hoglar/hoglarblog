
import React from 'react';

// Gets onclick and sshowBoxInfo
export default class SidebarBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hover: false,
            timedExecution: undefined,
        }
    }

    // Thos function is getting cast on box click, i make function to send the right props back to Application.
    giveNameData() {
        this.props.onSidebarClick(this.props.name);
    }

    onHover() {
        this.timedExecution = setTimeout(()=>{
            this.setState({hover: true});
        }, 1200)
    }

    noHover() {
        clearTimeout(this.timedExecution);
        this.setState({hover: false});
    }

    // on hover i want to show info about the box.
    render() {
        return(
            <div className="sidebarBox">
                <div className="sidebarBoxImg" onMouseEnter={this.onHover.bind(this)} onMouseLeave={this.noHover.bind(this)} onClick={this.giveNameData.bind(this)}>
                    <img src={this.props.img} className="center" />
                </div>
                {this.state.hover ? <div className="sidebarBoxInfo"> {this.props.name} </div> :null }
            </div>
        )
    }
}
