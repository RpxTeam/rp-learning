import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {
    Form,
    Input,
    TextArea,
    Button,
    Select,
    Message
} from 'semantic-ui-react'
import Admin from '../../Admin'

const genderOptions = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
]

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            success: false,
            message: ''
        }
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();

        axios.post(`http://localhost:8000/api/courses`, { 
            title: this.state.title,
            slug: this.state.slug,
            description: this.state.description,
            start_date: this.state.start_date,
            end_date: this.state.end_date,
            duration: this.state.duration
         })
            .then(res => {
            console.log(res);
            console.log(res.data);
            this.setState({
                message: 'Usuário criado com sucesso',
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
            <Admin heading="Create">
                {this.state.message ?
                <Message success={this.state.success} negative={this.state.error}>
                    <Message.Header>{this.state.success ? 'Sucesso' : "Erro" }</Message.Header>
                    <p>
                        {this.state.message}
                    </p>
                </Message>
                : null }
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group widths='equal'>
                        <Form.Field
                            id='input-control-title'
                            control={Input}
                            label='Título'
                            placeholder='Título'
                            name="title"
                            onChange={this.handleChange}
                        />
                        <Form.Field
                            id='input-control-slug'
                            control={Input}
                            label='Slug'
                            name="slug"
                            placeholder='Slug'
                            onChange={this.handleChange}
                        />
                        <Form.Field
                            id='input-control-description'
                            control={Input}
                            label='Descrição'
                            name="description"
                            placeholder='Descrição'
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Field
                            id='input-control-duration'
                            control={Input}
                            label='Duração'
                            name="duration"
                            placeholder='Duração'
                            onChange={this.handleChange}
                        />
                        <Form.Field
                            id='input-control-startdate'
                            control={Input}
                            label='Data de Início'
                            name="start_date"
                            placeholder='Data de Início'
                            onChange={this.handleChange}
                        />
                        <Form.Field
                            id='input-control-enddate'
                            control={Input}
                            label='Data de Término'
                            name="end_date"
                            placeholder='Data de Término'
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Field
                        id='button-control-confirm'
                        control={Button}
                        content='Criar'
                        positive
                    />
                </Form>
            </Admin>
        );
    }
}

export default Page;