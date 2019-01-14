import React from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import {
    Button,
    Container,
    Grid,
    Header,
    Icon,
    Segment,
    Card,
    Image,
    Progress
} from 'semantic-ui-react'
import PageHeader from '../../common/pageHeader'
import Menu from '../../components/Menu'
import Footer from '../../common/mainFooter'
import { API_URL } from "../../common/url-types";
import Tabs from '../../components/Tabs';

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            message: '',
            courseID: '',
            viewCourse: false
        }
    }

    componentDidMount() {
        axios.get(`${API_URL}/api/courses`)
            .then(res => {
                const courses = res.data;
                this.setState({ courses: courses });
            })
    }

    render() {
        return (
            <div>
                <Menu />
                <main className="fadeIn animated" id="profile-page">
                    <div className="banner-infos">
                        <div className="gridD">
                            <a href="#" className="btn-top btn-config"><i className="icon-cog"></i></a>
                            <a href="#" className="btn-top btn-notify"><i className="icon-notify"></i></a>
                            <div className="avatar">
                                <div className="image" data-bg="{{ url('assets') }}/img/avatar.png"></div>
                            </div>
                            <div className="name">
                                <h3>Aluno Lore Ipsum</h3>
                            </div>
                            <div className="points">
                                <i className="icon-lotus"></i>
                                <span>500 Soul Points</span>
                            </div>
                        </div>
                        <div className="divider-horizontal"></div>
                        <div className="gridD">
                            <div className="card card-profile card-open">
                                <div className="card-header top">
                                    <i className="icon-lotus icon-bg"></i>
                                    <div className="left">
                                        <div className="icon-gamification">
                                            <i className="icon-lotus"></i>
                                        </div>
                                        <div className="status">
                                            <p>Nv. Lótus 1</p>
                                            <p><small>150/600 atividades</small></p>
                                        </div>
                                    </div>
                                    <div className="right">
                                        <a href="#" className="card-btn active"><i className="icon-arrow-top rotate180"></i></a>
                                    </div>
                                </div>
                                <div className="card-content content-active">
                                    <div className="progress">
                                        <div className="row right">
                                            <div className="percent">
                                                <p>30% </p>
                                            </div>
                                        </div>
                                        <div className="progress-bar">
                                            <div className="bar" style={{ width: '50%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content">
                        <Tabs>
                            <div label="Histórico">
                                <div className="collection">
                                    <Link to="/courses" className="collection-item">
                                        <span className="left">
                                            <div className="icon">
                                                <i className="icon-courses success"></i>
                                            </div>
                                            <div className="info">
                                                <p>Concluiu o curso Lore 1</p>
                                                <p><small>A uma hora atras</small></p>
                                            </div>
                                        </span>
                                        <span className="icon-right">
                                            <i className="icon-arrow-top rotate90"></i>
                                        </span>
                                    </Link>
                                    <Link to="/courses" className="collection-item">
                                        <span className="left">
                                            <div className="icon">
                                                <i className="icon-courses success"></i>
                                            </div>
                                            <div className="info">
                                                <p>Concluiu o curso Lore 2</p>
                                                <p><small>A uma hora atras</small></p>
                                            </div>
                                        </span>
                                        <span className="icon-right">
                                            <i className="icon-arrow-top rotate90"></i>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                            <div label="Certificados">
                                <div class="collection">
                                    <div class="collection-item">
                                        <span class="left">
                                            <div class="icon icon-circle success">
                                                <i class="icon-zen-1"></i>
                                            </div>
                                            <div class="info">
                                                <p>Concluiu o curso Lore 1</p>
                                                <p><small>Completou no dia 10/10/10</small></p>
                                            </div>
                                        </span>
                                    </div>
                                    <div class="collection-item">
                                        <span class="left">
                                            <div class="icon icon-circle success">
                                                <i class="icon-zen-1"></i>
                                            </div>
                                            <div class="info">
                                                <p>Concluiu o curso Lore 1</p>
                                                <p><small>Completou no dia 10/10/10</small></p>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div label="Conquistas">
                                <div class="collection">
                                    <div class="collection-item">
                                        <span class="left">
                                            <div class="icon icon-circle orange">
                                                <i class="icon-throphy"></i>
                                            </div>
                                            <div class="info">
                                                <p>Aprendiz Dedicado 1</p>
                                                <p><small>Complete o seu primeiro curso</small></p>
                                            </div>
                                        </span>
                                    </div>
                                    <div class="collection-item">
                                        <span class="left">
                                            <div class="icon icon-circle">
                                                <i class="icon-throphy"></i>
                                            </div>
                                            <div class="info">
                                                <p>Aprendiz Dedicado 2</p>
                                                <p><small>Complete o seu primeiro curso</small></p>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div label="Fórum">
                                <div class="collection">
                                    <div class="collection-item">
                                        <span class="left">
                                            <div class="icon icon-circle">
                                                <i class="icon-certificate"></i>
                                            </div>
                                            <div class="info">
                                                <p>Fórum item 1</p>
                                                <p><small>Usuário 1</small></p>
                                            </div>
                                        </span>
                                    </div>
                                    <div class="collection-item">
                                        <span class="left">
                                            <div class="icon icon-circle">
                                                <i class="icon-certificate"></i>
                                            </div>
                                            <div class="info">
                                                <p>Fórum item 1</p>
                                                <p><small>Usuário 1</small></p>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Tabs>
                    </div>
                </main>
            </div>
        );
    }
}

export default Page;
