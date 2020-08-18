import { TRANSACTION } from '../actions/_constantActions';

const initialState = {
    isOpenDialog: false,
    allTransaction: [],
    transaction: null,
    loading: false,
    gainLoss: 0,
    percentTrade: 0,
}

export default (state = initialState, action) => {

    const {
        DIALOG_TRANSACTION,
        ADD_TRANSACTION,
        EDIT_TRANSACTION,
        DELETE_TRANSACTION,
        GET_ALL_TRANSACTION,
        GET_SPECIFIC_TRANSACTION,
        RESET_ALL_TRANSACTION,
        SET_TOTALS,
        LOAD_START_TRANSACTION,
        LOAD_END_TRANSACTION } = TRANSACTION;

    const { type, payload } = action;

    switch (type) {
        case DIALOG_TRANSACTION:
            return {
                ...state,
                isOpenDialog: !state.isOpenDialog
            }

        case GET_ALL_TRANSACTION:

            state.allTransaction = [];

            payload.map(load => {
                state.allTransaction.push(load);
            });

            return {
                ...state
            }

        case GET_SPECIFIC_TRANSACTION:
            state.transaction = null;

            return {
                ...state,
                transaction: payload,
                gainLoss: payload.gainLoss,
                percentTrade: payload.percentTrade
            }

        case SET_TOTALS:
            return {
                ...state,
                gainLoss: payload.gainLoss,
                percentTrade: payload.percentTrade
            }

        case ADD_TRANSACTION:

            state.allTransaction.push(payload)

            return {
                ...state
            }

        case EDIT_TRANSACTION: {

            state.allTransaction.map(transaction => {
                if (transaction._id === payload.id) {
                    transaction.code = payload.code;
                    transaction.shares = payload.shares;
                    transaction.dateBought = payload.dateBought;
                    transaction.dateSold = payload.dateSold
                    transaction.priceBought = payload.priceBought;
                    transaction.priceSold = payload.priceSold;
                    transaction.gainLoss = payload.gainLoss;
                    transaction.percenTrade = payload.percenTrade;
                }
            });

            return {
                ...state,
            }
        }

        case DELETE_TRANSACTION:
            return {
                ...state,
                allTransaction: state.allTransaction.filter(transaction => transaction._id !== payload)
            }


        case LOAD_START_TRANSACTION:
            return {
                ...state,
                loading: true
            }


        case LOAD_END_TRANSACTION:
            return {
                ...state,
                loading: false
            }


        case RESET_ALL_TRANSACTION:
            return {
                ...state,
                isOpenDialog: false,
                allTransaction: [],
                transaction: null,
                loading: false,
                gainLoss: 0,
                percentTrade: 0,
            }


        default:
            return state;
    }
}