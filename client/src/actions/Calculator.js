import { CALCULATOR_CHANGE, TRANSACTION } from '../actions/_constantActions';


const {
    CALCULATE,
    RESET_CALCULATION,
    COMMISSION,
    VAT,
    SCCP,
    TRANSACTION_FEE,
    SALES_TAX
} = CALCULATOR_CHANGE;

const {
    SET_TOTALS
} = TRANSACTION;

export const calculatorTransaction = ({ quantity, buyPrice, sellPrice }, isEdit) => async dispatch => {
    let transactionDetails = {
        ...buyTransaction(quantity, buyPrice),
        ...sellTransaction(quantity, sellPrice),
        totalNetProfit: 0,
        percetageGain: 0,
    }

    if (transactionDetails.buyNet !== 0 & transactionDetails.sellNet !== 0) {
        transactionDetails.totalNetProfit =
            transactionDetails.sellNet - transactionDetails.buyNet;

        transactionDetails.percetageGain =
            (transactionDetails.totalNetProfit / transactionDetails.buyNet) * 100;
    } else {
        transactionDetails.totalNetProfit = 0;
        transactionDetails.percetageGain = 0;
    }

    dispatch({
        type: CALCULATE,
        payload: transactionDetails
    })

    if (isEdit) {
        dispatch({
            type: SET_TOTALS,
            payload: {
                gainLoss: transactionDetails.totalNetProfit.toFixed(2),
                percentTrade: transactionDetails.percetageGain.toFixed(2)
            }
        })
    }
}

export const buyTransaction = (quantity, buyPrice) => {

    let buyDetails = {
        buyGross: 0,
        buyCommission: 0,
        buyVAT: 0,
        buySCCP: 0,
        buyTransactionFee: 0,
        buyTotalCharges: 0,
        buyNet: 0,
    }

    buyDetails.buyGross = quantity * buyPrice;
    buyDetails.buyCommission = buyDetails.buyGross * COMMISSION;

    if (buyDetails.buyCommission < 20 && quantity > 0 && buyPrice > 0) {
        buyDetails.buyCommission = 20
    }

    buyDetails.buyVAT = buyDetails.buyCommission * VAT;
    buyDetails.buySCCP = buyDetails.buyGross * SCCP;
    buyDetails.buyTransactionFee = buyDetails.buyGross * TRANSACTION_FEE;
    buyDetails.buyTotalCharges =
        buyDetails.buyCommission +
        buyDetails.buyVAT +
        buyDetails.buySCCP +
        buyDetails.buyTransactionFee;
    buyDetails.buyNet = buyDetails.buyGross + buyDetails.buyTotalCharges;

    return buyDetails;
}

export const sellTransaction = (quantity, sellPrice) => {

    let sellDetails = {
        sellGross: 0,
        sellCommission: 0,
        sellVAT: 0,
        sellSCCP: 0,
        sellTransactionFee: 0,
        sellSalesTax: 0,
        sellTotalCharges: 0,
        sellNet: 0,
    }

    sellDetails.sellGross = quantity * sellPrice;
    sellDetails.sellCommission = sellDetails.sellGross * COMMISSION;

    if (sellDetails.sellCommission < 20 && quantity > 0 && sellPrice > 0) {
        sellDetails.sellCommission = 20
    }

    sellDetails.sellVAT = sellDetails.sellCommission * VAT;
    sellDetails.sellSCCP = sellDetails.sellGross * SCCP;
    sellDetails.sellTransactionFee = sellDetails.sellGross * TRANSACTION_FEE;
    sellDetails.sellSalesTax = sellDetails.sellGross * SALES_TAX;
    sellDetails.sellTotalCharges =
        sellDetails.sellCommission +
        sellDetails.sellVAT +
        sellDetails.sellSCCP +
        sellDetails.sellTransactionFee +
        sellDetails.sellSalesTax;
    sellDetails.sellNet = sellDetails.sellGross - sellDetails.sellTotalCharges;

    return sellDetails;
}

export const resetCalculation = () => async dispatch => {
    dispatch({ type: RESET_CALCULATION });
}