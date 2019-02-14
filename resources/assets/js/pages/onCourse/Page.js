import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import {
    Container,
    Header,
    Icon,
    Segment,
    Card,
    Image,
    Divider,
    List,
    Tab,
    Progress,
    Modal
} from 'semantic-ui-react'
import Navigation from '../../common/navigation'
import Banner from '../../components/Banner'
import { API_URL } from "../../common/url-types";
import "video-react/dist/video-react.css";
import { Player } from 'video-react';
import ReactPlayer from 'react-player'
import Message from '../../components/Message';

import Grid from '@material-ui/core/Grid';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';

import styled from 'styled-components';

const Btn = styled(Button)`
    margin: 0 100px!important;
`
function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courseID: this.props.match.params.id,
            user: this.props.user,
            course: {
                id: '',
                title: '',
                create_at: '',
                description: ''
            },
            message: {
                open: false,
                text: ''
            },
            onCourse: false,
            progress: 0,
            endLessons: 0,
            lessonsCount: 0,
            notFound: false,
            last: '',
            modal: {
                open: false
            },
            activeLesson: 0,
            hasQuestion: false,
            question: {
                text: '',
            },
            answers: [],
            quiz: false,
            chooses: [],
            finalQuiz: false,
            quizzes: [],
            finalQuestions: [],
            finalChooses: [],
            finalAnswers: [],
            dialogQuizFinal: false
        }

        this.openMessage = this.openMessage.bind(this);
    }

    getData = () => {
        axios.get(`${API_URL}/api/users/${this.state.user.id}/courses/${this.state.courseID}`)
            .then(res => {
                if (res.data.progress != null) {
                    const progress = res.data.progress;
                    const course = res.data;
                    this.setState({ course: course, progress: progress });
                    this.verifyFinalComplete();
                } else {
                    this.setState({ onCourse: true })
                }
            }).catch(res => {
                // this.setState({ notFound: true })
            });

        axios.get(`${API_URL}/api/users/${this.state.user.id}/courses/${this.state.courseID}/lessons`)
            .then(res => {
                const lessons = res.data.lessons;
                let endLessons = lessons.filter(lesson => {
                    if (lesson.view === false || lesson.view === null) {
                        return lessons
                    }
                });

                if (endLessons.length > 0) {
                    this.setState({
                        lesson: endLessons[0]
                    });
                } else {
                    this.setState({
                        last: true
                    })
                }

                const last = lessons.length - 1;

                this.setState({
                    last: lessons[last].id,
                    lessons: lessons,
                    lessonsCount: lessons.length,
                    endLessons: endLessons.length,
                });
            });

        axios.get(`${API_URL}/api/courses/${this.state.courseID}/quiz`)
            .then(res => {
                this.setState({
                    quiz_id: res.data
                })
                this.verifyFinalComplete();
            })

    };

    verifyFinalComplete = () => {
        axios.get(`${API_URL}/api/users/${this.state.user.id}/courses/${this.state.courseID}/quiz/${this.state.quiz_id}/final`)
            .then(res => {
                if (res.data !== 200) {
                    this.getFinalQuiz();
                }
            })
    }

    getFinalQuiz = () => {
        axios.get(`${API_URL}/api/users/${this.state.user.id}/points`)
            .then(res => {
                console.log(res);
            })
        axios.get(`${API_URL}/api/courses/${this.state.courseID}/active`)
            .then(res => {
                if ((res.data != null && res.data === 1) || (res.data != null && res.data === "1")) {
                    this.setState({
                        finalQuiz: true
                    });
                    axios.get(`${API_URL}/api/courses/${this.state.courseID}/final`)
                        .then(res => {
                            const questions = res.data;
                            questions.map((question) => {
                                question.answers.map((answer) => {
                                    this.setState(prevState => ({
                                        finalChooses: [
                                            ...prevState.finalChooses,
                                            {
                                                id: answer.id,
                                                text: answer.text,
                                                correct: false
                                            }
                                        ],
                                        finalAnswers: [
                                            ...prevState.finalAnswers,
                                            {
                                                id: answer.id,
                                                text: answer.text,
                                                correct: answer.correct === 1 || answer.correct === "1" ? true : false
                                            }
                                        ],
                                    }))
                                })
                            });
                            this.setState({
                                finalQuestions: questions,
                            });
                        })
                }
            });
    }

    componentDidMount() {
        this.getData();
    }

    getLessons = () => {
        axios.get(`${API_URL}/api/users/${this.state.user.id}/courses/${this.state.courseID}/lessons`)
            .then(res => {
                const lessons = res.data.lessons;
                let endLessons = lessons.filter(lesson => {
                    if (lesson.view === false || lesson.view === null) {
                        return lessons
                    }
                });

                this.setState({
                    lessons: lessons,
                    lessonsCount: lessons.length,
                    endLessons: endLessons.length,
                });
            });
    };

    getLesson = (id) => {
        axios.get(`${API_URL}/api/users/${this.state.user.id}/courses/${this.state.courseID}/lessons/${id}`)
            .then(res => {
                const lesson = res.data.lessons;
                this.setState({ lesson: lesson })
            });
    };

    nextLesson = () => {
        axios.get(`${API_URL}/api/users/${this.state.user.id}/courses/${this.state.courseID}/lessons`)
            .then(res => {
                const lessons = res.data.lessons;
                let endLessons = lessons.filter(lesson => {
                    if (lesson.view === false || lesson.view === null) {
                        return lessons
                    }
                });

                if (endLessons.length > 0) {
                    this.setState({
                        lesson: endLessons[0]
                    });
                } else {
                    this.setState({
                        last: true
                    });
                }

                this.setState({
                    lessons: lessons,
                    lessonsCount: lessons.length,
                    endLessons: endLessons.length,
                });
            });
    };

    endLesson = (id) => {
        axios.get(`${API_URL}/api/users/${this.state.user.id}/courses/${this.state.courseID}`)
            .then(res => {
                const course = res.data;
                let percentLesson = 100 / this.state.lessonsCount;
                let progress = parseFloat(course.progress) + parseFloat(percentLesson);
                progress = progress.toFixed(0);
                if (progress >= 98) {
                    progress = 100;
                    this.updateLevel(this.state.user.id, this.state.courseID);
                }
                this.setState({ course: course });
                this.updateProgress(progress);
            });

        const day = new Date();
        const month = day.getMonth() + 1;
        const finish = day.getFullYear() + '-' + month + '-' + day.getDate();

        axios.put(`${API_URL}/api/users/${this.state.user.id}/courses/${this.state.courseID}/lessons/${id}`, {
            view: 1,
            finish: finish
        })
            .then(res => {
                this.getLessons();
                this.getLesson(id);

                this.updateLevel(this.state.user.id, this.state.courseID, id);

                this.handleNextStep();
            });

    };

    updateLevel = (user, course, lesson) => {
        if (lesson) {
            axios.post(`${API_URL}/api/users/${user}/courses/${course}/lessons/${lesson}/points`)
                .then(res => {
                    console.log(res);
                })
        } else {
            axios.post(`${API_URL}/api/users/${user}/courses/${course}/points`)
                .then(res => {
                    console.log(res);
                })
        }
    }

    updateProgress = (progress) => {
        axios.put(`${API_URL}/api/users/${this.state.user.id}/courses/${this.state.courseID}`, {
            progress: progress
        })
            .then(() => {
                this.setState({ progress: progress });
                if (progress === 100) {
                    this.openModal();
                }
            }
            );
    };

    formatIcons = (type) => {
        let icon = 'file';
        switch (type) {
            case 'text':
                icon = icon + ' outline';
                break;
            case 'video-internal':
                icon = icon + ' video';
                break;
            case 'video-external':
                icon = icon + ' video outline';
                break;
            case 'audio':
                icon = icon + ' audio outline';
                break;
            default:
                icon = 'file';
        }
        return icon;
    };

    openModal = () => this.setState({ modal: { open: true } });
    closeModal = () => this.setState({
        modal: {
            ...this.state.modal,
            open: false,
            message: ''
        }
    });

    handleStep = (step) => {
        this.setState({
            activeLesson: step,
        });
    };

    handleNextStep = () => {
        this.setState(state => ({
            activeLesson: state.activeLesson + 1,
        }));
    };

    handleBackStep = () => {
        this.setState(state => ({
            activeLesson: state.activeLesson - 1,
        }));
    };

    handleClickOpen = () => {
        this.setState({
            modal: {
                open: true
            }
        });
    };

    handleCheckQuiz = id => event => {
        const chooses = this.state.chooses;
        let newChooses = chooses.filter(choose => {
            if (choose.id === id) {
                choose.correct = event.target.checked
            }
            return chooses
        });
        this.setState({
            chooses: newChooses
        });
    };

    openQuiz = (id) => {
        this.setState({
            currentLesson: id
        });
        axios.get(`${API_URL}/api/courses/${this.state.courseID}/lessons/${id}/questions`)
            .then(res => {
                const result = res.data;
                this.setState({
                    question: {
                        id: result.id,
                        'text': result.text,
                    },
                    quiz: true
                })
                const answers = result.answers;
                answers.map((answer) => {
                    this.setState(prevState => ({
                        chooses: [
                            ...prevState.chooses,
                            {
                                id: answer.id,
                                text: answer.text,
                                correct: false
                            }
                        ],
                        answers: [
                            ...prevState.answers,
                            {
                                id: answer.id,
                                text: answer.text,
                                correct: answer.correct === "1" || answer.correct === 1 ? true : false
                            }
                        ]
                    }))
                })
            });
    }

    closeQuiz = () => {
        this.setState({
            quiz: false,
            question: {
                text: '',
            },
            answers: [],
            chooses: []
        });
    }

    endQuiz = (id) => {
        const correctAnswers = this.state.answers;
        let chooses = this.state.chooses;
        if (JSON.stringify(chooses) === JSON.stringify(correctAnswers)) {
            axios.get(`${API_URL}/api/users/${this.state.user.id}/courses/${this.state.courseID}`)
                .then(res => {
                    const course = res.data;
                    let percentLesson = 100 / this.state.lessonsCount;
                    let progress = parseFloat(course.progress) + parseFloat(percentLesson);
                    progress = progress.toFixed(0);
                    if (progress >= 98) {
                        progress = 100;
                        this.updateLevel(this.state.user.id, this.state.courseID);
                    }
                    this.setState({ course: course });
                    this.updateProgress(progress);
                });

            const day = new Date();
            const month = day.getMonth() + 1;
            const finish = day.getFullYear() + '-' + month + '-' + day.getDate();

            axios.put(`${API_URL}/api/users/${this.state.user.id}/courses/${this.state.courseID}/lessons/${id}`, {
                view: 1,
                finish: finish
            })
                .then(res => {
                    this.openMessage('Resposta Correta');
                    this.getLessons();
                    this.getLesson(id);

                    this.updateLevel(this.state.user.id, this.state.courseID, id);

                    this.handleNextStep();

                    this.closeQuiz();
                });
        } else {
            this.openMessage('Resposta Errada');
        }
    }

    handleCheckFinal = (id) => event => {
        const finalChooses = this.state.finalChooses;
        let newChooses = finalChooses.filter(choose => {
            if (choose.id === id) {
                choose.correct = event.target.checked
            }
            return finalChooses
        });
        console.log(finalChooses)
        this.setState({
            finalChooses: newChooses
        });
    }

    endFinal = () => {
        const correctAnswers = this.state.finalAnswers;
        let chooses = this.state.finalChooses;
        console.log(correctAnswers)
        console.log(chooses);
        if (JSON.stringify(chooses) === JSON.stringify(correctAnswers)) {
            this.endCourse(this.state.course.id, true);
            this.setState({
                finalQuiz: false
            })
            this.cancelFinal();
            this.openMessage('Quiz Finalizado com Sucesso!');
        } else {
            this.openMessage('Respostas Erradas');
        }
    }

    endCourse = (course, quiz) => {
        const day = new Date();
        const month = day.getMonth() + 1;
        const finish = day.getFullYear() + '-' + month + '-' + day.getDate();
        if (quiz) {
            axios.post(`${API_URL}/api/users/${this.state.user.id}/courses/${course}/quiz/${this.state.quiz_id}/points`)
                .then(res => {
                    console.log(res);
                })
        }
        axios.put(`${API_URL}/api/users/${this.state.user.id}/courses/${course}`, {
            finish: finish
        })
            .then(res => {
                console.log(res);
            });
    }

    openFinal = () => {
        this.setState({
            dialogQuizFinal: true
        })
    }

    cancelFinal = () => {
        this.setState({
            dialogQuizFinal: false
        });
    }

    openMessage = (message) => {
        this.setState({
            message: {
                open: true,
                text: message
            }
        })
    }

    closeMessage = () => {
        this.setState({
            message: {
                open: false,
                text: ''
            }
        })
    }

    render() {
        const { course, modal, courseID, lessons, lesson, endLessons, progress, activeLesson, question, chooses, message } = this.state;
        if (this.state.onCourse === true) {
            return <Redirect to={'/courses/' + courseID + '/details'} />
        } else if (this.state.notFound) {
            return <Redirect from='*' to='/404' />
        }
        return (
            <div>
                <Message close={this.closeMessage} text={message.text} open={message.open} />
                <Navigation />
                <main className="fadeIn animated">
                    <Banner
                        internal
                        title={course.title}
                        image={course.image}
                    />
                    <Container>
                        <br /><br />
                        {this.state.finalQuiz && this.state.progress > 98 ?
                            <Grid container justify={'center'}>
                                <Button variant="contained" onClick={this.openFinal} color="primary">Realizar teste final</Button>
                            </Grid>
                            : null}
                        {lessons ?
                            <Stepper
                                activeStep={activeLesson}
                                orientation="vertical"
                                nonLinear
                                style={{ maxWidth: 992, margin: '0 auto' }}
                            >
                                {lessons.map((lesson, index) => (
                                    <Step key={lesson.id}>
                                        <StepButton onClick={this.handleStep.bind(this, index)} completed={lesson.view ? true : false}>
                                            {lesson.title}
                                        </StepButton>
                                        <StepContent>
                                            <Grid container>
                                                <Grid item xs={12}>
                                                    {lesson.type === 'text' ?
                                                        <div dangerouslySetInnerHTML={{ __html: lesson.content }}></div>
                                                        : null}
                                                    {lesson.type === 'video-internal' ?
                                                        <Player
                                                            playsInline
                                                            poster="/assets/poster.png"
                                                            src={API_URL + '/api/courses/' + courseID + '/lessons/' + lesson.id + '/media'}
                                                        />
                                                        : null}
                                                    {lesson.type === 'video-external' ?
                                                        <ReactPlayer url={lesson.content} controls width={'100%'} height={450} />
                                                        : null}
                                                    {lesson.type === 'ppt' ?
                                                        lesson.content
                                                        : null}
                                                    {lesson.type === 'doc' || lesson.type === 'pdf' ?
                                                        <iframe src={lesson.content + '#toolbar=0'} width="100%" height="700px"></iframe>
                                                        : null}
                                                    {lesson.type === 'audio' ?
                                                        <audio controls controlsList="nodownload">
                                                            <source
                                                                src={API_URL + '/api/courses/' + courseID + '/lessons/' + lesson.id + '/media'}
                                                                type={lesson.mime}
                                                            />
                                                            Your browser does not support the audio element.
                                                        </audio>
                                                        : null}
                                                </Grid>
                                                <Grid item xs={12} style={{ margin: 10 }}>
                                                    <Grid container justify={'flex-end'} align={'center'}>
                                                        <Grid item xs={2}>
                                                            <Button
                                                                disabled={activeLesson === 0}
                                                                onClick={this.handleBackStep}
                                                            >
                                                                Anterior
                                                            </Button>
                                                        </Grid>
                                                        {activeLesson === lessons.length - 1 ?
                                                            null
                                                            :
                                                            <Grid item xs={2}>
                                                                <Button
                                                                    variant="contained"
                                                                    color="primary"
                                                                    onClick={this.handleNextStep}
                                                                >
                                                                    Próxima
                                                                </Button>
                                                            </Grid>
                                                        }
                                                        {lesson.view ? null :
                                                            <Grid item xs={2}>
                                                                <Button
                                                                    variant="contained"
                                                                    color="primary"
                                                                    onClick={lesson.question ? this.openQuiz.bind(this, lesson.id) : this.endLesson.bind(this, lesson.id)}
                                                                >
                                                                    Finalizar Lição
                                                                </Button>
                                                            </Grid>
                                                        }
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </StepContent>
                                    </Step>
                                ))}
                            </Stepper>
                            : null}
                    </Container>
                </main>
                <Dialog
                    open={modal.open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.closeModal}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        Parabéns {this.props.user.name} você concluiu o curso
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <img src='/images/conclusion.jpg' style={{ display: 'block', margin: '0 auto' }} />
                            Você concluiu o curso de {course.title}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeModal} color="primary">
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.quiz}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.closeQuiz}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        {question.text}
                    </DialogTitle>
                    <DialogContent>
                        <FormControl component="fieldset">
                            <FormGroup>
                                {chooses.map((choose, index) =>
                                    <FormControlLabel
                                        key={choose.id}
                                        control={
                                            <Checkbox checked={choose.correct} color={'primary'} onChange={this.handleCheckQuiz(choose.id)} />
                                        }
                                        label={choose.text}
                                    />
                                )}
                            </FormGroup>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.endQuiz.bind(this, this.state.currentLesson)} color="primary" autoFocus>
                            Enviar
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={this.state.dialogQuizFinal}
                    TransitionComponent={Transition}
                    keepMounted
                    fullScreen
                    onClose={this.closeQuiz}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title" align="center" component="h2">
                        Teste Final
                            </DialogTitle>
                    <DialogContent>
                        <FormControl component="fieldset">
                            {this.state.finalQuestions.map((question) =>
                                <React.Fragment key={question.id}>
                                    <DialogTitle>
                                        {question.text}
                                    </DialogTitle>
                                    <DialogContentText>
                                        <FormGroup>
                                            {question.answers.map((choose, index) =>
                                                <FormControlLabel
                                                    key={choose.id}
                                                    control={
                                                        <Checkbox color={'primary'} onChange={this.handleCheckFinal(choose.id)} />
                                                    }
                                                    label={choose.text}
                                                />
                                            )}
                                        </FormGroup>
                                    </DialogContentText>
                                </React.Fragment>
                            )}
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.cancelFinal} color="primary" autoFocus>
                            Cancelar
                            </Button>
                        <Button variant="contained" onClick={this.endFinal.bind(this)} color="primary" autoFocus>
                            Enviar
                            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default Page;
