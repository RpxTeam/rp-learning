import React from 'react'
import { API_URL } from "../../../../common/url-types";
import axios from 'axios'
import {
    Form,
} from 'semantic-ui-react'
import FilePreview from 'react-preview-file';

import Admin from '../../Admin'
import { Redirect } from "react-router-dom";

import {
    Grid,
    TextField,
    Card,
    Button,
    AppBar,
    Tabs,
    Tab,
    Typography,
    CardActions
} from '@material-ui/core'
import Message from '../../../../components/Message';
import styled from 'styled-components';

import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { DatePicker } from 'material-ui-pickers';
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
            image: '',
            tab: 0
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

    handleChangeDate = (field, date) => {
        this.setState({
            [field]: date
        })
    };

    handleSubmit = event => {
        event.preventDefault();

        if (!this.state.title) {
            this.openMessage('Título está vázio');
        } else if (!this.state.start_date) {
            this.openMessage('Data de início vázia');
        } else if (!this.state.end_date) {
            this.openMessage('Data de término vázia');
        } else if (!this.state.description) {
            this.openMessage('Descrição vázia');
        } else if (!this.state.duration) {
            this.openMessage('Duração vázia');
        } else if (this.state.duration < 1) {
            this.openMessage('Duração não pode ser menor que 1 hora');
        } else {
            this.submitCourse();
        }
    };

    submitCourse = () => {
        const start_date = this.formatDate(this.state.start_date);
        const end_date = this.formatDate(this.state.end_date);

        if (this.state.image.name) {
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
                });
                this.openMessage('Curso criado com sucesso!');
                setTimeout(function () {
                    this.setState({
                        courseEdit: true
                    })
                }.bind(this), 2000);
            }).catch(error => {
                this.setState({
                    error: true,
                    success: false
                })
                this.openMessage(error.message)
            });
        }
    }

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
        let day, month, year;
        day = date.getDate();
        month = date.getMonth() + 1;
        year = date.getFullYear();
        const newDate = year + '-' + month + '-' + day;

        return newDate
    };

    changeAuthors = (e, { value }) => this.setState({ authors: value })

    openMessage = (newState) => {
        this.setState({
            message: {
                ...this.state.message,
                open: true,
                text: newState
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

        const start_date = this.formatDate(this.state.start_date);
        const end_date = this.formatDate(this.state.end_date);

        formData.append('title', this.state.title);
        formData.append('description', this.state.description);
        formData.append('duration', this.state.duration);
        formData.append('image', this.state.image.file);
        formData.append('mime', this.state.image.file.type);
        formData.append('start_date', start_date);
        formData.append('end_date', end_date);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        axios.post(`${API_URL}/api/courses`, formData, config)
            .then((res) => {
                console.log(res.data);
                this.setState({
                    error: false,
                    success: true,
                    courseID: res.data
                });
                this.openMessage('Curso criado com sucesso');
                setTimeout(function () {
                    this.setState({
                        courseEdit: true
                    })
                }.bind(this), 2000);
            })
            .catch((error) => {
                this.openMessage(error.message);
            });
    };

    changeTab = (event, tab) => {
        this.setState({ tab });
    };

    render() {
        const { message, authors, options, image, tab } = this.state;
        if (this.state.courseEdit === true) {
            return <Redirect to={'/admin/courses/' + this.state.courseID} />
        }
        return (
            <Admin heading="Create">
                <Message text={message.text} open={message.open} close={this.closeMessage} />
                <form>
                    <AppBar position="static" color="default">
                        <Tabs value={tab} onChange={this.changeTab}>
                            <Tab label="Curso" />
                        </Tabs>
                    </AppBar>
                    {tab === 0 &&
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
                            <br />
                            <Grid container spacing={40}>
                                <Grid item sm={5}>
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
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <DatePicker
                                            keyboard
                                            fullWidth
                                            variant="outlined"
                                            label="Data de Início"
                                            value={this.state.start_date}
                                            onChange={this.handleChangeDate.bind(this, 'start_date')}
                                            format='dd/MM/yy'
                                            mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/]}
                                            locale={brLocale}
                                            style={{ margin: '12px 0', width: 'calc(100% - 14px)' }}
                                        />
                                    </MuiPickersUtilsProvider>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <DatePicker
                                            keyboard
                                            fullWidth
                                            variant="outlined"
                                            label="Data de Término"
                                            value={this.state.end_date}
                                            onChange={this.handleChangeDate.bind(this, 'end_date')}
                                            format='dd/MM/yy'
                                            mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/]}
                                            locale={brLocale}
                                            style={{ margin: '12px 0', width: 'calc(100% - 14px)' }}
                                        />
                                    </MuiPickersUtilsProvider>

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
                                </Grid>
                                <Grid item sm={7}>
                                    <br />
                                    <Button
                                        variant="contained"
                                        component='label'
                                    >
                                        IMAGEM
                                    <input type="file" style={{ display: 'none' }} onChange={this.onChangeFile} />
                                    </Button>
                                    <br /><br />
                                    {image.name ?
                                        <FilePreview file={image.file}>
                                            {(preview) => <img src={preview} />}
                                        </FilePreview>
                                        : null}
                                </Grid>
                            </Grid>
                            <CardActions style={{ justifyContent: 'flex-end' }}>
                                <Button variant="contained" color={'primary'} type={'submit'} onClick={this.handleSubmit}>Criar</Button>
                            </CardActions>
                        </CardContainer>
                    }
                </form>
            </Admin>
        );
    }
}

export default Page;
