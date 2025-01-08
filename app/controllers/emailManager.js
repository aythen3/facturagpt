const {
  createAccount,
  loginToManagerService,
  getAllClientsService,
  addNewClientService,
  deleteClientService,
  updateClientService,
  getAllUsers,
  updateAccount,
  getPaymentMethodService,
  generateAndSendOtp,
  verifyOTP,
} = require("../services/emailManager");
const { catchedAsync } = require("../utils/err");
const stripe = require("stripe")(
  "sk_test_51NvRJUHKWJC5Rfvv8wADU6cg5vUJZ8uE7UGLMrM8lM2R2SbAKxpUCQb133YmBSoLA398sNXXHT6ETaeLLyIBEzqi00uGjLvJnZ"
);

const createAccountController = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    console.log("data from createAccountController", {
      nombre,
      email,
      password,
    });

    const resp = await createAccount({ nombre, email, password });

    return res.status(200).send(resp);
  } catch (err) {
    console.log("err", err);
    return res.status(500).send("Error on createAccountController");
  }
};

const updateAccountController = async (req, res) => {
  try {
    const { userId, toUpdate } = req.body;
    console.log("User update data received:", { userId, toUpdate });

    const response = await updateAccount({ userId, toUpdate });

    return res.status(200).send(response);
  } catch (err) {
    console.log("Error in updateAccountController:", err);
    return res.status(500).send("Error updating user");
  }
};

const loginToManagerController = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Data from loginToManagerController:", { email, password });

    const response = await loginToManagerService({ email, password });

    if (response.success) {
      return res.status(200).send(response);
    } else {
      return res.status(401).send(response);
    }
  } catch (err) {
    console.log("Error in loginToManagerController:", err);
    return res.status(500).send("Error during login process");
  }
};

const getAllClientsController = async (req, res) => {
  try {
    const clients = await getAllClientsService();
    return res.status(200).send(clients);
  } catch (err) {
    console.log("Error in getAllClientsController:", err);
    return res.status(500).send("Error fetching clients");
  }
};

const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsers();
    return res.status(200).send(users);
  } catch (err) {
    console.log("Error in getAllUsersController:", err);
    return res.status(500).send("Error fetching clients");
  }
};

const addNewClientController = async (req, res) => {
  try {
    const { clientData } = req.body;
    console.log("Client data received:", clientData);

    const response = await addNewClientService({ clientData });
    return res.status(200).send(response);
  } catch (err) {
    console.log("Error in addNewClientController:", err);
    return res.status(500).send("Error adding new client");
  }
};

const deleteClientController = async (req, res) => {
  try {
    const { clientId } = req.body;
    console.log("Client ID received for deletion:", clientId);

    const response = await deleteClientService({ clientId });

    return res.status(200).send(response);
  } catch (err) {
    console.log("Error in deleteClientController:", err);
    return res.status(500).send("Error deleting client");
  }
};

const updateClientController = async (req, res) => {
  try {
    const { clientId, toUpdate } = req.body;
    console.log("Client update data received:", { clientId, toUpdate });

    const response = await updateClientService({ clientId, toUpdate });

    return res.status(200).send(response);
  } catch (err) {
    console.log("Error in updateClientController:", err);
    return res.status(500).send("Error updating client");
  }
};

const generateAndSendOtpController = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("Generating OTP for email:", email);

    const response = await generateAndSendOtp({ email });

    return res.status(200).send(response);
  } catch (err) {
    console.log("Error in generateAndSendOtpController:", err);
    return res.status(500).send("Error generating OTP");
  }
};

const verifyOTPController = async (req, res) => {
  try {
    const { email, otp } = req.body;
    console.log("Verifying OTP for email:", email);

    const response = await verifyOTP({ email, otp });

    if (response.success) {
      return res.status(200).send(response);
    }
    return res.status(401).send(response);
  } catch (err) {
    console.log("Error in verifyOTPController:", err);
    return res.status(500).send("Error verifying OTP");
  }
};

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

// ==============================================================================

module.exports = {
  createAccountController: catchedAsync(createAccountController),
  loginToManagerController: catchedAsync(loginToManagerController),
  getAllClientsController: catchedAsync(getAllClientsController),
  addNewClientController: catchedAsync(addNewClientController),
  deleteClientController: catchedAsync(deleteClientController),
  updateClientController: catchedAsync(updateClientController),
  getAllUsersController: catchedAsync(getAllUsersController),
  updateAccountController: catchedAsync(updateAccountController),
  createPaymentIntentController: catchedAsync(createPaymentIntentController),
  createSetupIntentController: catchedAsync(createSetupIntentController),
  generateAndSendOtpController: catchedAsync(generateAndSendOtpController),
  verifyOTPController: catchedAsync(verifyOTPController),
};
