import React from 'react'
import axios from 'axios'
import { API_URL } from "../../../../common/url-types";
import Admin from '../../Admin'
import { Grid, FormControl, FormHelperText, Select, TextField, Card, Button, MenuItem } from '@material-ui/core';
import Message from '../../../../components/Message';
import styled from 'styled-components';
import CardContainer from '../../components/CardContainer'

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            user: {
                name: '',
                email: '',
                role_id: ''
            },
            edit: false,
            message: {
                type: '',
                open: false,
                vertical: 'top',
                horizontal: 'center',
                text: 'Snackbar its works'
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
            profile: {
                value: 1,
                label: 'Administrador',
            }
        }

        this.handleEdit = this.handleEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    getData = () => {
        const userID = this.props.match.params.id

        axios.get(`${API_URL}/api/users/${userID}`)
            .then(res => {
                const user = res.data;
                this.setState({ user: user });
            })
    }

    componentDidMount() {
        this.getData();
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
        console.log(event.target.name)
        console.log(event.target.value);
    }

    handleSubmit = event => {
        event.preventDefault();
        const userID = this.props.match.params.id

        axios.put(`${API_URL}/api/users/${userID}`, {
            name: this.state.user.name,
            email: this.state.user.email,
            password: this.state.user.password,
            role_id: this.state.user.profile
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
        const { message, profiles, profile, user } = this.state;
        if (this.state.redirect === true) {
            return <Redirect to={'/admin/users/'} />
        }
        return (
            <Admin heading={"Usuários"}>
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
                                    value={user.name}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item md={4}>
                                <TextField
                                    id="input-role"
                                    select
                                    label="Perfil"
                                    onChange={this.handleChange}
                                    margin="normal"
                                    variant="outlined"
                                    fullWidth
                                    name='role_id'
                                    value={user.role_id}
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
                                    defaultValue={user.email}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
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
                                    placeholder={'Senha'}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={8} justify="flex-end">
                            <Button variant="contained" color={'primary'} type={'submit'}>Atualizar</Button>
                        </Grid>
                    </CardContainer>
                </form>
            </Admin>
        );
    }
}

export default Page;
