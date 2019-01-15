import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Input extends Component {
    render() {
        return (
            <div className="input-field input-field-icon">
                <i className={this.props.icon ? 'icon-'+this.props.icon : 'icon-person'}></i>
                <input
                    type={this.props.type}
                    className="input"
                    name={this.props.name}
                    value={this.props.value}
                    placeholder={this.props.placeholder}
                    onChange={this.props.onChange}
                />
            </div>
        )
    }
}

Input.PropTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    icon: PropTypes.string
}

export default Input
