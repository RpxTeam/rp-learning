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
            user: [
                {name: '', email: ''}
            ],
            edit: false
        }

        this.handleEdit = this.handleEdit.bind(this)
    }

    componentDidMount () {
        const userID = this.props.match.params.id

        axios.get(`http://rplearning-homolog.siteseguro.ws/api/users/${userID}`)
          .then(res => {
            const user = res.data;
            this.setState({ user: user });
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

        const userID = this.props.match.params.id

        console.log(this.state.password);

        axios.put(`http://rplearning-homolog.siteseguro.ws/api/users/${userID}`, { 
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
         })
            .then(res => {
            console.log(res);
            console.log(res.data);
            this.setState({
                message: 'Usuário atualizado com sucesso',
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
            <Admin>
                {this.state.message ?
                <Message success={this.state.success} negative={this.state.error}>
                    <Message.Header>{this.state.success ? 'Sucesso' : "Erro" }</Message.Header>
                    <p>
                        {this.state.message}
                    </p>
                </Message>
                : null }
                <Grid>
                    <Grid.Column floated='left' width={5}>
                        Usuários
                    </Grid.Column>
                    <Grid.Column floated='right' width={2}>
                        <Button onClick={this.handleEdit} icon>
                            <Icon name="pencil"></Icon>
                        </Button>
                    </Grid.Column>
                </Grid>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group widths='equal'>
                        <Form.Field
                            id='input-control-name'
                            control={Input}
                            label='Nome Completo'
                            placeholder={this.state.user.name}
                            name="name"
                            onChange={this.handleChange}
                            value={this.state.user.name}
                            // readOnly={this.state.edit === true ? false : true}
                        />
                        <Form.Field
                            id='input-control-email'
                            control={Input}
                            label='Email'
                            name="email"
                            placeholder={this.state.user.email}
                            onChange={this.handleChange}
                            value={this.state.user.email}
                            // readOnly={this.state.edit === true ? false : true}
                        />
                        <Form.Field
                            id='input-control-password'
                            type='password'
                            control={Input}
                            label='Senha'
                            name="password"
                            placeholder={this.state.user.password}
                            // value={this.state.user.password}
                            onChange={this.handleChange}
                            // readOnly={this.state.edit === true ? false : true}
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
                        content='Atualizar'
                        positive
                    />
                </Form>
            </Admin>
        );
    }
}

export default Page;