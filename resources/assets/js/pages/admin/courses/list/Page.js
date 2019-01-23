import React from 'react'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import { API_URL } from "../../../../common/url-types";
import PropTypes from 'prop-types'
// import {
//     Button,
//     Icon,
//     Table,
//     Grid,
//     Menu,
//     Message,
//     Confirm
// } from 'semantic-ui-react'
import Admin from '../../Admin'
import axios from 'axios'

import Table from '../../../../components/Table'

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            course: '',
            courses: [],
            message: '',
            error: false,
            success: false,
            redirect: false,
            open: false,
        };

        this.handleDelete = this.handleDelete.bind(this)
    }

    componentDidMount() {
        axios.get(`${ API_URL }/api/courses`)
          .then(res => {
            const courses = res.data;
            this.setState({ courses: courses });
        });
    }

    show = () => this.setState({ open: true });
    close = () => this.setState({ open: false });

    handleConfirm = (event) => {
        let courseID = event.target.value;
        this.setState({
            course: courseID,
            open: true
        })
    };

    handleDelete = () => {
        let courseID = this.state.course;
        axios.delete(`${ API_URL }/api/courses/${courseID}`)
        .then(res => {
            this.setState({
                message: 'Curso deletado',
                error: false,
                success: true,
            });
        });

        const courses = this.state.courses;
        let newCourses = courses.filter(course => {
            if (course.id != courseID) {
                return courses != courseID
            }
        });
        this.setState({
            courses: newCourses,
            open: false
        })
    };

    render() {
        const { courses } = this.state;
        return (
            <Admin heading='Cursos' createLink='/admin/courses/create'>
                <Table data={courses} columns={courses} />
                {console.log(courses)}
            </Admin>
        );
    }
}

export default Page;
