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
        }
    }

    componentDidMount() {
        // axios.get(`${ API_URL }/api/courses/${this.state.courseID}`)
        // .then(res => {
        //     const course = res.data;
        //     this.setState({ course: course });
        // });
        this.getLessons();
    }

    getLessons = () => {
        axios.get(`${ API_URL }/api/users/${this.state.user.id}/courses/${this.state.courseID}/lessons`)
        .then(res => {
            console.log(res);
            // const lessons = res.data;
            // this.setState({
            //     lesson: lessons[0],
            //     lessons: lessons,
            //     lessonsCount: lessons.length
            // });
        });
    };

    getLesson = (lessonID) => {
        axios.get(`${ API_URL }/api/courses/${this.state.courseID}/lessons/${lessonID}`)
        .then(res => {
            const lesson = res.data;
            this.setState({ lesson: lesson });
        });
    };

    endLesson = (lessonID) => {
        console.log(lessonID);
    };

    render() {
        const { course, lessons, lesson } = this.state;
        const { isAuthenticated, user } = this.props;
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
                                    <Progress value='0' total={this.state.lessonsCount} progress='ratio' />
                                </Grid.Column>
                                <Grid.Column width={5}>
                                    <Step.Group vertical>
                                        {/*{*/}
                                            {/*lessons ?*/}
                                                {/*lessons.map((lesson) =>*/}
                                                    {/*<Step completed link onClick={this.getLesson.bind(this, lesson.id)} key={lesson.id}>*/}
                                                        {/*<Icon name='truck' />*/}
                                                        {/*<Step.Content>*/}
                                                            {/*<Step.Title>{lesson.title}</Step.Title>*/}
                                                        {/*</Step.Content>*/}
                                                    {/*</Step>*/}
                                                {/*) : null*/}
                                        {/*}*/}
                                    </Step.Group>
                                </Grid.Column>
                                <Grid.Column width={11}>
                                    <Segment>
                                        <Header as='h2'>Detalhes do Curso</Header>
                                        <Divider />
                                        {lesson ?
                                            <div>
                                                <h4>{lesson.title}</h4>
                                                <p>{lesson.content}</p>
                                                <Button positive floated='right' onClick={this.endLesson.bind(this, lesson.id)}>Finalizar
                                                    lição</Button>
                                            </div>
                                        : null }
                                    </Segment>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Container>
                </main>
                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated : state.Auth.isAuthenticated,
        user: state.Auth.user
    }
};

export default connect(mapStateToProps)(Page);
