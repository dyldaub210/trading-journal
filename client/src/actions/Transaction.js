import { TRANSACTION } from '../actions/_constantActions';
import { CALCULATOR_CHANGE } from '../actions/_constantActions';
import { setAlert, removeAlert } from './AlertMessage';
import { startLoad, endLoad } from './utils/Loader';
import axios from 'axios';

const {
    DIALOG_TRANSACTION,
    ADD_TRANSACTION,
    DELETE_TRANSACTION,
    EDIT_TRANSACTION,
    GET_ALL_TRANSACTION,
    GET_SPECIFIC_TRANSACTION,
    RESET_ALL_TRANSACTION,
    LOAD_START_TRANSACTION,
    LOAD_END_TRANSACTION } = TRANSACTION;

const {
    RESET_CALCULATION,
} = CALCULATOR_CHANGE;

export const accessDialog = () => async dispatch => {
    try {

        dispatch({ type: DIALOG_TRANSACTION });
        dispatch({ type: RESET_CALCULATION });

    } catch (error) {
        console.log(error.message);
    }
}

export const getAllTransactionForUser = () => async dispatch => {

    dispatch(startLoad_Transaction());

    try {
        const allTransaction = await axios.get('/trade/transaction/user/all');

        dispatch({
            type: GET_ALL_TRANSACTION,
            payload: allTransaction.data
        });
    } catch (error) {
        console.log(error.message);
    }

    dispatch(endLoad_Transaction());
}

export const getSpecificTransactionForUser = (id) => async dispatch => {

    dispatch(startLoad());

    const getTransaction = await axios.get(`/trade/transaction/${id}`);

    dispatch({
        type: GET_SPECIFIC_TRANSACTION,
        payload: getTransaction.data
    })

    dispatch(accessDialog());

    dispatch(endLoad());
}

export const addTransaction = ({ code, shares, dateBought, dateSold, priceBought, priceSold, gainLoss, percentTrade }) => async dispatch => {

    dispatch(startLoad_Transaction());

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ code, shares, dateBought, dateSold, priceBought, priceSold, gainLoss, percentTrade });

    try {
        const transaction = await axios.post('/trade/transaction/add-transaction', body, config);

        dispatch({
            type: ADD_TRANSACTION,
            payload: transaction.data
        })

        dispatch(setAlert(
            [{
                message: 'Transaction added',
                alertType: 'success'
            }]
        ));

        setTimeout(() => {
            dispatch(removeAlert());
        }, 3000);

        dispatch(endLoad_Transaction());

        dispatch(accessDialog());

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

        setTimeout(() => {
            dispatch(removeAlert());
        }, 2000);

        dispatch(endLoad());
    }


}

export const deleteTransaction = (id) => async dispatch => {

    dispatch(startLoad_Transaction());

    try {

        await axios.delete(`/trade/transaction/delete-transaction/${id}`);

        dispatch({
            type: DELETE_TRANSACTION,
            payload: id
        })

        dispatch(accessDialog());

        dispatch(setAlert(
            [{
                message: 'Transaction deleted',
                alertType: 'success'
            }]
        ));

        setTimeout(() => {
            dispatch(removeAlert());
        }, 3000);

        dispatch(endLoad_Transaction());

    } catch (error) {
        console.log(error.message);
        dispatch(endLoad_Transaction());
    }
}

export const editTransaction = ({ id, code, shares, dateBought, dateSold, priceBought, priceSold, gainLoss, percentTrade }) => async dispatch => {

    dispatch(startLoad_Transaction());

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    dateBought = new Date(
        Date.UTC(
            dateBought.getFullYear(),
            dateBought.getMonth(),
            dateBought.getDate(),
            dateBought.getHours(),
            dateBought.getMinutes(),
            dateBought.getSeconds(),
            dateBought.getMilliseconds()
        )
    )

    dateSold = new Date(
        Date.UTC(
            dateSold.getFullYear(),
            dateSold.getMonth(),
            dateSold.getDate(),
            dateSold.getHours(),
            dateSold.getMinutes(),
            dateSold.getSeconds(),
            dateSold.getMilliseconds()
        )
    )

    const body = JSON.stringify({ code, shares, dateBought, dateSold, priceBought, priceSold, gainLoss, percentTrade });


    try {
        const transaction = await axios.put(`/trade/transaction/update-transaction/${id}`, body, config);

        const {
            code,
            shares,
            dateBought,
            dateSold,
            priceBought,
            priceSold,
            gainLoss,
            percentTrade } = transaction.data;

        dispatch({
            type: EDIT_TRANSACTION,
            payload: {
                id,
                code,
                shares,
                dateBought,
                dateSold,
                priceBought,
                priceSold,
                gainLoss,
                percentTrade
            }
        });

        dispatch(accessDialog());

        dispatch(setAlert(
            [{
                message: 'Transaction updated',
                alertType: 'success'
            }]
        ));

        setTimeout(() => {
            dispatch(removeAlert());
        }, 3000);

        dispatch(endLoad_Transaction());

    } catch (error) {
        console.log(error.message);
        dispatch(endLoad_Transaction());
    }
}

export const resetAllTransactionForUser = () => async dispatch => {
    dispatch({
        type: RESET_ALL_TRANSACTION,
    });
}

export const startLoad_Transaction = () => async dispatch => {

    try {
        dispatch({
            type: LOAD_START_TRANSACTION
        })
    } catch (error) {
        console.log(error.message);
    }

}

export const endLoad_Transaction = () => async dispatch => {
    try {
        dispatch({
            type: LOAD_END_TRANSACTION
        })
    } catch (error) {
        console.log(error.message);
    }

}

