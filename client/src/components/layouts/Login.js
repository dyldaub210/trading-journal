import React, { Fragment, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import useForm from '../helpers/useForm';
import { removeAlert } from '../../actions/AlertMessage';
import { loginUser } from '../../actions/Login';
import AlertMessage from './AlertMessage';

import {
    Box,
    Typography,
    Button,
    CardMedia
} from '@material-ui/core';
import CustomTextField from './css/utils/CustomTextField';
import siteImage from '../images/stocks-candle.png';
import './css/Login.css';
import './css/utils/CustomTextField.css';

const Login = ({ removeAlert, isAuthenticated, loginUser }) => {

    useEffect(() => {
        removeAlert();
    }, [removeAlert]);

    const [loginData, setLoginData] = useForm({
        email: '',
        password: ''
    })

    const { email, password } = loginData;

    const submitLoginData = (event) => {
        event.preventDefault();
        loginUser({ email, password });
    }

    if (isAuthenticated) {
        return (
            <Redirect to="/dashboard" />
        )
    }

    return (
        <Fragment>
            <Box align="center" className="container-box">
                <Box className="header">
                    <CardMedia
                        className="card-image login-image"
                        image={siteImage}
                        title="Trading Candles"
                    />
                    <Typography className="title">
                        The Trading Journal
                    </Typography>
                </Box>
                <Box>
                    <AlertMessage elevation={1} />
                </Box>
                <Box className="login-form">
                    <form onSubmit={submitLoginData}>
                        <CustomTextField
                            label="Email"
                            className="text-field"
                            autoComplete="off"
                            name="email"
                            value={email}
                            onChange={setLoginData}
                            align="center"
                        />
                        <CustomTextField
                            label="Password"
                            className="text-field"
                            autoComplete="off"
                            type="password"
                            name="password"
                            value={password}
                            onChange={setLoginData}
                        />
                        <br />
                        <Button variant="contained" className="login-button" type="submit">Login</Button>
                        <br />
                        <br />
                        <Typography>
                            Dont have an account? Register {` `}
                            <Link to="/register" className="register-link">here</Link>
                        </Typography>
                        <Typography>
                            <Link to="/" className="forgotPassword-link">Forgot Password?</Link>
                        </Typography>
                    </form>

                </Box>
                <Box className="footer">
                    <Typography>
                        Developed by Bryan Dizon © June 2020
                    </Typography>
                </Box>
            </Box>
        </Fragment>
    )
}

Login.propTypes = {
    removeAlert: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    loginUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.login.isAuthenticated
})

export default connect(mapStateToProps, { removeAlert, loginUser })(Login);