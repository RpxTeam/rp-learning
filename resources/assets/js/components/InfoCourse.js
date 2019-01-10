import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class InfoCourse extends Component {
    render() {
        return (
            <div className="infos-course">
                <div className="gridD">
                    <div className="info">
                        <i className="icon-tv"></i>
                        <span>{this.props.trails} {this.props.trails === 1 ? 'módulo': 'módulos'}</span>
                    </div>
                    <div className="info">
                        <i className="icon-book"></i>
                        <span>{this.props.lessons} {this.props.lessons === 1 ? 'atividade': 'atividades'}</span>
                    </div>
                    <div className="info">
                        <i className="icon-alarm-clock"></i>
                        <span>{this.props.duration} {this.props.duration === 1 ? 'hora' : 'horas'}</span>
                    </div>
                </div>
            </div>
        )
    }
}

InfoCourse.PropTypes = {
    trails: PropTypes.number,
    lessons: PropTypes.number,
    duration: PropTypes.number
}

export default InfoCourse
