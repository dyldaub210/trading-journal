import { REGISTRATION } from '../actions/_constantActions';

const initialState = {
    
}

export default (state = initialState, action) => {
    const { types, payload } = action;
    const { REGISTER_SUCCESS, REGISTER_FAIL } = REGISTRATION;

    switch (types) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                ...payload,
            }

        case REGISTER_FAIL:
            return {
                ...state,
            }

        default:
            return state;
    }
}