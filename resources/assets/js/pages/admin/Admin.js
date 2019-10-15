import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import Topbar from '../../common/topbar'
import Banner from './components/banner'
import { withStyles } from '@material-ui/core/styles'

import {
    Grid,
    Card,
    CardHeader,
    List,
    ListItem,
    ListItemText,
    Divider
} from '@material-ui/core'
import Footer from '../../components/Footer';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    appBar: {
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 64
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        width: '100%',
        maxWidth: 1140,
        margin: '0 auto',
    },
});

class Admin extends React.Component {
    constructor(props) {
        super(props);
    }

    handleDrawerOpen = () => {
        setOpen(true);
    }

    handleDrawerClose = () => {
        setOpen(false);
    }

    render() {
        const { classes, user } = this.props;

        let role;
        switch (user.role_id) {
            case 1:
                role = 'Administrador';
                break;
            case 2:
                role = 'Instrutor';
                break;
            case '1':
                role = 'Administrador';
                break;
            case '2':
                role = 'Instrutor';
                break;
            default:
                role = 'Aluno';
                break;
        }

        return (
            <div className={classes.root}>
                <Topbar position="static" className={classes.appBar} />
                <Banner
                    userName={user.name}
                    role={role}
                />
                <main className={classes.content + ' fadeIn animated'}>
                    <Grid container spacing={40}>
                        <Grid item sm={9}>
                            {this.props.children}
                        </Grid>
                        <Grid item sm={3}>
                            <Card>
                                <CardHeader title="Minha conta"></CardHeader>
                                <List dense={true}>
                                    <Divider />
                                    <ListItem button component={Link} to={'/dashboard'}>
                                        <ListItemText
                                            primary="Dashboard"
                                        />
                                    </ListItem>
                                    {user.role_id === '1' || user.role_id === 1 ?
                                        <React.Fragment>
                                            <Divider />
                                            <ListItem button component={Link} to={'/admin/users'} n>
                                                <ListItemText
                                                    primary="Usuários"
                                                />
                                            </ListItem>
                                        </React.Fragment>
                                        : null}
                                    <Divider />

                                    {user.role_id === '3' || user.role_id === 3 ?
                                        <React.Fragment>
                                            <ListItem button component={Link} to={'/my-courses'}>
                                                <ListItemText
                                                    primary="Meus Cursos"
                                                />
                                            </ListItem>
                                            <Divider />
                                        </React.Fragment>
                                        : null}
                                    {user.role_id != '3' || user.role_id != 3 ?
                                        <React.Fragment>
                                            <ListItem button component={Link} to={'/admin/courses'}>
                                                <ListItemText
                                                    primary="Cursos"
                                                />
                                            </ListItem>
                                            {/* <Divider />
                                            <ListItem button component={Link} to={'/admin/certificates'}>
                                                <ListItemText
                                                    primary="Certificados"
                                                />
                                            </ListItem> */}
                                        </React.Fragment>
                                        : null}
                                </List>
                            </Card>
                        </Grid>
                    </Grid>
                </main>
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.Auth.isAuthenticated,
        user: state.Auth.user
    }
};

// export default withStyles(styles)(Admin);
export default connect(mapStateToProps)(withStyles(styles)(Admin));