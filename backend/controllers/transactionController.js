const Transaction = require('../models/Transaction');


exports.addTransaction = async (req, res) => {
  try {
    const transaction = new Transaction({ ...req.body, userId: req.userId });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getTransactions = async (req, res) => {
  const userId = req.userId ;
  try {
    const transactions = await Transaction.find({ userId });
    if (!transactions || transactions.length === 0) {
      return res.status(200).json({ message: 'No transactions found' });
    }
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateTransaction = async (req, res) => {
  const userId = req.userId ;
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      { userId },
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
