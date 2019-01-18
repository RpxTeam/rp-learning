import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class Menu extends Component {
    render() {
        return (
            <div id="fixed-menu">
                <ul>
                    <li><Link to="/"><i className="icon-house"></i></Link></li>
                    <li><Link to="/courses" replace><i className="icon-course"></i></Link></li>
                    {/* @if (Auth::check()) */}
                    <li><Link to="/my-courses" replace><i className="icon-courses"></i></Link></li>
                    <li><Link to="/profile"><i className="icon-profile-o"></i></Link></li>
                    {/* @endif */}
                </ul>
            </div>
        )
    }
}

export default Menu
