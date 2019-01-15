import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    max-width: 100%;
    margin-right: 19px;
    margin-left: 19px;
    position: relative;
    height: 100%;
`

export class Grid extends Component {
    render() {
        return (
            <Container>
                {this.props.children}
            </Container>
        )
    }
}

export default Grid
