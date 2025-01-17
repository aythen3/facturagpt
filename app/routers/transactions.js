const { Router } = require("express");
const {
  getAllTransactionsByClientController,
  deleteTransactionsController,
  deleteProductFromTransactionsController,
  getTransactionByIdController,
} = require("../controllers/transactions");
const { get } = require("jquery");
const transactionsByClientRouter = Router();

transactionsByClientRouter
  .post("/alltransactionsByClient", getAllTransactionsByClientController)
  .post("/deleteTransacions", deleteTransactionsController)
  .post("/deleteProductFromTransacion", deleteProductFromTransactionsController)
  .get("/getOneTransaction/:transactionId", getTransactionByIdController);

module.exports = transactionsByClientRouter;
