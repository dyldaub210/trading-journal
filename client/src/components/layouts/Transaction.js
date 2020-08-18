import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { accessDialog, getSpecificTransactionForUser } from '../../actions/Transaction';
import { toCurrencyWithCommas } from '../helpers/toCurrency';

import AddTransaction from './helper-layouts/Transactions/AddTransaction';
import EditTransaction from './helper-layouts/Transactions/EditTransaction';
import DeleteTransaction from './helper-layouts/Transactions/DeleteTransaction';
import AlertMessage from './AlertMessage';

import {
    Typography,
    Box,
    Breadcrumbs,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Grid,
    InputAdornment,
    Tooltip,
    Paper,
    Fab,
    Dialog,
    CircularProgress
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import CustomTextField from './css/utils/CustomTextField';
import './css/Transactions.css';
import './css/utils/CustomTextField.css';
import './css/utils/Main.css'

const Transaction = ({
    accessDialog,
    getSpecificTransactionForUser,
    transaction:
    { isOpenDialog,
        allTransaction,
        loading,
    },
}) => {

    const [dialog, setDialog] = useState({
        addTransaction: false,
        editTransaction: false,
        deletTransaction: false,
    });

    const { addTransaction, editTransaction, deletTransaction } = dialog;

    const addTransactionOpen = () => {
        accessDialog();
        setDialog({
            addTransaction: true
        });
    }

    const editTransactionOpen = (id) => {
        setDialog({
            editTransaction: true
        });

        getSpecificTransactionForUser(id);
    }

    const deleteTransactionOpen = (id) => {
        setDialog({
            deleteTransaction: true
        });

        getSpecificTransactionForUser(id);
    }

    const closeDialog = () => {
        accessDialog();
        setDialog({
            addTransaction: false,
            editTransaction: false,
            deletTransaction: false
        });
    }

    return (
        <Fragment>
            <Box className="route-box">
                <Box style={{
                    position: "absolute",
                    right: "20px"
                }}>
                    <AlertMessage elevation={1} />
                </Box>
                <Box>
                    <Typography className="title">Transactions</Typography>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link to="/dashboard" className="breadcrumb-link">
                            Dashboard
                        </Link>
                        <Typography className="breadcrumb-active">Transactions</Typography>
                    </Breadcrumbs>
                </Box>
                <Box className="journal-navigation">
                    <Grid container>
                        <Grid item align="left" xs={6}>
                            <CustomTextField
                                className=""
                                id="input-with-icon-textfield"
                                label="Stock Code"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item align="right" xs={6}>
                        </Grid>
                    </Grid>
                </Box>
                <Box className="journal-body">
                    <Dialog open={isOpenDialog} onClose={closeDialog} aria-labelledby="form-dialog-title">
                        {
                            dialog.addTransaction ?
                                <AddTransaction /> :
                                dialog.editTransaction ?
                                    <EditTransaction /> :
                                    dialog.deleteTransaction ?
                                        <DeleteTransaction /> : ''
                        }
                    </Dialog>
                    <Paper elevation={1} className="table-container">
                        <TableContainer >
                            <Table aria-label="collapsible table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell className="table-head" align="center">STOCK CODE</TableCell>
                                        <TableCell className="table-head" align="center">SHARES</TableCell>
                                        <TableCell className="table-head" align="center">DATE BOUGHT (M/D/Y)</TableCell>
                                        <TableCell className="table-head" align="center">DATE SOLD (M/D/Y)</TableCell>
                                        <TableCell className="table-head" align="center">PRICE BOUGHT</TableCell>
                                        <TableCell className="table-head" align="center">PRICE SOLD</TableCell>
                                        <TableCell className="table-head" align="center">GAIN/LOSS (PHP)</TableCell>
                                        <TableCell className="table-head" align="center">PERCENT GAIN</TableCell>
                                        <TableCell className="table-head" align="center">TRANSACTION DETAILS</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        allTransaction.length > 0
                                            ? allTransaction.map(transaction =>
                                                (
                                                    <Rows
                                                        key={transaction._id}
                                                        record={transaction}
                                                        toDelete={() => { deleteTransactionOpen(transaction._id) }}
                                                        toEdit={() => { editTransactionOpen(transaction._id) }} />
                                                ))
                                            : <TableRow></TableRow>
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                    {
                        loading && addTransaction === false && editTransaction === false && deletTransaction === false ?
                            (
                                <Box align="center">
                                    <CircularProgress className="transaction-table-loader" />
                                </Box>
                            ) : loading === false && allTransaction.length === 0 ?
                                <Box align="center">
                                    <Typography className="transaction-table-placeholder">No transactions found</Typography>
                                </Box>
                                : ''
                    }
                </Box>
            </Box>
            <Tooltip
                title="Add Transaction"
                aria-label="Add Transaction"
                className="add-transaction-button"
                onClick={addTransactionOpen}
                size="medium"
            >
                <Fab color="primary">
                    <AddIcon />
                </Fab>
            </Tooltip>
        </Fragment>
    )
}

const Rows = ({ record, toDelete, toEdit }) => {

    return (
        <TableRow>
            <TableCell align="center">{record.code}</TableCell>
            <TableCell align="center">{record.shares}</TableCell>
            <TableCell align="center">{record.dateBought}</TableCell>
            <TableCell align="center">{record.dateSold}</TableCell>
            <TableCell align="center">{record.priceBought}</TableCell>
            <TableCell align="center">{record.priceSold}</TableCell>
            {
                record.gainLoss > 0 ?
                    (
                        <TableCell align="center" className="positive-transaction">{toCurrencyWithCommas(record.gainLoss)}</TableCell>
                    ) :
                    (
                        <TableCell align="center" className="negative-transaction">{toCurrencyWithCommas(record.gainLoss)}</TableCell>
                    )
            }
            {
                record.gainLoss > 0 ?
                    (
                        <TableCell align="center" className="positive-transaction">{toCurrencyWithCommas(record.percentTrade)} %</TableCell>
                    ) :
                    (
                        <TableCell align="center" className="negative-transaction">{toCurrencyWithCommas(record.percentTrade)} %</TableCell>
                    )
            }
            <TableCell align="center">
                <Box>
                    <Tooltip title="Delete Transaction" className="delete-icon" onClick={toDelete}>
                        <IconButton aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Transaction" className="edit-icon" onClick={toEdit}>
                        <IconButton aria-label="edit">
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="See Buy/Sell details" className="info-icon">
                        <IconButton aria-label="info">
                            <InfoIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </TableCell>
        </TableRow>
    )
}

Transaction.propTypes = {
    accessDialog: PropTypes.func.isRequired,
    getSpecificTransactionForUser: PropTypes.func.isRequired,
    transaction: PropTypes.object.isRequired,
}

const mapStatetoProps = state => ({
    transaction: state.transaction,
})

export default connect(mapStatetoProps, { accessDialog, getSpecificTransactionForUser })(Transaction);