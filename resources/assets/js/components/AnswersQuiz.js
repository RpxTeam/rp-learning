import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';

export class AnswersQuiz extends Component {
    render() {
        return (
            <FormControlLabel
                control={
                    this.props.multipleChoise ?
                        <Checkbox checked={this.props.correct} color={'primary'} onChange={this.props.onChange} />
                    : <Radio checked={this.props.correct} color={'primary'} onChange={this.props.onChange} />
                }
                label={this.props.text}
            />
        )
    }
}

AnswersQuiz.PropTypes = {
    single: PropTypes.bool,
    correct: PropTypes.bool,
    onChange: PropTypes.func,
    text: PropTypes.string.isRequired
}

export default AnswersQuiz
