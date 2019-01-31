import React from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import Menu from '../../common/menu'
import { API_URL } from "../../common/url-types";
import Tabs from '../../components/Tabs';
import Card from '../../components/Card'
import { userInfo } from 'os';

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            message: '',
            courseID: '',
            viewCourse: false,
            points: 0,
            userID: this.props.user.id,
            user: {}
        }
    }

    getData = () => {
        axios.get(`${API_URL}/api/users/1/points`)
            .then(res => {
                const points = res.data;
                this.setState({
                    points: points.total
                });
            })
        axios.get(`${API_URL}/api/users/${this.state.userID}`)
        .then(res => {
            const user = res.data;
            this.setState({
                user: user
            })
        })
    }

    componentDidMount() {
        this.getData();
        axios.get(`${API_URL}/api/courses`)
            .then(res => {
                const courses = res.data;
                this.setState({ courses: courses });
            })
    }

    render() {
        const { points, user } = this.state;
        return (
            <div>
                <Menu />
                <main className="fadeIn animated" id="profile-page">
                    <div className="banner-infos">
                        <div className="gridD">
                            <a href="#" className="btn-top btn-config"><i className="icon-cog"></i></a>
                            <a href="#" className="btn-top btn-notify"><i className="icon-notify"></i></a>
                            <div className="avatar">
                                <div className="image" style={{ backgroundImage: `url(${require("../../../img/avatar.png")})` }}></div>
                            </div>
                            <div className="name">
                                <h3>{user.name}</h3>
                            </div>
                            <div className="points">
                                <i className="icon-lotus"></i>
                                <span>{points > 0 ? points + ' pontos' : points + ' ponto'}</span>
                            </div>
                        </div>
                        <div className="divider-horizontal"></div>
                        <div className="gridD">
                            <Card
                                defaultHeight={20}
                                profile={true}
                                collapsed={false}
                                icon="lesson"
                                level={user.level}
                            />
                        </div>
                    </div>
                    {/* <div className="content">
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
                    </div> */}
                </main>
            </div>
        );
    }
}

export default Page;
