import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
                                <a href="{{ url('/library') }}"><i className="icon-arrow-left"></i></a>
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
                        <div className="icon-bg">
                            <i className="icon-guirid"></i>
                        </div>
                        <div className="gridD">
                            <div className="title">
                                <div className="icon">
                                    <i className="icon-guirid"></i>
                                </div>
                                <div className="info">
                                    <h6>Bem vindo Lore Ipsum</h6>
                                    <p>Essa é a sua plataforma de ensinos, Lorem
                                        ipsum dolor sit amet, consectetur adipisicing
                                        elit. Amet commodi delectus, excepturi ipsum dolor sit amet.</p>
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
    image: PropTypes.string
}

export default Banner
