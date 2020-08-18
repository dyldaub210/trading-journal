import { LOGIN, TRANSACTION, CALCULATOR_CHANGE } from '../actions/_constantActions';
import axios from 'axios';
import { startLoad, endLoad } from './utils/Loader';
import { setAlert } from './AlertMessage';
import SetAuthToken from './utils/SetAuthToken';

const { LOGIN_SUCCESS, LOGIN_FAIL, LOAD_USER, LOGOUT_USER } = LOGIN;
const { RESET_ALL_TRANSACTION } = TRANSACTION;
const { RESET_CALCULATION } = CALCULATOR_CHANGE;

export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        SetAuthToken(localStorage.token);
    }

    try {
        const loadUserResponse = await axios.get('/trade/user');

        dispatch({
            type: LOAD_USER,
            payload: loadUserResponse.data
        });

        dispatch(endLoad());

    } catch (error) {
        console.log(error.message);
        dispatch({
            type: LOGIN_FAIL,
        })
        dispatch(endLoad());
    }
}

export const loginUser = ({ email, password }) => async dispatch => {

    dispatch(startLoad());

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, password });

    try {

        const loginResponse = await axios.post('/trade/user', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: loginResponse.data
        })

        dispatch(loadUser());

        dispatch(endLoad());

    } catch (error) {
        console.log('ERROR LOGIN!');
        const errors = error.response.data.errors;

        const errorItems = [];

        errors.map(error => {
            return errorItems.push({
                message: error.msg,
                alertType: 'error'
            })
        });
        console.log(errorItems);

        dispatch(setAlert(errorItems));

        dispatch({
            type: LOGIN_FAIL,
        })

        dispatch(endLoad());
    }
}

export const logoutUser = () => dispatch => {
    dispatch({ type: RESET_ALL_TRANSACTION });
    dispatch({ type: RESET_CALCULATION });
    dispatch({ type: LOGOUT_USER });
}