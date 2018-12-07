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
    Tab
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
            course: {
                id: '',
                title: '',
                create_at: '',
                description: ''
            },
            message: '',
            onCourse: false
        }
    }

    componentDidMount() {
        axios.get(`${ API_URL }/api/courses/${this.state.courseID}`)
        .then(res => {
            const course = res.data;
            this.setState({ course: course });
        });
        this.getLessons();
    }

    getLessons = () => {
        axios.get(`${ API_URL }/api/courses/${this.state.courseID}/lessons`)
        .then(res => {
            const lessons = res.data;
            this.setState({ lessons: lessons, lessonsCount: lessons.length });
        });
    };

    startCourse = () => {
        axios.post(`${ API_URL }/api/users/${this.props.user.id}/courses/${this.state.courseID}`, {
            view: 1,
            progress: 50.000,
            finish: '10/10/2018',
            rating: 5,
            testimonial: 'dasdsadeewdwdwdwedwe',
            favorite: 1,
        })
        .then(res => {
            console.log('Sucesso');
            this.setState({ onCourse: true })
        });

        axios.put(`${ API_URL }/api/users/${this.props.user.id}/courses/${this.state.courseID}`, {
            view: 1,
            progress: 50.000,
            finish: '2018-10-10',
            rating: 5,
            testimonal: 'dasdsadeewdwdwdwedwe',
            favorite: 1,
        })
        .then(res => {
            console.log('Sucesso');
        });
    }

    render() {
        const { course, lessons } = this.state;
        const { isAuthenticated, user } = this.props;
        if (this.state.onCourse === true) {
            return <Redirect to={'/courses/' + course.id} />
        }
        const panes = [
            { menuItem: 'Descrição', render: () => <Tab.Pane attached={false}>{course.description}</Tab.Pane> },
            { menuItem: 'Lições', render: () => <Tab.Pane attached={false}>
                    {
                        lessons.map((lesson) =>
                            <List divided verticalAlign='middle' key={lesson.id}>
                                <List.Item style={{paddingTop: '1em', paddingBottom: '1em'}}>
                                    <List.Content floated='right'>{lesson.title}</List.Content>
                                    <Icon name='file' />
                                    <List.Content>Lições</List.Content>
                                </List.Item>
                            </List>
                        )
                    }
                </Tab.Pane> },
            { menuItem: 'Autores', render: () => <Tab.Pane attached={false}>{course.instructor}</Tab.Pane> },
            // { menuItem: 'Depoimentos', render: () => <Tab.Pane attached={false}>Tab 4 Content</Tab.Pane> },
        ];
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
                                <Grid.Column width={11}>
                                    <Segment basic>
                                        <Header as='h2' floated='left'>
                                            {course.title}
                                        </Header>
                                        <Button size='big' basic color='blue' floated='right' onClick={this.startCourse}>Iniciar Curso</Button>
                                    </Segment>
                                    <Divider hidden clearing />
                                    <Divider />
                                    <Image src='https://assets.wordpress.envato-static.com/uploads/2017/08/tropical-PS53BSA.jpg' />
                                    <Divider hidden />
                                    {course.description}
                                    <Divider hidden />
                                    <Tab color='blue' attached={'true'} menu={{ secondary: true }} panes={panes} />
                                </Grid.Column>
                                <Grid.Column width={5}>
                                    <Segment>
                                        <Header as='h2'>Detalhes do Curso</Header>
                                        <Divider />
                                        <List divided verticalAlign='middle'>
                                            <List.Item style={{paddingTop: '1em', paddingBottom: '1em'}}>
                                                <List.Content floated='right'>{this.state.lessonsCount}</List.Content>
                                                <Icon name='file' />
                                                <List.Content>Lições</List.Content>
                                            </List.Item>
                                            <List.Item style={{paddingTop: '1em', paddingBottom: '1em'}}>
                                                <List.Content floated='right'>{course.duration}</List.Content>
                                                <Icon name='file' />
                                                <List.Content>Duração</List.Content>
                                            </List.Item>
                                            <List.Item style={{paddingTop: '1em', paddingBottom: '1em'}}>
                                                <List.Content floated='right'>{course.start_date}</List.Content>
                                                <Icon name='file' />
                                                <List.Content>Data de Início</List.Content>
                                            </List.Item>
                                            <List.Item style={{paddingTop: '1em', paddingBottom: '1em'}}>
                                                <List.Content floated='right'>{course.end_date}</List.Content>
                                                <Icon name='file' />
                                                <List.Content>Data de Término</List.Content>
                                            </List.Item>
                                        </List>
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
