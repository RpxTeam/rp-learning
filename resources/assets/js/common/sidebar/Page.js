/**
 * Created by Sumit-Yadav on 06-10-2017.
 */
import React from 'react'
import {NavLink, Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
    Button,
    Container,
    Dropdown,
    Divider,
    Image,
    Menu,
    Responsive,
    Segment,
    Sidebar,
    Header,
    Icon
} from 'semantic-ui-react';
import * as actions from '../../store/actions'
import styled from 'styled-components';

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
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(event) {
        event.preventDefault();
        this.props.dispatch(actions.authLogout());
    }


    render() {
        this.avatar = (
            <span>
                 <Image avatar src={require('../../../images/avatar/boy.png')}
                        verticalAlign='middle'/> {this.props.userName}
            </span>
        );
        return (
            <div>
                <Sidebar as={Menu} animation='overlay' icon='labeled' inverted vertical visible width='thin' animation="slide along">
                    <Menu.Item as={NavLink} to="/dashboard">
                    <Icon name='dashboard' />
                        Dashboard
                    </Menu.Item>
                    <Menu.Item as={NavLink} to="/admin/users">
                    <Icon name='users' />
                        Users
                    </Menu.Item>
                    <Menu.Item as={NavLink} to="/admin/courses">
                    <Icon name='book' />
                        Courses
                    </Menu.Item>
                </Sidebar>
            </div>
        );
    }
}

Page.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

export default Page;