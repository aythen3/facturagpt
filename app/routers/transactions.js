const { Router } = require("express");
const {
  getAllTransactionsByClientController,
  deleteTransactionsController,
} = require("../controllers/transactions");
const transactionsByClientRouter = Router();

transactionsByClientRouter
  .post("/alltransactionsByClient", getAllTransactionsByClientController)
  .post("/deleteTransacions", deleteTransactionsController);

module.exports = transactionsByClientRouter;
