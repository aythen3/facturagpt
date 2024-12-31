const {
  updateClientService,
  getPaymentMethodService,
} = require("../services/stripe");

const { catchedAsync } = require("../utils/err");
const stripe = require("stripe")(
  "sk_test_51NvRJUHKWJC5Rfvv8wADU6cg5vUJZ8uE7UGLMrM8lM2R2SbAKxpUCQb133YmBSoLA398sNXXHT6ETaeLLyIBEzqi00uGjLvJnZ"
);

// ================================ STRIPE ======================================

const createPaymentIntentController = async (req, res) => {
  try {
    const { amount, currency, clientId } = req.body;
    console.log(
      "Creating payment intent for amount:",
      amount,
      "currency:",
      currency,
      "clientId:",
      clientId
    );

    // Get the payment method ID and customer ID for the client
    const paymentMethodResponse = await getPaymentMethodService({ clientId });

    if (!paymentMethodResponse.success) {
      return res.status(404).send({
        error:
          paymentMethodResponse.message ||
          "Payment method not found for client",
      });
    }
    console.log("paymentMethodResponse", paymentMethodResponse);
    const { paymentMethodId, stripeCustomerId } = paymentMethodResponse;

    // If there's no customer ID, create a customer and attach the payment method
    let currentStripeCustomerId = stripeCustomerId;
    let clientEmail = clientId.split("_")[1];
    if (!currentStripeCustomerId) {
      console.log("Creating new Stripe customer...");
      const customer = await stripe.customers.create({
        email: clientEmail, // Use client email as identifier
        description: `Customer for ${clientEmail}`,
      });

      // Save the new customer ID to the database
      currentStripeCustomerId = customer.id;

      await updateClientService({
        clientId,
        toUpdate: { stripeCustomerId: currentStripeCustomerId },
      });

      // Attach the payment method to the new customer
      await stripe.paymentMethods.attach(paymentMethodId, {
        customer: currentStripeCustomerId,
      });
    }

    // Create the payment intent with the saved customer and payment method
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Amount in cents
      currency, // Currency code (e.g., "usd", "eur")
      customer: currentStripeCustomerId, // Associate with the Stripe customer
      payment_method: paymentMethodId, // Use the client's saved payment method
      confirm: true, // Automatically confirm the payment
      description: `Payment for client ID: ${clientId}`,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
    });

    console.log("Payment intent created successfully:", paymentIntent.id);

    return res.status(200).send({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (err) {
    console.error("Error in createPaymentIntentController:", err.message);
    return res.status(500).send({ error: "Error creating payment intent" });
  }
};

const createSetupIntentController = async (req, res) => {
  try {
    const setupIntent = await stripe.setupIntents.create({
      payment_method_types: ["card"],
    });

    return res.status(200).send({
      clientSecret: setupIntent.client_secret,
    });
  } catch (err) {
    console.error("Error in createSetupIntentController:", err.message);
    return res.status(500).send({ error: "Error creating setup intent" });
  }
};

module.exports = {
  createPaymentIntentController: catchedAsync(createPaymentIntentController),
  createSetupIntentController: catchedAsync(createSetupIntentController),
};

