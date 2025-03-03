const { Router } = require("express");

const { authenticateToken } = require('../middlewares/auth/auth')


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
  .get("/active", authenticateToken, automateTransactionsController)
  .post("/alltransactionsByClient", authenticateToken, getAllTransactionsByClientController)
  .post("/deleteTransacions", authenticateToken, deleteTransactionsController)
  .post("/deleteProductFromTransacion", authenticateToken, deleteProductFromTransactionsController)
  .get("/getOneTransaction/:transactionId", authenticateToken, getTransactionByIdController);

module.exports = transactionsByClientRouter;
