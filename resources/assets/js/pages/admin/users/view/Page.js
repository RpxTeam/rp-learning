import React from 'react'
import axios from 'axios'
import { API_URL } from "../../../../common/url-types";
// import {
//     Grid,
//     Form,
//     Input,
//     TextArea,
//     Button,
//     Icon,
//     Select,
//     Message
// } from 'semantic-ui-react'
import Admin from '../../Admin'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Message from '../../../../components/Message';
import styled from 'styled-components';

const CardContainer = styled(Card)`
    padding: 10px 20px;
`;

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            user: {
                name: 'dasdsadas'
            },
            edit: false,
            message: {
                type: '',
                open: false,
                vertical: 'top',
                horizontal: 'center',
                text: 'Snackbar its works'
            },
        }

        this.handleEdit = this.handleEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        const userID = this.props.match.params.id

        axios.get(`${API_URL}/api/users/${userID}`)
            .then(res => {
                const user = res.data;
                this.setState({ user: user });
                console.log(this.state.user)
            })
    }

    handleEdit = (event) => {
        if (this.state.edit) {
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

        axios.put(`${API_URL}/api/users/${userID}`, {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }).then(res => {
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

    openMessage = newState => () => {
        this.setState({
            message: {
                open: true,
                ...newState
            }
        });
    };

    closeMessage = () => {
        this.setState({
            message: {
                ...this.state.message,
                open: false
            }
        });
    }

    render() {
        const { message } = this.state;
        if (this.state.redirect === true) {
            return <Redirect to={'/admin/users/'} />
        }
        return (
            <Admin heading={"Usuários"}>
                <Message text={message.text} open={message.open} close={this.closeMessage} />
                <Grid container spacing={16}>
                    <Grid item xs={12} md={9}>
                        <form onSubmit={this.handleSubmit}>
                            <CardContainer>
                                <TextField
                                    id="input-name"
                                    label="Nome"
                                    onChange={this.handleChange}
                                    margin="normal"
                                    variant="outlined"
                                    name="name"
                                    fullWidth
                                    defaultValue={this.state.user.name}
                                    placeholder={this.state.user.name}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    id="input-email"
                                    label="Email"
                                    onChange={this.handleChange}
                                    margin="normal"
                                    variant="outlined"
                                    name="email"
                                    fullWidth
                                    defaultValue={this.state.user.email}
                                    placeholder={this.state.user.email}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    id="input-password"
                                    label="Senha"
                                    onChange={this.handleChange}
                                    margin="normal"
                                    variant="outlined"
                                    name="password"
                                    fullWidth
                                    placeholder={'Senha'}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                {/* <Form.Field
                                    id='input-control-name'
                                    control={Input}
                                    label='Nome Completo'
                                    placeholder={this.state.user.name}
                                    name="name"
                                    onChange={this.handleChange}
                                    value={this.state.user.name}
                                />
                                <Form.Field
                                    id='input-control-email'
                                    control={Input}
                                    label='Email'
                                    name="email"
                                    placeholder={this.state.user.email}
                                    onChange={this.handleChange}
                                    defaultValue={this.state.user.email}
                                />
                                <Input
                                    placeholder='Name'
                                    value={this.state.user.name}
                                    onChange={this.handleChange}
                                    name="name"
                                />
                                <Form.Field
                                    id='input-control-password'
                                    type='password'
                                    control={Input}
                                    label='Senha'
                                    name="password"
                                    // placeholder={this.state.user.password}
                                    value={this.state.user.password}
                                    onChange={this.handleChange}
                                /> */}
                                {/* <Form.Field
                                    id='input-control-confirmpassword'
                                    type='password'
                                    control={Input}
                                    label='Confirmar senha'
                                    name="confirm-password"
                                    placeholder='Confirmar Senha'
                                    onChange={this.handleChange}
                                /> */}
                            </CardContainer>
                            <Button variant="contained" color={'primary'} type={'submit'} style={{ width: '100%' }}>Criar</Button>
                        </form>
                    </Grid>
                </Grid>
            </Admin>
        );
    }
}

export default Page;
