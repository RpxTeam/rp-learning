import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const Link = styled.div `
    ${props => props.type === 'success' && css`
        background: #2EC600;
        border: 1px solid limegreen;`
    }
    display: inline-block;
    min-width: calc(213px - 18px);
`

export class Button extends Component {
    render() {
        return (
            <React.Fragment>
                {this.props.type === 'submit' ?
                    <button type="submit" className="btn btn-grey btn-center" onClick={this.props.onClick}>{this.props.title}</button>
                : 
                <Link className={this.props.className} onClick={this.props.onClick}>
                    <div className="link">
                        {this.props.icon ?
                            <i className={'icon-' + this.props.icon}></i>
                        : null }
                        {this.props.title}
                    </div>
                </Link>
                }
            </React.Fragment>
        )
    }
}

Button.PropTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    onClick: PropTypes.func,
    type: PropTypes.string,
    icon: PropTypes.string,
    
}

export default Button
