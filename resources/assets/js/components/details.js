import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Detail extends Component {
  render() {
    return (
      <React.Fragment>
        <div class="gridD">
            <div class="course-name">
                <p>{this.props.title}</p>
            </div>
            <div class="about-course">
                <p><small>Sobre o Curso</small></p>
            </div>
            <div class="content-course">
                <p>{this.props.description}</p>
            </div>
        </div>
        <div class="intructors">
            <div class="gridD">
                <span>Instrutores:</span>
                <p>
                    <span>Instructor 1</span><span>Instructor 2</span><span>Instructor 3</span>.</p>
            </div>
        </div>
      </React.Fragment>
    )
  }
}

Detail.PropTypes = {
    title: PropTypes.string,
    description: PropTypes.string
}

export default Detail
