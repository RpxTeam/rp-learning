import React from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import {
    Container,
    Segment,
} from 'semantic-ui-react'
import Card from '../../components/Card'
import Grid from '../../components/Grid'
import PageHeader from '../../common/pageHeader'
import Navigation from '../../common/navigation'
import Footer from '../../common/mainFooter'
import {API_URL} from "../../common/url-types"
import Banner from '../../components/Banner';
import Menu from '../../components/Menu';

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            message: '',
            courseID: '',
            viewCourse: false
        }
        this.favoriteCourse = this.favoriteCourse.bind(this);
    }

    getData = () => {
        axios.get(`${ API_URL }/api/courses`)
            .then(res => {
                const courses = res.data;
                this.setState({ courses: courses });
            })
    };

    componentDidMount() {
        this.getData();
    };

    viewCourse = (courseID) => {
        if(this.props.isAuthenticated) {
            axios.get(`${ API_URL }/api/users/${this.props.user.id}/courses/${courseID}`)
                .then(res => {
                    const {data} = res;
                    if (!data.view) {
                        axios.post(`${ API_URL }/api/users/${this.props.user.id}/courses/${courseID}`);
                        axios.put(`${ API_URL }/api/users/${this.props.user.id}/courses/${courseID}`, {view: 1});
                    }
                    this.setState({courseID: courseID, viewCourse: true});
                })
        } else {
            axios.get(`${ API_URL }/api/courses/${courseID}`)
                .then(res => {
                    const {data} = res;
                    this.setState({courseID: courseID, viewCourse: true});
                })
        }
    };

    favoriteCourse = (id) => {
        axios.get(`${ API_URL }/api/users/${this.props.user.id}/courses/${id}`)
            .then(res => {
                const { data } = res;
                if(data.favorite === null) {
                    axios.put(`${ API_URL }/api/users/${this.props.user.id}/courses/${id}`, {
                        favorite: 1
                    });
                } else if(data.favorite === 0) {
                    axios.put(`${ API_URL }/api/users/${this.props.user.id}/courses/${id}`, {
                        favorite: 1
                    });
                } else {
                    axios.put(`${ API_URL }/api/users/${this.props.user.id}/courses/${id}`, {
                        favorite: 0
                    });
                }
            });
    };

    formatDate = (date) => {
        if(date) {
            const newDate = date.split('-');
            const day = newDate[2].split(' ');
            const formatedDate = day[0] + '/' + newDate[1] + '/' + newDate[0];
            return formatedDate;
        }
    };

    render() {
        const { courses } = this.state;
        const { isAuthenticated } = this.props;
        if (this.state.viewCourse === true) {
            return <Redirect to={'/courses/' + this.state.courseID + '/details'} />
        }

        return (
            <React.Fragment>
                <Menu />
                <main className="fadeIn animated">
                    <Banner />
                    <Grid>
                        { courses.map((course) => 
                            <Card
                                id={course.id}
                                key={course.id}
                                name={course.title}
                                image={course.image}
                                category="Categoria"
                                onClick={this.viewCourse.bind(this, course.id)}
                                defaultHeight={0}
                            />
                            )
                        }
                    </Grid>
                </main>
            </React.Fragment>
        );
    }
}

export default Page;
