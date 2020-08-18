//DEPENENCIES
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import store from './store';
import { connect } from 'react-redux';
import { loadUser } from './actions/Login';
import SetAuthToken from './actions/utils/SetAuthToken';
import PrivateRoute from './components/layouts/routing/PrivateRoute';

import ProgressBar from './components/layouts/loaders/ProgressBar'
import Navbar from './components/layouts/Navbar';

//PAGES
import Login from './components/layouts/Login';
import Dashboard from './components/layouts/Dashboard';
import Transaction from './components/layouts/Transaction';
import Calculator from './components/layouts/Calculator';
import Register from './components/layouts/Register';

//STYLING
import {
    Container,
} from '@material-ui/core';
import './components/layouts/css/App.css';
import './components/layouts/css/utils/CustomDateField.css';
import 'fontsource-roboto';

if (localStorage.token) {
    SetAuthToken(localStorage.token);
}

const App = ({ loading, isAuthenticated }) => {

    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    const containerStyle = {
        position: 'relative'
    }

    return (
        <Router>
            {
                loading && !isAuthenticated ? <ProgressBar /> : ''
            }
            <Navbar />
            <Container style={containerStyle}>
                <Switch>
                    <Route exact path="/" component={Login}></Route>
                    <Route exact path="/register" component={Register}></Route>
                    <PrivateRoute exact path="/transaction" component={Transaction}></PrivateRoute>
                    <PrivateRoute exact path="/calculator" component={Calculator}></PrivateRoute>
                    <PrivateRoute exact path="/dashboard" component={Dashboard}></PrivateRoute>
                </Switch>
            </Container>
        </Router>
    )
}

App.propTypes = {
    loading: PropTypes.bool,
    isAuthenticated: PropTypes.bool
}

const mapStatetoProps = state => ({
    loading: state.load.loading,
    isAuthenticated: state.login.isAuthenticated
})

export default connect(mapStatetoProps)(App);