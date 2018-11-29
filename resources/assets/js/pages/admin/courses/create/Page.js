import React from 'react'
import {Link} from 'react-router-dom'
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
    Dropdown,
    List,
    Image,
    Divider,
    Table,
    Icon
} from 'semantic-ui-react'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Admin from '../../Admin'

const genderOptions = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
]

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
            lesson: {
                title: '',
                user_id: '',
                course_id: '',
                lesson_id: '',
                content: ''
            }
        }
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();

        axios.post(`http://rplearning-homolog.siteseguro.ws/api/courses`, {
            title: this.state.title,
            slug: this.state.slug,
            description: this.state.description,
            start_date: this.state.start_date,
            end_date: this.state.end_date,
            duration: this.state.duration
         }).then(res => {
            console.log(res);
            console.log(res.data);
            this.setState({
                message: 'Usuário criado com sucesso',
                error: false,
                success: true,
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

    handleSubmitLesson = (event) => {
        axios.post(`http://rplearning-homolog.siteseguro.ws/api/courses/2/lessons`, {
            title: 'Lição 1',
            content: this.state.lesson.content,
        }).then(res => {
            console.log(res);
            console.log(res.data);
            this.setState({
                message: 'Lição criada com sucesso',
                error: false,
                success: true,
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
                                        <Divider />
                                        <CKEditor
                                            editor={ ClassicEditor }
                                            data={this.state.lesson.content}
                                            onInit={ editor => {
                                                // You can store the "editor" and use when it is needed.
                                                console.log( 'Editor is ready to use!', editor );
                                            } }
                                            onChange={ this.handleEditor }
                                        />
                                        <Input label='http://' placeholder='Url' />
                                        <div>
                                        <iframe src={'https://www.youtube.com/embed/KGYLe3Liopo'} />
                                        </div>
                                        <Label
                                            as="label"
                                            basic
                                            htmlFor="upload">
                                            <Button
                                                icon="upload"
                                                label={{
                                                    basic: true,
                                                    content: 'Select file(s)'
                                                }}
                                                labelPosition="right"
                                            />
                                            <input
                                                hidden
                                                id="upload"
                                                multiple
                                                type="file"
                                            />
                                        </Label>
                                        <Divider />
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
                                                        <Table.Row>
                                                            <Table.Cell collapsing>
                                                                <Icon name={'circle outline'} />
                                                            </Table.Cell>
                                                            <Table.Cell>
                                                                Lição 1
                                                            </Table.Cell>
                                                            <Table.Cell collapsing>
                                                                <Button.Group size='small'>
                                                                    <Button icon='edit' basic color='green' onClick={this.handleDelete} />
                                                                    <Button icon='copy' basic color='blue' onClick={this.handleDelete} />
                                                                    <Button icon='trash' basic color='red' onClick={this.handleDelete} />
                                                                </Button.Group>
                                                            </Table.Cell>
                                                        </Table.Row>
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
                                                placeholder='Slug'
                                                onChange={this.handleChange}
                                            />
                                            <Form.Field
                                                id='input-control-duration'
                                                control={Input}
                                                label='Duração'
                                                name="duration"
                                                placeholder='Duração'
                                                onChange={this.handleChange}
                                            />
                                            <Form.Field
                                                id='input-control-startdate'
                                                control={Input}
                                                label='Data de Início'
                                                name="start_date"
                                                placeholder='Data de Início'
                                                onChange={this.handleChange}
                                            />
                                            <Form.Field
                                                id='input-control-enddate'
                                                control={Input}
                                                label='Data de Término'
                                                name="end_date"
                                                placeholder='Data de Término'
                                                onChange={this.handleChange}
                                            />
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
