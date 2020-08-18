const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const config = require('config');
const Cryptr = require('cryptr');
const cryptr = new Cryptr(config.get('cryptKey'));
const authentication = require('../../middleware/authentication');

const Transaction = require('../../models/Transactions');
const DateFormatter = require('../../helpers/DateFormatter');
const { response } = require('express');

router.get('/:transaction_id', authentication, async (request, response) => {
    try {
        const transaction = await Transaction.findById(request.params.transaction_id);

        if (!transaction) {
            return response.status(401).json({
                msg: 'Invalid transaction'
            })
        }
        /*
                transaction.code = await cryptr.decrypt(transaction.code);
                transaction.shares = await cryptr.decrypt(transaction.shares);
                transaction.dateBought = await cryptr.decrypt(transaction.dateBought);
                transaction.dateeSold = await cryptr.decrypt(transaction.dateSold);
                transaction.priceBought = await cryptr.decrypt(transaction.priceBought);
                transaction.priceSold = await cryptr.decrypt(transaction.priceSold);
                transaction.gainLoss = await cryptr.decrypt(transaction.gainLoss);
                transaction.percentTrade = await cryptr.decrypt(transaction.percentTrade);
        */
        return response.json(transaction);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return response.status(401).json({
                msg: 'Invalid transaction'
            })
        } else {
            console.log(error.message);
            return response.status(500).send('Server error');
        }
    }
});

router.get('/user/all', authentication, async (request, response) => {

    try {
        const transaction = await Transaction.find({ user: request.user.id });

        let alltransactions = [];

        await transaction.map(transactionItem => {
            /*transactionItem.code = cryptr.decrypt(transactionItem.code);
            transactionItem.shares = cryptr.decrypt(transactionItem.shares);
            transactionItem.dateBought = cryptr.decrypt(transactionItem.dateBought);
            transactionItem.dateSold = cryptr.decrypt(transactionItem.dateSold);
            transactionItem.priceBought = cryptr.decrypt(transactionItem.priceBought);
            transactionItem.priceSold = cryptr.decrypt(transactionItem.priceSold);
            transactionItem.gainLoss = cryptr.decrypt(transactionItem.gainLoss);
            transactionItem.percentTrade = cryptr.decrypt(transactionItem.percentTrade);*/

            alltransactions.push(transactionItem);
        });

        response.json(alltransactions);

    } catch (error) {
        console.log(error.log);
        return response.status(500).send('Server error');
        ;
    }
});

router.post(
    '/add-transaction',
    authentication,
    async (request, response) => {
        const {
            code,
            shares,
            dateBought,
            dateSold,
            priceBought,
            priceSold,
            gainLoss,
            percentTrade
        } = request.body;

        try {
            const transaction = new Transaction({
                user: request.user.id,
                code,
                shares,
                dateBought: DateFormatter(dateBought),
                dateSold: DateFormatter(dateSold),
                priceBought,
                priceSold,
                gainLoss,
                percentTrade
            });

            /* transaction.code = await cryptr.encrypt(code);
             transaction.shares = await cryptr.encrypt(shares);
             transaction.dateBought = await cryptr.encrypt(dateBought);
             transaction.dateSold = await cryptr.encrypt(dateSold);
             transaction.priceBought = await cryptr.encrypt(priceBought);
             transaction.priceSold = await cryptr.encrypt(priceSold);
             transaction.gainLoss = await cryptr.encrypt(gainLoss);
             transaction.percentTrade = await cryptr.encrypt(percentTrade);*/

            await transaction.save();

            /*transaction.code = await cryptr.decrypt(transaction.code);
             transaction.shares = await cryptr.decrypt(transaction.shares);
             transaction.dateBought = await cryptr.decrypt(dateBought);
             transaction.dateSold = await cryptr.decrypt(dateSold);
             transaction.priceBought = await cryptr.decrypt(transaction.priceBought);
             transaction.priceSold = await cryptr.decrypt(transaction.priceSold);
             transaction.gainLoss = await cryptr.decrypt(transaction.gainLoss);
             transaction.percentTrade = await cryptr.decrypt(transaction.percentTrade);*/
            
            return response.json(transaction);
        } catch (error) {
            console.log(error.message);
            response.status(500).send('Server error');
        }
    }
);

router.put(
    '/update-transaction/:transaction_id', authentication,
    async (request, response) => {

        const {
            code,
            shares,
            dateBought,
            dateSold,
            priceBought,
            priceSold,
            gainLoss,
            percentTrade
        } = request.body;

        let transactionDetails = {};

        /* if (code) transactionDetails.code = await cryptr.encrypt(code);
         if (shares) transactionDetails.shares = await cryptr.encrypt(shares);
         if (dateBought) transactionDetails.priceBought = await cryptr.encrypt(dateBought);
         if (dateSold) transactionDetails.priceSold = await cryptr.encrypt(dateSold);
         if (priceBought) transactionDetails.priceBought = await cryptr.encrypt(priceBought);
         if (priceSold) transactionDetails.priceSold = await cryptr.encrypt(priceSold);
         if (gainLoss) transactionDetails.gainLoss = await cryptr.encrypt(gainLoss);
         if (percentTrade) transactionDetails.percentTrade = await cryptr.encrypt(percentTrade);*/

        if (code) transactionDetails.code = code;
        if (shares) transactionDetails.shares = shares;
        if (dateBought) transactionDetails.dateBought = DateFormatter(dateBought);
        if (dateSold) transactionDetails.dateSold = DateFormatter(dateSold);
        if (priceBought) transactionDetails.priceBought = priceBought;
        if (priceSold) transactionDetails.priceSold = priceSold;
        if (gainLoss) transactionDetails.gainLoss = gainLoss;
        if (percentTrade) transactionDetails.percentTrade = percentTrade;

        try {
            let transaction = await Transaction.findById(request.params.transaction_id);

            if (!transaction) {
                return response.status(401).json({
                    msg: 'Invalid transaction'
                })
            }

            transaction = await Transaction.findOneAndUpdate(
                { _id: request.params.transaction_id },
                { $set: transactionDetails },
                { new: true }
            )

            return response.json(transaction);
        } catch (error) {
            console.log(error.message);
            if (error.kind === 'ObjectId') {
                return response.send(401).json({
                    msg: 'Invalid transaction'
                })
            } else {
                return response.status(500).send('Server error');
            }
        }
    }
);

router.delete('/delete-transaction/:transaction_id', authentication, async (request, response) => {
    try {
        const transaction = await Transaction.findByIdAndRemove(request.params.transaction_id);

        response.send('Transaction deleted');
    } catch (error) {
        console.log(error.message);
        if (error.kind === 'ObjectId') {
            return response.status(401).json({
                msg: 'Invalid tranasaction'
            })
        } else {
            return response.status(500).send('Server error');
        }
    }
})

module.exports = router;