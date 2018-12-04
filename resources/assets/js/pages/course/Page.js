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
import {API_URL} from "../../common/url-types";

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
        }
    }

    componentDidMount() {
        axios.get(`${ API_URL }/api/courses/${this.state.courseID}`)
        .then(res => {
            const course = res.data;
            this.setState({ course: course });
        });
    }

    render() {
        const courses = this.state.courses;
        const { isAuthenticated } = this.props;
        return (
            <div>
                <Navigation/>
                <main className="fadeIn animated">
                    <PageHeader heading="Cursos"/>
                    <Segment vertical textAlign='center' style={{minHeight: '100vh'}}>
                        <Header as='h1'>{this.state.course.title}</Header>
                        <Container>
                            <Card.Group>
                                <Card color='red' key={this.state.course.id}>
                                    <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
                                    <Card.Content>
                                        <Card.Header>{ this.state.course.title }</Card.Header>
                                        <Card.Meta>
                                        <span className='date'>Criado em { this.state.course.created_at }</span>
                                        </Card.Meta>
                                        <Card.Description>{ this.state.course.description }</Card.Description>
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
                            </Card.Group>
                        </Container>
                    </Segment>
                </main>
                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated : state.Auth.isAuthenticated,
    }
};

export default connect(mapStateToProps)(Page);
