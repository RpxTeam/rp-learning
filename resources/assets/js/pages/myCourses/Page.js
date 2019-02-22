import React from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Navigation from '../../common/navigation'
import { API_URL } from "../../common/url-types"
import Banner from '../../components/Banner'
import styled from 'styled-components'

import {
    Typography,
    Grid,
    Card,
    CardContent,
    CardActions,
    CardActionArea,
    Button,
    Collapse,
    Divider
} from '@material-ui/core'

const Image = styled.div`
    background-position: center center;
    background-size: 100% auto;
    background-repeat: no-repeat;
    height: 150px;
    display: block;
`

const CardContentStyle = styled(CardContent)`
    min-height: 105px;
`

const Container = styled(Grid)`
    max-width: 1024px;
    margin: 0 auto!important;
    padding: 0 15px;
    width: 100%!important;
`

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            message: '',
        };
    }

    getData = () => {
        axios.get(`${ API_URL }/api/users/${this.props.user.id}/courses`)
        .then(res => {
            const courses = Object.values(res.data);
            this.setState({ courses: courses });
        })
    };

    componentDidMount() {
        this.getData();
    }

    viewCourse = (courseID) => {
        axios.get(`${ API_URL }/api/users/${this.props.user.id}/courses/${courseID}`)
            .then(res => {
                const { data } = res;
                if(data.length === 0) {
                    axios.post(`${ API_URL }/api/users/${this.props.user.id}/courses/${courseID}`);
                    axios.put(`${ API_URL }/api/users/${this.props.user.id}/courses/${courseID}`, {view: 1});
                }
                this.setState({ courseID: courseID, viewCourse: true });
            });
    };

    formatDate = (date) => {
        if(date) {
            const newDate = date.split('-');
            const day = newDate[2].split(' ');
            const formatedDate = day[0] + '/' + newDate[1] + '/' + newDate[0];
            return formatedDate;
        }
    };

    render() {
        const { courses } = this.state;
        if (this.state.viewCourse === true) {
            return <Redirect to={'/courses/' + this.state.courseID + '/details'} />
        }
        return (
            <div>
                <Navigation />
                <main className="fadeIn animated">
                    <Banner title="Meus Cursos" icon="courses">
                        <p>Essa é a sua biblioteca de cursos, Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet commodi delectus, excepturi ipsum dolor sit amet.</p>
                    </Banner>
                    <Container container spacing={40}>
                        {courses.map((course, index) =>
                            <Grid item md={4} sm={12} xs={12} key={index}>
                                <Card>
                                    <CardActionArea onClick={this.viewCourse.bind(this, course.id)}>
                                        <Image style={{ backgroundImage: `url(${course.image})` }} />
                                    </CardActionArea>
                                    <CardContentStyle>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {course.title.length >= 20 ? course.title.substring(0, 20) : course.title}
                                            {course.title.length >= 20 ? ' [...]' : null }
                                        </Typography>
                                        <Typography component="p">
                                            {course.description.substring(0, 140)}
                                            {course.description.length >= 140 ? ' [...]' : null }
                                        </Typography>
                                    </CardContentStyle>
                                    <Divider />
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
                    </Container>
                </main>
            </div>
        );
    }
}

export default Page;
