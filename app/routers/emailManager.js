const { Router } = require("express");
const emailManagerRouter = Router();
const {
  createAccountController,
  loginToManagerController,
  addNewClientController,
  getAllClientsController,
  deleteClientController,
  updateClientController,
  getAllUsersController,
  updateAccountController,
  createPaymentIntentController,
  createSetupIntentController,
  generateAndSendOtpController,
  verifyOTPController,
} = require("../controllers/emailManager");

// -------------------------------
emailManagerRouter
  .post("/createAccount", createAccountController)
  .post("/loginToManager", loginToManagerController)
  .post("/addNewClient", addNewClientController)
  .get("/getAllClients", getAllClientsController)
  .get("/getAllUsers", getAllUsersController)
  .delete("/deleteClient", deleteClientController)
  .put("/updateClient", updateClientController)
  .put("/updateUser", updateAccountController)
  .post("/create-payment-intent", createPaymentIntentController)
  .post("/create-setup-intent", createSetupIntentController)
  .post("/send-otp", generateAndSendOtpController)
  .post("/verify-otp", verifyOTPController);

module.exports = emailManagerRouter;
