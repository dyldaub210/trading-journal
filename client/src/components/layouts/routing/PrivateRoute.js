import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PrivateRoute = ({
    component: Component,
    login: { isAuthenticated },
    loading,
    ...rest
}) => (
    <Route 
        {...rest}
        render={props =>
            !isAuthenticated && !loading ?
            (<Redirect to="/" />) :
            (<Component {...props} />)
        }
    />
)

PrivateRoute.propTypes = {
    login: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    login: state.login,
    loading: state.load.loading
})

export default connect(mapStateToProps)(PrivateRoute);