import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export class Message extends Component {
    render() {
        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={this.props.open}
                autoHideDuration={6000}
                onClose={this.props.close}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{this.props.text}</span>}
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={this.props.close}
                    >
                        <CloseIcon />
                    </IconButton>,
                ]}
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
