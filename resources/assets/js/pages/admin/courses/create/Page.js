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
            start_date: '',
            end_date: '',
            datesRange: '',
            courseID: '',
            courseEdit: false,
            author: '',
            image: ''
        }
        this.openMessage = this.openMessage.bind(this);
    };

    getData = () => {
        axios.get(`${API_URL}/api/authors/`)
            .then(res => {
                const authors = res.data;
                authors.map((author) => {
                    this.setState({
                        options: [
                            ...this.state.options,
                            {
                                key: author.id,
                                text: author.name,
                                value: author.name
                            }
                        ]
                    })
                });
            })
    };

    componentDidMount() {
        this.getData();
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleChangeDate = (event, { name, value }) => {
        this.setState({
            datesRange: value
        })
    };

    handleSubmit = event => {
        event.preventDefault();

        if (!this.state.title || !this.state.datesRange || !this.state.description || !this.state.duration) {
            this.setState({
                message: {
                    ...this.state,
                    open: true,
                    text: 'Existem campos vázios'
                }
            })
        } else {
            const date = this.state.datesRange.split(' ');
            const start_date = this.formatDate(date[0]);
            const end_date = this.formatDate(date[2]);

            if(this.state.image.name) {
                this.fileUpload();
            } else {
                axios.post(`${API_URL}/api/courses`, {
                    title: this.state.title,
                    slug: this.state.slug,
                    description: this.state.description,
                    start_date: start_date,
                    end_date: end_date,
                    duration: this.state.duration,
                    image: this.state.image.file
                }).then(res => {
                    this.setState({
                        error: false,
                        success: true,
                        courseID: res.data,
                        courseEdit: true
                    });
                    this.openMessage({ text: 'Curso criado com sucesso' })
                }).catch(error => {
                    this.setState({
                        error: true,
                        success: false
                    })
                    this.openMessage({ text: error.message })
                });
            }
        }
    };

    handleDelete = () => {
        console.log('delete');
    };

    handleCopy = () => {
        console.log('Copy');
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

    openAuthor = () => {
        this.setState({
            createAuthor: !this.state.createAuthor
        });
    };

    createAuthor = (name) => {
        axios.post(`${API_URL}/api/authors/`, { name: name })
            .then(res => {
                const optionsCount = this.state.options.length;
                const newAuthor = { key: optionsCount + 1, value: name, text: name };
                this.setState({ author: '', options: [] });
                this.getData();
                this.openAuthor();
            });
    };

    formatDate = (date) => {
        const oldDate = date.split('/');
        let day, month, year;
        day = oldDate[0];
        month = oldDate[1];
        year = oldDate[2];
        const newDate = year + '-' + month + '-' + day;

        return newDate
    };

    changeAuthors = (e, { value }) => this.setState({ authors: value })

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

    onChangeFile = (event) => {
        const file = event.target.files[0];
        if (file.type === 'image/jpeg' || file.type === 'image/png') {
            this.setState({
                image: {
                    file: file,
                    name: file.name
                }
            });
        }
    };

    fileUpload = () => {
        const formData = new FormData();
        // if (type === 'PUT') {
        //     formData.append('_method', type);
        // }
        formData.append('title', this.state.image.title);
        formData.append('content', this.state.image.file);
        console.log(formData);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        axios.post(`${API_URL}/api/courses`, formData, config).then((res) => {
            this.setState({
                error: false,
                success: true,
                courseID: res.data,
                courseEdit: true
            });
        });
    };

    render() {
        const { message, authors, options, image } = this.state;
        if (this.state.courseEdit === true) {
            return <Redirect to={'/admin/courses/' + this.state.courseID} />
        }
        return (
            <Admin heading="Create">
                <Message text={message.text} open={message.open} close={this.closeMessage} />
                <form>
                    <Grid container spacing={16}>
                        <Grid item xs={12} md={9}>
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
                                <TextField
                                    id="input-description"
                                    label="Descrição"
                                    name="description"
                                    onChange={this.handleChange}
                                    margin="normal"
                                    variant="outlined"
                                    rows={8}
                                    multiline={true}
                                    rowsMax={10}
                                    fullWidth
                                />
                            </CardContainer>
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <CardContainer>

                                <TextField
                                    id="input-slug"
                                    label="Slug"
                                    name="slug"
                                    onChange={this.handleChange}
                                    margin="normal"
                                    variant="outlined"
                                    fullWidth
                                />

                                <TextField
                                    id="input-duration"
                                    label="Duração (horas)"
                                    name="duration"
                                    onChange={this.handleChange}
                                    margin="normal"
                                    variant="outlined"
                                    type={'number'}
                                    fullWidth
                                />

                                <Form.Field>
                                    <label>Data
                                        <DatesRangeInput
                                            name="datesRange"
                                            dateFormat='DD/MM/YYYY'
                                            placeholder="Início - Término"
                                            value={this.state.datesRange}
                                            iconPosition="left"
                                            closable={true}
                                            onChange={this.handleChangeDate} />
                                    </label>
                                </Form.Field>

                                {this.state.createAuthor ?
                                    <React.Fragment>
                                        <Form.Field>
                                            <TextField
                                                id="input-author"
                                                label="Autor"
                                                name="author"
                                                onChange={this.handleChange}
                                                margin="normal"
                                                variant="outlined"
                                                fullWidth
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <Button onClick={this.createAuthor.bind(this, this.state.author)} style={{ width: '100%' }}>Adicionar Autor</Button>
                                        </Form.Field>
                                    </React.Fragment>
                                    : null}
                            </CardContainer>
                            <br />
                            <CardContainer>
                                <Button
                                    variant="contained"
                                    component='label'
                                >
                                    IMAGEM
                                    <input type="file" style={{ display: 'none' }} onChange={this.onChangeFile} />
                                </Button>
                                <br /><br />
                                {image.name ?
                                    <Typography variant="caption" gutterBottom>
                                        {image.name}
                                    </Typography>
                                : null }
                            </CardContainer>
                            <br />

                            <Button variant="contained" color={'primary'} type={'submit'} onClick={this.handleSubmit} style={{ width: '100%' }}>Criar</Button>
                        </Grid>
                    </Grid>
                </form>
            </Admin>
        );
    }
}

export default Page;
