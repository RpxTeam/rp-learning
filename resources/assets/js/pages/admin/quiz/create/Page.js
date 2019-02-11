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
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckCircle from '@material-ui/icons/CheckCircle';
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
            question: {
                course_id: this.props.match.params.id,
                quiz_id: null,
                lesson_id: null,
                text: '',
                active: true,
                answers: [
                ]
            },
            modal: {
                open: false
            },
            questionField: '',
            answerField: '',
            activateAll: false,
            returnCourse: false
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

        this.getQuestions();
    };

    componentDidMount() {
        this.getData();
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    getQuestions = () => {
        axios.get(`${API_URL}/api/courses/${this.state.course}/questions`)
            .then(res => {
                const results = res.data;
                this.setState({
                    results: results,
                    question: {
                        course_id: this.state.course,
                        quiz_id: null,
                        lesson_id: null,
                        text: '',
                        active: true,
                        answers: [
                        ]
                    },
                    questionField: ''
                });
                var newQuestions = results.filter((elem, i, array) => {
                    if (elem.active === 1) {
                        return results
                    }
                });
                if (newQuestions.length < 1) {
                    this.setState({
                        activateAll: false
                    })
                } else {
                    this.setState({
                        activateAll: true
                    })
                }
            }).catch(error => {
                console.log(error)
            })
    };

    toggleAll = () => {
        const questions = this.state.results;
        var newQuestions = questions.filter((elem, i, array) => {
            if (elem.active === 1) {
                return questions
            }
        });
        if (newQuestions.length < 1) {
            axios.post(`${API_URL}/api/courses/${this.state.course}/final/activate`)
                .then(res => {
                    this.getQuestions();
                })
        } else {
            axios.post(`${API_URL}/api/courses/${this.state.course}/final/desactivate`)
                .then(res => {
                    this.getQuestions();
                })
        }
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

    openMessage = (message) => {
        this.setState({
            message: {
                ...this.state.message,
                open: true,
                text: message
            }
        })
    }

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
        var newQuestions = questions.filter((elem, i, array) => {
            if (elem.id === id) {
                elem.active = event.target.checked;
            }
            return questions
        });
        axios.put(`${API_URL}/api/courses/${this.state.course}/questions/${id}`, {
            active: event.target.checked
        })
            .then(res => {
                this.setState({
                    results: newQuestions
                })
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
        const question = this.state.question;
        const answers = question.answers;
        const newAnswers = answers.filter((elem) => {
            if (elem.correct) {
                return answers
            }
        });
        if (newAnswers.length < 1) {
            this.openMessage('Selecione ao menos 1 resposta correta');
        } else {
            axios.post(`${API_URL}/api/courses/${this.state.course}/quiz/${this.state.quiz_id}/questions`, { question })
                .then(res => {
                    this.openMessage('Questão Inserida com sucesso!');
                    this.getQuestions();
                    this.closeModal();
                })
        }
    }

    openModal = type => () => {
        this.setState({ modal: { type: type, open: true } });
    };

    closeModal = () => this.setState({
        modal: {
            ...this.state.modal,
            type: '',
            open: false,
            message: ''
        }
    });

    createQuiz = () => {
        axios.put(`${API_URL}/api/courses/${this.state.course}/quiz/${this.state.quiz_id}`, {
            active: 1
        })
        .then(res => {
            this.openMessage('Quiz criado com sucesso');
            setTimeout(function () {
                this.setState({
                    returnCourse: true
                })
            }.bind(this), 3000);
        })
    }

    render() {
        const { message, questions, results, modal, questionField, answerField, question, activateAll } = this.state;
        if (this.state.returnCourse === true) {
            return <Redirect to={'/admin/courses/' + this.state.course} />
        }
        return (
            <Admin heading="Quiz">
                <Message text={message.text} open={message.open} close={this.closeMessage} />
                <Grid container justify='space-between'>
                    <Grid item xs={3} align='left'>
                        <br /><br /><br />
                        <FormControlLabel
                            control={
                                <Switch
                                    onChange={this.toggleAll}
                                    color='primary'
                                    value={activateAll}
                                    checked={activateAll}
                                />
                            }
                            label={activateAll ? 'Remover todos' : 'Adicionar todos'}
                        />
                    </Grid>
                    <Grid item xs={3} align='right'>
                        <Button variant="contained" color="primary" onClick={this.openModal('quiz')}>
                            Criar Nova Pergunta
                        </Button>
                        <br /><br />
                        <Button variant={'contained'} onClick={this.createQuiz}>Salvar</Button>
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
                                                    checked={question.active ? true : false}
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
                    onClose={this.closeModal}
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
                                <List dense={true} key={answer.id}>
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
                        <Button onClick={this.closeModal} color="primary">
                            Cancelar
                        </Button>
                        {this.state.modal.edit ?
                            <Button color='primary' variant='contained' onClick={this.handleSubmitQuestion.bind(this, this.state.modal.type, this.state.lesson.id)} color="primary">
                                Editar
                            </Button>
                            :
                            <Button color='primary' variant='contained' onClick={this.handleSubmitQuestion.bind(this, this.state.modal.type)} color="primary">
                                Criar
                            </Button>
                        }
                    </DialogActions>
                </Dialog>

                {/* <Dialog
                    open={this.state.confirm}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Tem cer"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Let Google help apps determine location. This means sending anonymous location data to
                            Google, even when no apps are running.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Disagree
                        </Button>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog> */}
            </Admin>
        );
    }
}

export default Page;
