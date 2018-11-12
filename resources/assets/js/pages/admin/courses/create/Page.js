import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { Form, Input, TextArea, Button, Select } from 'semantic-ui-react'
import Admin from '../../Admin'

const genderOptions = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
]

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();

        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        };

        axios.post(`http://localhost:3000/api/users`, { user })
            .then(res => {
            console.log(res);
            console.log(res.data);
        }).catch(error => {
            console.log(error.message)
        })
    }

    render() {
        return (
            <Admin heading="Create">
                <Form onSubmit={this.handleSubmit}>
                <Form.Group widths='equal'>
                    <Form.Field
                        id='input-control-name'
                        control={Input}
                        label='Nome Completo'
                        placeholder='Nome Completo'
                        name="name"
                        onChange={this.handleChange}
                    />
                    <Form.Field
                        id='input-control-email'
                        control={Input}
                        label='Email'
                        name="email"
                        placeholder='Email'
                        onChange={this.handleChange}
                    />
                    <Form.Field
                        id='input-control-password'
                        type='password'
                        control={Input}
                        label='Senha'
                        name="password"
                        placeholder='Senha'
                        onChange={this.handleChange}
                    />
                    {/* <Form.Field
                        id='input-control-confirmpassword'
                        type='password'
                        control={Input}
                        label='Confirmar senha'
                        name="confirm-password"
                        placeholder='Confirmar Senha'
                        onChange={this.handleChange}
                    /> */}
                </Form.Group>
                <Form.Field
                    id='button-control-confirm'
                    control={Button}
                    content='Create'
                    positive
                />
                </Form>
            </Admin>
        );
    }
}

export default Page;