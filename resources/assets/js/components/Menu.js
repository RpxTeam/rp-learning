import React, { Component } from 'react'

export class Menu extends Component {
  render() {
    return (
        <div id="fixed-menu">
        <ul>
            <li><a href="{{ url('/home') }}"><i className="icon-house"></i></a></li>
            <li><a href="{{ url('/library') }}"><i className="icon-course"></i></a></li>
            {/* @if (Auth::check()) */}
            <li><a href="{{ url('/my-courses') }}"><i className="icon-courses"></i></a></li>
            <li><a href="{{ url('/profile') }}"><i className="icon-zen"></i></a></li>
            {/* @endif */}
        </ul>
    </div>
    )
  }
}

export default Menu
