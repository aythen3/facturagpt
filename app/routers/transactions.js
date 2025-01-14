const { Router } = require("express");
const { saveTransactionController } = require("../controllers/transactions");
const transactionsByClientRouter = Router();

transactionsByClientRouter.post(
  "/createTransaction",
  saveTransactionController
);

module.exports = transactionsByClientRouter;
