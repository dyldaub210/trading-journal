import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { removeAlert } from '../../actions/AlertMessage';
import { resetCalculation } from '../../actions/Calculator';
import { resetAllTransactionForUser, getAllTransactionForUser } from '../../actions/Transaction';

import {
    Typography,
    Box,
    Breadcrumbs,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Grid
} from '@material-ui/core';
import './css/Dashboard.css';
import './css/utils/Main.css'
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 38,
    },
}));

const Dashboard = ({
    removeAlert,
    resetCalculation,
    resetAllTransactionForUser,
    getAllTransactionForUser,
    dashBoardPages }) => {

    useEffect(() => {
        removeAlert();
        resetAllTransactionForUser();
        resetCalculation();
    }, [removeAlert,
        resetAllTransactionForUser,
        resetCalculation
    ]);

    const loadTransactions = () => {
        getAllTransactionForUser();
    }

    return (
        <Fragment>
            <Box className="route-box">
                <Box>
                    <Box>
                        <Typography className="title" align="left">Dashboard</Typography>
                    </Box>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Typography className="breadcrumb-active">Home</Typography>
                    </Breadcrumbs>
                </Box>
                <Box className="dashboard-body">
                    <Grid container spacing={3}>
                        {
                            dashBoardPages.map(page => (
                                <DashboardModule
                                    key={page.id}
                                    module={page}
                                    toLoad={page.toLoad === 'transaction' ? loadTransactions : () => { }}
                                />
                            ))
                        }
                    </Grid>
                </Box>
            </Box>
        </Fragment>
    )
}

const DashboardModule = ({ module, toLoad }) => {
    const classes = useStyles();
    const theme = useTheme();
    return (
        <Grid item xs={12} sm={6}>
            <Link to={module.path} className="dashboard-links">
                <Card
                    className="card-content"
                    onClick={toLoad}>
                    <CardActionArea>
                        <CardMedia
                            className="card-image"
                            image={module.imagePath}
                            title={module.title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {module.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" className="module-description" component="p">
                                {module.description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Link>
        </Grid>
    )
}

Dashboard.propTypes = {
    removeAlert: PropTypes.func.isRequired,
    resetAllTransactionForUser: PropTypes.func.isRequired,
    getAllTransactionForUser: PropTypes.func.isRequired,
    resetCalculation: PropTypes.func.isRequired,
    dashBoardPages: PropTypes.arrayOf(Object).isRequired
}

const mapStateToProps = state => ({
    dashBoardPages: state.dashboard.dashBoardPages
})

export default connect(mapStateToProps,
    {
        removeAlert,
        resetAllTransactionForUser,
        getAllTransactionForUser,
        resetCalculation
    })(Dashboard);