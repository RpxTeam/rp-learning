import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import { API_URL } from "../../../../common/url-types";
import axios from 'axios'
// import {
//     Form,
//     Input,
//     TextArea,
//     Button,
//     Select,
//     Message,
//     Grid
// } from 'semantic-ui-react'
import Admin from '../../Admin'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Message from '../../../../components/Message';
import MenuItem from '@material-ui/core/MenuItem';
import styled from 'styled-components';

const CardContainer = styled(Card)`
    padding: 10px 20px;
`;

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            error: false,
            success: false,
            message: {
                type: '',
                open: false,
                vertical: 'top',
                horizontal: 'center',
                text: ''
            },
            profiles: [
                {
                    value: 3,
                    label: 'Aluno',
                },
                {
                    value: 2,
                    label: 'Instrutor',
                },
                {
                    value: 1,
                    label: 'Administrador',
                }
            ],
            profile: {}
        }
        this.openMessage = this.openMessage.bind(this);
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();

        axios.post(`${API_URL}/api/users`, {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            role_id: this.state.profile
        })
            .then(res => {
                console.log(res);
                console.log(res.data);
                this.setState({
                    message: {
                        open: true,
                        text: 'Usuário criado com sucesso'
                    },
                    error: false,
                    success: true,
                });
                setTimeout(function () {
                    this.setState({
                        redirect: true
                    })
                }.bind(this), 2000);
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
        const { message, profiles } = this.state;
        if (this.state.redirect === true) {
            return <Redirect to={'/admin/users/'} />
        }
        return (
            <Admin heading="Create">
                <Message text={message.text} open={message.open} close={this.closeMessage} />
                <form onSubmit={this.handleSubmit}>
                    <CardContainer>
                        <Grid container spacing={8}>
                            <Grid item md={12}>
                                <TextField
                                    id="input-name"
                                    label="Nome"
                                    onChange={this.handleChange}
                                    margin="normal"
                                    variant="outlined"
                                    name="name"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item md={4}>
                                <TextField
                                    id="input-role"
                                    select
                                    label="Perfil"
                                    onChange={this.handleChange}
                                    helperText="Por favor escolha o perfil"
                                    margin="normal"
                                    variant="outlined"
                                    fullWidth
                                    name='profile'
                                    value={this.state.profile}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                >
                                    {profiles.map(profile => (
                                        <MenuItem key={profile.value} value={profile.value}>
                                            {profile.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item md={4}>
                                <TextField
                                    id="input-email"
                                    label="Email"
                                    onChange={this.handleChange}
                                    margin="normal"
                                    variant="outlined"
                                    name="email"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item md={4}>
                                <TextField
                                    id="input-password"
                                    label="Senha"
                                    onChange={this.handleChange}
                                    margin="normal"
                                    variant="outlined"
                                    name="password"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                        <Grid container justify="flex-end">
                            <Button variant="contained" color={'secondary'} type={'submit'}>Criar</Button>
                        </Grid>
                    </CardContainer>
                </form>
            </Admin >
        );
    }
}

export default Page;
