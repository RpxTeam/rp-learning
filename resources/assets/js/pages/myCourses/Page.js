import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {
    Button,
    Container,
    Header,
    Icon,
    Segment,
    Image, Progress
} from 'semantic-ui-react'
import PageHeader from '../../common/pageHeader'
import Menu from '../../components/Menu'
import Banner from '../../components/Banner'
import Card from '../../components/Card'
import Footer from '../../common/mainFooter'
import {API_URL} from "../../common/url-types";
import {Redirect} from "react-router-dom";
import Grid from '../../components/Grid';

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
                <Menu />
                <main className="fadeIn animated">
                    <Banner />
                    <Grid>
                        { courses.map((course) => 
                            <Card
                                id={course.id}
                                key={course.id}
                                name={course.title}
                                image={course.image}
                                category="Categoria"
                                onClick={this.viewCourse.bind(this, course.id)}
                            />
                            )
                        }
                    </Grid>
                    {/* <Segment vertical textAlign='center' style={{minHeight: '100vh'}}>
                        <Container>
                            <Card.Group itemsPerRow={3}>
                                { courses.map((course) =>
                                    <Card color='red' key={course.id}>
                                        {course.image ?
                                            <Image src={course.image} />
                                            : null }
                                        <Card.Content>
                                            <Card.Header>{ course.title }</Card.Header>
                                            <Card.Meta>
                                                <span className='date'>Criado em { this.formatDate(course.created_at) }</span>
                                            </Card.Meta>
                                            <Card.Description>{ course.description }</Card.Description>
                                        </Card.Content>
                                        <Card.Content extra>
                                            <Progress percent={course.progress != null ? parseFloat(course.progress).toFixed(0) : 0} autoSuccess size='tiny'>
                                                {course.lesson_complete} / {course.total_lesson}
                                            </Progress>
                                            <div className='ui buttons'>
                                                <Button basic color='green' onClick={this.viewCourse.bind(this, course.id)}>
                                                    Detalhes
                                                </Button>
                                            </div>
                                        </Card.Content>
                                    </Card>
                                )
                                }
                            </Card.Group>
                        </Container>
                    </Segment> */}
                </main>
            </div>
        );
    }
}

export default Page;
