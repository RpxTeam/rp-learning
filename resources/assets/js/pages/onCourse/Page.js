import React from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import {
    Button,
    Container,
    Grid,
    Header,
    Icon,
    Segment,
    Card,
    Image,
    Divider,
    Step,
    List,
    Tab,
    Progress
} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import PageHeader from '../../common/pageHeader'
import Navigation from '../../common/navigation'
import Footer from '../../common/mainFooter'
import {API_URL} from "../../common/url-types";

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
            notFound: false
        }
    }

    getData = () => {
        axios.get(`${ API_URL }/api/users/${this.state.user.id}/courses/${this.state.courseID}`)
            .then(res => {
                if(res.data.progress != null) {
                    const progress = res.data.progress;
                    const course = res.data;
                    this.setState({ course: course, progress: progress.toFixed(0) });
                } else {
                    this.setState({ onCourse: true })
                }
            }).catch(res => {
                this.setState({ notFound: true })
            });

        axios.get(`${ API_URL }/api/users/${this.state.user.id}/courses/${this.state.courseID}/lessons`)
        .then(res => {
            const lessons = res.data.lessons;
            let endLessons = lessons.filter(lesson => {
                if (lesson.view === false || lesson.view != null ) {
                    return lessons
                }
            });

            this.setState({
                lesson: lessons[0],
                lessons: lessons,
                lessonsCount: lessons.length,
                endLessons: endLessons.length,
            });
        });
    };

    componentDidMount() {
        this.getData();
    }

    getLesson = (lessonID) => {
        axios.get(`${ API_URL }/api/users/${this.state.user.id}/courses/${this.state.courseID}/lessons/${lessonID}`)
        .then(res => {
            const lesson = res.data.lessons;
            this.setState({lesson: lesson})
        });
    };

    endLesson = (lessonID) => {
        axios.get(`${ API_URL }/api/users/${this.state.user.id}/courses/${this.state.courseID}`)
        .then(res => {
            const course = res.data;
            const percentLesson = 100 / this.state.lessonsCount;
            const progress = course.progress + percentLesson;
            this.setState({ course: course, progress: progress.toFixed(0) });
            this.updateProgress(progress);
        });

        axios.put(`${ API_URL }/api/users/${this.state.user.id}/courses/${this.state.courseID}/lessons/${lessonID}`, {
            view: 1
        })
            .then(res => {
                this.getData();
            });

    };

    updateProgress = (progress) => {
        axios.put(`${ API_URL }/api/users/${this.state.user.id}/courses/${this.state.courseID}`, {
            progress: progress
        });
    };

    render() {
        const { courseID, lessons, lesson, endLessons, progress } = this.state;
        if (this.state.onCourse === true) {
            return <Redirect to={'/courses/' + courseID + '/details'} />
        } else if(this.state.notFound) {
            return <Redirect from='*' to='/404' />
        }
        return (
            <div>
                <Navigation/>
                <main className="fadeIn animated">
                    <div style={{
                        background: '#A2A2A2',
                        marginBottom: '5em'
                    }}>
                        <Container>
                            <Header
                                as='h1'
                                content={this.state.course.title}
                                inverted
                                style={{
                                    fontSize: '3em',
                                    fontWeight: 'normal',
                                    paddingBottom: '1em',
                                    paddingTop: '1em',
                                }}
                            />
                        </Container>
                    </div>
                    <Container>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={16}>
                                    <Progress percent={progress} progress autoSuccess />
                                </Grid.Column>
                                <Grid.Column width={5}>
                                    <Step.Group vertical>
                                        {
                                            lessons ?
                                                lessons.map((lesson) =>
                                                    <Step completed={lesson.view != null} link onClick={this.getLesson.bind(this, lesson.id)} key={lesson.id}>
                                                        <Icon name='truck' />
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
                                                <h4>{lesson.title}</h4>
                                                {lesson.type === 'text' ?
                                                    <div dangerouslySetInnerHTML = {{ __html : lesson.content }}></div>
                                                : null }
                                                {lesson.type === 'video-internal' ?
                                                    <video width="400" controls>
                                                        <source src={lesson.content} type={lesson.mime} />
                                                        Your browser does not support HTML5 video.
                                                    </video>
                                                : null }
                                                {lesson.type === 'video-external' ?
                                                    <iframe
                                                        width="100%" height="420"
                                                        src={lesson.content}
                                                        frameBorder="0"
                                                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" />
                                                : null }
                                                {lesson.type === 'ppt' ?
                                                    lesson.content
                                                : null }
                                                {lesson.type === 'pdf' ?
                                                    <object data={lesson.content} type="application/pdf" width="100%" height="700px">
                                                        <iframe src={lesson.content} width="100%" height="700px"></iframe>
                                                    </object>
                                                : null }
                                                {lesson.type === 'audio' ?
                                                    <audio controls>
                                                        <source src={lesson.content} type={lesson.mime} />
                                                        Your browser does not support the audio element.
                                                    </audio>
                                                : null }
                                            </div>
                                    </Segment>
                                    {!lesson.view ?
                                        <Button positive floated='right' onClick={this.endLesson.bind(this, lesson.id)}>Finalizar
                                            lição</Button>
                                        : null }
                                </Grid.Column>
                                : null }
                            </Grid.Row>
                        </Grid>
                    </Container>
                </main>
                <Footer/>
            </div>
        );
    }
}

export default Page;
