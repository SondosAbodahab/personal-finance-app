const express = require('express');
const Transaction = require('../models/Transaction');
const router = express.Router();

// Add a transaction (Income or Expense)
router.post('/add', async (req, res) => {
  const { userId, type, amount, category, description } = req.body;

  if (!userId || !type || !amount || !category) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const transaction = new Transaction({
      userId,
      type,
      amount,
      category,
      description,
    });
    await transaction.save();
    res.status(201).json({ message: 'Transaction added successfully', transaction });
  } catch (err) {
    console.error('Error adding transaction:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all transactions for a user
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const transactions = await Transaction.find({ userId }).sort({ date: -1 });
    res.status(200).json(transactions);
  } catch (err) {
    console.error('Error fetching transactions:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a transaction
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const transaction = await Transaction.findByIdAndDelete(id);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (err) {
    console.error('Error deleting transaction:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
