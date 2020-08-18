import { CALCULATOR_CHANGE } from '../actions/_constantActions';

const initialValues = {
    buyGross: 0.00,
    buyCommission: 0.00,
    buyVAT: 0.00,
    buySCCP: 0.00,
    buyTransactionFee: 0.00,
    buyTotalCharges: 0.00,
    buyNet: 0.00,

    sellGross: 0.00,
    sellCommission: 0.00,
    sellVAT: 0.00,
    sellSCCP: 0.00,
    sellTransactionFee: 0.00,
    sellSalesTax: 0.00,
    sellTotalCharges: 0.00,
    sellNet: 0.00,

    totalNetProfit: 0.00,
    percetageGain: 0.00,
}

export default (state = initialValues, action) => {

    const { type, payload } = action;

    const {
        CALCULATE,
        RESET_CALCULATION
    } = CALCULATOR_CHANGE;

    switch (type) {

        case CALCULATE:
            return {
                buyGross: payload.buyGross.toFixed(2),
                buyCommission: payload.buyCommission.toFixed(2),
                buyVAT: payload.buyVAT.toFixed(2),
                buySCCP: payload.buySCCP.toFixed(2),
                buyTransactionFee: payload.buyTransactionFee.toFixed(2),
                buyTotalCharges: payload.buyTotalCharges.toFixed(2),
                buyNet: payload.buyNet.toFixed(2),

                sellGross: payload.sellGross.toFixed(2),
                sellCommission: payload.sellCommission.toFixed(2),
                sellVAT: payload.sellVAT.toFixed(2),
                sellSCCP: payload.sellSCCP.toFixed(2),
                sellTransactionFee: payload.sellTransactionFee.toFixed(2),
                sellSalesTax: payload.sellSalesTax.toFixed(2),
                sellTotalCharges: payload.sellTotalCharges.toFixed(2),
                sellNet: payload.sellNet.toFixed(2),

                totalNetProfit: payload.totalNetProfit.toFixed(2),
                percetageGain: payload.percetageGain.toFixed(2)
            };

        case RESET_CALCULATION:
            return {
                buyGross: 0.00,
                buyCommission: 0.00,
                buyVAT: 0.00,
                buySCCP: 0.00,
                buyTransactionFee: 0.00,
                buyTotalCharges: 0.00,
                buyNet: 0.00,

                sellGross: 0.00,
                sellCommission: 0.00,
                sellVAT: 0.00,
                sellSCCP: 0.00,
                sellTransactionFee: 0.00,
                sellSalesTax: 0.00,
                sellTotalCharges: 0.00,
                sellNet: 0.00,

                totalNetProfit: 0.00,
                percetageGain: 0.00,
            };

        default:
            return state;
    }
}