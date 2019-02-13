import React from 'react'
import { API_URL } from "../../../common/url-types";
import axios from 'axios'
import Admin from '../Admin'
import { Redirect } from "react-router-dom";
import Card from '@material-ui/core/Card';
import Message from '../../../components/Message';
import styled from 'styled-components';


const CardContainer = styled(Card)`
    padding: 10px 20px;
`;

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    };

    getData = () => {
        console.log('Carregada');
    };

    componentDidMount() {
        this.getData();
    }

    render() {
        const {  } = this.state;
        return (
            <Admin heading="Certificados">
                
            </Admin>
        );
    }
}

export default Page;
