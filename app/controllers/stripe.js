const {
  updateClientService,
  getPaymentMethodService,
} = require("../services/stripe");
const { connectDB } = require("./utils");
const { catchedAsync } = require("../utils/err");
const { updateAccount } = require("../services/emailManager");
const stripe = require("stripe")(
  "sk_test_51QUTjnJrDWENnRIx5AgnTo1sIyDvsMppmfOH7FsHC2SScYM3ibITPi5YtR1CMVv0JJ22Iyoov7OYaEpLxSROfS7A00yLdFumqy"
);

// ================================ STRIPE ======================================

const createPaymentRecurrentController = async (req, res) => {
  try {
    const user = req.user
    const id = user._id.split('_').pop()

    const dbAccounts = await connectDB(`db_accounts`)
    const dbNotifications = await connectDB(`db_${id}_notifications`)

    const currentDate = new Date();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const currentMonth = `${month}-${currentDate.getFullYear()}`
    
    const notifications = dbNotifications.find({
      selector: {
        month: currentMonth
      }
    })

    console.log('resp', notifications)

    const {} = req.body;


    const account = await dbAccounts.get(id)

    console.log('account', account)
    if(!account.clientIdStripe) {
      return res.status(301).send({
        success: false,
        message: "ClientId not create yet"
      })
    }

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

      // await updateClientService({
      //   clientId,
      //   toUpdate: { stripeCustomerId: currentStripeCustomerId },
      // });

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

const attachCustomPaymentMethodController = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res
        .status(400)
        .send({ success: false, message: "Missing userId in request." });
    }

    // Step 1: Fetch user from CouchDB
    const db = await connectDB("db_emailmanager_accounts");
    let dbUser = await db.get(userId);

    if (!dbUser) {
      return res
        .status(404)
        .send({ success: false, message: "User not found." });
    }
    console.log("Fetched user from CouchDB:", dbUser);

    // Step 2: Create a Stripe customer if none exists
    let stripeCustomerId = dbUser.stripeCustomerId;
    if (!stripeCustomerId) {
      console.log("Creating new Stripe customer...");
      const customer = await stripe.customers.create({
        email: dbUser.email,
        metadata: { userId }, // Add unique metadata
        description: `Customer for ${dbUser.email}`,
      });
      console.log("Stripe customer created:", customer);

      stripeCustomerId = customer.id;

      // Save the new customer ID to the database
      dbUser.stripeCustomerId = stripeCustomerId;

      // Retry updating until the conflict is resolved
      let updateSuccessful = false;
      while (!updateSuccessful) {
        try {
          const response = await db.insert({ ...dbUser, _rev: dbUser._rev });
          console.log(
            "Updated user in CouchDB with Stripe customer ID:",
            response
          );
          updateSuccessful = true;
        } catch (conflictError) {
          if (conflictError.statusCode === 409) {
            console.log("Conflict detected, fetching latest revision...");
            dbUser = await db.get(userId); // Fetch the latest version
          } else {
            throw conflictError;
          }
        }
      }
    }

    // Step 3: Create a test payment method using tok_visa
    const createdPaymentMethod = await stripe.paymentMethods.create({
      type: "card",
      card: {
        token: "tok_visa", // Using a test token for Visa
      },
    });
    console.log("Test payment method created:", createdPaymentMethod);

    // Step 4: Attach the payment method to the customer
    const attachmentResponse = await stripe.paymentMethods.attach(
      createdPaymentMethod.id,
      {
        customer: stripeCustomerId,
      }
    );
    console.log("Payment method attached to customer:", attachmentResponse);

    // Step 5: Update Stripe customer to set the default payment method
    const updatedCustomer = await stripe.customers.update(stripeCustomerId, {
      invoice_settings: {
        default_payment_method: createdPaymentMethod.id,
      },
    });
    console.log("Updated Stripe customer:", updatedCustomer);

    // Step 6: Save payment method ID to the database
    dbUser.paymentMethodId = createdPaymentMethod.id;

    let updateSuccessful = false;
    while (!updateSuccessful) {
      try {
        const response = await updateAccount({
          userId,
          toUpdate: { paymentMethodId: createdPaymentMethod.id },
        });
        console.log(
          "Updated user in CouchDB with payment method ID:",
          response
        );
        updateSuccessful = true;
      } catch (conflictError) {
        if (conflictError.statusCode === 409) {
          console.log("Conflict detected, fetching latest revision...");
          dbUser = await db.get(userId); // Fetch the latest version
        } else {
          throw conflictError;
        }
      }
    }

    return res.status(200).send({
      success: true,
      message: "Payment method attached successfully.",
    });
  } catch (err) {
    console.error("Error in attachCustomPaymentMethodController:", err);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error." });
  }
};

const createCustomPaymentIntentController = async (req, res) => {
  try {
    const { userId, amount, currency = "eur" } = req.body;

    if (!userId || !amount) {
      return res
        .status(400)
        .send({ success: false, message: "Missing userId or amount." });
    }

    const db = await connectDB("db_emailmanager_accounts");
    const dbUser = await db.get(userId);

    if (!dbUser || !dbUser.stripeCustomerId || !dbUser.paymentMethodId) {
      return res.status(404).send({
        success: false,
        message: "User or payment details not found in the database.",
      });
    }

    // Create a payment intent with restricted automatic payment methods

    console.log("Creating payment intent with", {
      amount,
      currency,
      stripeCustomerId: dbUser.stripeCustomerId,
      paymentMethodId: dbUser.paymentMethodId,
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      customer: dbUser.stripeCustomerId,
      payment_method: dbUser.paymentMethodId,
      confirm: true,
      description: `Payment for client: ${dbUser.email}`,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
    });

    console.log("Payment Intent Status:", paymentIntent.status);
    if (paymentIntent.status !== "succeeded") {
      throw new Error(
        `Payment confirmation failed with status: ${paymentIntent.status}`
      );
    }

    return res.status(200).send({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.error("Error in createPaymentIntentController:", err.message);
    return res.status(500).send({
      success: false,
      message: "Error creating payment intent.",
    });
  }
};




module.exports = {
  createPaymentRecurrentController: catchedAsync(createPaymentRecurrentController),
  createPaymentIntentController: catchedAsync(createPaymentIntentController),
  createSetupIntentController: catchedAsync(createSetupIntentController),
  attachCustomPaymentMethodController: catchedAsync( attachCustomPaymentMethodController ),
  createCustomPaymentIntentController: catchedAsync( createCustomPaymentIntentController ),
};
