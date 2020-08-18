import { LOAD } from '../_constantActions';

const { LOAD_START, LOAD_END } = LOAD;

export const startLoad = () => dispatch => {
    dispatch({
        type: LOAD_START
    });
}

export const endLoad = () => dispatch => {
    dispatch({
        type: LOAD_END
    })
}