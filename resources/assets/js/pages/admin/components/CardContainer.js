import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Card } from '@material-ui/core'

const styles = theme => ({
    root: {
        padding: '30px 20px'
    },
})

class CardContainer extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <Card className={classes.root}>
                {this.props.children}
            </Card>
        )
    }
}

export default connect()(withStyles(styles)(CardContainer));