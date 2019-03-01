import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import Topbar from '../../common/topbar'

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import School from '@material-ui/icons/School';
import Dashboard from '@material-ui/icons/Dashboard';
import People from '@material-ui/icons/People';
import LocalLibrary from '@material-ui/icons/LocalLibrary';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Banner from './components/banner';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        height: '100%',
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

        return (
            <div className={classes.root}>
                <Topbar position="relative" className={classes.appBar} />
                <Banner
                    userName={user.name}
                />
                <main className={classes.content + ' fadeIn animated'}>
                    {this.props.children}
                </main>
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