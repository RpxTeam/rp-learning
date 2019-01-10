import React, { Component } from 'react'

export class Testimonial extends Component {
    render() {
        return (
            <div class="testimonial">
                <div class="avatar">
                    <div class="image" data-bg="/img/testimonial.jpg"></div>
                </div>
                <div class="text">
                    <h6>Breno da Silva França</h6>
                    <div class="rating rating-grey">
                        <div class="stars">
                            <i class="icon-star-o"></i>
                            <i class="icon-star-o"></i>
                            <i class="icon-star-o"></i>
                            <i class="icon-star"></i>
                            <i class="icon-star"></i>
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
