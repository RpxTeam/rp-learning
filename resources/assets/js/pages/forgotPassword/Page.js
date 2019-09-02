import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import ReeValidate from 'ree-validate'
import AuthService from '../../services'
import PageHeader from '../../common/pageHeader'
import Navigation from '../../common/navigation'
import Footer from '../../components/Footer'


import Message from '../../components/Message';
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
import { height } from 'window-size';

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
        });

        this.state = {
            credentials: {
                email: '',
            },
            responseError: {
                isError: false,
                code: '',
                text: ''
            },
            isSuccess: false,
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
                    this.setState({
                        isLoading: true
                    });
                    this.submit(credentials);
                }
            });
    }

    submit(credentials) {
        this.props.dispatch(AuthService.resetPassword(credentials))
            .then((result)  => {
                this.setState({
                    isLoading: false
                });
                this.setState({
                    isSuccess: true,
                });
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

    componentDidMount(){
        this.setState({
            isLoading: false
        });
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        const { isAuthenticated } = this.props;

        if (isAuthenticated) {
            return (
                <Redirect to={from}/>
            )
        }
        const {errors} = this.state;

        return (
            <div>
                <main className="fadeIn animated" id="forgot-password-page" style={{ alignItems: 'center' }}>
                <div className="center">
                    <div id="logo">
                        <Link to={"/"}>
                            <img src="/img/logo.png" style={{maxWidth:500 , height:100}}/>
                        </Link>
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
                                </CardContainer>
                            </Grid>
                        </Grid>
                        <div className="btns btns-center">
                            <div>
                                <Button type='submit' variant="contained" color="secondary">Enviar</Button>
                            </div>
                        </div>
                    </form>


                    {/*<Segment className='page-loader' style={{display: this.state.isLoading ? 'block' : 'none'}}>
                        <Dimmer active inverted>
                            <Loader size='large'>Resetting Password...</Loader>
                        </Dimmer>
                    </Segment>

                    <Grid
                        textAlign='center'
                        verticalAlign='middle'
                        className='login-form'
                    >
                        <Grid.Column>
                            <Header as='h2' color='teal' textAlign='center'>
                                Reset your password
                            </Header>
                            {this.state.responseError.isError && <Message negative>
                                <Message.Content>
                                    {this.state.responseError.text}
                                </Message.Content>
                            </Message>}
                            {this.state.isSuccess && <Message positive>
                                <Message.Content>
                                    If the email you entered exists, a reset link has been sent !
                                </Message.Content>
                            </Message>}
                            <Form size='large'>
                                <Segment stacked>
                                    <Form.Input
                                        fluid
                                        icon='user'
                                        iconPosition='left'
                                        name='email'
                                        placeholder='E-mail address'
                                        onChange={this.handleChange}
                                        error={errors.has('email')}
                                    />
                                    {errors.has('email') && <Header size='tiny' className='custom-error' color='red'>
                                        {errors.first('email')}
                                    </Header>}
                                    <Button color='teal' fluid size='large' onClick={this.handleSubmit}>Reset Password</Button>
                                </Segment>
                            </Form>
                            <Message>
                                New to us? <Link to='/register' replace>Register</Link>
                            </Message>
                        </Grid.Column>
                    </Grid> */}
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
