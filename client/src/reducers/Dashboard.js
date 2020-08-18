import { DASHBOARD } from '../actions/_constantActions';

import journalImage from '../components/images/journal.png';
import calculatorImage from '../components/images/calculator.png';

const initialState = {
    dashBoardPages: [
        {
            id: 1,
            title: 'My Journal',
            description: 'A trading journal where you can record your buy and sell transactions',
            imagePath: journalImage,
            path: '/transaction',
            toLoad: 'transaction'
        },
        {
            id: 2,
            title: 'Stock Calculator',
            description: 'A calculator to compute net profit and gain/loss percentage for stock transactions',
            imagePath: calculatorImage,
            path: '/calculator',
            toLoad: ''
        }
    ]
}

export default (state = initialState, action) => {

    const { LOAD_DASHBOARD } = DASHBOARD;

    const { type } = action;

    switch (type) {

        case LOAD_DASHBOARD: {
            return state
        }

        default:
            return state;
    }
}

