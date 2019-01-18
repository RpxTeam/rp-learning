import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Menu extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log('Props: ', this.props);
        const { isAuthenticated } = this.props;
        return (
            <div id="fixed-menu">
                <ul>
                    <li><Link to="/"><i className="icon-house"></i></Link></li>
                    <li><Link to="/courses" replace><i className="icon-course"></i></Link></li>
                    {isAuthenticated ?
                        <React.Fragment>
                            <li><Link to="/my-courses" replace><i className="icon-courses"></i></Link></li>
                            <li><Link to="/profile"><i className="icon-profile-o"></i></Link></li>
                        </React.Fragment>
                    : null }
                </ul>
            </div>
        )
    }
}

export default Menu;
