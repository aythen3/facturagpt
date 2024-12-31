const { Router } = require("express");
const userManagerRouter = Router();
const {
  createAccountController,
  loginToManagerController,
  addNewClientController,
  getAllClientsController,
  deleteClientController,
  updateClientController,
  getAllUsersController,
  updateAccountController,
  generateAndSendOtpController,
  verifyOTPController,
} = require("../controllers/user");

// -------------------------------
userManagerRouter
  .post("/createAccount", createAccountController)
  .post("/loginToManager", loginToManagerController)
  .post("/addNewClient", addNewClientController)
  .get("/getAllClients", getAllClientsController)
  .get("/getAllUsers", getAllUsersController)
  .delete("/deleteClient", deleteClientController)
  .put("/updateClient", updateClientController)
  .put("/updateUser", updateAccountController)
  .post("/send-otp", generateAndSendOtpController)
  .post("/verify-otp", verifyOTPController);

module.exports = userManagerRouter;
