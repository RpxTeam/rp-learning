import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import Navigation from '../../common/navigation'
import Banner from '../../components/Banner'
import { API_URL } from "../../common/url-types";
import "video-react/dist/video-react.css";
import { Player } from 'video-react';
import ReactPlayer from 'react-player'
import Message from '../../components/Message';

import {
    Grid,
    Stepper,
    Step,
    StepButton,
    StepContent,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
    FormControl,
    FormControlLabel,
    FormGroup,
    Checkbox,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Card,
    Typography,
    Divider
} from '@material-ui/core'

import AudioTrack from '@material-ui/icons/AudioTrack'
import LibraryBooks from '@material-ui/icons/LibraryBooks'
import VideoLibrary from '@material-ui/icons/VideoLibrary'
import VideoCam from '@material-ui/icons/VideoCam'
import InsertDriveFile from '@material-ui/icons/InsertDriveFile'
import CheckCircle from '@material-ui/icons/CheckCircle'

import styled from 'styled-components';
import Loader from '../../components/Loader';

const LoaderContainer = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffffff;
    z-index: 1;
    border: 1px solid #EEE;
`

const Container = styled(Grid)`
    margin: 0 -16px!important;
    background: #eeeeee;
    padding: null 15px;
    min-height: 80vh;
`

const LeftBar = styled(Grid)`
    background: #fff;
`

const CardLessons = styled(Card)`
    box-shadow: none!important;
`

const Lesson = styled.div`
    padding: 30px;
    max-width: 70%;
    margin: 30px auto 0;
    border: 1px solid #ddd;
    font-size: 16px;
    position: relative;
    @media(max-width: 1450px) {
        max-width: 100%;
        margin-left: 40px;
        margin-right: 40px;
    }
    h1, h2, h3, h4, h5, h6 {
        padding: 20px 0 10px;
    }
    p {
        display: block;
        font-size: 1em;
        line-height: 1.5em;
        color: #000;
    }
    li {
        font-size: 1em;
        line-height: 1.5em;
        font-weight: 300;
        margin-left: 20px;
    }
    img {
        margin-top: 15px;
        margin-bottom: 15px;
    }
    .audio {
        text-align: center;
    }
    iframe[frameborder] {
        width: 100%;
        height: 450px;
        margin: 15px 0;
    }
    .video-external {
        height: 600px;
        @media(max-width: 1360px) {
            height: 450px;
        }
        @media(max-width: 520px) {
            height: 350px;
        }
    }
    .video-external iframe {
        height: 600px;
        @media(max-width: 1360px) {
            height: 450px;
        }
        @media(max-width: 520px) {
            height: 350px;
        }
    }
`;

const LessonContainer = styled(Grid)`
    position: relative;
    min-height: 100%;
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
            dialogQuizFinal: false,
            loading: true
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
                    this.getQuizId();
                    this.verifyFinalComplete();
                    this.setState({
                        loading: false
                    }
                    )
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

    };

    getQuizId = () => {
        axios.get(`${API_URL}/api/courses/${this.state.courseID}/quiz`)
            .then(res => {
                console.log(res);
                this.setState({
                    quiz_id: res.data
                })
            })
    }

    verifyFinalComplete = () => {
        if(this.state.quiz_id){
            axios.get(`${API_URL}/api/users/${this.state.user.id}/courses/${this.state.courseID}/quiz/${this.state.quiz_id}/final`)
                .then(res => {
                    if (res.data !== 200) {
                        this.getFinalQuiz();
                    }
            })
        }
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
        this.setState({
            loading: true
        });

        axios.get(`${API_URL}/api/users/${this.state.user.id}/courses/${this.state.courseID}/lessons/${id}`)
            .then(res => {
                const lesson = res.data.lessons;
                this.setState({ lesson: lesson })
                this.setState({
                    loading: false
                });
                this.renderLesson();
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
                console.log(progress);
                if (progress >= 98) {
                    progress = 100;
                    this.updateLevel(this.state.user.id, this.state.courseID);
                }
                this.setState({ course: course });
                this.updateProgress(progress);

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

                if (progress >= 98 && this.state.quiz === false) {
                    this.openModal();
                    axios.post(`${API_URL}/api/users/${this.state.user.id}/courses/${this.state.courseID}/certification`)
                    .then(res => {
                        console.log(res);
                    })
                }
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
                this.openMessage('Lição Finalizada com sucesso');
            }
            );
    };

    formatIcons = (type) => {
        switch (type) {
            case 'text':
                return <LibraryBooks />
                break;
            case 'video-internal':
                return <VideoLibrary />
                break;
            case 'pdf':
                return <InsertDriveFile />
                break;
            case 'video-external':
                return <VideoCam />
                break;
            default:
                return <AudioTrack />
        }
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

    //finalizar quiz
    endQuiz = (id) => {
        const correctAnswers = this.state.answers;
        let chooses = this.state.chooses;
        let progress;
        if (JSON.stringify(chooses) === JSON.stringify(correctAnswers)) {
            axios.get(`${API_URL}/api/users/${this.state.user.id}/courses/${this.state.courseID}`)
                .then(res => {
                    const course = res.data;
                    let percentLesson = 100 / this.state.lessonsCount;
                    progress = parseFloat(course.progress) + parseFloat(percentLesson);
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

            if (progress >= 98 && this.state.course.final) {
                this.openModal();
                axios.post(`${API_URL}/api/users/${this.state.user.id}/courses/${this.state.courseID}/certification`)
                .then(res => {
                    console.log(res);
                })
            }
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
        this.setState({
            finalChooses: newChooses
        });
    }

    endFinal = () => {
        const correctAnswers = this.state.finalAnswers;
        let chooses = this.state.finalChooses;
        if (JSON.stringify(chooses) === JSON.stringify(correctAnswers)) {
            this.endCourse(this.state.course.id, true);
            this.setState({
                finalQuiz: false
            })
            this.cancelFinal();
            this.openMessage('Quiz Finalizado com Sucesso!');

            this.openModal();
            axios.post(`${API_URL}/api/users/${this.state.user.id}/courses/${this.state.courseID}/certification`)
                .then(res => {
                    console.log(res);
            })

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

    renderLesson = () => {
        document.querySelectorAll('oembed[url]').forEach(element => {
            const iframe = document.createElement('iframe');
            iframe.setAttribute('frameborder', '0');
            let url = element.getAttribute('url');
            if (url.indexOf('watch?v=') !== -1) {
                const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
                let match = url.match(regExp);
                let id = (match && match[7].length == 11) ? match[7] : false;

                iframe.setAttribute('allowfullscreen', '1');
                iframe.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');

                url = 'https://www.youtube.com/embed/' + id;
            } else if (url.indexOf('vimeo.com') !== -1) {
                const regExp = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/
                let match = url.match(regExp);
                let id = match[5];
                iframe.setAttribute('webkitallowfullscreen', '');
                iframe.setAttribute('mozallowfullscreen', '');
                iframe.setAttribute('allowfullscreen', '');
                url = 'https://player.vimeo.com/video/' + id + '?color=1da891&title=0&byline=0&portrait=0';
            } else {
                const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
                let match = url.match(regExp);
                console.log(match);
                // let id = (match&&match[7].length==11)? match[7] : false;

                // iframe.setAttribute( 'allowfullscreen', '1' );
                iframe.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');

                url = 'https://www.youtube.com/embed/' + id;
            }

            iframe.setAttribute('src', url);

            element.appendChild(iframe);
        });
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
                    <Container container spacing={16}>
                        {lessons ?
                            <LeftBar item md={3} sm={12} xs={12}>
                                <CardLessons>
                                    <List>
                                        {lessons.map((lesson, index) => (
                                            <React.Fragment key={index}>
                                                <ListItem button onClick={this.getLesson.bind(this, lesson.id)}>
                                                    <ListItemIcon>
                                                        {lesson.view != null ?
                                                            <CheckCircle color="secondary" />
                                                            : this.formatIcons(lesson.type)}
                                                    </ListItemIcon>
                                                    <ListItemText>
                                                        {lesson.title}
                                                    </ListItemText>
                                                </ListItem>
                                                <Divider />
                                            </React.Fragment>
                                        ))}
                                    </List>
                                </CardLessons>
                                <br />
                                {(this.state.finalQuiz && this.state.progress > "98") || (this.state.finalQuiz && this.state.progress > 98) ?
                                    <Button variant="contained" fullWidth size="large" onClick={this.openFinal} color="secondary">Realizar teste final</Button>
                                    : null}
                            </LeftBar>
                            : null}
                        {lesson ?
                            <LessonContainer item md={9} sm={12} xs={12}>
                                {this.state.loading ?
                                    <LoaderContainer>
                                        <Loader />
                                    </LoaderContainer>
                                    : null}
                                <Lesson>
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
                                        <div className="video-external">
                                            <ReactPlayer url={lesson.content} controls width={'100%'} height={450} />
                                        </div>
                                        : null}
                                    {lesson.type === 'ppt' ?
                                        lesson.content
                                        : null}
                                    {lesson.type === 'doc' || lesson.type === 'pdf' ?
                                        <iframe src={lesson.content + '#toolbar=0'} width="100%" height="700px"></iframe>
                                        : null}
                                    {lesson.type === 'audio' ?
                                        <div className="audio">
                                            <audio controls controlsList="nodownload">
                                                <source
                                                    src={API_URL + '/api/courses/' + courseID + '/lessons/' + lesson.id + '/media'}
                                                    type={lesson.mime}
                                                />
                                                Your browser does not support the audio element.
                                    </audio>
                                        </div>
                                        : null}
                                    {lesson.view ? null :
                                        <Grid container justify="center" style={{ marginTop: 50 }}>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                size="large"
                                                style={{ padding: '15px 50px', fontSize: 16 }}
                                                onClick={lesson.question ? this.openQuiz.bind(this, lesson.id) : this.endLesson.bind(this, lesson.id)}
                                            >
                                                Finalizar Lição
                                            </Button>
                                        </Grid>
                                    }
                                </Lesson>
                            </LessonContainer>
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
                        <br />
                        {/* <Grid container justify="center">
                            <Button variant="contained" color="primary" component={Link} href="_blank" to="/public/storage/certification/template/1-template.png">Ver certificado</Button>
                        </Grid> */}
                    </DialogContent>
                    <DialogActions>
                        <Button component={Link} to="/my-courses" color="secondary">
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
                                            <Checkbox checked={choose.correct} color={'secondary'} onChange={this.handleCheckQuiz(choose.id)} />
                                        }
                                        label={choose.text}
                                    />
                                )}
                            </FormGroup>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.endQuiz.bind(this, this.state.currentLesson)} color="secondary" autoFocus>
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
                                                        <Checkbox color={'secondary'} onChange={this.handleCheckFinal(choose.id)} />
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
                        <Button onClick={this.cancelFinal} color="secondary" autoFocus>
                            Cancelar
                            </Button>
                        <Button variant="contained" onClick={this.endFinal.bind(this)} color="secondary" autoFocus>
                            Enviar
                            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default Page;
