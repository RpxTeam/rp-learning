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
                <Sidebar.Pushable as={Segment}>
                    <Sidebar as={Menu} animation='overlay' icon='labeled' inverted vertical visible width='thin' animation="slide along">
                        <Menu.Item as='a'>
                        <Icon name='home' />
                        Home
                        </Menu.Item>
                        <Menu.Item as='a'>
                        <Icon name='gamepad' />
                        Games
                        </Menu.Item>
                        <Menu.Item as='a'>
                        <Icon name='camera' />
                        Channels
                        </Menu.Item>
                    </Sidebar>

                    <Sidebar.Pusher>
                        <Segment basic>
                        <Header as='h3'>Application Content</Header>
                        <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
                <Responsive as={Segment} maxWidth={768} className="mobile-navbar">
                    <Menu size="large" secondary>
                        <Menu.Item as={Link} to="/" className="logo" replace>
                            <img
                                src={require('../../../images/theme/logo.png')} alt="infoTiq"/>
                        </Menu.Item>
                        <Menu.Menu position="right">
                            <Menu.Item>
                                <Dropdown icon="bars" className="collapsible-menu">
                                    <Dropdown.Menu className='bounceIn animated'>
                                        {this.props.isAuthenticated
                                            ?
                                            <Dropdown.Item
                                                onClick={this.handleLogout}
                                                text="logout"
                                                icon='sign out'
                                                key='logout'/>
                                            :
                                            <div>
                                                <Dropdown.Item as={NavLink} to="/login" text="login"/>
                                                <Divider/>
                                                <Dropdown.Item as={NavLink} to="/register" text="register"/>
                                            </div>
                                        }
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Menu.Item>
                        </Menu.Menu>
                    </Menu>
                </Responsive>
            </div>
        );
    }
}

Page.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

export default Page;