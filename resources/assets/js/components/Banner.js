import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export class Banner extends Component {
    render() {
        const Image = styled.div`
        background-Image: url(${this.props.image})
    `
        return (
            <Image className="banner-course">
                <div className="gridD">
                    <div className="back-button">
                        <a href="{{ url('/library') }}"><i className="icon-arrow-left"></i></a>
                    </div>
                    <h1>{this.props.title}</h1>
                    <div className="rating">
                        <div className="stars">
                            <i className="icon-star-o"></i>
                            <i className="icon-star-o"></i>
                            <i className="icon-star-o"></i>
                            <i className="icon-star-o"></i>
                            <i className="icon-star"></i>
                        </div>
                        <p>87% dos alunos recomendam esse curso.</p>
                    </div>
                </div>
            </Image>
        )
    }
}

Banner.prototypes = {
    title: PropTypes.string,
    image: PropTypes.string
}

export default Banner
