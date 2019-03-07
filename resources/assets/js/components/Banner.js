import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export class Banner extends Component {
    render() {
        const Image = styled.div`
            background-Image: url(${this.props.image})
        `
        return (
            <React.Fragment>
                {
                    this.props.internal ?
                        <div className="banner-course">
                            <div className="gridD">
                                <h1>{this.props.title}</h1>
                            </div>
                        </div>
                        :
                        <div className="banner">
                            <div className="gridD">
                                <div className="title">
                                    <div className="info">
                                        <h2>{this.props.title}</h2>
                                        {this.props.children}
                                    </div>
                                </div>
                            </div>
                        </div>
                }
            </React.Fragment>
        )
    }
}

Banner.prototypes = {
    internal: PropTypes.bool,
    title: PropTypes.string,
    image: PropTypes.string,
    icon: PropTypes.string
}

export default Banner
