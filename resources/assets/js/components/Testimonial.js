import React, { Component } from 'react'

export class Testimonial extends Component {
    render() {
        return (
            <div className="testimonial">
                <div className="avatar">
                    <div className="image" data-bg="/img/testimonial.jpg"></div>
                </div>
                <div className="text">
                    <h6>Breno da Silva França</h6>
                    <div className="rating rating-grey">
                        <div className="stars">
                            <i className="icon-star-o"></i>
                            <i className="icon-star-o"></i>
                            <i className="icon-star-o"></i>
                            <i className="icon-star"></i>
                            <i className="icon-star"></i>
                            <span>1/5</span>
                        </div>
                    </div>
                    <p>Curso muito legal</p>
                </div>
            </div>
        )
    }
}

export default Testimonial
