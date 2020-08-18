import { REGISTRATION } from '../actions/_constantActions';
import axios from 'axios';
import { setAlert } from './AlertMessage';
import { startLoad, endLoad } from './utils/Loader';

const { REGISTER_SUCCESS, REGISTER_FAIL } = REGISTRATION;

export const register = ({ name, email, password }) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ name, email, password });

    try {
        dispatch(startLoad());
        const registerResponse = await axios.post('/trade/user/register', body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: registerResponse.data
        });

        const successItem = [{
            message: 'Registration successfull!',
            alertType: 'success'
        }]

        dispatch(setAlert(successItem));
        dispatch(endLoad());

    } catch (error) {

        const errors = error.response.data.errors;
        const errorItems = [];

        errors.map(error => {
            return errorItems.push({
                message: error.msg,
                alertType: 'error'
            });   
        });

        dispatch(setAlert(errorItems));
        dispatch(endLoad());
        
        dispatch({
            type: REGISTER_FAIL
        })

    }
}