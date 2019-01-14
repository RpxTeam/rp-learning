import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class InfoLesson extends Component {
    render() {
        return (
            <div className="info-lesson">
                <div className="gridD">
                    <div className="icon">
                        <i className="icon-zen-1" />
                    </div>
                    <div className="text">
                        <p>{this.props.title}</p>
                            <p><small>{this.props.theme}</small></p>
                    </div>
                </div>
            </div>
        )
    }
}

InfoLesson.PropTypes = {
    title: PropTypes.string,
    theme: PropTypes.string
}

export default InfoLesson
