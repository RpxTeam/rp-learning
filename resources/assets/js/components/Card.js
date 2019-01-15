import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
    
`

const Overflow = styled.div`
    position: relative;
    transition: height 250ms ease;
    overflow: hidden;
`

export class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: this.props.collapsed ? this.props.collapsed : true,
            height: this.props.defaultHeight
        }
        this.toggleCollapse = this.toggleCollapse.bind(this);
    }

    toggleCollapse = (e) => {
        e.preventDefault();
        const contentHeight = e.target.parentNode.parentNode.parentNode.parentNode.querySelector('.card-collapse').offsetHeight;
        const contentPadding = 21;
        const newHeight = contentHeight;

        this.setState({
            collapsed: !this.state.collapsed,
            height: this.state.collapsed ? newHeight : this.props.defaultHeight,
            padding: this.props.padding ? this.props.padding : '21px'
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
        const Content = styled.div`
            height: ${this.state.height};
            background: #EEEEEE;
            padding: ${this.state.collapsed ? '21px' : this.state.padding};
            transition: height 250ms ease;
        `
        return (
            <Container className={this.props.profile ? 'card card-profile' : 'card'}>
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
                <Overflow>
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
                </Overflow>
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
    type: PropTypes.string,
    defaultHeight: PropTypes.number,
    profile: PropTypes.bool,
    collapsed: PropTypes.bool,
    padding: PropTypes.string
};

export default Card;
