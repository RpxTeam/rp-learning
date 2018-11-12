import React from 'react'
import {Link} from 'react-router-dom'
import {
    Button,
    Icon,
    Table
} from 'semantic-ui-react'
import Admin from '../../Admin'
import axios from 'axios'

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:3000/api/users`)
          .then(res => {
            const users = res.data;
            console.log(users);
            this.setState({ users: users });
          })
    }

    render() {
        return (
            <Admin>
                Courses
                <Button as={Link} to="/admin/courses/create">Create</Button>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Notes</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                
                    <Table.Body>
                        { this.state.users.map((user) => 
                            <Table.Row key={user.id}>
                                <Table.Cell>{user.name}</Table.Cell>
                                <Table.Cell>{user.email}</Table.Cell>
                                <Table.Cell positive>
                                    <Icon name='checkmark' />
                                    Approved
                                </Table.Cell>
                            </Table.Row>
                            )
                        }
                    </Table.Body>
                </Table>
            </Admin>
        );
    }
}

export default Page;