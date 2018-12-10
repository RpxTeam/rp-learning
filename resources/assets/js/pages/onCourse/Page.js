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
            lessonsCount: 0,
            endLessons: 0
        }
    }

    getData = () => {
        axios.get(`${ API_URL }/api/users/${this.state.user.id}/courses/${this.state.courseID}/lessons`)
            .then(res => {
                const lessons = res.data.lessons;
                let endLessons = lessons.filter(lesson => {
                    if (lesson.view === false || lesson.view != null ) {
                        return lessons
                    }
                });
                let newLessons = lessons.filter(lesson => {
                    if(lesson.view === false) {
                        return lessons;
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
        axios.put(`${ API_URL }/api/users/${this.state.user.id}/courses/${this.state.courseID}/lessons/${lessonID}`, {
            view: 1
        })
        .then(res => {
            this.getData();
            console.log('Lição Finalizada');
        });
    };

    render() {
        const { lessons, lesson, endLessons, lessonsCount } = this.state;
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
                                content='Cursos'
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
                                    <Progress value={endLessons} total={lessonsCount} progress='ratio' success={endLessons === lessonsCount} />
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
                                                <p>{lesson.content}</p>
                                                {!lesson.view ?
                                                    <Button positive floated='right' onClick={this.endLesson.bind(this, lesson.id)}>Finalizar
                                                    lição</Button>
                                                : null }
                                            </div>
                                    </Segment>
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
