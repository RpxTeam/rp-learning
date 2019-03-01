import React from 'react'
import axios from 'axios'
import { API_URL } from "../../../common/url-types"
import Admin from '../Admin'
import {
    Grid,
    Card,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    CardHeader
} from '@material-ui/core'

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            courses: []
        }
    }

    getData = () => {
        axios.get(`${API_URL}/api/dashboard`)
            .then(res => {
                const { data } = res;
                this.setState({
                    users: data.leaderboard,
                    courses: data.courses
                });
            })
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        const { users, courses } = this.state;
        return (
            <Admin heading="Painel de Controle">
                <Grid container spacing={40}>
                    <Grid item sm={6}>
                        <Card>
                            <CardHeader title="Cursos"></CardHeader>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Título</TableCell>
                                        <TableCell>Duração</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {courses.map((course, index) =>
                                        <TableRow key={index}>
                                            <TableCell>{course.title}</TableCell>
                                            <TableCell>{course.duration}</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </Card>
                    </Grid>
                    <Grid item sm={6}>
                        <Card>
                            <CardHeader title="Ranking"></CardHeader>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nome</TableCell>
                                        <TableCell>Pontos</TableCell>
                                        <TableCell>Level</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {console.log(users)}
                                    {users.map((user, index) =>
                                        <TableRow key={index}>
                                            <TableCell>{user.name}</TableCell>
                                            <TableCell>{user.points}</TableCell>
                                            <TableCell>{user.level}</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </Card>
                    </Grid>
                </Grid>
            </Admin>
        );
    }
}

export default Page;