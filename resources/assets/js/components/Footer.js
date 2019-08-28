import React from 'react'
import PropTypes from 'prop-types'

import {
    withStyles,
} from '@material-ui/core'

const styles = theme => ({
    root: {
        padding: '10px 0',
        textAlign: 'center',
        background: '#6496c8'
    },
    paragraph: {
        color: '#ffffff'
    }
});

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <p className={classes.paragraph}>RPLearning © Copyright 2019</p>
            </div>
        );
    }
}

Footer.propTypes = {
    text: PropTypes.string,
}

export default withStyles(styles)(Footer);