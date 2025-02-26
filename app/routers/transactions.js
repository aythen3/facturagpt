const { Router } = require("express");
const {
  getAllTransactionsByClientController,
  deleteTransactionsController,
  deleteProductFromTransactionsController,
  getTransactionByIdController,

  automateTransactionsController,
} = require("../controllers/transactions");


// const { get } = require("jquery");
const transactionsByClientRouter = Router();

transactionsByClientRouter
  .get("/", automateTransactionsController)
  
  .post("/alltransactionsByClient", getAllTransactionsByClientController)
  .post("/deleteTransacions", deleteTransactionsController)
  .post("/deleteProductFromTransacion", deleteProductFromTransactionsController)
  .get("/getOneTransaction/:transactionId", getTransactionByIdController);

module.exports = transactionsByClientRouter;
