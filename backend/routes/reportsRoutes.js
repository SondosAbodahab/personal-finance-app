const express = require("express");

const reportsController = require("../controllers/reportsController");

const router = express.Router();

router.get("/total-spending", reportsController.getTotalSpending);
router.get("/most-expensive", reportsController.getMostExpensiveTransactions);
router.get("/average-expenses", reportsController.getAverageMonthlyExpenses);
router.get("/by-date-range", reportsController.getTransactionsByDateRange);
router.get(
  "/spending-percentage",
  reportsController.getSpendingPercentageByCategory
);

module.exports = router;
