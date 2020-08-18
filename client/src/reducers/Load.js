import { LOAD } from '../actions/_constantActions';

const initialState = {
    loading: false
}

export default (state = initialState, action) => {
    const { type } = action;
    const { LOAD_START, LOAD_END } = LOAD;

    switch (type) {
        case LOAD_START:
            return {
                loading: true
            }

        case LOAD_END:
            return {
                loading: false
            }

        default:
            return state;
    }
}