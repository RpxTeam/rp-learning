import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import Footer from '../../common/mainFooter'
import Topbar from '../../common/topbar'
import Sidebar from '../../common/sidebar'

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Dashboard from '@material-ui/icons/Dashboard';
import People from '@material-ui/icons/People';
import LocalLibrary from '@material-ui/icons/LocalLibrary'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
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
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
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
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Topbar position="fixed" className={classes.appBar} />
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    anchor="left"
                >
                    <div className={classes.toolbar}>
                        <Link to={'/'} className={classes.logo}>
                            <img src={require('../../../images/logo.png')} style={{'maxWidth': '80%'}} />
                        </Link>
                    </div>
                    <Divider />
                    <List>
                        <Link to="/dashboard">
                            <ListItem button>
                                <ListItemIcon><Dashboard /></ListItemIcon>
                                <ListItemText primary="Dashboard" />
                            </ListItem>
                        </Link>
                        <Link to="/admin/users">
                            <ListItem button>
                                <ListItemIcon><People /></ListItemIcon>
                                <ListItemText primary="Usuários" />
                            </ListItem>
                        </Link>
                        <Link to="/admin/courses">
                            <ListItem button>
                                <ListItemIcon><LocalLibrary /></ListItemIcon>
                                <ListItemText primary="Cursos" />
                            </ListItem>
                        </Link>
                    </List>
                </Drawer>
                <main className={classes.content + ' fadeIn animated'}>
                    <div className={classes.toolbar} />
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                    >
                        <h2>{this.props.heading}</h2>
                        {this.props.createLink ?
                            <Button variant="contained" component={Link} to={this.props.createLink} color='primary'>Criar</Button>
                        : null }
                    </Grid>
                    <br />
                    {this.props.children}
                </main>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.Auth.isAuthenticated,
        classes: PropTypes.object.isRequired,
    }
};

export default withStyles(styles)(Admin);
// export default connect(mapStateToProps)(withStyles(styles)(Admin));