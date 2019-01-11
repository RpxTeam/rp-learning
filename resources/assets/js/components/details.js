import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Detail extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="gridD">
            <div className="course-name">
                <p>{this.props.title}</p>
            </div>
            <div className="about-course">
                <p><small>Sobre o Curso</small></p>
            </div>
            <div className="content-course">
                <p>{this.props.description}</p>
            </div>
        </div>
        <div className="intructors">
            <div className="gridD">
                <span>Instrutores:</span>
                <p>
                    <span>{this.props.instructor}</span>
                </p>
            </div>
        </div>
      </React.Fragment>
    )
  }
}

Detail.PropTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    instructor: PropTypes.string
}

export default Detail
