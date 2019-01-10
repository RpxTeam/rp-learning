import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export class Card extends Component {
    render() {
        const Image = styled.div `
            background: url(${this.props.image})
        `
        return (
            <div className="card">
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
                        <Link to={'/courses/'+ this.props.id}><i className="icon-arrow-left rotate180"></i></Link>
                    </div>
                </div>
                <Image className="card-image big-image" />
            </div>
        )
    }
}

Card.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    category: PropTypes.string,
    url: PropTypes.string,
    image: PropTypes.string
};

export default Card;
