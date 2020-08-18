import React, { useState } from 'react';
import useForm from '../../../helpers/useForm';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editTransaction } from '../../../../actions/Transaction';
import { calculatorTransaction } from '../../../../actions/Calculator';
import { toCurrencyWithCommas } from '../../../helpers/toCurrency';
import { dateValidity } from '../../../helpers/fieldValidation';

import {
    Box,
    Button,
    DialogActions,
    DialogTitle,
    DialogContent,
    Grid,
    Typography,
    Divider,
    LinearProgress
} from '@material-ui/core';
import 'date-fns';
import {
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import CustomTextField from '../../css/utils/CustomTextField';
import CustomDateField from '../../css/utils/CustomDateField';
import '../../css/helper-layouts/EditTransaction.css'


const EditTransaction = (
    { editTransaction,
        calculatorTransaction,
        calculator: {
            percetageGain,
            totalNetProfit
        },
        transaction: {
            loading,
            transaction,
            gainLoss,
            percentTrade
        }
    }) => {

    const [transactionData, setTransactionData] = useForm({
        code: transaction.code,
        shares: transaction.shares,
        priceBought: transaction.priceBought,
        priceSold: transaction.priceSold,
    });

    const [dateData, setDate] = useState({
        dateBought: new Date(transaction.dateBought),
        dateSold: new Date(transaction.dateSold)
    })

    const [errors, setErrors] = useState({
        codeIsRequired: false,
        sharesError: false,
        dateBoughtIsRequired: false,
        dateSoldIsRequired: false,
        dateError: false,
        priceBoughtError: false,
        priceSoldError: false
    });

    const { code, shares, priceBought, priceSold } = transactionData;
    const { dateBought, dateSold } = dateData;
    const { codeIsRequired, sharesError, dateBoughtIsRequired, dateSoldIsRequired, dateError, priceBoughtError, priceSoldError } = errors;

    const onChange = async (event) => {
        setTransactionData(event);

        const { name, value } = event.target;
        let { shares, priceBought, priceSold } = transactionData;

        let quantity, buyPrice, sellPrice;

        if (name === 'shares') {
            shares = value;
        } else if (name === 'priceBought') {
            priceBought = value;
        } else if (name === 'priceSold') {
            priceSold = value;
        }

        quantity = shares;
        buyPrice = priceBought;
        sellPrice = priceSold;

        calculatorTransaction({ quantity, buyPrice, sellPrice }, true);
    }

    const handleDateBought = (date) => {
        setDate({
            ...dateData,
            dateBought: date,
        });
    };

    const handleDateSold = (date) => {
        setDate({
            ...dateData,
            dateSold: date,
        });
    };

    const submitTransaction = (event) => {
        event.preventDefault();

        setErrors({
            codeIsRequired: code === '' ? true : false,
            sharesError: shares <= 0 ? true : false,
            dateBoughtIsRequired: dateBought === null ? true : false,
            dateSoldIsRequired: dateSold === null ? true : false,
            dateError: dateValidity(dateBought, dateSold) === false ? true : false,
            priceBoughtError: priceBought <= 0 ? true : false,
            priceSoldError: priceSold <= 0 ? true : false
        });

        if (code === '' || dateBought === null || dateSold === null) {
            return;
        }

        if (shares <= 0 || priceBought <= 0 || priceSold <= 0) {
            return;
        }

        if (dateValidity(dateBought, dateSold) === false) {
            return;
        }

        const id = transaction._id;

        editTransaction({ id, code, shares, dateBought, dateSold, priceBought, priceSold, gainLoss, percentTrade });
    }
    return (
        <Box>
            {
                loading ? <LinearProgress className="bar" /> : ''
            }

            <DialogTitle id="form-dialog-title" > Edit Transaction</DialogTitle>
            <Divider />
            <form onSubmit={submitTransaction}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <CustomTextField
                                    label="Stock Code"
                                    className="text-field-modal"
                                    autoComplete="off"
                                    name="code"
                                    value={code}
                                    onChange={onChange}
                                    error={codeIsRequired}
                                    helperText={codeIsRequired ? 'Stock code is required' : ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <CustomTextField
                                    label="Number of shares"
                                    className="text-field-modal"
                                    autoComplete="off"
                                    name="shares"
                                    value={shares}
                                    type="number"
                                    onChange={onChange}
                                    error={sharesError}
                                    helperText={sharesError ? 'Number of shares should be greater than 0' : ''}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <CustomDateField
                                    label="Date Bought"
                                    className="date-field"
                                    autoComplete="off"
                                    name="dateBought"
                                    value={dateBought}
                                    onChange={handleDateBought}
                                    format="MM/dd/yyyy"
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    error={dateBoughtIsRequired || dateError}
                                    helperText={dateBoughtIsRequired ? 'Date Bought is required' :
                                        dateError ? 'Date Bought should be before than Date Sold' : false}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <CustomDateField
                                    label="Date Sold"
                                    className="date-field"
                                    autoComplete="off"
                                    name="dateSold"
                                    value={dateSold}
                                    onChange={handleDateSold}
                                    format="MM/dd/yyyy"
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    error={dateSoldIsRequired || dateError}
                                    helperText={dateSoldIsRequired ? 'Date Sold is required' :
                                        dateError ? 'Date Sold should be after than Date Bought' : false}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <CustomTextField
                                    label="Price Bought"
                                    className="text-field-modal"
                                    autoComplete="off"
                                    name="priceBought"
                                    value={priceBought}
                                    type="number"
                                    onChange={onChange}
                                    error={priceBoughtError}
                                    helperText={priceBoughtError ? 'Price Bought should be greater than 0' : ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <CustomTextField
                                    label="Price Sold"
                                    className="text-field-modal"
                                    autoComplete="off"
                                    name="priceSold"
                                    value={priceSold}
                                    type="number"
                                    onChange={onChange}
                                    error={priceSoldError}
                                    helperText={priceSoldError ? 'Price Sold should be greater than 0' : ''}
                                />
                            </Grid>
                        </Grid>
                        <br />
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" className="edit-detail">Total Gain/Loss:</Typography>
                                {
                                    gainLoss > 0 ?
                                        <Typography className="positive-transaction">{toCurrencyWithCommas(gainLoss)}</Typography> :
                                        gainLoss < 0 ?
                                            <Typography className="negative-transaction">{toCurrencyWithCommas(gainLoss)}</Typography> :
                                            <Typography>{toCurrencyWithCommas(gainLoss)}</Typography>
                                }
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" className="edit-detail">% Gain/Loss:</Typography>
                                {
                                    percentTrade > 0 ?
                                        <Typography className="positive-transaction">{toCurrencyWithCommas(percentTrade)} %</Typography> :
                                        percentTrade < 0 ?
                                            <Typography className="negative-transaction">{toCurrencyWithCommas(percentTrade)} %</Typography> :
                                            <Typography>{toCurrencyWithCommas(percentTrade)} %</Typography>
                                }
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <Divider />
                    <DialogActions>
                        <Button type="submit" variant="contained" className="edit-transaction-button">
                            Edit
                    </Button>
                    </DialogActions>
                </MuiPickersUtilsProvider>
            </form>
        </Box>
    )
}

EditTransaction.propTypes = {
    editTransaction: PropTypes.func.isRequired,
    calculatorTransaction: PropTypes.func.isRequired,
    calculator: PropTypes.object.isRequired,
    transaction: PropTypes.object.isRequired
}

const mapStatetoProps = state => ({
    calculator: state.calculator,
    transaction: state.transaction
});

export default connect(mapStatetoProps, { editTransaction, calculatorTransaction })(EditTransaction);