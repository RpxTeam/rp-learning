import React, { Component } from 'react'

export class Modules extends Component {
    render() {
        return (
            <div className="timeline">
                <div className="gridD">
                    <div className="overflow">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

export default Modules
