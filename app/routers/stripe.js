const { Router } = require("express");
const stripeRouter = Router();
const {
  createPaymentIntentController,
  createSetupIntentController,
  attachCustomPaymentMethodController,
  createCustomPaymentIntentController,
} = require("../controllers/stripe");

// -------------------------------
stripeRouter
  .post("/create-payment-intent", createPaymentIntentController)
  .post("/create-setup-intent", createSetupIntentController)
  .post("/attach-custom-payment-method", attachCustomPaymentMethodController)
  .post("/create-custom-payment-intent", createCustomPaymentIntentController);

module.exports = stripeRouter;
