const { Router } = require("express");
const {
  saveTransactionController,
  getAllTransactionsByClientController,
} = require("../controllers/transactions");
const transactionsByClientRouter = Router();

transactionsByClientRouter
  .post("/createTransaction", saveTransactionController)
  .post("/alltransactionsByClient", getAllTransactionsByClientController);

module.exports = transactionsByClientRouter;
