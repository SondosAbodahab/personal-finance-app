const Budget = require("../models/budget");

exports.createBudget = async (req, res) => {
  const { amount, startDate, endDate } = req.body;
  //   const userId = req.userId | '5c8a1dfa2f8fb814b56fa18';

  try {
    const budget = new Budget({ amount, startDate, endDate });
    await budget.save();
    res.status(201).json({ message: "Budget created successfully", budget });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create budget" });
  }
};

exports.getBudget = async (req, res) => {
  // const userId = req.userId ;

  try {
    // const budget = await Budget.findOne({ userId });
    const budget = await Budget.find();
    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }
    res.json(budget);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch budget" });
  }
};

exports.updateBudget = async (req, res) => {
  const userId = req.userId;
  const { amount, startDate, endDate } = req.body;

  try {
    const budget = await Budget.findOneAndUpdate(
      { userId },
      { amount, startDate, endDate },
      { new: true }
    );
    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }
    res.json({ message: "Budget updated successfully", budget });
  } catch (error) {
    res.status(500).json({ error: "Failed to update budget" });
  }
};

exports.deleteBudget = async (req, res) => {
  try {
    const budget = await Budget.findByIdAndDelete(req.params.id);
    if (!budget) {
      return res.status(404).json({ error: "budget not found" });
    }
    res.status(200).json({ message: "budget deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
