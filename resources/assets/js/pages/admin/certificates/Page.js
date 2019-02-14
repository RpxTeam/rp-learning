import React from 'react'
import { API_URL } from "../../../common/url-types";
import axios from 'axios'
import { Redirect } from "react-router-dom";
import Message from '../../../components/Message';
import styled from 'styled-components';
import { Grid, Card, CardContent, CardActions, Paper, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';

import FilePreview from 'react-preview-file';

import Admin from '../Admin'
import { Certificate } from 'crypto';

const Image = styled(Paper)`
    height: 300px;
    background: black;
    background-position: center center;
    background-size: contain;
    background-repeat: no-repeat;
`

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: {
                open: false
            },
            certificate: {
                file: null,
                name: ''
            },
            message: {
                open: false,
                text: ''
            },
            certificates: [],
            view: false,
            confirmation: false
        }
    };

    getData = () => {

    };

    componentDidMount() {
        this.getData();
    }

    createCertificate = () => {
        this.setState({
            modal: {
                open: true,
            }
        });
    }

    cancelCertificate = () => {
        this.setState({
            modal: {
                open: false
            },
            certificate: {
                file: null,
                name: ''
            },
            view: false,
            confirmation: false
        })
    }

    onChangeFile = (event) => {
        const file = event.target.files[0];
        if (file.type === 'image/jpeg' || file.type === 'image/png') {
            this.setState({
                certificate: {
                    file: file,
                    name: file.name
                }
            });
        } else {
            this.openMessage('Arquivo inválido');
        }
    };

    viewCertificate = (id) => () => {
        const certificates = this.state.certificates;
        const newCertificates = certificates.filter((elem, i, index) => {
            if (elem.id === id) {
                return certificates;
            }
        })
        this.createCertificate();
        this.setState({
            certificate: {
                file: newCertificates[0].image.file,
                name: newCertificates[0].image.name
            }
        })
        this.createCertificate();
    }

    deleteCertificate = (id) => () => {
        this.setState({
            delete: id,
            confirmation: true
        })
    }

    confirmationDelete = () => {
        const certificates = this.state.certificates;
        const id = this.state.delete;
        const newCertificates = certificates.filter((elem, i, index) => {
            if (elem.id != id) {
                return certificates;
            }
        })
        this.setState({
            certificates: newCertificates,
            confirmation: false
        })
    }

    submitCertificate = () => {
        const certificate = this.state.certificate;
        const certificates = this.state.certificates;
        let total;
        if ((certificates.length - 1) < 1) {
            total = certificates.length;
        } else {
            total = certificates.length - 1;
        }
        const id = total + 1;
        if (certificate.file) {
            this.fileUpload();
            // this.setState(prevState => ({
            //     certificates: [
            //         ...prevState.certificates,
            //         {
            //             id: id,
            //             image: {
            //                 file: certificate.file,
            //                 name: certificate.name
            //             },
            //         }
            //     ]
            // }));
        } else {
            this.openMessage('Insira a imagem do certificado.');
        }
    }

    openMessage = (message) => {
        this.setState({
            message: {
                ...this.state.message,
                open: true,
                text: message
            }
        });
    };

    closeMessage = () => {
        this.setState({
            message: {
                ...this.state.message,
                open: false
            }
        });
    };

    fileUpload = () => {
        const formData = new FormData();

        formData.append('user_id', this.props.user.id);
        formData.append('image', this.state.certificate.file);
        formData.append('mime', this.state.certificate.file.type);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        axios.post(`${API_URL}/certification/templates`, formData, config)
        .then(res => {
            console.log(res);

            this.openMessage('Certificado enviado com sucesso.');

            this.cancelCertificate();
        });
    }

    render() {
        const { modal, certificate, certificates, message, view, confirmation } = this.state;
        return (
            <Admin heading="Certificados">
                <Message text={message.text} open={message.open} close={this.closeMessage} />
                {view ? null :
                    <Grid container spacing={40} justify={'flex-end'}>
                        <Grid item>
                            <Button color='primary' variant='contained' onClick={this.createCertificate}>Incluir certificado</Button>
                        </Grid>
                    </Grid>
                }
                <Grid container spacing={40}>
                    {certificates.map((certificate, index) =>
                        <Grid item xl={3} lg={4} md={6} sm={12} key={index}>
                            <Card>
                                <FilePreview file={certificate.image.file}>
                                    {(preview) => <Image style={{ backgroundImage: `url(${preview})` }}></Image>}
                                </FilePreview>
                                <CardActions>
                                    <Button size="small" color="primary" onClick={this.viewCertificate(certificate.id)}>
                                        Visualizar
                                </Button>
                                    <Button size="small" color="primary" onClick={this.deleteCertificate(certificate.id)}>
                                        Excluir
                                </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    )}
                </Grid>
                <Dialog open={modal.open} onClose={this.cancelCertificate}>
                    <DialogTitle>
                        {view ? null : 'Criar '}Certificado
                    </DialogTitle>
                    <DialogContent>
                        {view ? null :
                            <DialogContentText>
                                Insira a imagem do certificado.
                        </DialogContentText>
                        }
                        <Grid container alignItems="center" direction="column">
                            <br />
                            {view ? null :
                                <React.Fragment>
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            component='label'
                                        >
                                            IMAGEM
                                        <input type="file" style={{ display: 'none' }} onChange={this.onChangeFile} />
                                        </Button>
                                    </Grid>
                                    <br />
                                </React.Fragment>
                            }
                            <Grid item>
                                {certificate.file ?
                                    <FilePreview file={certificate.file}>
                                        {(preview) => <img src={preview} />}
                                    </FilePreview>
                                    : null}
                            </Grid>
                        </Grid>
                    </DialogContent>
                    {view ? null :
                        <DialogActions>
                            <Button variant="contained" color="primary" onClick={this.submitCertificate}>Criar</Button>
                        </DialogActions>
                    }
                </Dialog>

                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    maxWidth="xs"
                    open={confirmation}
                >
                    <DialogTitle id="confirmation-dialog-title">Tem certeza que deseja excluir?</DialogTitle>
                    <DialogActions>
                        <Button onClick={this.cancelCertificate} color="primary">
                            Não
                        </Button>
                        <Button onClick={this.confirmationDelete} color="primary">
                            Sim
                        </Button>
                    </DialogActions>
                </Dialog>
            </Admin>
        );
    }
}

export default Page;
