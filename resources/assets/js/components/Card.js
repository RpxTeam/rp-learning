import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
    
`

const Overflow = styled.div`
    position: relative;
    transition: height 250ms ease;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`

const Content = styled.div`
    transition: height 250ms ease;
    padding: 21px
`

export class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: this.props.collapsed ? this.props.collapsed : true,
            height: this.props.defaultHeight,
            padding: this.props.collapsed ? 21 : 0
        }
        this.toggleCollapse = this.toggleCollapse.bind(this);
    }

    toggleCollapse = (e) => {   
        e.preventDefault();
        const contentHeight = e.target.parentNode.parentNode.parentNode.parentNode.querySelector('.card-collapse').offsetHeight;
        const newHeight = contentHeight;

        this.setState({
            collapsed: !this.state.collapsed,
            height: this.state.collapsed ? newHeight : this.props.defaultHeight
        });
    }

    openCard = (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            open: !prevState.open
        }));
        this.state.open
    }

    render() {
        const Image = styled.div`
            background: url(${this.props.image})
        `
        return (
            <Container className={this.props.profile ? 'card card-profile' : this.state.collapsed ? 'card' : 'card card-open'}>
                {this.props.profile ?
                    <div className="card-header top">
                        <i className="icon-lotus icon-bg"></i>
                        <div className="left">
                            <div className="icon-gamification">
                                <i className="icon-lotus"></i>
                            </div>
                            <div className="status">
                                <p>Nv. Lótus 1</p>
                                <p><small>150/600 atividades</small></p>
                            </div>
                        </div>
                        <div className="right">
                            <a href="#" className="card-btn active" onClick={this.toggleCollapse}><i className="icon-arrow-top rotate180"></i></a>
                        </div>
                    </div>
                    :
                    <React.Fragment>
                        <div className="card-header">
                            <div className="left">
                                {this.props.profile}
                                <div className="icon">
                                    <i className="icon-zen-2"></i>
                                </div>
                                <div className="info">
                                    <h4>{this.props.category}</h4>
                                    <h3>{this.props.name}</h3>
                                </div>
                            </div>
                            <div className="right">
                                <a href="#" className="card-btn" onClick={this.toggleCollapse}><i className="icon-arrow-top rotate180"></i></a>
                            </div>
                        </div>
                        <Image className="card-image" />
                    </React.Fragment>
                }
                <Overflow style={{height:this.state.height, padding:this.state.padding}}>
                    <div style={{width: '100%'}}>
                        {this.props.type === 'resume' ?
                            <Content className="card-collapse card-resume">
                                <p>$course->introduction</p>
                            </Content>
                            :
                            <Content className='card-collapse card-content'>
                                <div className="progress">
                                    <div className={this.props.profile ? 'row right' : 'row'}>
                                        {this.props.profile ? null :
                                            <div className="activity">
                                                <p><strong>Seu avanço</strong></p>
                                                <p>150/600 atividades</p>
                                            </div>
                                        }
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
                    </div>
                </Overflow>
                {this.props.profile ? null :
                    <div className="card-footer buttons">
                        <a href="#"><i className="icon-heart"></i></a>
                        <a href="#"><i className="icon-bookmark"></i></a>
                        <a href="#" onClick={this.props.onClick}><i className="icon-arrow-left rotate180"></i></a>
                    </div>
                }
            </Container>
        )
    }
}

Card.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    category: PropTypes.string,
    url: PropTypes.string,
    image: PropTypes.string,
    onClick: PropTypes.func,
    type: PropTypes.string,
    defaultHeight: PropTypes.number,
    profile: PropTypes.bool,
    collapsed: PropTypes.bool,
    padding: PropTypes.string,
    link: PropTypes.string
};

export default Card;
