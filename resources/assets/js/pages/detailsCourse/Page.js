import React from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Banner from '../../components/Banner'
import Navigation from '../../common/navigation'
import { API_URL } from "../../common/url-types"
import Testimonial from '../../components/Testimonial'

import styled from 'styled-components'

import {
    Grid,
    AppBar,
    Card,
    Tabs,
    Tab,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    ListSubheader,
    Button
} from '@material-ui/core'

import Schedule from '@material-ui/icons/Schedule'
import Event from '@material-ui/icons/Event'
import Person from '@material-ui/icons/Person'
import ViewHeadline from '@material-ui/icons/ViewHeadline'
import AudioTrack from '@material-ui/icons/AudioTrack'
import LibraryBooks from '@material-ui/icons/LibraryBooks'
import VideoLibrary from '@material-ui/icons/VideoLibrary'
import VideoCam from '@material-ui/icons/VideoCam'

const Container = styled(Grid)`
    max-width: 1024px;
    margin: 0 auto!important;
    padding: 0 15px;
    width: 100%!important;
    padding: 30px 0;
`

const TabStyle = styled(Tab)`
    box-shadow: none
`

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courseID: this.props.match.params.id,
            course: {
                id: '',
                title: '',
                create_at: '',
                description: '',
                start_date: ''
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
                        axios.post(`${API_URL}/api/users/${this.props.user.id}/courses/${this.state.courseID}`, {
                            view: 1
                        });
                    }
                    this.getCourse();
                    this.setState({ progress: data.progress });
                });
        }
        this.getLessons();
    };

    getCourse = () => {
        axios.get(`${API_URL}/api/courses/${this.state.courseID}`)
            .then(res => {
                const course = res.data;
                this.setState({ course: course });
            });
    }

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
            view: 1
        })
            .then(res => {
                this.setState({ onCourse: true });
            });
    };

    formatIcons = (type) => {
        switch (type) {
            case 'text':
                return <LibraryBooks />
                break;
            case 'video-internal':
                return <VideoLibrary />
                break;
            case 'video-external':
                return <VideoCam />
                break;
            default:
                return <AudioTrack />
        }
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    formatDateReverse = (date) => {
        const oldDate = date.split('-');
        let day, month, year;
        day = Number(oldDate[2]);
        month = Number(oldDate[1]) - 1;
        year = Number(oldDate[0]);
        const newDate = day + '/' + month + '/' + year;

        return newDate
    };

    render() {
        const { course, courseID, lessons, lessonsCount, progress, value } = this.state;
        const { isAuthenticated, user } = this.props;
        if (this.state.onCourse === true) {
            return <Redirect to={'/courses/' + courseID} />
        }
        return (
            <div id="course-page">
                <Navigation />
                <main className="fadeIn animated">
                    <Banner
                        internal
                        title={course.title}
                        image={course.image}
                    />
                    <Container container spacing={16} justify="center">
                        <Grid item md={9}>
                            <img src={course.image} style={{ width: '100%' }} />
                            <Divider style={{ margin: '20px 0' }} />
                            <Tabs
                                value={value}
                                onChange={this.handleChange}
                                indicatorColor="secondary"
                                textColor="secondary"
                            >
                                <Tab label="Detalhes" />
                                {/* <Tab label="Avaliações" /> */}
                                <Tab label="Conteúdo" />
                            </Tabs>
                            {value === 0 &&
                                <Typography component="div" dir={'x'} style={{ padding: 8 * 3 }}>
                                    <p>
                                        {course.description}
                                    </p>
                                    <br /><br />
                                </Typography>
                            }
                            {/* {value === 1 &&
                                <Typography component="div" dir={'x'} style={{ padding: 8 * 3 }}>
                                    <Testimonial />
                                </Typography>
                            } */}
                            {value === 1 &&
                                <Typography component="div" dir={'x'} style={{ padding: 8 * 3 }}>
                                    <List>
                                        {lessons ?
                                            <React.Fragment>
                                                <Divider />
                                                {lessons.map((lesson) =>
                                                    <React.Fragment key={lesson.id}>
                                                        <ListItem>
                                                            <ListItemIcon>
                                                                {this.formatIcons(lesson.type)}
                                                            </ListItemIcon>
                                                            <ListItemText primary={lesson.title} />
                                                        </ListItem>
                                                        <Divider />
                                                    </React.Fragment>
                                                )}
                                            </React.Fragment>
                                            : null}
                                    </List>
                                </Typography>
                            }
                        </Grid>
                        <Grid item md={3}>
                            <Grid container justify="center">
                                <Grid item xs={12}>
                                    <Card>
                                        <List>
                                            <ListSubheader>Detalhes</ListSubheader>
                                            <Divider />
                                            <ListItem>
                                                <ListItemIcon>
                                                    <Schedule />
                                                </ListItemIcon>
                                                <ListItemText primary={course.duration === 1 ? course.duration + ' hora' : course.duration + ' horas'} />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemIcon>
                                                    <Event />
                                                </ListItemIcon>
                                                <ListItemText primary={this.formatDateReverse(course.start_date)} />
                                            </ListItem>
                                            {/* <ListItem>
                                                <ListItemIcon>
                                                    <Person />
                                                </ListItemIcon>
                                                <ListItemText primary={course.instructor} />
                                            </ListItem> */}
                                            <ListItem>
                                                <ListItemIcon>
                                                    <ViewHeadline />
                                                </ListItemIcon>
                                                <ListItemText primary={lessonsCount === 1 ? lessonsCount + ' Lição' : lessonsCount + ' Lições'} />
                                            </ListItem>
                                        </List>
                                    </Card>
                                </Grid>
                                <Button variant='contained' size="large" color='secondary' style={{ marginTop: '20px' }} onClick={this.startCourse}>{isAuthenticated ? progress != null ? "Continuar Curso" : "Iniciar Curso" : "Iniciar Curso"}</Button>
                            </Grid>
                        </Grid>
                    </Container>
                </main>
            </div>
        );
    }
}

export default Page;
