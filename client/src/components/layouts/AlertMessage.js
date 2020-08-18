import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Alert } from '@material-ui/lab';
import './css/Alert.css'

const AlertMessage = ({ alerts, elevation }) => {
    const alertStyle = {
        zIndex: 9999
    }
    return (
        alerts !== null &&
        alerts.length > 0 &&
        alerts.map(alert => (
            <Alert
                elevation={elevation}
                key={alert.id}
                severity={`${alert.alertType}`}
                className="alert-message"
                style={alertStyle}
                align="left"
            >
                {alert.message}
            </Alert>
        ))
    )

}

AlertMessage.propTypes = {
    alerts: PropTypes.arrayOf(PropTypes.object),
    elevation: PropTypes.number.isRequired
}

const mapStateToProps = (state) => ({
    alerts: state.alertMessage
})

export default connect(mapStateToProps)(AlertMessage);