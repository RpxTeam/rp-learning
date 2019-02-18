import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { API_URL } from "../../../../common/url-types";
import Admin from '../../Admin'

import { Redirect } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Message from '../../../../components/Message';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
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
import AddIcon from '@material-ui/icons/Add';
import CheckCircle from '@material-ui/icons/CheckCircle';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
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
import { ListItemAvatar } from '@material-ui/core';

const CardContainer = styled(Card)`
    padding: 10px 20px;
`;

const BtnSwitch = styled(FormControlLabel)`
    span {
        font-size: 16px;
    }
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
            editAnswer: null
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
                        console.log('Quiz criado');
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
        if (type === 'video-internal' || type === 'audio' || type === 'doc' || type === 'pdf') {
            if (quiz) {
                this.fileUpload('', true);
            } else {
                this.fileUpload();
            }
        } else {
            axios.post(`${API_URL}/api/courses/${this.state.courseID}/lessons`, {
                type: this.state.modal.type,
                title: this.state.lesson.title,
                content: this.state.lesson.content,
            }).then(res => {
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
            axios.put(`${API_URL}/api/courses/${this.state.courseID}/lessons/${id}`, {
                type: this.state.modal.type,
                title: this.state.lesson.title,
                content: this.state.lesson.content,
            }).then(res => {
                this.openMessage('Lição atualizada com sucesso');
                if (quiz) {
                    if (question) {
                        console.log(this.state.idQuestion);
                        console.log(res.data);
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
                console.log(res);
            });
    }

    updateQuiz = (idLesson, idQuestion) => {
        const question = this.state.question;
        axios.put(`${API_URL}/api/courses/${this.state.courseID}/lessons/${idLesson}/questions/${idQuestion}`, { question })
            .then(res => {
                console.log(res);
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
            }
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
                            console.log(question);
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
        console.log(date);
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

        console.log(question);

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

    render() {
        const { course, lessons, lesson, message, menu, edit, modal, quiz, question, answerField, questionField, quizCreated, activeQuiz } = this.state;
        return (
            <Admin heading={"Cursos"}>
                <Message text={message.text} open={message.open} close={this.closeMessage} />
                <form>
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
                                </Grid>
                            </CardContainer>
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
                                        <Button variant="extended" size="small" aria-label="Salvar" component={Link} to={'/admin/courses/' + course.id + '/quiz'}>
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
                            <Grid container spacing={8}>
                                <Grid item xs={12} md={12}>
                                    <CardContainer>
                                        <CardHeader title="Lições"></CardHeader>
                                        <Table>
                                            <TableBody>
                                                {lessons.map((lesson) =>
                                                    <TableRow key={lesson.id}>
                                                        <TableCell>
                                                            {lesson.title}
                                                        </TableCell>
                                                        <TableCell align={'right'}>
                                                            <IconButton aria-label="Edit" onClick={this.editLesson.bind(this, lesson.type, lesson.id)}>
                                                                <EditIcon />
                                                            </IconButton>
                                                            <IconButton color="secondary" aria-label="Delete" style={{ margin: '0 5px' }} value={lesson.id} onClick={this.handleConfirm.bind(this, lesson.id)}>
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                                }
                                            </TableBody>
                                        </Table>
                                    </CardContainer>
                                </Grid>
                            </Grid>
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
                        </Grid>
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
                            {quizCreated ? null :
                                <React.Fragment>
                                    <Divider />
                                    <MenuItem component={Link} to={'/admin/courses/' + course.id + '/quiz'}>
                                        <ListItemIcon>
                                            <QuestionAnswer />
                                        </ListItemIcon>
                                        <ListItemText>
                                            Quiz Final
                                    </ListItemText>
                                    </MenuItem>
                                </React.Fragment>
                            }
                        </Menu>
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
                                <br /><br />
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Grid container spacing={8}>
                                        <Grid item xl={6} lg={12} md={12} xs={12}>
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
                                                style={{ width: 'calc(100% - 14px)' }}
                                            />
                                        </Grid>
                                        <br />
                                        <Grid item xl={6} lg={12} md={12} xs={12}>
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
                                                style={{ width: 'calc(100% - 14px)' }}
                                            />
                                        </Grid>
                                    </Grid>
                                </MuiPickersUtilsProvider>
                            </CardContainer>
                            <br />
                            <CardContainer>
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
                                    this.state.image.file.name
                                    : <img src={course.image} />}
                            </CardContainer>
                            <br />
                            <Grid container spacing={8}>
                                <Grid item xs={6} md={3}>
                                    <Button variant="contained" size="small" aria-label="Salvar" onClick={this.handleEdit}>
                                        <EditIcon />
                                    </Button>
                                </Grid>
                                <Grid item xs={6} md={9}>
                                    <Button disabled={edit} variant="contained" color={'primary'} type={'submit'} onClick={this.handleSubmit} style={{ width: '100%' }}>Atualizar</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
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
                            Cancel
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
                                        removePlugins: ['Link', 'ImageUpload']
                                    }
                                }
                            />
                            : null}
                        {this.state.modal.type === 'webcontent' ?
                            <TextField
                                label="Conteúdo Web"
                                name="web-content"
                                onChange={this.updateLesson}
                                value={this.state.lesson.content}
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
                                value={this.state.lesson.content}
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
                                            Formatos aceitos: mp4, webm, ogg, ogv, avi, mpeg, mpg, mov, wmv, 3gp, flv. Max file size: 20 MB
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
            </Admin>
        );
    }
}

export default Page;
