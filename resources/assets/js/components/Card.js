import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div `
    
`
const Content = styled.div `
    background: ${props => props.open ? 'orange' : 'black'}
`

export class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    openCard = (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            open: !prevState.open
        }));
    }

    render() {
        const Image = styled.div `
            background: url(${this.props.image})
        `
        return (
            <Container className="card" open={this.state.open}>
                <div className="card-header">
                    <div className="left">
                        <div className="icon">
                            <i className="icon-zen-2"></i>
                        </div>
                        <div className="info">
                            <h4>{this.props.category}</h4>
                            <h3>{this.props.name}</h3>
                        </div>
                    </div>
                    <div className="right">
                        <a href="#" className="card-btn" onClick={this.openCard}><i className="icon-arrow-top rotate180"></i></a>
                    </div>
                </div>
                {this.props.type === 'resume' ?
                    <Content className="card-resume">
                        <p>$course->introduction</p>
                    </Content>
                :
                    <Content className="card-content">
                        <div className="progress">
                            <div className="row">
                                <div className="activity">
                                    <p><strong>Seu avanço</strong></p>
                                    <p>150/600 atividades</p>
                                </div>
                                <div className="percent">
                                    {/* @if ($mycourse->progress === null) */}
                                    <p>0% </p>
                                    {/* @else */}
                                        {/* <p>number_format($mycourse->progress, 0, '.', '') %</p> */}
                                    {/* @endif */}
                                </div>
                            </div>
                            <div className="progress-bar">
                                {/* @if ($mycourse->progress === null) */}
                                    <div className="bar"></div>
                                {/* @else */}
                                    {/* <div className="bar" style="width: {{ number_format($mycourse->progress, 0, '.', '') }}%;"></div> */}
                                {/* @endif */}
                            </div>
                        </div>
                    </Content>
                }
                <Image className="card-image" />
            </Container>
        )
    }
}

Card.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    category: PropTypes.string,
    url: PropTypes.string,
    image: PropTypes.string,
    onClick: PropTypes.func,
    type: PropTypes.string
};

export default Card;
