import React from 'react';

export default class Footer extends React.Component {
    render() {
        return (
            <div className="footerWrapper">
                <div className="footerTop">

                </div>
                <div className="footerAttribution">
                    <h2 className="attributionHeader">Thank you for the images!</h2>
                    {this.props.attributionInfo.map(function(api) {
                        return (
                            <p className="attribution">
                                {api.name} icon made by <a href={api.link}>{api.creator} </a> from <a href="www.flaticon.com">www.flaticon.com | </a>
                            </p>
                        )
                    })}
                </div>
            </div>
        )
    }
}
