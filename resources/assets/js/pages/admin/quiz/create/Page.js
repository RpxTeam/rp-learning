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
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
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
            questions: [],
            question: {},
            modal: {
                open: false
            },
            questionField: '',
            answerField: ''
        }
        this.openMessage = this.openMessage.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.correctAnswser = this.correctAnswser.bind(this);
    };

    getData = () => {
        axios.get(`${API_URL}/api/courses/${this.state.course}/quiz`)
            .then(res => {
                this.setState({
                    quiz_id: res.data
                });
            });

        this.getQuestions()
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

    getQuestions = () => {
        axios.get(`${API_URL}/api/courses/${this.state.course}/questions`)
            .then(res => {
                const results = res.data;
                this.setState({
                    results: results,
                });
            }).catch(error => {
                console.log(error)
            })
    };

    toggleAll = () => {
        axios.post(`${API_URL}/api/courses/${this.state.course}/final/activate`)
            .then(res => {
                console.log(res)
                this.getQuestions()
            })
    }

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
        const questions = this.state.results;
        console.log(event.target.checked);
        var newQuestions = questions.filter((elem, i, array) => {
            if (elem.id === id) {
                elem.active = event.target.checked;
            }
            return questions
        });
        this.setState({
            results: newQuestions
        })
    };

    addAnswer = () => {
        const question = this.state.question;
        let answers = question.answers;
        let answerField = this.state.answerField;
        let last;
        let id;
        if (answers.length === 0) {
            last = 0;
            id = 1;
        } else {
            last = answers.length - 1;
            let lastAnswer = answers[last];
            id = lastAnswer.id + 1
        }
        let answer = {
            id: id,
            text: answerField,
            correct: false
        }
        if (this.state.questionField || question.text) {
            if (answerField) {
                this.setState({
                    question: {
                        ...this.state.question,
                        text: this.state.questionField,
                        answers: [
                            ...this.state.question.answers,
                            answer
                        ]
                    },
                    answerField: ''
                });
            } else {
                this.openMessage('Não tem resposta');
            }
        } else {
            this.openMessage('Insira a pergunta');
        }

        console.log(question);

    }

    removeAnswer = (id) => {
        const question = this.state.question;
        var newAnswers = question.answers.filter((elem, i, array) => {
            if (elem.id != id) {
                return newAnswers != question.answers
            }
        });
        this.setState({
            question: {
                ...this.state.question,
                answers: newAnswers
            }
        })
    }

    correctAnswser = (id) => {
        const question = this.state.question;
        var newAnswers = question.answers.filter((elem, i, array) => {
            if (elem.id === id) {
                if (elem.correct) {
                    elem.correct = false;
                } else {
                    elem.correct = true;
                }
            }
            return question.answers
        });
        this.setState({
            question: {
                ...this.state.question,
                answers: newAnswers
            }
        })
    }

    handleSubmitQuestion = () => {
        
    }

    render() {
        const { message, questions, results, modal, questionField, answerField, question } = this.state;
        // if (this.state.quizEdit === true) {
        //     return <Redirect to={'/admin/courses/' + this.state.courseID} />
        // }
        return (
            <Admin heading="Quiz">
                <Message text={message.text} open={message.open} close={this.closeMessage} />
                <Grid container justify='space-between'>
                    <Grid item xs={3} align='left'>
                        <Button variant="outlined" color="primary" onClick={this.toggleAll}>
                            Adicionar todos
                        </Button>
                    </Grid>
                    <Grid item xs={3} align='right'>
                        <Button variant="contained" color="primary">
                            Criar Nova Pergunta
                        </Button>
                    </Grid>
                </Grid>
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
                                                    value={question.id}
                                                    checked={question.active}
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

                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    onClose={this.handleCancel}
                    open={modal.open}
                    maxWidth="lg"
                    aria-labelledby="confirmation-dialog-title"
                    variant="outlined"
                >
                    <DialogTitle id="confirmation-dialog-title">Criar Pergunta</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Pergunta"
                            name="questionField"
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            value={questionField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <br /><br />
                        <Grid container spacing={8} justify="space-between" alignItems="center">
                            <Grid item xs={12} md={12}>
                                <Typography variant="h6" gutterBottom>
                                    Repostas
                                        </Typography>
                                <Typography variant="overline" gutterBottom>
                                    Defina uma ou mais respostas corretas
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={11} align="left">
                                <TextField
                                    label="Resposta"
                                    name="answerField"
                                    onChange={this.handleChange}
                                    margin="normal"
                                    variant="outlined"
                                    value={answerField}
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={1}>
                                <Fab color="primary" aria-label="Add" size="small" onClick={this.addAnswer}>
                                    <AddIcon />
                                </Fab>
                            </Grid>
                        </Grid>
                        <Divider />
                        {question.answers ?
                            question.answers.map((answer) =>
                                <List dense={true}>
                                    <ListItem key={answer.id}>
                                        <IconButton aria-label="Correct" onClick={this.correctAnswser.bind(this, answer.id)}>
                                            <CheckCircle color={answer.correct ? 'primary' : 'secondary'} />
                                        </IconButton>
                                        <ListItemText
                                            primary={answer.text}
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton aria-label="Edit">
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton aria-label="Delete" onClick={this.removeAnswer.bind(this, answer.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    <Divider />
                                </List>
                            )
                            : null}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCancel} color="primary">
                            Cancel
                        </Button>
                        {this.state.modal.edit ?
                            <Button onClick={this.handleSubmitQuestion.bind(this, this.state.modal.type, this.state.lesson.id)} color="primary">
                                Editar
                            </Button>
                            :
                            <Button onClick={this.handleSubmitQuestion.bind(this, this.state.modal.type)} color="primary">
                                Criar
                            </Button>
                        }
                    </DialogActions>
                </Dialog>

            </Admin>
        );
    }
}

export default Page;
