import { LOGIN } from '../actions/_constantActions';

const initialState = {
    token: null,
    isAuthenticated: false,
    user: null
}

export default (state = initialState, action) => {
    const { type, payload } = action;
    const { LOGIN_SUCCESS, LOGIN_FAIL, LOAD_USER, LOGOUT_USER } = LOGIN;

    switch (type) {
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
            }
            
        case LOGOUT_USER:
        case LOGIN_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                user: null
            };

        case LOAD_USER:
            return {
                ...state,
                isAuthenticated: true,
                user: payload
            }

        default:
            return state;
    }
}