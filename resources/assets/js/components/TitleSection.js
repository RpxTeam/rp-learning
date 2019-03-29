import React from 'react'
import PropTypes from 'prop-types'

import {
    withStyles,
} from '@material-ui/core'

const styles = theme => ({
    root: {
        textAlign: 'center'
    },
    title: {
        fontSize: 40,
        fontWeight: 500,
    },
    subtitle: {
        fontSize: 18
    }
});

class TitleSection extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <h2 className={classes.title}>{this.props.text}</h2>
                <p className={classes.subtitle}>{this.props.subtitle}</p>
            </div>
        );
    }
}

TitleSection.propTypes = {
    text: PropTypes.string,
    subtitle: PropTypes.string
}

export default withStyles(styles)(TitleSection);