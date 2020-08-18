import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import useForm from '../helpers/useForm';
import { setAlert } from '../../actions/AlertMessage';
import { register } from '../../actions/Register';
import { removeAlert } from '../../actions/AlertMessage';
import { emailValidity } from '../helpers/fieldValidation';

import AlertMessage from './AlertMessage';

import {
    Box,
    Typography,
    Button,
    CardMedia
} from '@material-ui/core';
import CustomTextField from './css/utils/CustomTextField';
import './css/Register.css';
import './css/utils/CustomTextField.css';
import siteImage from '../images/stocks-candle.png';


const Register = ({ setAlert, register, removeAlert }) => {

    useEffect(() => {
        removeAlert();
    }, [removeAlert]);


    const [registerData, setRegisterData] = useForm({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({
        nameIsRequired: false,
        emailIsRequired: false,
        emailIsValid: false,
        passwordIsRequired: false,
        passwordMinLength: false,
        confirmPasswordIsRequired: false,
        confirmPasswordIsMatch: false,
    })

    const {
        name,
        email,
        password,
        confirmPassword,
    } = registerData;

    const {
        nameIsRequired,
        emailIsRequired,
        emailIsValid,
        passwordIsRequired,
        passwordMinLength,
        confirmPasswordIsRequired,
        confirmPasswordIsMatch
    } = errors;

    const submitRegistration = (event) => {
        event.preventDefault();

        setErrors({
            nameIsRequired: name === '' ? true : false,
            emailIsRequired: email === '' ? true : false,
            emailIsValid: emailValidity(email) === false ? true : false,
            passwordIsRequired: password === '' ? true : false,
            passwordMinLength: password.length < 5 ? true : false,
            confirmPasswordIsRequired: confirmPassword === '' ? true : false,
            confirmPasswordIsMatch: confirmPassword !== password ? true : false,
        });

        if (name === '') {
            return;
        }

        if (email === '' || emailValidity(email) === false) {
            return;
        }

        if (password === '' || password.length < 5) {
            return;
        }

        if (confirmPassword === '' || confirmPassword !== password) {
            return
        }

        register({ name, email, password });
    }

    return (
        <Fragment >
            <Box align="center" className="container-box">
                <Box className="header">
                    <CardMedia
                        className="card-image register-image"
                        image={siteImage}
                        title="Trading Candles"
                    />
                    <Typography className="title">
                        Account Registration
                    </Typography>
                    <Typography>
                        The Trading Journal
                    </Typography>
                </Box>
                <Box>
                    <AlertMessage elevation={1} />
                </Box>
                <Box className="register-form">
                    <form
                        onSubmit={submitRegistration}>
                        <CustomTextField
                            label="Name"
                            className="text-field"
                            autoComplete="off"
                            name="name"
                            value={name}
                            onChange={setRegisterData}
                            error={nameIsRequired}
                            helperText={nameIsRequired ? 'Name is required' : ''}
                        />
                        <CustomTextField
                            label="Email"
                            className="text-field"
                            autoComplete="off"
                            name="email"
                            value={email}
                            onChange={setRegisterData}
                            error={emailIsRequired || emailIsValid}
                            helperText={emailIsRequired ? 'Email is required' : emailIsValid ? 'Email is not valid' : ''}
                        />
                        <CustomTextField
                            label="Password"
                            className="text-field"
                            autoComplete="off"
                            type="password"
                            name="password"
                            value={password}
                            onChange={setRegisterData}
                            error={passwordIsRequired || passwordMinLength}
                            helperText={passwordIsRequired ? 'Password is required' : passwordMinLength ? 'Password should contain at least 5 characters' : ''}
                        />
                        <CustomTextField
                            label="Confirm Password"
                            className="text-field"
                            autoComplete="off"
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={setRegisterData}
                            error={confirmPasswordIsRequired || confirmPasswordIsMatch}
                            helperText={confirmPasswordIsRequired === true ? 'Confirm password' : confirmPasswordIsMatch ? 'Passwords does not match' : ''}
                        />
                        <br />
                        <Button variant="contained" className="register-button" type="submit">Register</Button>
                    </form>

                </Box>
                <Box className="register-footer">
                    <Typography>
                        Already signed up? Login {` `}
                        <Link to="/" className="register-link">here</Link>
                    </Typography>
                </Box>
            </Box>
        </Fragment>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    removeAlert: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    alerts: state.alertMessage
})

export default connect(mapStateToProps, { setAlert, register, removeAlert })(Register);