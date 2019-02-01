import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import ReeValidate from 'ree-validate'
import AuthService from '../../services'
// import PageHeader from '../../common/pageHeader'
// import Navigation from '../../common/navigation'
// import Footer from '../../common/mainFooter'

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Lock from '@material-ui/icons/Lock';
import Person from '@material-ui/icons/Person';

import styled from 'styled-components';

const CardContainer = styled(Card)`
    padding: 10px 20px;
`;

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.validator = new ReeValidate({
            name: 'required|min:3',
            email: 'required|email',
            password: 'required|min:6',
            password_confirmation: 'required|min:6'
        });
        this.state = {
            credentials: {
                name: '',
                email: '',
                password: '',
                password_confirmation: ''
            },
            responseError: {
                isError: false,
                code: '',
                text: ''
            },
            isSuccess: false,
            isLoading: false,
            errors: this.validator.errors,
            message: {
                open: false,
                message: ''
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.openMessage = this.openMessage.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        const { errors } = this.validator;
        const {credentials} = this.state;
        credentials[name] = value;

        this.validator.validate(name, value)
            .then(() => {
                this.setState({errors, credentials})
            });
    }

    handleSubmit(event) {
        event.preventDefault();

        const {credentials} = this.state;

        this.validator.validateAll(credentials)
            .then(success => {
                if (success) {
                    // Manually verify the password confirmation fields
                    if(this.passwordConfirmation(credentials)){

                        this.setState({
                            isLoading: true
                        });
                        this.submit(credentials);
                    }
                    else{
                        const responseError = {
                            isError: true,
                            code: 401,
                            text: "Oops! Password confirmation didn't match"
                        };

                        this.openMessage("Oops! Password confirmation didn't match");
                        this.setState({responseError});
                    }

                }
            });
    }


    passwordConfirmation(credentials){
        if(credentials.password == credentials.password_confirmation){
            return true;
        }
        else{
            return false;
        }
    }

    submit(credentials) {
        this.props.dispatch(AuthService.register(credentials))
            .then((result)  => {
                this.setState({
                    isLoading: false,
                    credentials: {
                        name: '',
                        email: '',
                        password: '',
                        password_confirmation: ''
                    },
                    responseError : {
                        isError: false,
                        code: '',
                        text: ''
                    }
                });
                this.openMessage('Usuário criado com sucesso');
                setTimeout(function () {
                    this.setState({
                        isSuccess: true
                    })
                }.bind(this), 2000);

            })
            .catch(({error, statusCode}) => {
                const responseError = {
                    isError: true,
                    code: statusCode,
                    text: error
                };
                this.setState({responseError});
                this.setState({
                    isLoading: false
                });
                this.openMessage(error);
            })
    }

    openMessage = (message) => {
        this.setState({
            message: {
                open: true,
                text: message
            }
        })
    }

    closeMessage = () => {
        this.setState({
            message: {
                open: false,
                text: ''
            }
        })
    }

    componentDidMount() {
        this.setState({
            isLoading: false
        });
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to='/' replace/>
        }
        if (this.state.isSuccess) {
            return <Redirect to='/login' replace/>
        }
        const {message, errors} = this.state;
        return (
            <div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={message.open}
                    autoHideDuration={6000}
                    onClose={this.closeMessage}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{message.text}</span>}
                    action={[
                        <Button key="undo" color="secondary" size="small" onClick={this.closeMessage}>
                            UNDO
                </Button>,
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={this.closeMessage}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
                <main className="fadeIn animated" id="login-page" style={{ alignItems: 'center' }}>
                    <div className="center">
                        <div id="logo">
                            <img src={require('../../../img/logo.png')} alt="" />
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <Grid container justify={'center'}>
                                <Grid item md={4}>
                                    <CardContainer>
                                        <TextField
                                            error={errors.has('name')}
                                            id="input-name"
                                            label="Nome Completo"
                                            onChange={this.handleChange}
                                            margin="normal"
                                            variant="outlined"
                                            name="name"
                                            fullWidth
                                        />
                                        <TextField
                                            error={errors.has('email')}
                                            id="input-email"
                                            label="Email"
                                            onChange={this.handleChange}
                                            margin="normal"
                                            variant="outlined"
                                            name="email"
                                            fullWidth
                                        />
                                        <TextField
                                            error={errors.has('password')}
                                            id="input-password"
                                            label="Password"
                                            onChange={this.handleChange}
                                            margin="normal"
                                            variant="outlined"
                                            fullWidth
                                            type='text'
                                            value={this.state.password}
                                            name="password"
                                        />
                                        <TextField
                                            error={errors.has('password_confirmation')}
                                            id="input-confirm-password"
                                            label="Confirmar Senha"
                                            onChange={this.handleChange}
                                            margin="normal"
                                            variant="outlined"
                                            fullWidth
                                            type='text'
                                            value={this.state.password_confirmation}
                                            name="password_confirmation"
                                        />
                                    </CardContainer>
                                </Grid>
                            </Grid>
                            <div className="btns btns-center">
                                <div>
                                    <Button type='submit' variant="contained" color="primary">Registrar</Button>
                                </div>
                                <br />
                                <div>
                                    <Button component={Link} to='/register' variant="contained" color="default">Login</Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        );
    }
}

Page.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
};

export default Page;
