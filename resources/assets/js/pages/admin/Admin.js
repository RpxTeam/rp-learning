import React from 'react'
import {connect} from 'react-redux'
import Footer from '../../common/mainFooter'
import Topbar from '../../common/topbar'
import Sidebar from '../../common/sidebar'

class Admin extends React.Component {
    render() {
        return (
            <div>
                <Topbar></Topbar>
                <Sidebar></Sidebar>
                <main className="fadeIn animated" style={{marginLeft: '150px', padding: '30px 20px'}}>
                    <h2>{this.props.heading}</h2>
                    {this.props.children}
                </main>
                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.Auth.isAuthenticated
    }
};

export default connect(mapStateToProps)(Admin);