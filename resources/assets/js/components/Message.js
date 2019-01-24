import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';

export class Message extends Component {
    render() {
        return (
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={this.props.open}
                autoHideDuration={6000}
                onClose={this.props.close}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{this.props.text}</span>}
            />
        )
    }
}

Message.PropTypes = {
    text: PropTypes.string,
    open: PropTypes.bool,
    close: PropTypes.close
}

export default Message
