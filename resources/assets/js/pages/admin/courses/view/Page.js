import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { API_URL } from "../../../../common/url-types";
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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import QuestionAnswer from '@material-ui/icons/QuestionAnswer';
import VideoCam from '@material-ui/icons/VideoCam';
import VideoLibrary from '@material-ui/icons/VideoLibrary';
import AudioTrack from '@material-ui/icons/AudioTrack';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Fab from '@material-ui/core/Fab';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
// import Dropdown from "semantic-ui-react/dist/es/modules/Dropdown/Dropdown";
// import Modal from "semantic-ui-react/dist/es/modules/Modal/Modal";

// CKEditor
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

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
            courseID: this.props.match.params.id,
            course: {
                title: '',
                slug: '',
                duration: '',
                start_date: new Date(),
                end_date: new Date(),
                description: '',
                image: ''
            },
            edit: true,
            lessons: [],
            lesson: {
                title: '',
                user_id: '',
                course_id: '',
                lesson_id: '',
                content: ''
            },
            modal: {
                type: '',
                open: false,
                message: ''
            },
            confirm: {
                open: false
            },
            file: {
                name: 'Nenhum arquivo',
                file: null,
            },
            datesRange: '',
            message: {
                open: false,
                vertical: 'top',
                horizontal: 'center',
                text: 'Snackbar its works'
            },
            menu: {
                open: false
            },
            open: false,
        };

        this.handleEditor = this.handleEditor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateCourse = this.updateCourse.bind(this);
        this.updateLesson = this.updateLesson.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);
        this.fileUpload = this.fileUpload.bind(this);
    }

    componentDidMount() {
        axios.get(`${API_URL}/api/courses/${this.state.courseID}`)
            .then(res => {
                const course = res.data;
                let start_date, end_date;
                start_date = this.formatDateReverse(course.start_date);
                end_date = this.formatDateReverse(course.end_date);
                this.setState({
                    course: {
                        title: course.title,
                        description: course.description,
                        slug: course.slug,
                        duration: course.duration,
                        start_date: start_date,
                        end_date: end_date
                    },
                });
            });

        // axios.get(`${ API_URL }/api/courses/${courseID}/lessons/`)
        // .then(res => {
        //     const lessons = res.data;
        //     this.setState({ lessons: lessons });
        //
        // this.state.lessons);
        // });
        this.loadingLessons();
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
    };

    updateCourse = (event) => {
        this.setState({
            course: {
                [event.target.name]: event.target.value
            }
        });
    };

    updateLesson = (event) => {
        this.setState({
            lesson: {
                ...this.state.lesson,
                [event.target.name]: event.target.value
            }
        });
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleChangeDate = (field, date) => {
        this.setState({
            course: {
                ...this.state.course,
                [field]: date
            }
        })
    };

    handleSubmit = event => {
        event.preventDefault();

        const start_date = this.formatDate(this.state.course.start_date);
        const end_date = this.formatDate(this.state.course.end_date);

        axios.put(`${API_URL}/api/courses/${this.state.courseID}`, {
            title: this.state.course.title,
            slug: this.state.course.slug,
            description: this.state.course.description,
            start_date: start_date,
            end_date: end_date,
            duration: this.state.course.duration
        })
            .then(res => {
                this.setState({
                    message: {
                        open: true,
                        text: 'Curso atualizado com sucesso'
                    },
                    error: false,
                    success: true,
                    edit: false
                });
            }).catch(error => {
                this.setState({
                    message: {
                        open: true,
                        text: error.message,
                    },
                    error: true,
                    success: false
                })
            })
    };

    handleSubmitLesson = (type) => {
        if (this.state.lesson.title !== '') {
            if (type === 'video-internal' || type === 'audio' || type === 'doc' || type === 'pdf') {
                this.fileUpload();
                this.closeModal();
                this.setState({
                    lesson: {
                        ...this.state.lesson,
                        file: {
                            file: null,
                            name: ''
                        },
                        type: '',
                        title: '',
                        content: ''
                    }
                });
            } else {
                axios.post(`${API_URL}/api/courses/${this.state.courseID}/lessons`, {
                    type: this.state.modal.type,
                    title: this.state.lesson.title,
                    content: this.state.lesson.content,
                }).then(res => {
                    this.setState({
                        message: 'Lição criada com sucesso',
                        error: false,
                        success: true,
                        lesson: {
                            ...this.state.lesson,
                            type: '',
                            title: '',
                            content: ''
                        }
                    });
                    this.closeModal();
                    this.loadingLessons();
                }).catch(error => {
                    this.setState({
                        message: error.message,
                        error: true,
                        success: false
                    })
                });
            }
        } else {
            this.messageModal('Por favor preencha o título');
        }
    };

    handleEditLesson = (type, id) => {
        if (this.state.lesson.title !== '') {
            if (type === 'video-internal' || type === 'audio' || type === 'doc' || type === 'pdf') {
                this.fileUpload('PUT');
                this.closeModal();
                this.setState({
                    lesson: {
                        ...this.state.lesson,
                        type: '',
                        title: '',
                        content: ''
                    }
                });
            } else {
                axios.put(`${API_URL}/api/courses/${this.state.courseID}/lessons/${id}`, {
                    type: this.state.modal.type,
                    title: this.state.lesson.title,
                    content: this.state.lesson.content,
                }).then(res => {
                    this.setState({
                        message: 'Lição criada com sucesso',
                        error: false,
                        success: true,
                        lesson: {
                            ...this.state.lesson,
                            type: '',
                            title: '',
                            content: ''
                        }
                    });
                    this.closeModal();
                    this.loadingLessons();
                }).catch(error => {
                    this.setState({
                        message: error.message,
                        error: true,
                        success: false
                    })
                });
            }
        } else {
            this.messageModal('Por favor preencha o título');
        }
    };

    messageModal = (message) => {
        this.setState({
            modal: {
                ...this.state.modal,
                message: message
            }
        })
    };

    loadingLessons = () => {
        axios.get(`${API_URL}/api/courses/${this.state.courseID}/lessons/`)
            .then(res => {
                const lessons = res.data;
                this.setState({ lessons: lessons });
            });
    };

    handleEditor = (event, editor) => {
        const data = editor.getData();
        this.setState({
            lesson: {
                ...this.state.lesson,
                content: data
            }
        });
    };

    handleConfirm = (value) => {
        this.setState({
            lessonID: value,
            open: true
        })
    };

    handleCancel = () => {
        this.setState({
            lessonID: '',
            open: false,
            modal: {
                ...this.state.modal,
                type: '',
                open: false,
                message: '',
            },
            lesson: {
                title: '',
                content: ''
            }
        })
    }

    handleDelete = () => {
        if (this.state.lessonID) {
            axios.delete(`${API_URL}/api/courses/${this.state.courseID}/lessons/${this.state.lessonID}`)
                .then(res => {

                    this.loadingLessons();
                    this.setState({
                        message: 'Lição deletado',
                        error: false,
                        success: true,
                        confirm: { open: false }
                    })
                    this.handleCancel();
                });
        }
    };

    openModal = type => () => {
        this.setState({ modal: { type: type, open: true, edit: false } });
        this.closeMenu();
    };

    closeModal = () => this.setState({
        modal: {
            ...this.state.modal,
            type: '',
            open: false,
            message: ''
        }
    });

    showConfirm = () => this.setState({ confirm: { open: true } });
    closeConfirm = () => this.setState({ confirm: { open: false } });

    openMenu = (event) => {
        this.setState({
            menu: {
                open: event.currentTarget,
                anchorEl: event.currentTarget
            }
        })
    }

    closeMenu = () => {
        this.setState({
            menu: {
                open: null
            }
        })
    }

    onChangeFile = (event) => {
        const file = event.target.files[0];
        const typeLesson = this.state.modal.type;
        if (typeLesson === 'video-internal') {
            if (
                file.type === 'video/mp4'
                || file.type === 'video/webm'
                || file.type === 'video/ogg'
                || file.type === 'video/ogv'
                || file.type === 'video/avi'
                || file.type === 'video/mpeg'
                || file.type === 'video/mov'
                || file.type === 'video/wmv'
                || file.type === 'video/3gp'
                || file.type === 'video/flv'
            ) {
                this.setState({
                    file: {
                        file: file,
                        name: file.name
                    }
                });
                this.messageModal('');
            } else {
                this.messageModal('Tipo de arquivo inválido.');
            }
        } else if (typeLesson === 'audio') {
            if (
                file.type === 'audio/mp3'
                || file.type === 'video/aac'
                || file.type === 'video/ogg'
                || file.type === 'video/wav'
                || file.type === 'video/mpeg'
                || file.type === 'video/webm'
                || file.type === 'video/wav'
                || file.type === 'video/wma'
                || file.type === 'video/ra'
                || file.type === 'video/aif'
                || file.type === 'video/aiff'
            ) {
                this.setState({
                    file: {
                        file: file,
                        name: file.name
                    }
                });
                this.messageModal('');
            } else {
                this.messageModal('Tipo de arquivo inválido.');
            }
        } else if (typeLesson === 'pdf' || typeLesson === 'doc') {
            if (
                file.type === 'application/pdf'
            ) {
                this.setState({
                    file: {
                        file: file,
                        name: file.name
                    }
                });
                this.messageModal('');
            } else {
                this.messageModal('Tipo de arquivo inválido.');
            }
        }
    };

    fileUpload = (type) => {
        const formData = new FormData();
        if (type === 'PUT') {
            formData.append('_method', type);
        }
        formData.append('title', this.state.lesson.title);
        formData.append('type', this.state.modal.type);
        formData.append('content', this.state.file.file);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        axios.post(`${API_URL}/api/courses/${this.state.courseID}/lessons`, formData, config).then((res) => {
            this.loadingLessons();
        });
    };

    editLesson = (id) => {
        axios.get(`${API_URL}/api/courses/${this.state.courseID}/lessons/${id}`)
            .then(res => {
                const lesson = res.data;
                this.setState({
                    lesson: lesson,
                    modal: {
                        type: lesson.type,
                        open: true,
                        edit: true
                    }
                });
                if (lesson.type === 'video-internal' || lesson.type === 'audio' || lesson.type === 'doc' || lesson.type === 'pdf') {
                    const archive = lesson.content.split('/');
                    const archiveCount = archive.length - 1;
                    this.setState({
                        file: {
                            type: lesson.type,
                            name: archive[archiveCount],
                        }
                    })
                }
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

    formatDateReverse = (date) => {
        const oldDate = date.split('-');
        let day, month, year;
        day = Number(oldDate[2]);
        month = Number(oldDate[1]) - 1;
        year = Number(oldDate[0]);
        const newDate = new Date(year, month, day);

        return newDate
    };

    handleEdit = () => {
        this.setState({
            edit: !this.state.edit
        })
    }

    render() {
        const { course, lessons, message, menu, edit, modal } = this.state;
        return (
            <Admin heading={"Cursos"}>
                <Message text={message.text} open={message.open} close={this.closeMessage} />
                <Form>
                    <Grid container spacing={16}>
                        <Grid item xs={12} md={9}>
                            <CardContainer>
                                <Grid>
                                    <TextField
                                        disabled={edit}
                                        id="input-title"
                                        label="Título"
                                        onChange={this.updateCourse}
                                        margin="normal"
                                        variant="outlined"
                                        name="title"
                                        placeholder={course.title}
                                        defaultValue={course.title}
                                        value={course.title}
                                        fullWidth
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <TextField
                                        disabled={edit}
                                        id="input-description"
                                        label="Descrição"
                                        name="description"
                                        onChange={this.updateCourse}
                                        margin="normal"
                                        variant="outlined"
                                        rows={8}
                                        multiline={true}
                                        rowsMax={10}
                                        defaultValue={course.description}
                                        value={course.description}
                                        fullWidth
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                            </CardContainer>
                            <Grid container spacing={8}>
                                <Grid item xs={12} md={12} align={'right'}>
                                    <br />
                                    <Button
                                        aria-owns={ menu.open ? 'menu-lesson' : undefined}
                                        aria-haspopup="true"
                                        onClick={this.openMenu}
                                        variant="contained"
                                        color="primary"
                                    >
                                        Adicionar lição
                                    </Button>
                                    <Menu id='menu-lessons' anchorEl={menu.open} open={Boolean(menu.open)} onClose={this.closeMenu}>
                                        <MenuItem onClick={this.openModal('text')}>
                                            <ListItemIcon>
                                                <LibraryBooks />
                                            </ListItemIcon>
                                            <ListItemText>
                                                Texto
                                            </ListItemText>
                                        </MenuItem>
                                        <MenuItem onClick={this.openModal('video-internal')}>
                                            <ListItemIcon>
                                                <VideoLibrary />
                                            </ListItemIcon>
                                            <ListItemText>
                                                Vídeo Interno
                                            </ListItemText>
                                        </MenuItem>
                                        <MenuItem onClick={this.openModal('video-external')}>
                                            <ListItemIcon>
                                                <VideoCam />
                                            </ListItemIcon>
                                            <ListItemText>
                                                Vídeo Externo
                                            </ListItemText>
                                        </MenuItem>
                                        <MenuItem onClick={this.openModal('audio')}>
                                            <ListItemIcon>
                                                <AudioTrack />
                                            </ListItemIcon>
                                            <ListItemText>
                                                Áudio
                                            </ListItemText>
                                        </MenuItem>
                                        {/* <MenuItem onClick={this.openModal('doc')}>
                                            <ListItemIcon>
                                                <InboxIcon />
                                            </ListItemIcon>
                                            <ListItemText>
                                                Documento
                                            </ListItemText>
                                        </MenuItem> */}
                                        <Divider />
                                        <MenuItem component={Link} to={'/quiz/create'}>
                                            <ListItemIcon>
                                                <QuestionAnswer />
                                            </ListItemIcon>
                                            <ListItemText>
                                                Quiz
                                            </ListItemText>
                                        </MenuItem>
                                    </Menu>
                                </Grid>
                            </Grid>
                            <br />
                            <Grid container spacing={8}>
                                <Grid item xs={12} md={12}>
                                    <Card>
                                        <Table>
                                            <TableBody>
                                                {lessons.map((lesson) =>
                                                    <TableRow key={lesson.id}>
                                                        <TableCell>
                                                            {/* <Button onClick={this.handleEditLesson.bind(this)}>{lesson.title}</Button> */}
                                                            {lesson.title}
                                                        </TableCell>
                                                        <TableCell align={'right'}>
                                                            <IconButton color="secondary" aria-label="Delete" style={{ margin: '0 5px' }} value={lesson.id} onClick={this.handleConfirm.bind(this, lesson.id)}>
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                                }
                                            </TableBody>
                                        </Table>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <CardContainer>
                                <TextField
                                    disabled={edit}
                                    id="input-slug"
                                    label="Slug"
                                    name="slug"
                                    onChange={this.updateCourse}
                                    margin="normal"
                                    variant="outlined"
                                    placeholder={course.slug}
                                    defaultValue={course.slug}
                                    value={course.slug}
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    disabled={edit}
                                    id="input-duration"
                                    label="Duração (horas)"
                                    name="duration"
                                    onChange={this.updateCourse}
                                    margin="normal"
                                    variant="outlined"
                                    type='number'
                                    defaultValue={course.duration}
                                    value={course.duration}
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <br /><br />
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Grid container spacing={8}>
                                        <Grid item md={6} xs={12}>
                                            <InlineDatePicker
                                                keyboard
                                                variant="outlined"
                                                label="Data de Início"
                                                value={course.start_date}
                                                onChange={this.handleChangeDate.bind(this, 'start_date')}
                                                format='dd/MM/yy'
                                                mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/]}
                                                locale={brLocale}
                                                disabled={edit}
                                            />
                                        </Grid>
                                        <Grid item md={6} xs={12}>
                                            <InlineDatePicker
                                                keyboard
                                                variant="outlined"
                                                label="Data de Término"
                                                value={course.end_date}
                                                onChange={this.handleChangeDate.bind(this, 'end_date')}
                                                format='dd/MM/yy'
                                                mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/]}
                                                locale={brLocale}
                                                disabled={edit}
                                            />
                                        </Grid>
                                    </Grid>
                                </MuiPickersUtilsProvider>
                            </CardContainer>
                            <br />
                            {course.image ?
                                <CardContainer>
                                    {/* <Button
                                    variant="contained"
                                    component='label'
                                >
                                    IMAGEM
                                    <input type="file" style={{ display: 'none' }} onChange={this.onChangeFile} />
                                </Button> */}
                                    <Typography variant="caption" gutterBottom>
                                        Imagem
                                    </Typography>
                                    <img src={course.image} />
                                </CardContainer>
                                : null}
                            <br />
                            <Grid container spacing={8}>
                                <Grid item xs={6} md={3}>
                                    <Button variant="contained" size="small" aria-label="Editar" onClick={this.handleEdit}>
                                        <EditIcon />
                                    </Button>
                                </Grid>
                                <Grid item xs={6} md={9}>
                                    <Button disabled={edit} variant="contained" color={'primary'} type={'submit'} onClick={this.handleSubmit} style={{ width: '100%' }}>Atualizar</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Form>

                <Dialog
                    open={this.state.open}
                    maxWidth="xs"
                    aria-labelledby="confirmation-dialog-title"
                >
                    <DialogTitle id="confirmation-dialog-title">Excluir Lição</DialogTitle>
                    <DialogContent>
                        Você tem certeza que deseja excluir?
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCancel} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleDelete} color="primary">
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    onClose={this.handleCancel}
                    open={modal.open}
                    maxWidth="lg"
                    aria-labelledby="confirmation-dialog-title"
                    variant="outlined"
                >
                    <DialogTitle id="confirmation-dialog-title">Criar lição</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Título"
                            name="title"
                            onChange={this.updateLesson}
                            margin="normal"
                            variant="outlined"
                            placeholder={this.state.lesson.title}
                            defaultValue={this.state.lesson.title}
                            value={this.state.lesson.title}
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        {this.state.modal.type === 'text' ?
                            <CKEditor
                                editor={ClassicEditor}
                                data={this.state.lesson.content}
                                onInit={editor => {
                                    // You can store the "editor" and use when it is needed.
                                    console.log('Editor is ready to use!', editor);
                                }}
                                onChange={this.handleEditor}
                                config={
                                    {
                                        removePlugins: ['Link', 'ImageUpload', 'MediaEmbed']
                                    }
                                }
                            />
                            : null}
                        {this.state.modal.type === 'webcontent' ?
                            <TextField
                                label="Conteúdo Web"
                                name="web-content"
                                onChange={this.updateLesson}
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            : null}
                        {this.state.modal.type === 'video-external' ?
                            <TextField
                                label="Url"
                                name="content"
                                onChange={this.updateLesson}
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            : null}
                        {this.state.modal.type === 'video-internal' || this.state.modal.type === 'audio' || this.state.modal.type === 'doc' ?
                            <React.Fragment>
                                <Grid container spacing={16}>
                                    <p>{this.state.file.name}</p>
                                </Grid>
                                <Grid container md={12}>
                                    <Grid item md={6}>
                                        <Button
                                            variant="contained"
                                            component='label' // <-- Just add me!
                                        >
                                            File
                                            <input type="file" onChange={this.onChangeFile} />
                                        </Button>
                                        {/* <Label
                                            floated={'left'}
                                            as="label"
                                            basic
                                            htmlFor="upload">
                                            <Button
                                                icon="upload"
                                                label={{
                                                    basic: true,
                                                    content: 'Selecione o Arquivo'
                                                }}
                                                htmlFor="upload"
                                                labelPosition="right"
                                            />
                                            <input
                                                hidden
                                                id="upload"
                                                type="file"
                                                onChange={this.onChangeFile} />
                                        </Label> */}
                                    </Grid>
                                    <Grid item md={6}>
                                        <Typography variant="overline" gutterBottom>
                                            Formatos aceitos: mp4, webm, ogg, ogv, avi, mpeg, mpg, mov, wmv, 3gp, flv. Max file size: 20 MB
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </React.Fragment>
                            : null}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCancel} color="primary">
                            Cancel
                        </Button>
                        {this.state.modal.edit ?
                            <Button onClick={this.handleSubmitLesson.bind(this, this.state.modal.type, this.state.lesson.id)} color="primary">
                                Editar
                            </Button>
                            :
                            <Button onClick={this.handleSubmitLesson.bind(this, this.state.modal.type)} color="primary">
                                Criar
                            </Button>
                        }
                    </DialogActions>
                </Dialog>
            </Admin>
        );
    }
}

export default Page;
