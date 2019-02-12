import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
// import {
//     Container,
//     Grid,
//     Header,
//     Icon,
//     Segment,
//     Card,
//     Image,
//     Divider,
//     Step,
//     List,
// } from 'semantic-ui-react'
import Banner from '../../components/Banner'
import Navigation from '../../common/navigation'
import Footer from '../../common/mainFooter'
import { API_URL } from "../../common/url-types"
import InfoCourse from '../../components/InfoCourse'
import Button from '../../components/Button'
// import Tabs from '../../components/Tabs'
import Detail from '../../components/details'
import Testimonial from '../../components/Testimonial'

import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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
            onCourse: false,
            value: 0
        }
    }

    getData = () => {
        if (this.props.isAuthenticated) {
            axios.get(`${API_URL}/api/users/${this.props.user.id}/courses/${this.state.courseID}`)
                .then(res => {
                    const { data } = res;
                    if (!data.view) {
                        axios.post(`${API_URL}/api/users/${this.props.user.id}/courses/${this.state.courseID}`);
                        axios.put(`${API_URL}/api/users/${this.props.user.id}/courses/${this.state.courseID}`, { view: 1 });
                    }
                    this.setState({ progress: data.progress });
                });
            axios.get(`${API_URL}/api/courses/${this.state.courseID}`)
                .then(res => {
                    const course = res.data;
                    this.setState({ course: course });
                });
        } else {
            axios.get(`${API_URL}/api/courses/${this.state.courseID}`)
                .then(res => {
                    const course = res.data;
                    this.setState({ course: course });
                });
        }
        this.getLessons();
    };

    componentDidMount() {
        this.getData();
    }

    getLessons = () => {
        axios.get(`${API_URL}/api/courses/${this.state.courseID}/lessons`)
            .then(res => {
                const lessons = res.data;
                this.setState({ lessons: lessons, lessonsCount: lessons.length });
            });
    };

    startCourse = () => {
        axios.get(`${API_URL}/api/users/${this.props.user.id}/courses/${this.state.courseID}`)
            .then(res => {
                if (res.data.progress === null) {
                    this.updateCourse();
                }
                this.setState({ onCourse: true });
            });
    };

    updateCourse = () => {
        axios.put(`${API_URL}/api/users/${this.props.user.id}/courses/${this.state.courseID}`, {
            progress: 0,
        })
            .then(res => {
                this.setState({ onCourse: true });
            });
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

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    render() {
        const { course, courseID, lessons, lessonsCount, progress } = this.state;
        const { isAuthenticated, user } = this.props;
        if (this.state.onCourse === true) {
            return <Redirect to={'/courses/' + courseID} />
        }
        const panes = [
            { menuItem: 'Descrição', render: () => <Tab.Pane attached={false}>{course.description}</Tab.Pane> },
            {
                menuItem: 'Lições', render: () => <Tab.Pane attached={false}>
                    {
                        lessons.map((lesson) =>
                            <List divided verticalAlign='middle' key={lesson.id}>
                                <List.Item style={{ paddingTop: '1em', paddingBottom: '1em' }}>
                                    <Icon name={this.formatIcons(lesson.type)} />
                                    <List.Content>{lesson.title}</List.Content>
                                </List.Item>
                            </List>
                        )
                    }
                </Tab.Pane>
            },
            { menuItem: 'Autores', render: () => <Tab.Pane attached={false}>{course.instructor}</Tab.Pane> },
            // { menuItem: 'Depoimentos', render: () => <Tab.Pane attached={false}>Tab 4 Content</Tab.Pane> },
        ];
        return (
            <div id="course-page">
                <Navigation />
                <main className="fadeIn animated">
                    <Banner
                        internal
                        title={course.title}
                        image={course.image}
                    />
                    <InfoCourse
                        trails={1}
                        lessons={lessonsCount}
                        duration={course.duration}
                    />
                    <AppBar position="static" color="default">
                        <Tabs
                            value={this.state.value}
                            onChange={this.handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="fullWidth"
                        >
                            <Tab label="Detalhes" />
                            <Tab label="Avaliações" />
                            <Tab label="Conteúdo" />
                        </Tabs>
                    </AppBar>
                    <SwipeableViews
                        axis={'x'}
                        index={this.state.value}
                        onChangeIndex={this.handleChangeIndex}
                    >
                        <Typography component="div" dir={'x'} style={{ padding: 8 * 3 }}>
                            <Detail
                                title={course.title}
                                description={course.description}
                                instructor={course.instructor}
                            />
                        </Typography>
                        <Typography component="div" dir={'x'} style={{ padding: 8 * 3 }}>
                            <Testimonial />
                        </Typography>
                        <Typography component="div" dir={'x'} style={{ padding: 8 * 3 }}>
                            <List>
                                {lessons ?
                                    lessons.map((lesson) =>
                                        <ListItem key={lesson.id}>
                                            <ListItemText primary={lesson.title} secondary={lesson.type} />
                                        </ListItem>
                                    )
                                : null }
                            </List>
                        </Typography>
                    </SwipeableViews>
                    {/* <Tabs>
                        <div label="DETALHES">
                            <Detail
                                title={course.title}
                                description={course.description}
                                instructor={course.instructor}
                            />
                        </div>
                        <div label="AVALIAÇÕES">
                            <Testimonial />
                        </div>
                        <div label="CONTEÚDO">
                            <div></div>
                        </div>
                    </Tabs> */}
                    {/* <Container style={{ marginTop: '5em' }}>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={11}>
                                    <Segment basic>
                                    </Segment>
                                    <Tab color='blue' attached={'true'} menu={{ secondary: true }} panes={panes} />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Container> */}
                </main>
                {/* {isAuthenticated ?
                    <Button size='big' basic color='blue' floated='right' onClick={this.startCourse}>
                        {progress != null ? "Continuar Curso" : "Iniciar Curso" }
                    </Button>
                :
                    <Button size='big' basic color='blue' floated='right' onClick={}>Iniciar Curso</Button>
                } */}
                <Button
                    className="btn-start"
                    title={isAuthenticated ? progress != null ? "Continuar Curso" : "Iniciar Curso" : "Iniciar Curso"}
                    onClick={this.startCourse}
                    icon="courses"
                />
            </div>
        );
    }
}

export default Page;
