const mongoose = require('mongoose');

const TransactionSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    code: {
        type: String,
        required: true
    },
    shares: {
        type: String,
        required: true
    },
    dateBought: {
        type: String,
        required: true
    },
    dateSold: {
        type: String,
        required: true
    },
    priceBought: {
        type: String,
        required: true
    },
    priceSold: {
        type: String,
        required: true
    },
    gainLoss: {
        type: String,
        required: true
    },
    percentTrade: {
        type: String,
        required: true
    },
})

module.exports = Transaction = mongoose.model('transaction', TransactionSchema);