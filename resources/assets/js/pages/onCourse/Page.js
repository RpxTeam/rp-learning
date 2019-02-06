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
import Footer from '../../common/mainFooter'
// import Button from '../../components/Button'
import { API_URL } from "../../common/url-types";
import "video-react/dist/video-react.css";
import { Player } from 'video-react';
import ReactPlayer from 'react-player'
import Modules from '../../components/Modules';
import InfoLesson from '../../components/InfoLesson';
import Module from '../../components/Module';

import Grid from '@material-ui/core/Grid';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepButton from '@material-ui/core/StepButton';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

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
            message: '',
            onCourse: false,
            progress: 0,
            endLessons: 0,
            lessonsCount: 0,
            notFound: false,
            last: '',
            modal: {
                open: false
            },
            activeLesson: 0
        }
    }

    getData = () => {
        axios.get(`${API_URL}/api/users/${this.state.user.id}/courses/${this.state.courseID}`)
            .then(res => {
                if (res.data.progress != null) {
                    const progress = res.data.progress;
                    const course = res.data;
                    this.setState({ course: course, progress: progress });
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

    render() {
        const { course, modal, courseID, lessons, lesson, endLessons, progress, activeLesson } = this.state;
        if (this.state.onCourse === true) {
            return <Redirect to={'/courses/' + courseID + '/details'} />
        } else if (this.state.notFound) {
            return <Redirect from='*' to='/404' />
        }
        return (
            <div>
                <Navigation />
                <main className="fadeIn animated">
                    <Banner
                        internal
                        title={course.title}
                        image={course.image}
                    />
                    {/* <Grid>
                        <Modules>
                            {
                                lessons ?
                                    lessons.map((lesson) =>
                                        <Module key={lesson.id} title={'Lição ' + lesson.id} disabled={lesson.view === null} onClick={this.getLesson.bind(this, lesson.id)} />
                                    ) : null
                            }
                        </Modules>
                        {lesson ?
                            <React.Fragment>
                                <InfoLesson title={lesson.title} theme="" />
                                <div className="content-lesson">
                                    <div className="gridD">
                                        <div className="content">
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
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                            : null}
                    </Grid> */}
                    <Container>
                        {lessons ?
                            <Stepper
                                activeStep={activeLesson}
                                orientation="vertical"
                                nonLinear
                                style={{ maxWidth: 992, margin: '0 auto' }}
                            >
                                {lessons.map((lesson, index) => (
                                    <Step key={lesson.id}>
                                        <StepButton onClick={this.handleStep.bind(this, index)} completed={lesson.view}>
                                            {lesson.title} | {index}
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
                                                                    onClick={this.endLesson.bind(this, lesson.id)}
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
                        {/* <Grid>
                            <Grid.Row>
                                <Grid.Column width={16}>
                                    <Progress percent={progress} progress autoSuccess />
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Step.Group vertical size='mini'>
                                        {
                                            lessons ?
                                                lessons.map((lesson) =>
                                                    <Step completed={lesson.view != null} link onClick={this.getLesson.bind(this, lesson.id)} key={lesson.id}>
                                                        <Icon name={this.formatIcons(lesson.type)} />
                                                        <Step.Content>
                                                            <Step.Title>{lesson.title}</Step.Title>
                                                        </Step.Content>
                                                    </Step>
                                                ) : null
                                        }
                                    </Step.Group>
                                </Grid.Column>
                                {lesson ?
                                    <Grid.Column width={11}>
                                        <Segment>
                                            <Header as='h2'>{lesson.title}</Header>
                                            <Divider />
                                            <div>
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
                                            </div>
                                        </Segment> */}
                        {/* {!lesson.view ?
                                        <Button positive floated='right' onClick={this.endLesson.bind(this, lesson.id)}>Finalizar
                                            lição</Button>
                                        :
                                        this.state.last != lesson.id ?
                                            <Button positive basic floated='right' onClick={this.nextLesson.bind(this, lesson.id)}>Próxima lição</Button>
                                        : null
                                    } */}
                        {/* <Button
                                            className="btn-start"
                                            type='success'
                                            title={!lesson.view ? 'Finalizar lição' : 'Próxima Lição'}
                                            onClick={!lesson.view ? this.endLesson.bind(this, lesson.id) : this.nextLesson.bind(this, lesson.id)}
                                        /> */}
                        {/* </Grid.Column>
                                    : null}
                            </Grid.Row>
                        </Grid> */}
                    </Container>
                </main>
                {/* <Modal size={'tiny'} dimmer={'blurring'} open={modal.open} onClose={this.close}>
                    <Modal.Content style={{ textAlign: 'center' }}>
                        <Image wrapped size='medium' src='/images/conclusion.jpg' style={{ display: 'block', margin: '0 auto' }} />
                        <Modal.Description style={{ paddingTop: '20px' }}>
                            <Header>Parabéns {this.props.user.name} você concluiu o curso</Header>
                            <p>Você concluiu o curso de {course.title}</p>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions style={{ textAlign: 'center' }}>
                        <Button color='black' onClick={this.closeModal} content="Voltar" />
                        <Button
                            positive
                            content="Ir para a Lista de Cursos"
                            as={Link}
                            to={'/courses'}
                        />
                    </Modal.Actions>
                </Modal> */}
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
                            <Typography>
                                Você concluiu o curso de {course.title}
                            </Typography>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeModal} color="primary">
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default Page;
