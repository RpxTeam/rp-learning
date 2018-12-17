import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {
    Button,
    Container,
    Grid,
    Header,
    Icon,
    Segment,
    Card,
    Image, Progress
} from 'semantic-ui-react'
import PageHeader from '../../common/pageHeader'
import Navigation from '../../common/navigation'
import Footer from '../../common/mainFooter'
import {API_URL} from "../../common/url-types";
import {Redirect} from "react-router-dom";

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

    render() {
        const { courses } = this.state;
        if (this.state.viewCourse === true) {
            return <Redirect to={'/courses/' + this.state.courseID + '/details'} />
        }
        return (
            <div>
                <Navigation/>
                <main className="fadeIn animated">
                    <PageHeader heading="Meus Cursos"/>
                    <Segment vertical textAlign='center' style={{minHeight: '100vh'}}>
                        <Container>
                            <Card.Group itemsPerRow={4}>
                                { courses.map((course) =>
                                    <Card color='red' key={course.id}>
                                        {console.log(course)}
                                        <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
                                        <Card.Content>
                                            <Card.Header>{ course.title }</Card.Header>
                                            <Card.Meta>
                                                <span className='date'>Criado em { course.created_at }</span>
                                            </Card.Meta>
                                            <Card.Description>{ course.description }</Card.Description>
                                        </Card.Content>
                                        <Card.Content extra>
                                            <Progress percent={course.progress != null ? course.progress.toFixed(0) : 0} autoSuccess size='tiny'>
                                                10 / 100
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
                    </Segment>
                </main>
                <Footer/>
            </div>
        );
    }
}

export default Page;
