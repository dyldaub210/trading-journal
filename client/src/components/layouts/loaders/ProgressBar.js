import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { LinearProgress, Box } from '@material-ui/core';
import '../css/ProgressBar.css';

const ProgressBar = ({ loading, isAuthenticated }) => {
    return (      
        loading && isAuthenticated ?
            <LinearProgress className="bar authenticatedLoading" /> :
            loading ?
                <LinearProgress className="bar" /> :
                <Box className="filler"></Box>   
                
    )
}

ProgressBar.propTypes = {
    loading: PropTypes.bool,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    loading: state.load.loading,
    isAuthenticated: state.login.isAuthenticated
})

export default connect(mapStateToProps)(ProgressBar);