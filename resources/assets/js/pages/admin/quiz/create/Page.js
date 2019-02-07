import React from 'react'
import { API_URL } from "../../../../common/url-types";
import axios from 'axios'
import {
    Form,
} from 'semantic-ui-react'
import {
    DateInput,
    TimeInput,
    DateTimeInput,
    DatesRangeInput
} from 'semantic-ui-calendar-react';
import Admin from '../../Admin'
import { Redirect } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Message from '../../../../components/Message';
import styled from 'styled-components';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';

const CardContainer = styled(Card)`
    padding: 10px 20px;
`;

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            course: this.props.match.params.id,
            error: false,
            success: false,
            message: {
                open: false,
                vertical: 'top',
                horizontal: 'center',
                text: 'Snackbar its works'
            },
            questions: []
        }
        this.openMessage = this.openMessage.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
    };

    getData = () => {
        axios.get(`${API_URL}/api/courses/${this.state.course}/quiz`)
            .then(res => {
                if (res.data) {
                    axios.get(`${API_URL}/api/courses/${this.state.course}/quiz/${res.data}/questions`)
                        .then(res => {
                            const result = res.data;
                            this.setState({
                                result: result,
                            });
                        }).catch(error => {
                            console.log(error)
                        })
                } else {

                }
            });
    };

    componentDidMount() {
        this.getData();
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        // if (!this.state.title) {
        //     this.setState({
        //         message: {
        //             ...this.state,
        //             open: true,
        //             text: 'Preencha o título'
        //         }
        //     })
        // } else {
        //     axios.post(`${API_URL}/api/courses`, {
        //         title: this.state.title
        //     }).then(res => {
        //         console.log(res.data)
        //         this.setState({
        //             quizID: res.data,
        //             message: {
        //                 ...this.state.message,
        //                 open: true,
        //                 text: 'Quiz criado com sucesso!',
        //             }
        //         });
        //         setTimeout(function () {
        //             this.setState({
        //                 quizEdit: true
        //             })
        //         }.bind(this), 2000);
        //     }).catch(error => {
        //         this.setState({
        //             error: true,
        //             success: false
        //         })
        //         this.openMessage({ text: error.message })
        //     });
        // }
    };

    handleDelete = () => {
        console.log('delete');
    };

    handleEditor = (event, editor) => {
        const data = editor.getData();
        this.setState({
            lesson: {
                content: data
            }
        });
    };

    openMessage = newState => () => {
        this.setState({
            message: {
                open: true,
                ...newState
            }
        });
    };

    closeMessage = () => {
        this.setState({
            message: {
                ...this.state.message,
                open: false
            }
        });
    }

    handleToggle = id => event => {
        const questions = this.state.questions;
        var newQuestions = questions.filter((elem, i, array) => {
            if (elem.id === id) {
                elem.correct = event.target.checked;
            }
            return questions
        });
        this.setState({
            questions: newQuestions
        })
    };

    render() {
        const { message, questions, results } = this.state;
        // if (this.state.quizEdit === true) {
        //     return <Redirect to={'/admin/courses/' + this.state.courseID} />
        // }
        return (
            <Admin heading="Quiz">
                <Message text={message.text} open={message.open} close={this.closeMessage} />
                <form>
                    <Grid container spacing={16} justify="flex-end">
                        <Grid item xs={12}>
                            <List>
                                {results ?
                                    results.map((question, index) =>
                                        <React.Fragment key={question.id}>
                                            <Divider />
                                            <ListItem>
                                                <Switch
                                                    onChange={this.handleToggle(question.id)}
                                                    color='primary'
                                                    value={question.correct}
                                                    checked={question.correct}
                                                />
                                                <ListItemText primary={question.text} secondary={question.created_at} />
                                            </ListItem>
                                        </React.Fragment>
                                    )
                                    : null}
                            </List>
                        </Grid>
                    </Grid>
                </form>
            </Admin>
        );
    }
}

export default Page;
