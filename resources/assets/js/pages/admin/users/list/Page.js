import React from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { API_URL } from "../../../../common/url-types";
import Admin from '../../Admin'
import axios from 'axios'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import Fab from '@material-ui/core/Fab';
import RemoveRedEye from '@material-ui/icons/RemoveRedEye';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Message from '../../../../components/Message';
import Card from '@material-ui/core/Card';
import { Grid, MenuItem } from '@material-ui/core';

class Page extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            user: '',
            users: [],
            message: '',
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
        }

        this.handleDelete = this.handleDelete.bind(this)
    }

    componentDidMount() {
        axios.get(`${API_URL}/api/users`)
            .then(res => {
                const users = res.data;
                this.setState({ users: users });
            })
        console.log(this.state.users);
    }

    handleDelete = (event) => {
        let userID = event.target.value;
        if (confirm('Tem certeza que deseja deletar?')) {
            axios.delete(`${API_URL}/api/users/${userID}`)
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    this.setState({
                        message: 'Usuário deletado',
                        error: false,
                        success: true,
                    });
                })

            const users = this.state.users;
            let newUsers = users.filter(user => {
                if (user.id != userID) {
                    return users != userID
                }
            });
            this.setState({
                users: newUsers
            })
        }
    }

    show = () => this.setState({ open: true });
    close = () => this.setState({ open: false });

    handleConfirm = (value) => {
        this.setState({
            user: value,
            open: true
        })
    };

    render() {
        const { users, message} = this.state;
        return (
            <Admin heading='Usuários' createLink='/admin/users/create'>
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
                                <TableCell>Função</TableCell>
                                <TableCell align={'right'}>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) =>
                                <TableRow key={user.id}>
                                    <TableCell><Button component={Link} to={'/admin/users/' + user.id}>{user.name}</Button></TableCell>
                                    <TableCell>{user.role_id}</TableCell>
                                    <TableCell align={'right'}>
                                        <IconButton size="small" color="secondary" aria-label="Add" onClick={this.handleConfirm.bind(this, user.id)} value={user.id}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Card>
            </Admin>
        );
    }
}

export default Page;
