import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import { API_URL } from "../../common/url-types"
import axios from 'axios'
import {
    Container,
    Header,
    Icon,
    Responsive,
    Segment,
    Step
} from 'semantic-ui-react'
import AuthService from '../../services'
// import Card from '../../components/Card'
// import Grid from '../../components/Grid'
import Navigation from '../../common/navigation'
import Banner from '../../components/Banner'
// import Button from '../../components/Button'

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

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
                        {/* <h3>A importância da qualificação profissional</h3> */}
                        {/* <p>Por conta da alta concorrência e competitividade, o mercado de trabalho está cada vez mais exigente na seleção de profissionais e quem está mais preparado tem mais oportunidades. A qualificação, portanto, é uma ferramenta fundamental para o sucesso profissional, sendo um fator determinante tanto para aqueles que estão em busca de uma vaga, para quem deseja crescer na empresa e para quem pensa em manter sua posição.</p> */}
                    </Banner>
                    <Grid container spacing={8} style={{ maxWidth: '90%', margin: '0 auto' }}>
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
                                    </CardActionArea>
                                    {course.image ?
                                        <CardMedia
                                            image={course.image}
                                        />
                                        : null}
                                    <CardContent>
                                        <Typography component="p">
                                            {course.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableActionSpacing>
                                        {/* <IconButton aria-label="Add to favorites">
                                            <FavoriteIcon />
                                        </IconButton> */}
                                        <Button size="small" color="primary">
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
