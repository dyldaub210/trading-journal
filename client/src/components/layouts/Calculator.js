import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import useForm from '../helpers/useForm';
import { calculatorTransaction } from '../../actions/Calculator';
import { toCurrencyWithSign } from '../helpers/toCurrency'

import {
    Grid,
    Typography,
    Box,
    Breadcrumbs,
    Paper
} from '@material-ui/core';
import CustomTextField from './css/utils/CustomTextField';
import './css/Calculator.css';
import './css/utils/CustomTextField.css';
import './css/utils/Main.css'

const Calculator = ({ calculatorTransaction, calculator }) => {

    const [calculatorData, setCalculatorData] = useForm({
        quantity: '',
        buyPrice: '',
        sellPrice: '',
    });

    const { quantity, buyPrice, sellPrice } = calculatorData;

    const onChange = (event) => {
        setCalculatorData(event);

        const { name, value } = event.target;
        let { quantity, buyPrice, sellPrice } = calculatorData;

        if (name === 'quantity') {
            quantity = value;
        } else if (name === 'buyPrice') {
            buyPrice = value;
        } else if (name === 'sellPrice') {
            sellPrice = value;
        }

        calculatorTransaction({ quantity, buyPrice, sellPrice }, false);
    }

    const {
        buyGross,
        buyCommission,
        buyVAT,
        buySCCP,
        buyTransactionFee,
        buyTotalCharges,
        buyNet,

        sellGross,
        sellCommission,
        sellVAT,
        sellSCCP,
        sellTransactionFee,
        sellSalesTax,
        sellTotalCharges,
        sellNet,

        totalNetProfit,
        percetageGain,
    } = calculator;

    let percentageClass = ''
    if (percetageGain < 0) {
        percentageClass = 'negative-percentage';
    } else if (percetageGain > 0) {
        percentageClass = 'positive-percentage';
    }

    return (
        <Fragment>
            <Box className="route-box">
                <Box>
                    <Typography className="title">Stock Calculator</Typography>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link to="/dashboard" className="breadcrumb-link">
                            Dashboard
                    </Link>
                        <Typography className="breadcrumb-active">Stock Calculator</Typography>
                    </Breadcrumbs>
                </Box>
                <Box className="calculator-body">
                    <Grid container spacing={2} align="center">
                        <Grid item xs={12} sm={6} lg={4}>
                            <Paper elevation={3} className="paper-container">
                                <Typography className="buy">Buy</Typography>
                                <Grid item xs={12} align="center">
                                    <CustomTextField
                                        id="standard-basic"
                                        label="Number of shares"
                                        className="text-field"
                                        autoComplete="off"
                                        name="quantity"
                                        value={quantity}
                                        onChange={onChange}
                                        type="number" />
                                </Grid>
                                <Grid item xs={12} align="center">
                                    <CustomTextField
                                        id="standard-basic"
                                        label="Price"
                                        className="text-field"
                                        autoComplete="off"
                                        name="buyPrice"
                                        value={buyPrice}
                                        onChange={onChange}
                                        type="number" />
                                </Grid>
                                <br />
                                <br />
                                <Grid item xs={12}>
                                    <Typography variant="h6" className="transaction-label">Buy Gross:</Typography>
                                    <Typography variant="subtitle1">{toCurrencyWithSign(buyGross)}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h6" className="transaction-label">Buy Commission:</Typography>
                                    <Typography variant="subtitle1">{toCurrencyWithSign(buyCommission)}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h6" className="transaction-label">VAT:</Typography>
                                    <Typography variant="subtitle1">{toCurrencyWithSign(buyVAT)}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h6" className="transaction-label">SCCP:</Typography>
                                    <Typography variant="subtitle1">{toCurrencyWithSign(buySCCP)}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h6" className="transaction-label">Transaction Fee:</Typography>
                                    <Typography variant="subtitle1">{toCurrencyWithSign(buyTransactionFee)}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h6" className="transaction-label">Total Charges:</Typography>
                                    <Typography variant="subtitle1">{toCurrencyWithSign(buyTotalCharges)}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h6" className="transaction-label">Net:</Typography>
                                    <Typography variant="subtitle1">{toCurrencyWithSign(buyNet)}</Typography>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <Paper elevation={3} className="paper-container">
                                <Typography className="sell">Sell</Typography>
                                <Grid item xs={12}>
                                    <CustomTextField
                                        id="standard-basic"
                                        label="Price"
                                        className="text-field"
                                        autoComplete="off"
                                        name="sellPrice"
                                        value={sellPrice}
                                        onChange={onChange}
                                        type="number"
                                    />
                                </Grid>
                                <br />
                                <br />
                                <Grid item xs={12}>
                                    <Typography variant="h6" className="transaction-label">Sell Gross</Typography>
                                    <Typography variant="subtitle1">{toCurrencyWithSign(sellGross)}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h6" className="transaction-label">Sell Commission</Typography>
                                    <Typography variant="subtitle1">{toCurrencyWithSign(sellCommission)}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h6" className="transaction-label">VAT</Typography>
                                    <Typography variant="subtitle1">{toCurrencyWithSign(sellVAT)}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h6" className="transaction-label">SCCP</Typography>
                                    <Typography variant="subtitle1">{toCurrencyWithSign(sellSCCP)}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h6" className="transaction-label">Transaction Fee</Typography>
                                    <Typography variant="subtitle1">{toCurrencyWithSign(sellTransactionFee)}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h6" className="transaction-label">Sales Tax</Typography>
                                    <Typography variant="subtitle1">{toCurrencyWithSign(sellSalesTax)}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h6" className="transaction-label">Total Charges</Typography>
                                    <Typography variant="subtitle1">{toCurrencyWithSign(sellTotalCharges)}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h6" className="transaction-label">Net</Typography>
                                    <Typography variant="subtitle1">{toCurrencyWithSign(sellNet)}</Typography>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4} className="total-grid">
                            <Paper elevation={3} className="paper-container">
                                <Typography className="total">Total</Typography>
                                <br />
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Typography variant="h6" className="transaction-label">Net Profit</Typography>
                                        <Typography
                                            variant="subtitle1"
                                            className={percentageClass}
                                        >{toCurrencyWithSign(totalNetProfit)}</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="h6" className="transaction-label">Percent Gain/Loss</Typography>
                                        <Typography
                                            variant="subtitle1"
                                            className={percentageClass}
                                        >{percetageGain} %</Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Fragment>
    )
}

Calculator.propTypes = {
    calculatorTransaction: PropTypes.func.isRequired,
    calculator: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    calculator: state.calculator
})
export default connect(mapStateToProps, { calculatorTransaction })(Calculator);