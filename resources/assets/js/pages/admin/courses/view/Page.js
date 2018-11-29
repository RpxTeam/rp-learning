import React from 'react'
import axios from 'axios'
import {
    Grid,
    Form,
    Input,
    TextArea,
    Button,
    Icon,
    Select,
    Message,
    Segment, Divider, Label, Table
} from 'semantic-ui-react'
import Admin from '../../Admin'
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            course: {},
            edit: false,
            lessons: []
        };

        this.handleEdit = this.handleEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateCourse = this.updateCourse.bind(this);
    }

    componentDidMount () {
        const courseID = this.props.match.params.id

        axios.get(`http://localhost:8000/api/courses/${courseID}`)
        .then(res => {
            const course = res.data;
            this.setState({ course: course });
        });

        axios.get(`http://localhost:8000/api/courses/${courseID}/lessons/`)
        .then(res => {
            const lessons = res.data.lessons;
            this.setState({ lessons: lessons });
            console.log(this.state.lessons);
        });
    }

    handleEdit = (event) => {
        if(this.state.edit) {
            this.setState({
                edit: false
            })
        } else {
            this.setState({
                edit: true
            })
        }
    };

    updateCourse = (event) => {
        this.setState({ course: {
            [event.target.name]: event.target.value
        } });
    };

    handleChange = (event) => {
        console.log(event.target.name);
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();

        const courseID = this.props.match.params.id

        axios.put(`http://localhost:8000/api/courses/${courseID}`, { 
            title: this.state.course.title,
            slug: this.state.course.slug,
            description: this.state.course.description,
            start_date: this.state.course.start_date,
            end_date: this.state.course.end_date,
            duration: this.state.course.duration
         })
            .then(res => {
            console.log(res);
            console.log(res.data);
            this.setState({
                message: 'Curso atualizado com sucesso',
                error: false,
                success: true,
            });
        }).catch(error => {
            console.log(error.message);
            this.setState({
                message: error.message,
                error: true,
                success: false
            })
        })
    }

    handleEditor = ( event, editor ) => {
        const data = editor.getData();
        this.setState({
            lesson: {
                content: data
            }
        });
        console.log( { event, editor, data } );
    };

    render() {
        const { lessons } = this.state;
        return (
            <Admin heading={"Cursos"}>
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
                                                placeholder={this.state.course.title}
                                                value={this.state.course.title}
                                                name="title"
                                                onChange= {this.updateCourse}
                                            />
                                            <Form.Field
                                                id='input-control-description'
                                                control={TextArea}
                                                label='Descrição'
                                                placeholder={this.state.course.description}
                                                value={this.state.course.description}
                                                name='description'
                                                onChange={this.updateCourse}
                                                style={{ minHeight: 150 }} />
                                            {/*<Form.Field>*/}
                                            {/*<label>Autores</label>*/}
                                            {/*<Dropdown placeholder='Autores' fluid multiple selection options={this.state.options} value={this.state.author} onChange={this.handleChange}/>*/}
                                            {/*</Form.Field>*/}
                                        </Segment>
                                        <Grid verticalAlign='middle'>
                                            <Grid.Column width={14}>
                                                <h3>Lições</h3>
                                            </Grid.Column>
                                            {/*<Grid.Column width={2}>*/}
                                            {/*<Dropdown text='Adicionar Lição' icon='file text' floating floated='right' labeled button className='icon'>*/}
                                            {/*<Dropdown.Menu>*/}
                                            {/*<Dropdown.Header content='Selecione tipo de conteúdo' />*/}
                                            {/*<Dropdown.Item text="Texto" />*/}
                                            {/*<Dropdown.Item text="Web content" />*/}
                                            {/*<Dropdown.Item text="Vídeo" />*/}
                                            {/*<Dropdown.Item text="Áudio" />*/}
                                            {/*<Dropdown.Item text="Apresentação ou documento" />*/}
                                            {/*<Dropdown.Item text="Scorm" />*/}
                                            {/*</Dropdown.Menu>*/}
                                            {/*</Dropdown>*/}
                                            {/*</Grid.Column>*/}
                                        </Grid>
                                        <Segment.Group>
                                            <Segment>
                                                <Table singleLine>
                                                    <Table.Body>
                                                        { lessons.map((lesson) =>
                                                            <Table.Row key={lesson.id}>
                                                                <Table.Cell collapsing>
                                                                    <Icon name={'circle outline'} />
                                                                </Table.Cell>
                                                                <Table.Cell>
                                                                    { lesson.title }
                                                                </Table.Cell>
                                                                <Table.Cell collapsing>
                                                                    <Button.Group size='small'>
                                                                        {/*<Button icon='edit' basic color='green' onClick={this.handleDelete} />*/}
                                                                        {/*<Button icon='copy' basic color='blue' onClick={this.handleDelete} />*/}
                                                                        <Button icon='trash' basic color='red' onClick={this.handleDelete} />
                                                                    </Button.Group>
                                                                </Table.Cell>
                                                            </Table.Row>
                                                            )
                                                        }
                                                    </Table.Body>
                                                </Table>
                                            </Segment>
                                        </Segment.Group>
                                    </Grid.Column>
                                    <Grid.Column width={4}>
                                        <Segment color="black">
                                            <Form.Field
                                                id='input-control-slug'
                                                control={Input}
                                                label='Slug'
                                                name="slug"
                                                placeholder={this.state.course.slug}
                                                value={this.state.course.slug}
                                                onChange={this.updateCourse}
                                            />
                                            <Form.Field
                                                id='input-control-duration'
                                                control={Input}
                                                label='Duração'
                                                name="duration"
                                                placeholder={this.state.course.duration}
                                                value={this.state.course.duration}
                                                onChange={this.updateCourse}
                                            />
                                            <Form.Field
                                                id='input-control-startdate'
                                                control={Input}
                                                label='Data de Início'
                                                name="start_date"
                                                placeholder={this.state.course.start_date}
                                                value={this.state.course.start_date}
                                                onChange={this.updateCourse}
                                            />
                                            <Form.Field
                                                id='input-control-enddate'
                                                control={Input}
                                                label='Data de Término'
                                                name="end_date"
                                                placeholder={this.state.course.end_date}
                                                value={this.state.course.end_date}
                                                onChange={this.updateCourse}
                                            />
                                        </Segment>
                                        <Form.Field
                                            id='button-control-confirm'
                                            control={Button}
                                            content='Atualizar'
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
