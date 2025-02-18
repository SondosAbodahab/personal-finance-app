const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');


router.post('/', transactionController.addTransaction);


router.get('/', transactionController.getTransactions);

router.put('/:id', transactionController.updateTransaction);

router.delete('/:id', transactionController.deleteTransaction);

module.exports = router;
