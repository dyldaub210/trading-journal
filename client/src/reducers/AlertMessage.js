import { ALERTS } from '../actions/_constantActions';

const initialState = [

]

export default (state = initialState, action) => {
    const { type, payload } = action;
    const { SET_ALERT, REMOVE_ALERT } = ALERTS;

    switch (type) {
        case SET_ALERT:
            return [
                ...payload
            ]
        case REMOVE_ALERT: 
            return state = []
        default:
            return state
    }


}