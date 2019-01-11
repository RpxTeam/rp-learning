import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const Link = styled.div `
    ${props => props.type && css`
        background: #2EC600;
        border: 1px solid limegreen;`
    }
`

export class Button extends Component {
    render() {
        return (
            <Link className="btn-start">
                <a href="#modal-login" onClick={this.props.onClick}>
                    <i className="icon-courses"></i>
                    {this.props.title}
            </a>
            </Link>
        )
    }
}

Button.PropTypes = {
    title: PropTypes.string,
    onClick: PropTypes.func,
    type: PropTypes.string
}

export default Button
