import React, { Component } from 'react'
import ReactTable from 'react-table'
import PropTypes from 'prop-types'

// import 'react-table/react-table.css'

export class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    name: 'Tanner Linsley',
                    age: 26,
                    friend: {
                        name: 'Jason Maurer',
                        age: 23,
                    }
                }
            ],
            columns: [{
                Header: 'Name',
                accessor: 'name' // String-based value accessors!
            }, {
                Header: 'Age',
                accessor: 'age',
                Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
            }, {
                id: 'friendName', // Required because our accessor is not a string
                Header: 'Friend Name',
                accessor: d => d.friend.name // Custom value accessors!
            }, {
                Header: props => <span>Friend Age</span>, // Custom header components!
                accessor: 'friend.age'
            }]
        }
    }
    render() {
        return (
            <ReactTable
                data={this.props.data}
                columns={this.props.columns}
            />
        )
    }
}

Table.PropTypes = {
    data: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
}


export default Table
