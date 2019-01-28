import React from 'react'
import {Link} from 'react-router-dom'
import {API_URL} from "../../common/url-types"
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
import Card from '../../components/Card'
import Grid from '../../components/Grid'
import Menu from '../../common/menu'
import Banner from '../../components/Banner'
import Button from '../../components/Button'

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            message: '',
            courseID: '',
            viewCourse: false
        }
    }

    getData = () => {
        axios.get(`${ API_URL }/api/courses`)
            .then(res => {
                const courses = res.data;
                this.setState({ courses: courses });
            })
    };

    componentDidMount() {
        this.getData();
        const social = this.props.match.params.social
        const params = this.props.location.search;

        setTimeout(function() { 

        if (params && social) {
            this.props.dispatch(AuthService.socialLogin({ params, social }))
                .catch(({error, statusCode}) => {
                const responseError = {
                    isError: true,
                    code: statusCode,
                    text: error
                };
                this.setState({responseError});
                this.setState({
                    isLoading: false
                });
            })
        }

        }.bind(this), 1000);
    }

    viewCourse = (courseID) => {
        if(this.props.isAuthenticated) {
            axios.get(`${ API_URL }/api/users/${this.props.user.id}/courses/${courseID}`)
                .then(res => {
                    const {data} = res;
                    if (!data.view) {
                        axios.post(`${ API_URL }/api/users/${this.props.user.id}/courses/${courseID}`);
                        axios.put(`${ API_URL }/api/users/${this.props.user.id}/courses/${courseID}`, {view: 1});
                    }
                    this.setState({courseID: courseID, viewCourse: true});
                })
        } else {
            axios.get(`${ API_URL }/api/courses/${courseID}`)
                .then(res => {
                    const {data} = res;
                    this.setState({courseID: courseID, viewCourse: true});
                })
        }
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
        return (
            <React.Fragment>
                <Menu />
                <main className="fadeIn animated">
                    <Banner title="Bem vindo ao RP Learning" icon="logo">
                        <p>Seja bem-vindo(a) ao RP Learning – Cursos  com certificado de conclusão válido para: atividades extracurriculares, avaliações de empresas, provas de títulos, concursos públicos, enriquecer o seu currículo e muito mais!</p>
                        {/* <h3>A importância da qualificação profissional</h3> */}
                        {/* <p>Por conta da alta concorrência e competitividade, o mercado de trabalho está cada vez mais exigente na seleção de profissionais e quem está mais preparado tem mais oportunidades. A qualificação, portanto, é uma ferramenta fundamental para o sucesso profissional, sendo um fator determinante tanto para aqueles que estão em busca de uma vaga, para quem deseja crescer na empresa e para quem pensa em manter sua posição.</p> */}
                    </Banner>
                    <Grid>
                        { courses.map((course) => 
                            <Card
                                id={course.id}
                                key={course.id}
                                name={course.title}
                                image={course.image}
                                category="Categoria"
                                onClick={this.viewCourse.bind(this, course.id)}
                                defaultHeight={0}
                                description={course.description}
                            />
                        )
                        }
                    </Grid>
                </main>
            </React.Fragment>
        );
    }
}

export default Page;
