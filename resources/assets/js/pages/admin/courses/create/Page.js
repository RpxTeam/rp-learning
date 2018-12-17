import React from 'react'
import { API_URL } from "../../../../common/url-types";
import axios from 'axios'
import {
    Label,
    Form,
    Input,
    Grid,
    Button,
    Segment,
    Message,
    TextArea,
    Divider,
    Table,
    Icon,
    Modal,
    Header,
    Image,
    Dropdown
} from 'semantic-ui-react'
import {
    DateInput,
    TimeInput,
    DateTimeInput,
    DatesRangeInput
} from 'semantic-ui-calendar-react';
import Admin from '../../Admin'
import {Redirect} from "react-router-dom";

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            success: false,
            message: '',
            author: [],
            options: [
                { key: 'autor1', text: 'Autor 1', value: 'autor1' },
                { key: 'autor2', text: 'Autor 2', value: 'autor2' },
                { key: 'autor3', text: 'Autor 3', value: 'autor3' },
                { key: 'autor4', text: 'Autor 4', value: 'autor4' },
            ],
            lessons: {

            },
            start_date: '',
            end_date: '',
            courseID: '',
            courseEdit: false
        }
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleChangeDate = (event, {name, value}) => {
        const date = value.split('/');
        let day = date[0];
        let month = date[1];
        let year = date[2];
        const updateDate = year + '-' + month + '-' + day
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: updateDate });
        }
    };

    handleSubmit = event => {
        event.preventDefault();

        axios.post(`${ API_URL }/api/courses`, {
            title: this.state.title,
            slug: this.state.slug,
            description: this.state.description,
            start_date: this.state.start_date,
            end_date: this.state.end_date,
            duration: this.state.duration
         }).then(res => {
            this.setState({
                message: 'Usuário criado com sucesso',
                error: false,
                success: true,
                courseID: res.data,
                courseEdit: true
            });
        }).catch(error => {
            console.log(error.message)
            this.setState({
                message: error.message,
                error: true,
                success: false
            })
        })
    };

    handleDelete = () => {
        console.log('delete');
    };

    handleCopy = () => {
        console.log('Copy');
    };

    handleEditor = ( event, editor ) => {
        const data = editor.getData();
        this.setState({
            lesson: {
                content: data
            }
        });
    };

    openModal = type => () => this.setState({ modal: { type: type, open: true} });

    closeModal = () => this.setState({ modal: { open: false } });

    render() {
        if (this.state.courseEdit === true) {
            return <Redirect to={'/admin/courses/' + this.state.courseID} />
        }
        return (
            <Admin heading="Create">
                <Grid.Row>
                    {this.state.message ?
                    <Message success={this.state.success} negative={this.state.error}>
                        <Message.Header>{this.state.success ? 'Sucesso' : "Erro" }</Message.Header>
                        <p>
                            {this.state.message}
                        </p>
                    </Message>
                    : null }
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Form>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={12}>
                                        <Segment color="black">
                                            <Form.Field
                                                id='input-control-title'
                                                control={Input}
                                                label='Título'
                                                placeholder='Título'
                                                name="title"
                                                onChange={this.handleChange}
                                            />
                                            <Form.Field
                                                id='input-control-description'
                                                control={TextArea}
                                                label='Descrição'
                                                placeholder='Descrição'
                                                name='description'
                                                onChange={this.handleChange}
                                                style={{ minHeight: 150 }} />
                                            {/*<Form.Field>*/}
                                            {/*<label>Autores</label>*/}
                                            {/*<Dropdown placeholder='Autores' fluid multiple selection options={this.state.options} value={this.state.author} onChange={this.handleChange}/>*/}
                                            {/*</Form.Field>*/}
                                        </Segment>
                                    </Grid.Column>
                                    <Grid.Column width={4}>
                                        <Segment color="black">
                                            <Form.Field
                                                id='input-control-slug'
                                                control={Input}
                                                label='Slug'
                                                name="slug"
                                                disabled
                                                placeholder='Slug'
                                                onChange={this.handleChange}
                                            />
                                            <Form.Field
                                                id='input-control-duration'
                                                control={Input}
                                                type='number'
                                                label='Duração'
                                                name="duration"
                                                placeholder='Duração'
                                                onChange={this.handleChange}
                                            />
                                            <Form.Field>
                                                <label>Data de Início
                                                    <DateInput
                                                        name="start_date"
                                                        placeholder="Data"
                                                        dateFormat="DD/MM/YYYY"
                                                        value={this.state.start_date}
                                                        iconPosition="left"
                                                        onChange={this.handleChangeDate} />
                                                </label>
                                            </Form.Field>
                                            <Form.Field>
                                                <label>
                                                    Data de Término
                                                    <DateInput
                                                        name="end_date"
                                                        dateFormat="DD/MM/YYYY"
                                                        placeholder="Data"
                                                        value={this.state.end_date}
                                                        iconPosition="left"
                                                        onChange={this.handleChangeDate} />
                                                </label>
                                            </Form.Field>
                                        </Segment>
                                        <Form.Field
                                            id='button-control-confirm'
                                            control={Button}
                                            content='Criar'
                                            positive
                                            onClick={this.handleSubmit}
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Form>
                    </Grid.Column>
                </Grid.Row>
            </Admin>
        );
    }
}

export default Page;
