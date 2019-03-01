import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { API_URL } from "../../../../common/url-types";
import Admin from '../../Admin'
import axios from 'axios'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import RemoveRedEye from '@material-ui/icons/RemoveRedEye';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Message from '../../../../components/Message';
import Card from '@material-ui/core/Card';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            course: '',
            courses: [],
            error: false,
            success: false,
            redirect: false,
            open: false,
            message: {
                open: false,
                vertical: 'top',
                horizontal: 'center',
                text: 'Snackbar its works'
            },
            view: false
        };

        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        axios.get(`${API_URL}/api/courses`)
            .then(res => {
                const courses = res.data;
                console.log(courses)
                this.setState({ courses: courses });
            });
    }

    show = () => this.setState({ open: true });
    close = () => this.setState({ open: false });

    handleConfirm = (value) => {
        this.setState({
            course: value,
            open: true
        })
    };

    handleDelete = () => {
        let courseID = this.state.course;
        axios.delete(`${API_URL}/api/courses/${courseID}`)
            .then(res => {
                this.setState({
                    message: 'Curso deletado',
                    error: false,
                    success: true,
                });
            });

        const courses = this.state.courses;
        let newCourses = courses.filter(course => {
            if (course.id != courseID) {
                return courses != courseID
            }
        });
        this.setState({
            courses: newCourses,
            open: false,
            message: {
                ...this.state.message,
                text: 'Curso excluído com sucesso',
                open: true
            }
        })
    };

    handleCancel = () => {
        this.setState({
            course: '',
            open: false
        })
    }

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

    viewCourse = id => () => {
        axios.get(`${API_URL}/api/courses/${id}`)
            .then(res => {
                const course = res.data;
                this.setState({
                    course: course
                });
            });
    };

    render() {
        const { message, courses, view } = this.state;
        return (
            <Admin heading='Cursos' createLink='/admin/courses/create'>
                <Message text={message.text} open={message.open} close={this.closeMessage} />
                <Dialog
                    open={this.state.open}
                    maxWidth="xs"
                    aria-labelledby="confirmation-dialog-title"
                >
                    <DialogTitle id="confirmation-dialog-title">Excluir Curso</DialogTitle>
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
                <Card>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell> Nome</TableCell>
                                <TableCell>Duração</TableCell>
                                <TableCell align={'right'}>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {console.log(courses)}
                            {courses.map((course) =>
                                <TableRow key={course.id}>
                                    <TableCell><Button component={Link} to={'/admin/courses/' + course.id}>{course.title}</Button></TableCell>
                                    <TableCell>{course.duration}</TableCell>
                                    <TableCell align={'right'}>
                                        <IconButton size="small" aria-label="Edit" component={Link} to={'/admin/courses/' + course.id}>
                                            <EditIcon />
                                        </IconButton>
                                        {/* <IconButton size="small" color="primary" aria-label="Delete" onClick={this.viewCourse(course.id)}>
                                            <RemoveRedEye />
                                        </IconButton> */}
                                        <IconButton size="small" color="secondary" aria-label="Add" onClick={this.handleConfirm.bind(this, course.id)} value={course.id}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Card>

                <Dialog
                    fullScreen
                    open={view}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                >
                    <DialogContent>
                        
                    </DialogContent>
                </Dialog>
            </Admin>
        );
    }
}

export default Page;
