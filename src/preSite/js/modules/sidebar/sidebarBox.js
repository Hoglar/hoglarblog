
import React from 'react';

export default class SidebarBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hover: false,
            timedExecution: undefined,
        }
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
            <div className="sidebarBox" onClick={this.props.showBoxInfo}>
                <div className="sidebarBoxImg" onMouseEnter={this.onHover.bind(this)} onMouseLeave={this.noHover.bind(this)}>
                    <img src={this.props.img} className="center" />
                </div>
                {this.state.hover ? <div className="sidebarBoxInfo"> {this.props.name} </div> :null }
            </div>
        )
    }
}
