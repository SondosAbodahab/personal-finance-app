const Transaction = require('../models/Transaction');

exports.getTotalSpending = async (req, res) => {
  try {
    const userId = req.userId; 
    const spending = await Transaction.aggregate([
      { $match: { userId } },
      { $group: { _id: '$category', total: { $sum: '$amount' } } },
    ]);
    res.status(200).json(spending);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getMostExpensiveTransactions = async (req, res) => {
  try {
    const userId = req.userId;
    const transactions = await Transaction.find({ userId })
      .sort({ amount: -1 })
      .limit(5);
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAverageMonthlyExpenses = async (req, res) => {
  try {
    const userId = req.userId;
    const expenses = await Transaction.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: { $month: '$date' },
          total: { $sum: '$amount' },
        },
      },
      {
        $group: {
          _id: null,
          average: { $avg: '$total' },
        },
      },
    ]);
    res.status(200).json(expenses.length > 0 ? expenses[0].average : 0);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getTransactionsByDateRange = async (req, res) => {
  const { startDate, endDate } = req.query;
  try {
    const userId = req.userId;
    const transactions = await Transaction.find({
      userId,
      date: { $gte: new Date(startDate), $lte: new Date(endDate) },
    });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSpendingPercentageByCategory = async (req, res) => {
  try {
    const userId = req.userId;
    const totalSpending = await Transaction.aggregate([
      { $match: { userId } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);
    const spendingByCategory = await Transaction.aggregate([
      { $match: { userId } },
      { $group: { _id: '$category', total: { $sum: '$amount' } } },
    ]);

    const percentages = spendingByCategory.map((category) => ({
      category: category._id,
      percentage: ((category.total / totalSpending[0].total) * 100).toFixed(2),
    }));

    res.status(200).json(percentages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
