// import libs
import { withStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux'

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
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
