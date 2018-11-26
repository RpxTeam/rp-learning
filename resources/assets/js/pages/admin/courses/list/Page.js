import React from 'react'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
    Button,
    Icon,
    Table,
    Grid,
    Menu,
    Message
} from 'semantic-ui-react'
import Admin from '../../Admin'
import axios from 'axios'

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            message: '',
            error: false,
            success: false,
            redirect: false
        }

        this.handleDelete = this.handleDelete.bind(this)
    }

    componentDidMount() {
        axios.get(`http://localhost:8000/api/courses`)
          .then(res => {
            const courses = res.data;
            this.setState({ courses: courses });
            console.log(res.data);
        })
        console.log(this.state.courses);
    }

    handleDelete = (event) => {
        let courseID = event.target.value;
        if(confirm('Tem certeza que deseja deletar?')) {
            axios.delete(`http://localhost:8000/api/courses/${courseID}`)
            .then(res => {
                console.log(res);
                console.log(res.data);
                this.setState({
                    message: 'Curso deletado',
                    error: false,
                    success: true,
                });
            })

            const courses = this.state.courses;
            let newCourses = courses.filter(course => {
                if (course.id != courseID) {
                    return courses != courseID 
                }
            });
            this.setState({
                courses: newCourses
            })
        }
    }

    render() {
        const courses = this.state.courses;
        return (
            <Admin heading='Cursos' createLink='/admin/courses/create'>
                <Grid.Column width={16}>
                    {this.state.message ?
                    <Message success={this.state.success} negative={this.state.error}>
                        {/* <Message.Header>{this.state.success ? 'Sucesso' : "Erro" }</Message.Header> */}
                        <p>
                            {this.state.message}
                        </p>
                    </Message>
                    : null }
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell colSpan='4'>Lista</Table.HeaderCell>
                            </Table.Row>
                            <Table.Row>
                                <Table.HeaderCell>Título</Table.HeaderCell>
                                <Table.HeaderCell>Duração</Table.HeaderCell>
                                <Table.HeaderCell>Descrição</Table.HeaderCell>
                                <Table.HeaderCell>  </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                    
                        <Table.Body>
                            { courses.map((course) => 
                                <Table.Row key={course.id}>
                                    <Table.Cell>
                                        <Menu.Item as={ Link } to={'/admin/courses/' + course.id}>
                                            {course.title}
                                        </Menu.Item>
                                    </Table.Cell>
                                    <Table.Cell>{course.duration}</Table.Cell>
                                    <Table.Cell>{course.description}</Table.Cell>
                                    <Table.Cell collapsing textAlign="right">
                                        <Button icon='trash' onClick={this.handleDelete} value={course.id} />
                                    </Table.Cell>
                                </Table.Row>
                                )
                            }
                        </Table.Body>
                    </Table>
                </Grid.Column>
            </Admin>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.Auth.isAuthenticated,
        currentUser: state.Auth.user
    }
};

export default connect(mapStateToProps)(Page);
