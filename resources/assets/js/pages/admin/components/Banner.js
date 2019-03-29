import React from 'react'
import PropTypes from 'prop-types'

import {
    AppBar,
    Grid,
    Toolbar,
    Typography,
    withStyles,
    Link,
    Paper
} from '@material-ui/core'

const drawerWidth = 240;

const styles = theme => ({
    root: {
    },
    banner: {
        padding: '15px 0',
        background: '#9c0204'
    },
    container: {
        height: '100%',
        display: 'flex',
        maxWidth: 1140,
        margin: '0 auto',
    },
    image: {
        borderRadius: '50%',
        overflow: 'hidden',
        maxWidth: 80
    },
    name: {
        fontSize: '2.61rem',
        color: 'white',
        margin: 0
    },
    link: {
        color: 'white',
        fontSize: '1.15rem',
        textDecoration: 'underline'
    },
    paper: {
        ...theme.mixins.gutters(),
        padding: theme.spacing.unit,
        background: '#df0203',
        color: '#FFFFFF',
        fontSize: '10px'
    }
});

class Banner extends React.Component {
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
            <div className={classes.banner}>
                <Grid className={classes.container} container justify="space-between" alignItems="center">
                    <Grid item>
                        <Grid container spacing={16} alignItems="center">
                            <Grid item>
                                <div className={classes.image}>
                                    <img src="http://learning.frontendmatter.com/html/images/people/110/guy-6.jpg" />
                                </div>
                            </Grid>
                            <Grid item>
                                <Typography variant="h4" gutterBottom className={classes.name}>
                                    {this.props.userName}
                                </Typography>
                                <Link className={classes.link} href={'/profile'}>Perfil</Link>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Paper className={classes.paper}>
                            {this.props.role}
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

Banner.propTypes = {
    userName: PropTypes.string,
    role: PropTypes.string
}

export default withStyles(styles)(Banner);