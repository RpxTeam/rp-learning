import React from 'react'
import axios from 'axios'
import {
    Grid,
    Form,
    Input,
    TextArea,
    Button,
    Icon,
    Select,
    Message
} from 'semantic-ui-react'
import Admin from '../../Admin'

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            course: [],
            edit: false
        }

        this.handleEdit = this.handleEdit.bind(this)
    }

    componentDidMount () {
        const courseID = this.props.match.params.id

        axios.get(`http://localhost:8000/api/courses/${courseID}`)
          .then(res => {
            const course = res.data;
            this.setState({ course: course });
        })
    }

    handleEdit = (event) => {
        if(this.state.edit) {
            this.setState({
                edit: false
            })
        } else {
            this.setState({
                edit: true
            })
        }
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();

        const courseID = this.props.match.params.id

        console.log(this.state.password);

        axios.put(`http://localhost:8000/api/courses/${courseID}`, { 
            title: this.state.title,
            slug: this.state.slug,
            description: this.state.description,
            start_date: this.state.startdate,
            end_date: this.state.enddate,
            duration: this.state.duration
         })
            .then(res => {
            console.log(res);
            console.log(res.data);
            this.setState({
                message: 'Curso atualizado com sucesso',
                error: false,
                success: true,
            });
        }).catch(error => {
            console.log(error.message)
            this.setState({
                message: error.message,
                error: true,
                success: false
            })
        })
    }

    render() {
        return (
            <Admin heading={"Cursos"}>
                {this.state.message ?
                <Message success={this.state.success} negative={this.state.error}>
                    <Message.Header>{this.state.success ? 'Sucesso' : "Erro" }</Message.Header>
                    <p>
                        {this.state.message}
                    </p>
                </Message>
                : null }
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group widths='equal'>
                                <Form.Field
                                    id='input-control-title'
                                    control={Input}
                                    label='Título'
                                    placeholder={this.state.course.title}
                                    name="title"
                                    onChange={this.handleChange}
                                />
                                <Form.Field
                                    id='input-control-slug'
                                    control={Input}
                                    label='Slug'
                                    name="slug"
                                    placeholder={this.state.course.slug}
                                    onChange={this.handleChange}
                                />
                                <Form.Field
                                    id='input-control-description'
                                    control={Input}
                                    label='Descrição'
                                    name="description"
                                    placeholder={this.state.course.description}
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Field
                                    id='input-control-duration'
                                    control={Input}
                                    label='Duração'
                                    name="duration"
                                    placeholder={this.state.course.duration}
                                    onChange={this.handleChange}
                                />
                                <Form.Field
                                    id='input-control-startdate'
                                    control={Input}
                                    label='Data de Início'
                                    name="startdate"
                                    placeholder={this.state.course.start_date}
                                    onChange={this.handleChange}
                                />
                                <Form.Field
                                    id='input-control-enddate'
                                    control={Input}
                                    label='Data de Término'
                                    name="enddate"
                                    placeholder={this.state.course.end_date}
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            <Form.Field
                                id='button-control-confirm'
                                control={Button}
                                content='Atualizar'
                                positive
                            />
                        </Form>
                    </Grid.Column>
                </Grid.Row>
            </Admin>
        );
    }
}

export default Page;
