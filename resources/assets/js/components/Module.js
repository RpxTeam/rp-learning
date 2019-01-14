import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Module extends Component {
    render() {
        return (
            <div className={this.props.disabled ? 'item disabled' : 'item'} onClick={this.props.onClick}>
                <div className="icon">
                    <i className="icon-zen-1"></i>
                </div>
                <p><small>{this.props.title}</small></p>
            </div>
        )
    }
}

Module.PropTypes = {
    title: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func
}

export default Module
