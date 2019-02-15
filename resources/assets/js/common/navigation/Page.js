import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as actions from '../../store/actions'
import styled from 'styled-components';

import {
    Grid,
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    MenuItem,
    Menu
} from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'

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

const Container = styled(Grid)`
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
`

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
        const { isAuthenticated, user } = this.props;
        return (
            <AppBar position="static" color={'default'} style={{ borderBottom: '1px solid #CCC' }}>
                <Container>
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
                                    {user.role_id <= 2 || user.role_id <= "2" ?
                                        <MenuItem component={Link} to={'/dashboard'}>Dashboard</MenuItem>
                                        : null}
                                    <MenuItem component={Link} to={'/profile'}>Profile</MenuItem>
                                    <MenuItem onClick={this.handleLogout}>Sair</MenuItem>
                                </Menu>
                            </React.Fragment>
                            : <Button component={Link} to={'/login'} color="inherit">Login</Button>}
                    </Toolbar>
                </Container>
            </AppBar>
        );
    }
}

Page.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

export default Page;
