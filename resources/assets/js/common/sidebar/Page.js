import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as actions from '../../store/actions'

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(event) {
        event.preventDefault();
        this.props.dispatch(actions.authLogout());
    }


    render() {
        const { classes, user } = this.props;

        this.avatar = (
            <span>
                <Image avatar src={require('../../../images/avatar/boy.png')}
                    verticalAlign='middle' /> {this.props.userName}
            </span>
        );
        return (
            <Sidebar as={Menu} animation='overlay' icon='labeled' inverted vertical visible width='thin' animation="slide along">
                {console.log(user)}
                <Menu.Item as={NavLink} to="/dashboard">
                    <Icon name='dashboard' />
                    Painel
                        </Menu.Item>
                <Menu.Item as={NavLink} to="/admin/users">
                    <Icon name='users' />
                    Usuários
                        </Menu.Item>
                <Menu.Item as={NavLink} to="/admin/courses">
                    <Icon name='book' />
                    Cursos
                        </Menu.Item>
            </Sidebar>
        );
    }
}

Page.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

export default Page;