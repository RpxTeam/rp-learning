import React, { Component } from 'react'
import { styled } from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '@material-ui/core';

// const LoaderContainer = styled.div`
//     position: absolute;
//     top: 0;
//     rigth: 0;
//     left: 0;
//     bottom: 0;
//     display: flex;
//     align-items: center;
//     justify-content: center;
// `;

class Loader extends Component {
    render() {
        return (
            <CircularProgress color="primary" />
        )
    }
}

export default Loader
