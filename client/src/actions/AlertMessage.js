import { ALERTS } from './_constantActions';
import { v4 as uuid } from 'uuid'

const { SET_ALERT, REMOVE_ALERT } = ALERTS;

export const setAlert = (errorItems) => async dispatch => {

    const setErrorItems = [];

    errorItems.map(errorItem => setErrorItems.push({
        id: uuid(),
        message: errorItem.message,
        alertType: errorItem.alertType
    }))

    dispatch({
        type: SET_ALERT,
        payload: setErrorItems
    });
}

export const removeAlert = () => async dispatch => {
    dispatch({
        type: REMOVE_ALERT
    })
}