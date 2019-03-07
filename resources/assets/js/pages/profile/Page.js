import React from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import Navigation from '../../common/navigation'
import { API_URL } from "../../common/url-types";
import styled from 'styled-components';

import FilePreview from 'react-preview-file';

import CardContainer from '../admin/components/CardContainer'

import {
    Grid,
    Card,
    TextField,
    InputAdornment,
    Button
} from '@material-ui/core'

import CropOriginal from '@material-ui/icons/CropOriginal'

import Admin from '../admin/Admin'

const Image = styled.div`
    width: 90px;
    height: 90px;
    display: inline-block;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    border-radius: 5px;
    margin-right: 20px;
`;

const NoImage = styled.div`
    width: 90px;
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f5f5f5;
    margin-right: 20px;
    border-radius: 5px;
    svg {
        font-size: 35px;
        color: #757575;
    }
`;

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            message: '',
            courseID: '',
            viewCourse: false,
            points: 0,
            userID: this.props.user.id,
            user: {},
            image: {
                name: '',
                file: null
            }
        }
    }

    getData = () => {
        axios.get(`${API_URL}/api/users/1/points`)
            .then(res => {
                const points = res.data;
                this.setState({
                    points: points.total
                });
            })
        axios.get(`${API_URL}/api/users/${this.state.userID}`)
            .then(res => {
                const user = res.data;
                this.setState({
                    user: user
                })
            })
    }

    componentDidMount() {
        this.getData();
        axios.get(`${API_URL}/api/courses`)
            .then(res => {
                const courses = res.data;
                this.setState({ courses: courses });
            })
    }

    onChangeFile = (event) => {
        const file = event.target.files[0];
        if (file.type === 'image/jpeg' || file.type === 'image/png') {
            this.setState({
                image: {
                    file: file,
                    name: file.name
                }
            });
        }
    };

    saveChanges = () => {
        console.log('Salvo');
    }

    render() {
        const { points, user, image } = this.state;
        return (
            <Admin>
                <CardContainer>
                    <form>
                        <Grid container spacing={8} alignItems="center">
                            <Grid item sm={2} align="right">
                                <label>Avatar</label>
                            </Grid>
                            <Grid item sm={8}>
                                <Grid container spacing={8} alignItems="center">
                                    {image.name ?
                                        <FilePreview file={image.file}>
                                            {(preview) => <Image style={{ backgroundImage: `url('${preview}') ` }} />}
                                        </FilePreview>
                                        : <NoImage><CropOriginal /> </NoImage>}
                                    <Button
                                        variant="contained"
                                        component='label'
                                    >
                                        IMAGEM
                                    <input type="file" style={{ display: 'none' }} onChange={this.onChangeFile} />
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container spacing={8} alignItems="center">
                            <Grid item sm={2} align="right">
                                <label>Nome Completo</label>
                            </Grid>
                            <Grid item sm={8}>
                                <TextField
                                    id="full-name"
                                    defaultValue="Admin"
                                    margin="normal"
                                    fullWidth
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={8} alignItems="center">
                            <Grid item sm={2} align="right">
                                <label>Email</label>
                            </Grid>
                            <Grid item sm={8}>
                                <TextField
                                    id="email"
                                    defaultValue="email@email"
                                    margin="normal"
                                    fullWidth
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={8} alignItems="center">
                            <Grid item sm={2} align="right">
                                <label>Website</label>
                            </Grid>
                            <Grid item sm={8}>
                                <TextField
                                    id="website"
                                    defaultValue="dominio.com"
                                    margin="normal"
                                    fullWidth
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={8} alignItems="center">
                            <Grid item sm={2} align="right">
                                <label>Nome Completo</label>
                            </Grid>
                            <Grid item sm={8}>
                                <TextField
                                    id="password"
                                    type="password"
                                    margin="normal"
                                    fullWidth
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                        <br />
                        <Grid container spacing={8} justify="center">
                            <Button variant="contained" color="primary" onClick={this.saveChanges}>Salvar alterações</Button>
                        </Grid>
                    </form>
                </CardContainer>
            </Admin>
        );
    }
}

export default Page;
