const { Router } = require("express");
const stripeRouter = Router();
const {
  createPaymentIntentController,
  createSetupIntentController,
} = require("../controllers/stripe");

// -------------------------------
stripeRouter
  .post("/create-payment-intent", createPaymentIntentController)
  .post("/create-setup-intent", createSetupIntentController);

module.exports = stripeRouter;
