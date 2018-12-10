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
    Image
} from 'semantic-ui-react'
import PageHeader from '../../common/pageHeader'
import Navigation from '../../common/navigation'
import Footer from '../../common/mainFooter'

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            message: '',
        }
        console.log('User', this.props)
    }

    componentDidMount() {
        axios.get(`http://localhost:8000/api/users/${this.props.user}/courses`)
            .then(res => {
                const courses = res.data;
                this.setState({ courses: courses });
                console.log(courses);
            })
    }

    render() {
        const courses = this.state.courses;
        const { isAuthenticated } = this.props;
        return (
            <div>
                <Navigation/>
                <main className="fadeIn animated">
                    <PageHeader heading="Meus Cursos"/>
                    <Segment vertical textAlign='center' style={{minHeight: '100vh'}}>
                        <Container>
                            <Card.Group>
                                { courses.map((course) =>
                                    <Card color='red' key={course.id}>
                                        <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
                                        <Card.Content>
                                            <Card.Header>{ course.title }</Card.Header>
                                            <Card.Meta>
                                                <span className='date'>Criado em { course.created_at }</span>
                                            </Card.Meta>
                                            <Card.Description>{ course.description }</Card.Description>
                                        </Card.Content>
                                        <Card.Content extra>
                                            <div className='ui two buttons'>
                                                <Button basic color='green'>
                                                    Executar
                                                </Button>
                                                { isAuthenticated ?
                                                    <Button basic color='red'>
                                                        Excluir
                                                    </Button>
                                                    : null }
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
