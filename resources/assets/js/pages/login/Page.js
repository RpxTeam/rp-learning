import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import ReeValidate from 'ree-validate'
import AuthService from '../../services'
import PageHeader from '../../common/pageHeader'
import Footer from '../../common/mainFooter'

import Input from '../../components/Input'
import Message from '../../components/Message';
// import Grid from '../../components/Grid'
// import Button from '../../components/Button'

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

const Field = styled(TextField)`
    > div {
        padding: 0;
        svg {
            margin-left: 15px;
        }
        button {
            margin-right: 10px;
            svg {
                margin-left: 0;
            }
        }
    }
`;

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.validator = new ReeValidate({
            email: 'required|email',
            password: 'required|min:6'
        });

        this.state = {
            credentials: {
                email: '',
                password: ''
            },
            responseError: {
                isError: false,
                code: '',
                text: ''
            },
            message: {
                open: false,
                text: ''
            },
            isLoading: false,
            errors: this.validator.errors,
            showPassword: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.openMessage = this.openMessage.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        const { errors } = this.validator;
        const { credentials } = this.state;
        credentials[name] = value;

        this.validator.validate(name, value)
            .then(() => {
                this.setState({ errors, credentials })
            });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { credentials } = this.state;
        this.validator.validateAll(credentials)
            .then(success => {
                if (success) {
                    this.setState({
                        isLoading: true
                    });
                    this.submit(credentials);
                }
            })
            .catch(error => {
                this.openMessage(error);
            });
    }

    submit(credentials) {
        this.props.dispatch(AuthService.login(credentials))
            .catch(({ error, statusCode }) => {
                const responseError = {
                    isError: true,
                    code: statusCode,
                    text: error,
                };
                this.setState({ responseError });
                this.setState({
                    isLoading: false,
                });
                this.openMessage(error);
            })

    }

    onSocialClick(event, data) {
        window.location.assign(`redirect/${data.service}`);
    }

    componentDidMount() {
        this.setState({
            isLoading: false
        });
    }

    handleClickShowPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        });
    };

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

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        const { isAuthenticated } = this.props;

        if (isAuthenticated) {
            return (
                <Redirect to={from} />
            )
        }
        const { message, errors } = this.state;

        return (
            <div>
                <Message close={this.closeMessage} text={message.text} open={message.open} />
                <main className="fadeIn animated" id="login-page" style={{ alignItems: 'center' }}>
                    <div className="center">
                        <div id="logo">
                            <img src={require('../../../img/logo.png')} alt="" />
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <Grid container justify={'center'}>
                                <Grid item md={4}>
                                    <CardContainer>
                                        <Field
                                            error={errors.has('email')}
                                            id="input-email"
                                            label="Email"
                                            onChange={this.handleChange}
                                            margin="normal"
                                            variant="outlined"
                                            name="email"
                                            fullWidth
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Person />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                        <Field
                                            error={errors.has('password')}
                                            id="input-password"
                                            label="Password"
                                            onChange={this.handleChange}
                                            margin="normal"
                                            variant="outlined"
                                            fullWidth
                                            type={this.state.showPassword ? 'text' : 'password'}
                                            value={this.state.password}
                                            name="password"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton aria-label="Toggle password visibility" onClick={this.handleClickShowPassword}>
                                                            {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Lock />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </CardContainer>
                                </Grid>
                            </Grid>
                            <div className="btns btns-center">
                                <div>
                                    <Button type='submit' variant="contained" color="primary">Entrar</Button>
                                </div>
                                <br />
                                <div>
                                    Não é cadastrado? <Link to="/register">Registrar</Link>
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
