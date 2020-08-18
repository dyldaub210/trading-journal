import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/Login';

import ProgressBar from './loaders/ProgressBar';

import {
    AppBar,
    Toolbar,
    CardMedia,
    Typography,
    IconButton,
    Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import siteImage from '../images/stocks-candle-green.png';
import PowerSettingsNewSharpIcon from '@material-ui/icons/PowerSettingsNewSharp';
import './css/Navbar.css';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const Navbar = ({ login: { user, isAuthenticated }, logoutUser }) => {

    const classes = useStyles();

    const logout = (event) => {
        event.preventDefault();

        logoutUser();
    }

    if (isAuthenticated) {
        return (
            <Box className={classes.root}>
                <AppBar className="navigation-bar navbar-box">
                    <Toolbar>
                        <Link to="/dashboard" edge="start">
                            <CardMedia
                                className="navbar-image"
                                image={siteImage}
                                title="Trading Candles"
                            />
                        </Link>
                        <Link to="/dashboard" className={`${classes.title} navigation-title`}>
                            <Typography className="navigation-subTitle">
                                The Trading Journal
                            </Typography>
                        </Link>
                        <Typography className="username">
                            {user && user.name} {` `}
                        </Typography>
                        <IconButton aria-label="logout" color="inherit" onClick={logout}>
                            <PowerSettingsNewSharpIcon />
                        </IconButton>
                    </Toolbar>
                    <ProgressBar />
                </AppBar>
            </Box>
        )
    } else {
        return (
            <div>

            </div>
        )
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    login: state.login
})

export default connect(mapStateToProps, { logoutUser })(Navbar);