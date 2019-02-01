import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as actions from '../../store/actions'
import styled from 'styled-components';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const Logo = styled.a`
    max-width: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
    &:hover {
        background: transparent;
    }
    img {
        max-width: 100%;
        height: auto;
    }
`;

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: null
        }
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(event) {
        event.preventDefault();
        this.props.dispatch(actions.authLogout());
    }

    handleMenu = event => {
        this.setState({ menu: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ menu: null });
    };


    render() {
        this.avatar = (
            <span>
                <Image avatar src={require('../../../images/avatar/boy.png')}
                    verticalAlign='middle' /> {this.props.user === '' || this.props.user !== null ? this.props.user.name : null}
            </span>
        );
        const { menu } = this.state;
        const { isAuthenticated } = this.props;
        return (
            <AppBar position="static" color="default" style={{ flexGrow: 1 }}>
                <Toolbar>
                    <div style={{ flexGrow: 1 }}>
                        <Button component={Link} to={'/'} color="inherit">Home</Button>
                        <Button component={Link} to={'/courses'} color="inherit">Cursos</Button>
                        <Button component={Link} to={'/my-courses'} color="inherit">Meus Cursos</Button>
                    </div>
                    {isAuthenticated ?
                        <React.Fragment>
                            <IconButton
                                aria-owns={Boolean(menu) ? 'menu-appbar' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={menu}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(menu)}
                                onClose={this.handleClose}
                            >
                                <MenuItem component={Link} to={'/profile'}>Profile</MenuItem>
                                <MenuItem onClick={this.handleLogout}>Sair</MenuItem>
                            </Menu>
                        </React.Fragment>
                        : <Button component={Link} to={'/login'} color="inherit">Login</Button>}
                </Toolbar>
            </AppBar>
        );
    }
}

Page.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

export default Page;
