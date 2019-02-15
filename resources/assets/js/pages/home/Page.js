import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import { API_URL } from "../../common/url-types"
import axios from 'axios'
import AuthService from '../../services'
import Navigation from '../../common/navigation'
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
            courseID: '',
            viewCourse: false,
            expanded: false,
        }
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
        const social = this.props.match.params.social
        const params = this.props.location.search;

        setTimeout(function () {

            if (params && social) {
                this.props.dispatch(AuthService.socialLogin({ params, social }))
                    .catch(({ error, statusCode }) => {
                        const responseError = {
                            isError: true,
                            code: statusCode,
                            text: error
                        };
                        this.setState({ responseError });
                        this.setState({
                            isLoading: false
                        });
                    })
            }

        }.bind(this), 1000);
    }

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

    formatDate = (date) => {
        if (date) {
            const newDate = date.split('-');
            const day = newDate[2].split(' ');
            const formatedDate = day[0] + '/' + newDate[1] + '/' + newDate[0];
            return formatedDate;
        }
    };

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    render() {
        const { courses } = this.state;
        if (this.state.viewCourse === true) {
            return <Redirect to={'/courses/' + this.state.courseID + '/details'} />
        }
        return (
            <React.Fragment>
                <Navigation />
                <main className="fadeIn animated">
                    <Banner title="Bem vindo ao RP Learning" icon="logo">
                        <p>Seja bem-vindo(a) ao RP Learning – Cursos  com certificado de conclusão válido para: atividades extracurriculares, avaliações de empresas, provas de títulos, concursos públicos, enriquecer o seu currículo e muito mais!</p>
                    </Banner>
                    <Container container spacing={40}>
                        {courses.map((course) =>
                            <Grid item md={4} sm={12} xs={12} key={course.id}>
                                <Card>
                                    <CardActionArea onClick={this.viewCourse.bind(this, course.id)}>
                                        <Image style={{ backgroundImage: `url(${course.image})` }} />
                                    </CardActionArea>
                                    <CardContentStyle>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {course.title.substring(0, 20)}
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
            </React.Fragment>
        );
    }
}

export default Page;
