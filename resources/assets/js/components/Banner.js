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
                        <Image className="banner-course">
                            <div className="gridD">
                                <div className="back-button">
                                    <Link to={'/courses'}><i className="icon-arrow-left"></i></Link>
                                </div>
                                <h1>{this.props.title}</h1>
                                {/* <div className="rating">
                                <div className="stars">
                                    <i className="icon-star-o"></i>
                                    <i className="icon-star-o"></i>
                                    <i className="icon-star-o"></i>
                                    <i className="icon-star-o"></i>
                                    <i className="icon-star"></i>
                                </div>
                                <p>87% dos alunos recomendam esse curso.</p>
                            </div> */}
                            </div>
                        </Image>
                        :
                        <div className="banner">
                            {this.props.icon ?
                                <div className="icon-bg">
                                    <i className={"icon-" + this.props.icon}></i>
                                </div>
                                : null}
                            <div className="gridD">
                                <div className="title">
                                    {this.props.icon ?
                                        <div className="icon">
                                            <i className={"icon-" + this.props.icon}></i>
                                        </div>
                                    : null }
                                    <div className="info">
                                        <h6>{this.props.title}</h6>
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
