const { Router } = require("express");
const {
  getAllTransactionsByClientController,
} = require("../controllers/transactions");
const transactionsByClientRouter = Router();

transactionsByClientRouter.post(
  "/alltransactionsByClient",
  getAllTransactionsByClientController
);

module.exports = transactionsByClientRouter;
