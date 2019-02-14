import {connect} from 'react-redux'
import Page from './Page'

const mapStateToProps = (state) => {
    return {
        user: state.Auth.user
    }
};

export default connect(mapStateToProps)(Page);