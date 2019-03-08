import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as actions from '../../store/actions'
import styled from 'styled-components';

import {
    AppBar,
    Grid,
    Toolbar,
    Typography,
    Button,
    Divider
} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: true,
            anchorEl: null,
        };

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(event) {
        event.preventDefault();
        this.props.dispatch(actions.authLogout());
    }

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };


    render() {
        const { classes, user } = this.props;
        const { auth, anchorEl } = this.state;
        const open = Boolean(anchorEl);
        this.avatar = (
            <span>
                <Image avatar src={require('../../../images/avatar/boy.png')}
                    verticalAlign='middle' /> {this.props.user.name}
            </span>
        );
        return (
            <AppBar color="default" position={this.props.position} className={this.props.className}>
                <Grid className={classes.container}>
                    <Toolbar className={classes.bar}>
                        <Typography variant="div" color="inherit" className={classes.grow}>
                            <Link to="/">
                                <img src="/img/logo.png" className={classes.logo} />
                            </Link>
                            <Button component={Link} to={'/'} color="inherit">Home</Button>
                            <Button component={Link} to={'/courses'} color="inherit">Cursos</Button>
                            <Button component={Link} to={'/my-courses'} color="inherit">Meus Cursos</Button>
                        </Typography>
                        <div>
                            <IconButton
                                aria-owns={open ? 'menu-appbar' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={this.state.anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={this.handleClose}
                            >
                                <MenuItem component={Link} to={'/courses'}>Voltar para cursos</MenuItem>
                                <MenuItem component={Link} to={'/profile'}>Perfil</MenuItem>
                                <MenuItem onClick={this.handleLogout}>Sair</MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                </Grid>
            </AppBar>
        );
    }
}

Page.propTypes = {
    dispatch: PropTypes.func.isRequired,
    className: PropTypes.string,
    position: PropTypes.string.isRequired
};

export default Page;