import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toCurrencyWithCommas } from '../../../helpers/toCurrency';
import { deleteTransaction } from '../../../../actions/Transaction';
import {
    Box,
    Button,
    DialogActions,
    DialogTitle,
    DialogContent,
    Divider,
    Typography,
    Grid,
    LinearProgress
} from '@material-ui/core';
import '../../css/helper-layouts/DeleteTransaction.css'

const DeleteTransaction = ({ transaction: { _id, code, shares, priceBought, priceSold, dateBought, dateSold, gainLoss, percentTrade }, deleteTransaction, loading }) => {

    const deleteTransactionItem = (event) => {
        event.preventDefault();

        deleteTransaction(_id);
    }

    return (
        <Box>
            {
                loading ? <LinearProgress className="bar" /> : ''
            }
            <DialogTitle id="form-dialog-title">Delete Transaction</DialogTitle>
            <Divider />
            <DialogContent>
                <Typography variant="h6">Do you want to delete this transaction?</Typography>
                <br />
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" className="delete-detail">Stock Code</Typography>
                        <Typography>{code}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" className="delete-detail">Number of shares</Typography>
                        <Typography>{shares}</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" className="delete-detail">Date Bought</Typography>
                        <Typography>{dateBought}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" className="delete-detail">Date Sold</Typography>
                        <Typography>{dateSold}</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" className="delete-detail">Price Bought</Typography>
                        <Typography>{priceBought}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" className="delete-detail">Price Sold</Typography>
                        <Typography>{priceSold}</Typography>
                    </Grid>
                </Grid>
                <br />
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" className="delete-detail">Total Gain/Loss:</Typography>
                        {
                            gainLoss > 0 ?
                                <Typography className="positive-transaction">{toCurrencyWithCommas(gainLoss)}</Typography> :
                                gainLoss < 0 ?
                                    <Typography className="negative-transaction">{toCurrencyWithCommas(gainLoss)}</Typography> :
                                    <Typography variant="body2">{toCurrencyWithCommas(gainLoss)}</Typography>
                        }
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" className="delete-detail">% Gain/Loss:</Typography>
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
                <Button variant="contained" color="secondary" onClick={deleteTransactionItem}>
                    Delete
                </Button>
            </DialogActions>
        </Box>
    )
}

DeleteTransaction.propTypes = {
    transaction: PropTypes.object.isRequired,
    deleteTransaction: PropTypes.func.isRequired,
    loading: PropTypes.bool
}

const mapStatetoProps = state => ({
    transaction: state.transaction.transaction,
    loading: state.transaction.loading
})

export default connect(mapStatetoProps, { deleteTransaction })(DeleteTransaction);