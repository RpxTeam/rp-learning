import React from 'react'
import {
    Divider,
    Dimmer,
    Form,
    Header,
    Icon,
    Loader,
    Message,
    Segment
} from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import ReeValidate from 'ree-validate'
import AuthService from '../../services'
import PageHeader from '../../common/pageHeader'
import Footer from '../../common/mainFooter'

import Input from '../../components/Input'
import Grid from '../../components/Grid'
import Button from '../../components/Button'

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
            isLoading: false,
            errors: this.validator.errors
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
            });
    }

    submit(credentials) {
        this.props.dispatch(AuthService.login(credentials))
            .catch(({ error, statusCode }) => {
                const responseError = {
                    isError: true,
                    code: statusCode,
                    text: error
                };
                this.setState({ responseError });
                this.setState({
                    isLoading: false
                });
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

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        const { isAuthenticated } = this.props;

        if (isAuthenticated) {
            return (
                <Redirect to={from} />
            )
        }
        const { errors } = this.state;

        return (
            <div>
                <main className="fadeIn animated" id="login-page">
                    <Grid>
                        <div class="center">
                            <div id="logo">
                                <img src={require('../../../img/logo.png')} alt="" />
                            </div>
                            <form>
                                <Input
                                    type='email'
                                    name='email'
                                    value={this.state.email}
                                    placeholder='Email'
                                    onChange={this.handleChange}
                                />
                                <Input
                                    type='password'
                                    name='password'
                                    value={this.state.password}
                                    placeholder='Senha'
                                    onChange={this.handleChange}
                                    icon='padlock'
                                />
                                <div class="btns btns-center">
                                    <Button type='submit' title='Entrar' onClick={this.handleSubmit} />
                                    <Button title='Registrar' className='btn btn-orange btn-center' />
                                </div>
                            </form>
                        </div>
                    </Grid>
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
