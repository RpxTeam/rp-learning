import React from 'react'
import { API_URL } from "../../../../common/url-types";
import axios from 'axios'
import {
    Form,
} from 'semantic-ui-react'
import {
    DateInput,
    TimeInput,
    DateTimeInput,
    DatesRangeInput
} from 'semantic-ui-calendar-react';
import Admin from '../../Admin'
import { Redirect } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Message from '../../../../components/Message';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
// import MenuItem from '@material-ui/core/MenuItem';
// import Fab from '@material-ui/core/Fab';
// import ExpandLess from '@material-ui/icons/ExpandLess';
// import ExpandMore from '@material-ui/icons/ExpandMore';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
// import FormControl from '@material-ui/core/FormControl';
// import Chip from '@material-ui/core/Chip';
// import Select from '@material-ui/core/Select';

import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { TimePicker } from 'material-ui-pickers';
import { DatePicker } from 'material-ui-pickers';
import { DateTimePicker } from 'material-ui-pickers';
import { InlineDatePicker } from 'material-ui-pickers';
import brLocale from 'date-fns/locale/pt-BR';

const CardContainer = styled(Card)`
    padding: 10px 20px;
`;

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            success: false,
            message: {
                open: false,
                vertical: 'top',
                horizontal: 'center',
                text: 'Snackbar its works'
            },
            authors: [],
            options: [],
            lessons: {

            },
            start_date: new Date(),
            end_date: new Date(),
            datesRange: '',
            courseID: '',
            courseEdit: false,
            author: '',
            image: ''
        }
        this.openMessage = this.openMessage.bind(this);
    };

    getData = () => {

    };

    componentDidMount() {
        this.getData();
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        if (!this.state.title) {
            this.setState({
                message: {
                    ...this.state,
                    open: true,
                    text: 'Preencha o título'
                }
            })
        } else {
            axios.post(`${API_URL}/api/courses`, {
                title: this.state.title
            }).then(res => {
                console.log(res.data)
                this.setState({
                    quizID: res.data,
                    message: {
                        ...this.state.message,
                        open: true,
                        text: 'Quiz criado com sucesso!',
                    }
                });
                setTimeout(function () {
                    this.setState({
                        quizEdit: true
                    })
                }.bind(this), 2000);
            }).catch(error => {
                this.setState({
                    error: true,
                    success: false
                })
                this.openMessage({ text: error.message })
            });
        }
    };

    handleDelete = () => {
        console.log('delete');
    };

    handleEditor = (event, editor) => {
        const data = editor.getData();
        this.setState({
            lesson: {
                content: data
            }
        });
    };

    openModal = type => () => this.setState({ modal: { type: type, open: true } });

    closeModal = () => this.setState({ modal: { open: false } });

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
        // if (this.state.quizEdit === true) {
        //     return <Redirect to={'/admin/courses/' + this.state.courseID} />
        // }
        return (
            <Admin heading="Quiz">
                <Message text={message.text} open={message.open} close={this.closeMessage} />
                <form>
                    <Grid container spacing={16} justify="flex-end">
                        <Grid item xs={12} md={12}>
                            <CardContainer>
                                <TextField
                                    id="input-title"
                                    label="Título"
                                    onChange={this.handleChange}
                                    margin="normal"
                                    variant="outlined"
                                    name="title"
                                    fullWidth
                                />
                            </CardContainer>
                        </Grid>
                        <Grid item md={2}>
                            <Button variant="contained" color={'primary'} type={'submit'} onClick={this.handleSubmit} style={{ width: '100%' }}>Criar Quiz</Button>
                        </Grid>
                    </Grid>
                </form>
            </Admin>
        );
    }
}

export default Page;
