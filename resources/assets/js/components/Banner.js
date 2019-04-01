import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export class Banner extends Component {
    render() {
        const Banner = styled.div`
            position: relative;
            ${'' /* margin-bottom: 30px; */}
            overflow: hidden;
            background-image: url(${this.props.image ? this.props.image : ''});
            background-position: center center;
            background-repeat: no-repeat;
            background-color: #9c0204;
            background-size: cover;
            &::before {
                content: '';
                background: #000000;
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                opacity: .5;
                display: ${this.props.image ? 'block' : 'none'};
            }
            .gridD {
                max-width: 1024px;
                margin: 0 auto;
            }
        `
        const Image = styled.div`
            background-Image: url(${this.props.image})
        `
        const TitleContainer = styled.div`
            padding-bottom: ${this.props.size === 'large' ? '150px' : '50px'};
            padding-top: ${this.props.size === 'large' ? '150px' : '50px'};
            p {
                color: #ffffff;
            }
        `
        const Title = styled.div`
            font-weight: 700;
            font-size: 35px;
            color: #ffffff;
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
                    <Banner>
                        <div className="gridD">
                            <TitleContainer>
                                <div className="info">
                                    <Title>{this.props.title}</Title>
                                    {this.props.children}
                                </div>
                            </TitleContainer>
                        </div>
                    </Banner>
                }
            </React.Fragment>
        )
    }
}

Banner.propTypes = {
    internal: PropTypes.bool,
    title: PropTypes.string,
    image: PropTypes.string,
    icon: PropTypes.string,
    size: PropTypes.string
}

export default Banner
