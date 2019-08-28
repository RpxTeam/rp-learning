import React from 'react'
import PropTypes from 'prop-types'
import TitleSection from './TitleSection'

import {
    AppBar,
    Grid,
    Toolbar,
    Typography,
    withStyles,
    Link,
    Card,
    CardContent,
    Paper,
} from '@material-ui/core'

const drawerWidth = 240;

const styles = theme => ({
    root: {
        padding: '15px 0',
        background: '#ccc'
    },
    container: {
        height: '100%',
        display: 'flex',
        maxWidth: 1140,
        margin: '0 auto',
    },
    image: {
        padding: '20px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        backgroundPosition: 'center center',
        backgroundSize: '100% auto',
        backgroundRepeat: 'no-repeat',
        width: 50,
        height: 50,
        display: 'block'
    },
    name: {
        fontSize: '2.61rem',
        color: 'white',
        margin: 0,
    },
    content: {
        'min-height': '70px',
    },
    link: {
        color: 'white',
        fontSize: '1.15rem',
        textDecoration: 'underline'
    },
    title: {
        color: 'black',
        textAlign: 'center'
    },
    p: {
        color: 'black',
        textAlign: 'center'
    }
});

class Banner extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid className={classes.container} container spacing={32} justify="space-between" alignItems="center">
                    <Grid item xs={12} sm={12}>
                        <TitleSection
                            text="Features"
                            subtitle="Algumas features de nosso LMS."
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card>
                            <div className={classes.image} style={{ backgroundColor: '#6496c8' }}>
                                <div className={classes.icon} style={{ backgroundImage: `url(${'images/icons/aprendizado.png'})` }}></div>
                            </div>
                            <CardContent className={classes.content}>
                                <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                                    Aprendizado
                                </Typography>
                                <Typography component="p" className={classes.p}>
                                    Amplie os seus conhecimentos profissionais com os treinamentos do LMS Santander feitos para você.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card>
                            <div className={classes.image} style={{ backgroundColor: '#231F20' }}>
                                <div className={classes.icon} style={{ backgroundImage: `url(${'images/icons/agilidade.png'})` }}></div>
                            </div>
                            <CardContent className={classes.content}>
                                <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                                    Agilidade
                                </Typography>
                                <Typography component="p" className={classes.p}>
                                    Aprenda no seu ritmo e nos horários mais convenientes, no computador, tablet ou até mesmo no celular!
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card>
                            <div className={classes.image} style={{ backgroundColor: '#9E8852' }}>
                                <div className={classes.icon} style={{ backgroundImage: `url(${'images/icons/motivacao.png'})` }}></div>
                            </div>
                            <CardContent className={classes.content}>
                                <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                                    Motivação
                                </Typography>
                                <Typography component="p" className={classes.p}>
                                    Vídeos, textos interativos e certificados de conculusão vão tornar o seu aprendizado agradável e produtivo.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card>
                            <div className={classes.image} style={{ backgroundColor: '#6496c8' }}>
                                <div className={classes.icon} style={{ backgroundImage: `url(${'images/icons/carreira.png'})` }}></div>
                            </div>
                            <CardContent className={classes.content}>
                                <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                                    Carreira
                                </Typography>
                                <Typography component="p" className={classes.p}>
                                    Garanta o seu futuro no Banco Santander fazendo todos os treinamentos disponíveis para você.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card>
                            <div className={classes.image} style={{ backgroundColor: '#231F20' }}>
                                <div className={classes.icon} style={{ backgroundImage: `url(${'images/icons/compliance.png'})` }}></div>
                            </div>
                            <CardContent className={classes.content}>
                                <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                                    Compliance
                                </Typography>
                                <Typography component="p" className={classes.p}>
                                    Fique em dia com as legislações, normas e políticas que todos os colaboradores devem conhecer.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card>
                            <div className={classes.image} style={{ backgroundColor: '#9E8852' }}>
                                <div className={classes.icon} style={{ backgroundImage: `url(${'images/icons/sucesso.png'})` }}></div>
                            </div>
                            <CardContent className={classes.content}>
                                <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                                    Sucesso
                                </Typography>
                                <Typography component="p" className={classes.p}>
                                    Conquiste o reconhecimento que você merece mantendo-se sempre atualizado e informado!
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

Banner.propTypes = {
    userName: PropTypes.string,
    role: PropTypes.string,
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Banner);