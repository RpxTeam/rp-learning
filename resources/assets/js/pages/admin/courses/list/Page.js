import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { API_URL } from "../../../../common/url-types";
import Admin from '../../Admin'
import axios from 'axios'

import {
    Grid,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    IconButton,
    DialogTitle,
    DialogContent,
    DialogActions,
    Dialog,
    Button,
    Card
} from '@material-ui/core'

import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import Message from '../../../../components/Message'

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
        if (this.props.user.id === 3 || this.props.user.id === "3") {
            return <Redirect to={'/dashboard/'} />
        }
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
                        <Button onClick={this.handleCancel} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleDelete} color="secondary">
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
                <Grid container justify="flex-end" style={{ marginBottom: 15 }}>
                    <Button color="secondary" variant="contained" component={Link} to="/admin/courses/create">Criar</Button>
                </Grid>
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
                                        {/* <IconButton size="small" color="secondary" aria-label="Delete" onClick={this.viewCourse(course.id)}>
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
