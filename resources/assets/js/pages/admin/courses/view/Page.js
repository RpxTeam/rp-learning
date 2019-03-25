import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { API_URL } from "../../../../common/url-types";
import Admin from '../../Admin'

import styled from 'styled-components';

import FilePreview from 'react-preview-file';

import "video-react/dist/video-react.css";
import { Player } from 'video-react';
import ReactPlayer from 'react-player'

import {
    Grid,
    TextField,
    Card,
    CardHeader,
    Button,
    Menu,
    MenuItem,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemAvatar,
    ListItemSecondaryAction,
    Table,
    TableBody,
    TableCell,
    Avatar,
    TableHead,
    TableRow,
    IconButton,
    DialogTitle,
    DialogContent,
    DialogActions,
    Dialog,
    Fab,
    Typography,
    Divider,
    FormGroup,
    FormControlLabel,
    Switch,
    AppBar,
    Tabs,
    Tab
} from '@material-ui/core'

import Message from '../../../../components/Message';
import EditIcon from '@material-ui/icons/Edit';
import RemoveRedEye from '@material-ui/icons/RemoveRedEye';
import DeleteIcon from '@material-ui/icons/Delete';
import QuestionAnswer from '@material-ui/icons/QuestionAnswer';
import InboxIcon from '@material-ui/icons/Inbox';
import AddIcon from '@material-ui/icons/Add';


import AudioTrack from '@material-ui/icons/AudioTrack'
import LibraryBooks from '@material-ui/icons/LibraryBooks'
import VideoLibrary from '@material-ui/icons/VideoLibrary'
import VideoCam from '@material-ui/icons/VideoCam'
import InsertDriveFile from '@material-ui/icons/InsertDriveFile'
import CheckCircle from '@material-ui/icons/CheckCircle'

// Editor
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';

// Date
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { DatePicker } from 'material-ui-pickers';
import brLocale from 'date-fns/locale/pt-BR';

const CardContainer = styled(Card)`
    padding: 10px 20px;
`;

const Audio = styled.audio`
    margin: auto;
    width: 500px;
    display: block;
    @media(max-width: 500px) {
        width: 100%;
    }
`;

const Lesson = styled(TableRow)`
    ${'' /* cursor: move */}
`;

const TitlePreview = styled(DialogTitle)`
    text-align: center;
    border-bottom: 1px solid #ddd;
    margin-bottom: 20px!important;
`;

const PreviewContent = styled(DialogContent)`
    iframe[frameborder] {
        width: 100%;
        height: 450px;
    }
    p {
        padding-bottom: 10px;
    }
`;

const PreviewButtons = styled(DialogActions)`
    border-top: 1px solid #ddd;
    padding-top: 30px;
`;

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courseID: this.props.match.params.id,
            course: {
                title: '',
                slug: '',
                image: '',
                mime: '',
                duration: '',
                start_date: new Date(),
                end_date: new Date(),
                description: '',
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
                open: null
            },
            open: false,
            question: {
                course_id: null,
                quiz_id: null,
                lesson_id: null,
                text: '',
                active: true,
                answers: [
                ]
            },
            hasQuiz: false,
            answerField: '',
            questionField: '',
            createQuiz: false,
            imageEdit: false,
            activeQuiz: false,
            quizCreated: false,
            scrolled: false,
            idQuestion: null,
            editAnswer: null,
            view: false,
            tab: 0
        };

        this.handleEditor = this.handleEditor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateCourse = this.updateCourse.bind(this);
        this.updateLesson = this.updateLesson.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);
        this.fileUpload = this.fileUpload.bind(this);
        this.removeAnswer = this.removeAnswer.bind(this);
        this.correctAnswser = this.correctAnswser.bind(this);
        this.openMessage = this.openMessage.bind(this);
    }

    componentDidMount() {

        this.getCourse();

        axios.get(`${API_URL}/api/courses/${this.state.courseID}/quiz`)
            .then(res => {
                if (res.data === 400) {
                    axios.post(`${API_URL}/api/courses/${this.state.courseID}/quiz`, {
                        title: 'quiz_' + this.state.courseID
                    }).then(res => {
                        this.setState({
                            quiz_id: res.data
                        });
                    }
                    );
                } else {
                    this.setState({
                        hasQuiz: true,
                        quiz_id: res.data
                    });

                    axios.get(`${API_URL}/api/courses/${this.state.courseID}/quiz/${this.state.quiz_id}`)
                        .then(res => {
                            if (res.data.active != null) {
                                this.setState({
                                    quizCreated: true,
                                    activeQuiz: res.data.active
                                });
                            }
                        })
                }
            });

        this.loadingLessons();
    }

    getCourse = (id) => {
        let course;
        if (id) {
            course = id
        } else {
            course = this.state.courseID
        }
        axios.get(`${API_URL}/api/courses/${course}`)
            .then(res => {
                const course = res.data;
                let start_date, end_date;
                start_date = this.formatDateReverse(course.start_date);
                end_date = this.formatDateReverse(course.end_date);
                this.setState({
                    course: {
                        id: course.id,
                        title: course.title,
                        description: course.description,
                        slug: course.slug,
                        duration: course.duration,
                        start_date: start_date,
                        end_date: end_date,
                        image: course.image,
                        mime: course.mime
                    },
                    image: {
                        url: course.image
                    },
                    imageEdit: false
                });
            });
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
                ...this.state.course,
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

        if (!this.state.course.title) {
            this.openMessage('Título está vázio');
        } else if (!this.state.course.start_date) {
            this.openMessage('Data de início vázia');
        } else if (!this.state.course.end_date) {
            this.openMessage('Data de término vázia');
        } else if (!this.state.course.description) {
            this.openMessage('Descrição vázia');
        } else if (!this.state.course.duration) {
            this.openMessage('Duração vázia');
        } else if (this.state.course.duration < 1) {
            this.openMessage('Duração não pode ser menor que 1 hora');
        } else {

            const start_date = this.formatDate(this.state.course.start_date);
            const end_date = this.formatDate(this.state.course.end_date);

            if (this.state.image.file) {

                const formData = new FormData();

                formData.append('_method', 'PUT');
                formData.append('title', this.state.course.title);
                formData.append('description', this.state.course.description);
                formData.append('duration', this.state.course.duration);
                if (this.state.image.file) {
                    formData.append('image', this.state.image.file);
                    formData.append('mime', this.state.image.file.type);
                }
                formData.append('start_date', start_date);
                formData.append('end_date', end_date);

                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                };

                axios.post(`${API_URL}/api/courses/${this.state.courseID}`, formData, config)
                    .then((res) => {
                        this.setState({
                            error: false,
                            success: true,
                            edit: !this.state.edit
                        });

                        this.openMessage('Curso atualizado com sucesso');

                        setTimeout(function () {
                            this.getCourse(this.state.course.id);
                        }.bind(this), 2000);
                    })
                    .catch((error) => {
                        this.openMessage(error.message);
                    });
            } else {
                axios.put(`${API_URL}/api/courses/${this.state.courseID}`, {
                    title: this.state.course.title,
                    slug: this.state.course.slug,
                    description: this.state.course.description,
                    start_date: start_date,
                    end_date: end_date,
                    duration: this.state.course.duration,
                })
                    .then(res => {
                        this.openMessage('Curso atualizado com sucesso');
                        this.setState({
                            error: false,
                            success: true,
                            edit: !this.state.edit
                        });
                        this.getCourse();
                    }).catch(error => {
                        this.openMessage(error.message);
                        this.setState({
                            error: true,
                            success: false
                        })
                    })
            }
        }
    };

    handleSubmitLesson = (type) => {
        if (this.state.quiz) {
            if (this.state.lesson.title === '') {
                this.openMessage('Preenche o título');
            } else if (this.state.questionField === '') {
                this.openMessage('Preenche a pergunta');
            } else if (this.state.question.answers.length < 1) {
                this.openMessage('Insira ao menos 1 reposta');
            } else if (this.verifyAnswers() === false) {
                this.openMessage('Selecione ao menos 1 reposta correta');
            } else {
                this.submitLesson(type, true);
            }

        } else if (this.state.lesson.title !== '') {
            this.submitLesson(type, false);
        } else {
            this.openMessage('Por favor preencha o título');
        }
    };

    verifyAnswers = () => {
        const answers = this.state.question.answers;
        const newAnswers = answers.filter((elem) => {
            if (elem.correct === 1 || elem.correct === "1" || elem.correct === true) {
                return answers;
            }
        });
        if (newAnswers.length < 1) {
            return false
        } else {
            return true
        }
    }

    submitLesson = (type, quiz) => {
        let count = this.state.lessons.length;
        if (type === 'video-internal' || type === 'audio' || type === 'doc' || type === 'pdf') {
            if (quiz) {
                this.fileUpload('', true);
            } else {
                this.fileUpload();
            }
        } else {
            let content = this.state.lesson.content;
            const lesson = {
                type: this.state.modal.type,
                title: this.state.lesson.title,
                content: content
            }
            axios.post(`${API_URL}/api/courses/${this.state.courseID}/lessons`, lesson).then(res => {
                this.openMessage('Lição criada com sucesso');
                if (quiz) {
                    this.createQuiz(res.data);
                }
                this.setState({
                    lesson: {
                        ...this.state.lesson,
                        type: '',
                        title: '',
                        content: ''
                    },
                    question: {
                        course_id: null,
                        lesson_id: null,
                        text: '',
                        active: true,
                        answers: [
                        ]
                    },
                    questionField: '',
                    idQuestion: null,
                    file: {
                        file: null,
                        name: ''
                    }
                });
                this.closeModal();
                this.loadingLessons();
            }).catch(error => {
                this.openMessage(error.message)
            });
        }
    }

    submitEditLesson = (id, question, type, quiz) => {
        if (type === 'video-internal' || type === 'audio' || type === 'doc' || type === 'pdf') {
            if (quiz) {
                if (question) {
                    this.fileUpload('PUT', true, this.state.idQuestion);
                } else {
                    this.fileUpload('PUT', true);
                }
            } else {
                this.fileUpload('PUT', false, id);
            }
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
            const lessonUpdate = {
                type: this.state.modal.type,
                title: this.state.lesson.title,
                content: this.state.lesson.content
            }
            axios.put(`${API_URL}/api/courses/${this.state.courseID}/lessons/${id}`, lessonUpdate).then(res => {
                this.openMessage('Lição atualizada com sucesso');
                if (quiz) {
                    if (question) {
                        this.updateQuiz(res.data, this.state.idQuestion);
                    } else {
                        this.createQuiz(res.data);
                    }
                }
                this.setState({
                    lesson: {
                        ...this.state.lesson,
                        type: '',
                        title: '',
                        content: ''
                    },
                    question: {
                        course_id: null,
                        lesson_id: null,
                        text: '',
                        active: true,
                        answers: [
                        ]
                    },
                    questionField: ''
                });
                this.closeModal();
                this.loadingLessons();
            }).catch(error => {
                this.openMessage(error.message)
            });
        }
    }

    createQuiz = (idLesson) => {
        const question = this.state.question;
        axios.post(`${API_URL}/api/courses/${this.state.courseID}/lessons/${idLesson}/questions`, { question })
            .then(res => {
                // console.log(res);
            });
    }

    updateQuiz = (idLesson, idQuestion) => {
        const question = this.state.question;
        axios.put(`${API_URL}/api/courses/${this.state.courseID}/lessons/${idLesson}/questions/${idQuestion}`, { question })
            .then(res => {
                // console.log(res);
            });
    }

    handleEditLesson = (type, id) => {
        if (this.state.quiz) {
            if (this.state.lesson.title === '') {
                this.openMessage('Preenche o título');
            } else if (this.state.questionField === '') {
                this.openMessage('Preenche a pergunta');
            } else if (this.state.question.answers.length < 1) {
                this.openMessage('Insira ao menos 1 reposta');
            } else if (this.verifyAnswers() === false) {
                this.openMessage('Selecione ao menos 1 reposta correta');
            } else {
                this.submitEditLesson(id, this.state.idQuestion, type, true);
            }

        } else if (this.state.lesson.title !== '') {
            this.submitEditLesson(id, this.state.idQuestion, type, false);
            this.openMessage('Lição atualizada com sucesso');
        } else {
            this.openMessage('Por favor preencha o título');
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
                if (lessons.length > 6) {
                    this.setState({ scrolled: true });
                }

                // const newLessons = lessons.sort(function(a, b) {
                //     if(a.order < b.order) return -1;
                //     if(a.order > b.order) return 1;
                //     return 0;
                // });

                // console.log(newLessons);
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
            },
            idQuestion: null,
            file: {
                file: null,
                name: ''
            },
            editAnswer: null,
            view: false
        })
    }

    cancelEdit = () => {
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
            },
            question: {
                course_id: null,
                quiz_id: null,
                lesson_id: null,
                text: '',
                active: true,
                answers: [
                ]
            },
            questionField: '',
            quiz: false,
            idQuestion: null,
            file: {
                file: null,
                name: ''
            },
            editAnswer: null
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
        },
        editAnswer: null,
        quiz: false
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

    changeImage = (event) => {
        const file = event.target.files[0];
        if (file.type === 'image/jpeg' || file.type === 'image/png') {
            this.setState({
                imageEdit: true,
                image: {
                    file: file,
                    name: file.name
                }
            });
        }
    };

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
                this.openMessage('Vídeo inserido com sucesso');
            } else {
                this.openMessage('Tipo de arquivo inválido.');
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
                this.openMessage('Áudio Inserido com sucesso');
            } else {
                this.openMessage('Tipo de arquivo inválido.');
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
                this.openMessage('Documento Inserido com sucesso');
            } else {
                this.openMessage('Tipo de arquivo inválido.');
            }
        }
    };

    fileUpload = (type, quiz, id) => {
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

        if (type === 'PUT') {
            axios.post(`${API_URL}/api/courses/${this.state.courseID}/lessons/${id}`, formData, config).then((res) => {
                this.openMessage('Lição atualizada com sucesso');
                if (quiz) {
                    if (id) {
                        this.updateQuiz(res.data, id);
                    } else {
                        this.createQuiz(res.data);
                    }
                }
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
                        content: '',
                        idQuestion: null
                    },
                    question: {
                        course_id: null,
                        quiz_id: null,
                        lesson_id: null,
                        text: '',
                        active: true,
                        answers: [
                        ]
                    },
                    quiz: false
                });
                this.loadingLessons();
            });
        } else {
            axios.post(`${API_URL}/api/courses/${this.state.courseID}/lessons`, formData, config).then((res) => {
                this.openMessage('Lição inserida com sucesso');
                if (quiz) {
                    this.createQuiz(res.data);
                }
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
                        content: '',
                        idQuestion: null
                    },
                    question: {
                        course_id: null,
                        quiz_id: null,
                        lesson_id: null,
                        text: '',
                        active: true,
                        answers: [
                        ]
                    },
                    quiz: false
                });
                this.loadingLessons();
            });
        }
    };

    editLesson = (type, id) => {
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

                axios.get(`${API_URL}/api/courses/${this.state.courseID}/lessons/${id}/questions`)
                    .then(res => {
                        if (res.data !== 400) {
                            const question = res.data;
                            this.setState({
                                question: question,
                                hasQuiz: true,
                                questionField: question.text,
                                quiz: true,
                                idQuestion: question.id,
                            })
                        }
                    })
                    .catch(error => {
                        this.openMessage(error.message)
                    })
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

    handleCheck = (event) => {
        this.setState({
            quiz: event.target.checked
        })
    }

    addAnswer = () => {
        const question = this.state.question;
        let answers = question.answers;
        let answerField = this.state.answerField;
        let last;
        let id;
        if (answers.length === 0) {
            last = 0;
            id = 1;
        } else {
            last = answers.length - 1;
            let lastAnswer = answers[last];
            id = lastAnswer.id + 1
        }
        let answer = {
            id: id,
            text: answerField,
            correct: false
        }
        if (this.state.questionField || question.text) {
            if (answerField) {
                this.setState({
                    question: {
                        ...this.state.question,
                        text: this.state.questionField,
                        answers: [
                            ...this.state.question.answers,
                            answer
                        ]
                    },
                    answerField: ''
                });
            } else {
                this.openMessage('Não tem resposta');
            }
        } else {
            this.openMessage('Insira a pergunta');
        }

    }

    removeAnswer = (id) => {
        const question = this.state.question;
        var newAnswers = question.answers.filter((elem, i, array) => {
            if (elem.id != id) {
                return newAnswers != question.answers
            }
        });
        this.setState({
            question: {
                ...this.state.question,
                answers: newAnswers
            }
        })
    }

    editAnswer = id => (event) => {
        this.setState({
            editAnswer: id
        })
    }

    handleEditAnswer = (event) => {
        const answers = this.state.question.answers;
        const newAnswers = answers.filter((elem) => {
            if ((elem.id === this.state.editAnswer)) {
                elem.text = event.target.value
            }
            return answers;
        });
        this.setState(prevState => ({
            questions: {
                ...prevState.questions,
                answers: newAnswers
            }
        }))
    }

    correctAnswser = (id) => {
        const question = this.state.question;
        var newAnswers = question.answers.filter((elem, i, array) => {
            if (elem.id === id) {
                if (elem.correct === 1 || elem.correct === "1" || elem.correct === true) {
                    elem.correct = false;
                } else {
                    elem.correct = true;
                }
            }
            return question.answers
        });
        this.setState({
            question: {
                ...this.state.question,
                answers: newAnswers
            }
        })
    }

    openMessage = (message) => {
        this.setState({
            message: {
                ...this.state.message,
                open: true,
                text: message
            }
        })
    }

    closeMessage = () => {
        this.setState({
            message: {
                ...this.state.message,
                open: false,
                text: ''
            }
        })
    }

    toggleQuiz = id => (event) => {
        axios.put(`${API_URL}/api/courses/${this.state.course.id}/quiz/${id}`, {
            active: event.target.checked
        })
            .then(res => {
                this.setState({
                    activeQuiz: !this.state.activeQuiz
                })
            })
    }

    uploadImageEditor = (file) => {
        // console.log(file)
    }


    viewLesson = (type, id) => {
        axios.get(`${API_URL}/api/courses/${this.state.courseID}/lessons/${id}`)
            .then(res => {
                const lesson = res.data;
                this.setState({
                    lesson: lesson,
                    view: true
                });
                if (lesson.type === 'text') {
                    this.renderLesson();
                }
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

                axios.get(`${API_URL}/api/courses/${this.state.courseID}/lessons/${id}/questions`)
                    .then(res => {
                        if (res.data !== 400) {
                            const question = res.data;
                            this.setState({
                                question: question,
                                hasQuiz: true,
                                questionField: question.text,
                                quiz: true,
                                idQuestion: question.id,
                            })
                        }
                    })
                    .catch(error => {
                        this.openMessage(error.message)
                    })
            });
    };

    renderLesson = () => {
        document.querySelectorAll('oembed[url]').forEach(element => {
            const iframe = document.createElement('iframe');
            iframe.setAttribute('frameborder', '0');
            let url = element.getAttribute('url');
            if (url.indexOf('watch?v=') !== -1) {
                const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
                let match = url.match(regExp);
                let id = (match && match[7].length == 11) ? match[7] : false;

                iframe.setAttribute('allowfullscreen', '1');
                iframe.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');

                url = 'https://www.youtube.com/embed/' + id;
            } else if (url.indexOf('vimeo.com') !== -1) {
                const regExp = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/
                let match = url.match(regExp);
                let id = match[5];
                iframe.setAttribute('webkitallowfullscreen', '');
                iframe.setAttribute('mozallowfullscreen', '');
                iframe.setAttribute('allowfullscreen', '');
                url = 'https://player.vimeo.com/video/' + id + '?color=1da891&title=0&byline=0&portrait=0';
            }

            iframe.setAttribute('src', url);

            element.appendChild(iframe);
        });
    }

    onDragStart = e => {
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/html", e.target.parentNode);
        e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
    };

    changeTab = (event, tab) => {
        this.setState({ tab });
    };

    formatIcons = (type) => {
        switch (type) {
            case 'text':
                return <LibraryBooks />
                break;
            case 'video-internal':
                return <VideoLibrary />
                break;
            case 'pdf':
                return <InsertDriveFile />
                break;
            case 'video-external':
                return <VideoCam />
                break;
            default:
                return <AudioTrack />
        }
    };

    render() {
        const { course, lessons, lesson, message, menu, edit, modal, quiz, question, answerField, questionField, quizCreated, activeQuiz, tab } = this.state;
        if (this.props.user.id === 3 || this.props.user.id === "3") {
            return <Redirect to={'/dashboard/'} />
        }
        return (
            <Admin heading={"Cursos"}>
                <Message text={message.text} open={message.open} close={this.closeMessage} />
                <form>
                    <AppBar position="static" color="default">
                        <Tabs value={tab} onChange={this.changeTab}>
                            <Tab label="Curso" />
                            <Tab label="Lições" />
                        </Tabs>
                    </AppBar>
                    {tab === 0 &&
                        <CardContainer>
                            <Grid container spacing={8} justify="flex-end">
                                <Grid item>
                                    <Button variant="contained" size="small" aria-label="Salvar" onClick={this.handleEdit}>
                                        <EditIcon />
                                    </Button>
                                </Grid>
                            </Grid>
                            <TextField
                                disabled={edit}
                                id="input-title"
                                label="Título"
                                onChange={this.updateCourse}
                                margin="normal"
                                variant="outlined"
                                name="title"
                                placeholder={course.title}
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
                                value={course.description}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <br />
                            <Grid container spacing={40}>
                                <Grid item sm={5}>
                                    <TextField
                                        disabled={edit}
                                        id="input-slug"
                                        label="Slug"
                                        name="slug"
                                        onChange={this.updateCourse}
                                        margin="normal"
                                        variant="outlined"
                                        placeholder={course.slug}
                                        value={course.slug ? course.slug : ''}
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
                                        value={course.duration}
                                        fullWidth
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <DatePicker
                                            keyboard
                                            fullWidth
                                            variant="outlined"
                                            label="Data de Início"
                                            value={course.start_date}
                                            onChange={this.handleChangeDate.bind(this, 'start_date')}
                                            format='dd/MM/yy'
                                            mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/]}
                                            locale={brLocale}
                                            disabled={edit}
                                            style={{ margin: '12px 0', width: 'calc(100% - 14px)' }}
                                        />
                                    </MuiPickersUtilsProvider>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <DatePicker
                                            keyboard
                                            fullWidth
                                            variant="outlined"
                                            label="Data de Término"
                                            value={course.end_date}
                                            onChange={this.handleChangeDate.bind(this, 'end_date')}
                                            format='dd/MM/yy'
                                            mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/]}
                                            locale={brLocale}
                                            disabled={edit}
                                            style={{ margin: '12px 0', width: 'calc(100% - 14px)' }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </Grid>
                                <Grid item sm={7}>
                                    <br />
                                    <Button
                                        variant="contained"
                                        component='label'
                                        disabled={edit}
                                    >
                                        IMAGEM
                                        <input type="file" style={{ display: 'none' }} onChange={this.changeImage} />
                                    </Button>
                                    <br /><br />
                                    {this.state.imageEdit ?
                                        <FilePreview file={this.state.image.file}>
                                            {(preview) => <img src={preview} />}
                                        </FilePreview>
                                        : <img src={course.image} />}
                                </Grid>
                            </Grid>
                            <Grid container spacing={8} justify="flex-end">
                                <Grid item>
                                    <Button variant="contained" size="small" aria-label="Salvar" onClick={this.handleEdit}>
                                        <EditIcon />
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button disabled={edit} variant="contained" color={'primary'} type={'submit'} onClick={this.handleSubmit}>Atualizar</Button>
                                </Grid>
                            </Grid>
                        </CardContainer>
                    }
                    {tab === 1 &&
                        <CardContainer>
                            <Grid container spacing={8} justify="flex-end" alignItems="center">
                                {quizCreated ?
                                    <Grid item>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    onChange={this.toggleQuiz(this.state.quiz_id)}
                                                    color='primary'
                                                    checked={activeQuiz ? true : false}
                                                />
                                            }
                                            label={activeQuiz ? 'Desativar Quiz Final' : 'Ativar Quiz Final'}
                                        />
                                        <Button variant="contained" size="small" aria-label="Salvar" component={Link} to={'/admin/courses/' + course.id + '/quiz'}>
                                            <EditIcon /> Quiz
                                        </Button>
                                    </Grid>
                                    : null}
                                <Grid item>
                                    <Button
                                        aria-owns={menu.open ? 'menu-lesson' : undefined}
                                        aria-haspopup="true"
                                        onClick={this.openMenu}
                                        variant="contained"
                                        color="primary"
                                    >
                                        Adicionar lição
                                    </Button>
                                </Grid>
                            </Grid>
                            <br />
                            <CardHeader title="Lições"></CardHeader>
                            <List>
                                {lessons.map((lesson, index) =>
                                    <React.Fragment key={index}>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    {this.formatIcons(lesson.type)}
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={lesson.title}
                                            />
                                            <ListItemSecondaryAction>
                                                <IconButton aria-label="Edit" onClick={this.viewLesson.bind(this, lesson.type, lesson.id)}>
                                                    <RemoveRedEye />
                                                </IconButton>
                                                <IconButton aria-label="Edit" onClick={this.editLesson.bind(this, lesson.type, lesson.id)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton color="secondary" aria-label="Delete" style={{ margin: '0 5px' }} value={lesson.id} onClick={this.handleConfirm.bind(this, lesson.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        <Divider />
                                    </React.Fragment>
                                )}
                            </List>
                            {this.state.scrolled ?
                                <React.Fragment>
                                    <br /><br />
                                    <Grid container spacing={8} justify="flex-end" alignItems="center">
                                        {quizCreated ?
                                            <Grid item>
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            onChange={this.toggleQuiz(this.state.quiz_id)}
                                                            color='primary'
                                                            checked={activeQuiz ? true : false}
                                                        />
                                                    }
                                                    label={activeQuiz ? 'Desativar Quiz Final' : 'Ativar Quiz Final'}
                                                />
                                            </Grid>
                                            : null}
                                        <Grid item>
                                            <Button
                                                aria-owns={menu.open ? 'menu-lesson' : undefined}
                                                aria-haspopup="true"
                                                onClick={this.openMenu}
                                                variant="contained"
                                                color="primary"
                                            >
                                                Adicionar lição
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </React.Fragment>
                                : null}
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
                                <MenuItem onClick={this.openModal('doc')}>
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText>
                                        Documento
                                </ListItemText>
                                </MenuItem>
                                {quizCreated ? null :
                                    <div>
                                        <Divider />
                                        <MenuItem component={Link} to={'/admin/courses/' + course.id + '/quiz'}>
                                            <ListItemIcon>
                                                <QuestionAnswer />
                                            </ListItemIcon>
                                            <ListItemText>
                                                Quiz Final
                                    </ListItemText>
                                        </MenuItem>
                                    </div>
                                }
                            </Menu>
                        </CardContainer>
                    }
                </form>

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
                            Cancelar
                        </Button>
                        <Button onClick={this.handleDelete} color="primary">
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    onClose={this.handleCancel}
                    open={modal.open}
                    maxWidth="md"
                    fullWidth
                    aria-labelledby="dialog-lesson-title"
                    variant="outlined"
                >
                    <DialogTitle id="dialog-lesson-title">Lição</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Título"
                            name="title"
                            onChange={this.updateLesson}
                            margin="normal"
                            variant="outlined"
                            placeholder={lesson.title}
                            value={lesson.title}
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        {this.state.modal.type === 'text' ?
                            <CKEditor
                                editor={ClassicEditor}
                                data={lesson.content}
                                onInit={editor => {
                                    // You can store the "editor" and use when it is needed.
                                    console.log('Editor is ready to use!', editor);
                                }}
                                onChange={this.handleEditor}
                                config={
                                    {
                                        // plugins: [Alignment],
                                        // toolbar: [ 'heading', '|', 'bold', 'italic', '|', 'undo', 'redo', ],
                                        removePlugins: ['Link', 'ImageUpload'],
                                    }
                                }
                            />
                            : null}
                        {this.state.modal.type === 'webcontent' ?
                            <TextField
                                label="Conteúdo Web"
                                name="web-content"
                                onChange={this.updateLesson}
                                value={lesson.content}
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
                                value={lesson.content}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            : null}
                        {this.state.modal.type === 'video-internal' || this.state.modal.type === 'audio' || this.state.modal.type === 'doc' || this.state.modal.type === 'pdf' ?
                            <React.Fragment>
                                <Grid container spacing={16}>
                                    <Grid item xs={12}>
                                        <p>{this.state.file.name}</p>
                                    </Grid>
                                    <Grid item md={6}>
                                        <Button
                                            variant="contained"
                                            component='label'
                                        >
                                            Arquivo
                                            <input type="file" style={{ display: 'none' }} onChange={this.onChangeFile} />
                                        </Button>
                                    </Grid>
                                    <Grid item md={6}>
                                        <Typography variant="overline" gutterBottom>
                                            Formatos aceitos:
                                            {this.state.modal.type === 'video-internal' ?
                                                'mp4, webm, ogg, ogv, avi, mpeg, mpg, mov, wmv, 3gp, flv. Tamanho máximo: 2 MB' : null
                                            }
                                            {this.state.modal.type === 'doc' ?
                                                'Pdf. Tamanho máximo: 2 MB' : null
                                            }
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </React.Fragment>
                            : null}
                        <FormGroup row>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={quiz ? true : false}
                                        onChange={this.handleCheck}
                                        value={quiz}
                                        color="primary"
                                    />
                                }
                                label="Quiz"
                            />
                        </FormGroup>
                        {quiz ?
                            <React.Fragment>
                                <TextField
                                    label="Pergunta"
                                    name="questionField"
                                    onChange={this.handleChange}
                                    margin="normal"
                                    variant="outlined"
                                    fullWidth
                                    value={questionField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <br /><br />
                                <Grid container spacing={8} justify="space-between" alignItems="center">
                                    <Grid item xs={12} md={12}>
                                        <Typography variant="h6" gutterBottom>
                                            Repostas
                                        </Typography>
                                        <Typography variant="overline" gutterBottom>
                                            Defina uma ou mais respostas corretas
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={11} align="left">
                                        <TextField
                                            label="Resposta"
                                            name="answerField"
                                            onChange={this.handleChange}
                                            margin="normal"
                                            variant="outlined"
                                            value={answerField}
                                            fullWidth
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={1}>
                                        <Fab color="primary" aria-label="Add" size="small" onClick={this.addAnswer}>
                                            <AddIcon />
                                        </Fab>
                                    </Grid>
                                </Grid>
                                <Divider />
                                {question.answers ?
                                    question.answers.map((answer, index) =>
                                        <List dense={true} key={'answer' + index}>
                                            <ListItem key={answer.id}>
                                                <IconButton aria-label="Correct" onClick={this.correctAnswser.bind(this, answer.id)}>
                                                    <CheckCircle color={answer.correct === 1 || answer.correct === "1" || answer.correct === true ? 'primary' : 'secondary'} />
                                                </IconButton>
                                                {this.state.editAnswer === answer.id ?
                                                    <TextField
                                                        id="outlined-bare"
                                                        defaultValue={answer.text}
                                                        margin="normal"
                                                        variant="outlined"
                                                        onChange={this.handleEditAnswer}
                                                    />
                                                    :
                                                    <ListItemText
                                                        primary={answer.text}
                                                    />
                                                }
                                                <ListItemSecondaryAction>
                                                    <IconButton aria-label="Edit" onClick={this.editAnswer(answer.id)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton aria-label="Delete" onClick={this.removeAnswer.bind(this, answer.id)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                            <Divider />
                                        </List>
                                    )
                                    : null}
                            </React.Fragment>
                            : null}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={modal.edit ? this.cancelEdit : this.handleCancel} color="primary">
                            Cancel
                        </Button>
                        {modal.edit ?
                            <Button variant="contained" onClick={this.handleEditLesson.bind(this, modal.type, lesson.id)} color="primary">
                                Salvar
                            </Button>
                            :
                            <Button variant="contained" onClick={this.handleSubmitLesson.bind(this, modal.type)} color="primary">
                                Criar
                            </Button>
                        }
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={this.state.view}
                    maxWidth="md"
                    fullWidth
                    aria-labelledby="lesson-title"
                    onClose={this.handleCancel}
                >
                    <TitlePreview id="lesson-title">{lesson.title}</TitlePreview>
                    <PreviewContent>
                        {lesson.type === 'text' ?
                            <div dangerouslySetInnerHTML={{ __html: lesson.content }}></div>
                            : null}
                        {lesson.type === 'video-internal' ?
                            <Player
                                playsInline
                                poster="/assets/poster.png"
                                src={API_URL + '/api/courses/' + course.id + '/lessons/' + lesson.id + '/media'}
                            />
                            : null}
                        {lesson.type === 'video-external' ?
                            <div className="video-external">
                                <ReactPlayer url={lesson.content} controls width={'100%'} height={450} />
                            </div>
                            : null}
                        {lesson.type === 'ppt' ?
                            lesson.content
                            : null}
                        {lesson.type === 'doc' || lesson.type === 'pdf' ?
                            <iframe src={lesson.content + '#toolbar=0'} width="100%" height="700px"></iframe>
                            : null}
                        {lesson.type === 'audio' ?
                            <div className="audio">
                                <Audio controls controlsList="nodownload">
                                    <source
                                        src={API_URL + '/api/courses/' + course.id + '/lessons/' + lesson.id + '/media'}
                                        type={lesson.mime}
                                    />
                                    Your browser does not support the audio element.
                                </Audio>
                            </div>
                            : null}
                    </PreviewContent>
                    <PreviewButtons>
                    </PreviewButtons>
                </Dialog>
            </Admin>
        );
    }
}

export default Page;
