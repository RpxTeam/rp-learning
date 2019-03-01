import React from 'react'
import {connect} from 'react-redux'

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            this.props.children
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.Auth.isAuthenticated
    }
};

export default connect(mapStateToProps)(Main);
