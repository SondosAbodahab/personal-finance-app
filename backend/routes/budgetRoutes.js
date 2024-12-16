const express = require('express');
const { createBudget, getBudget, updateBudget , deleteBudget} = require('../controllers/budgetController');

const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// router.post('/', verifyToken, createBudget);
// router.get('/', verifyToken, getBudget);
// router.put('/', verifyToken, updateBudget);

router.post('/', createBudget);
router.get('/', getBudget);
router.put('/:id', updateBudget);
router.delete('/:id', deleteBudget);



module.exports = router;
