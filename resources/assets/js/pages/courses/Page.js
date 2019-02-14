import React from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Navigation from '../../common/navigation'
import { API_URL } from "../../common/url-types"
import Banner from '../../components/Banner';

import {
    Grid,
    Typography,
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    CardActionArea,
    Button,
    Collapse,
    Avatar,
} from '@material-ui/core';

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            message: '',
            courseID: '',
            viewCourse: false
        }
        this.favoriteCourse = this.favoriteCourse.bind(this);
    }

    getData = () => {
        axios.get(`${API_URL}/api/courses`)
            .then(res => {
                const courses = res.data;
                this.setState({ courses: courses });
            })
    };

    componentDidMount() {
        this.getData();
    };

    viewCourse = (courseID) => {
        if (this.props.isAuthenticated) {
            axios.get(`${API_URL}/api/users/${this.props.user.id}/courses/${courseID}`)
                .then(res => {
                    const { data } = res;
                    if (!data.view) {
                        axios.post(`${API_URL}/api/users/${this.props.user.id}/courses/${courseID}`);
                        axios.put(`${API_URL}/api/users/${this.props.user.id}/courses/${courseID}`, { view: 1 });
                    }
                    this.setState({ courseID: courseID, viewCourse: true });
                })
        } else {
            axios.get(`${API_URL}/api/courses/${courseID}`)
                .then(res => {
                    const { data } = res;
                    this.setState({ courseID: courseID, viewCourse: true });
                })
        }
    };

    favoriteCourse = (id) => {
        axios.get(`${API_URL}/api/users/${this.props.user.id}/courses/${id}`)
            .then(res => {
                const { data } = res;
                if (data.favorite === null) {
                    axios.put(`${API_URL}/api/users/${this.props.user.id}/courses/${id}`, {
                        favorite: 1
                    });
                } else if (data.favorite === 0) {
                    axios.put(`${API_URL}/api/users/${this.props.user.id}/courses/${id}`, {
                        favorite: 1
                    });
                } else {
                    axios.put(`${API_URL}/api/users/${this.props.user.id}/courses/${id}`, {
                        favorite: 0
                    });
                }
            });
    };

    formatDate = (date) => {
        if (date) {
            const newDate = date.split('-');
            const day = newDate[2].split(' ');
            const formatedDate = day[0] + '/' + newDate[1] + '/' + newDate[0];
            return formatedDate;
        }
    };

    render() {
        const { courses } = this.state;
        const { isAuthenticated } = this.props;
        if (this.state.viewCourse === true) {
            return <Redirect to={'/courses/' + this.state.courseID + '/details'} />
        }

        return (
            <React.Fragment>
                <Navigation />
                <main className="fadeIn animated">
                    <Banner title="Biblioteca" icon="course">
                        <p>Aqui está a biblioteca de cursos.</p>
                    </Banner>
                    <Grid container spacing={40} style={{ maxWidth: '90%', margin: '0 auto' }}>
                        {courses.map((course) =>
                            <Grid item md={4} xs={12} key={course.id}>
                                <Card>
                                    <CardActionArea onClick={this.viewCourse.bind(this, course.id)}>
                                        <CardHeader
                                            avatar={
                                                <Avatar aria-label="Recipe">
                                                    R
                                                </Avatar>
                                            }
                                            // action={
                                            //     <IconButton
                                            //         onClick={this.handleExpandClick}
                                            //         aria-expanded={this.state.expanded}
                                            //         aria-label="Show more"
                                            //     >
                                            //         <ExpandMoreIcon />
                                            //     </IconButton>
                                            // }
                                            title={course.title}
                                            subheader="Categoria"
                                        />
                                        {course.image ?
                                            <CardMedia
                                                image={course.image}
                                                style={{ height: 100 }}
                                            />
                                            : null}
                                    </CardActionArea>
                                    <CardContent>
                                        <Typography component="p">
                                            {course.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableActionSpacing>
                                        {/* <IconButton aria-label="Add to favorites">
                                            <FavoriteIcon />
                                        </IconButton> */}
                                        <Button size="small" color="primary" onClick={this.viewCourse.bind(this, course.id)}>
                                            Detalhes
                                        </Button>
                                    </CardActions>
                                    <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                                        <CardContent>

                                        </CardContent>
                                    </Collapse>
                                </Card>
                            </Grid>
                        )
                        }
                    </Grid>
                </main>
            </React.Fragment>
        );
    }
}

export default Page;
