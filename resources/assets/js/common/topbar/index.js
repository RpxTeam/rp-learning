// import libs
import { withStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux'

const styles = {
    root: {
        flexGrow: 1,
        height: '100%',
    },
    container: {
        height: '100%',
        width: '100%',
        maxWidth: 1140,
        margin: '0 auto'
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    logo: {
        width: '120px'
    }
};

// import component
import Page from './Page'

const mapStateToProps = state => {
    return {
        isAuthenticated : state.Auth.isAuthenticated,
        user : state.Auth.user,
    }
};

export default connect(mapStateToProps)(withStyles(styles)(Page));
