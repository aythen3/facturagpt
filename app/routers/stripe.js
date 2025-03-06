const { Router } = require("express");
const stripeRouter = Router();

const { authenticateToken } = require('../middlewares/auth/auth')

const {
  createPaymentRecurrentController,
  createPaymentIntentController,
  createSetupIntentController,
  attachCustomPaymentMethodController,
  createCustomPaymentIntentController,
} = require("../controllers/stripe");

// -------------------------------
stripeRouter
  .post("/create-payment-recurrent", authenticateToken, createPaymentRecurrentController)
  .post("/create-payment-intent", authenticateToken, createPaymentIntentController)
  .post("/create-setup-intent", authenticateToken, createSetupIntentController)
  .post("/attach-custom-payment-method", authenticateToken, attachCustomPaymentMethodController)
  .post("/create-custom-payment-intent", authenticateToken, createCustomPaymentIntentController);

module.exports = stripeRouter;
