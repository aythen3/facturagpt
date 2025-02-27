const { Router } = require("express");
const userManagerRouter = Router();
const {
  getEmailsByQuery,

  sendEmail,
  getEmail,
  getFile,

  getAllAccountsController,
  updateAccountPasswordController,
  deleteAccountController,
  createAccountController,

  loginToManagerController,
  addNewClientController,
  getAllClientsController,
  deleteClientController,
  updateClientController,
  updateAccountController,
  generateAndSendOtpController,
  verifyOTPController,
  sendNewsletter,
  uploadPDF,
  upload,
  deleteAllDB,
} = require("../controllers/user");

const { fetchEmailsByQuery } = require("../services/pdfImageReaderGpt");

// -------------------------------
userManagerRouter
  .post("/getEmailsByQuery", fetchEmailsByQuery)

  .post("/createAccount", createAccountController)
  .get("/getAllAccounts", getAllAccountsController)
  .put("/updateAccount", updateAccountController)
  .post("/deleteAccount", deleteAccountController)
  .post("/updateAccountPassword", updateAccountPasswordController)

  .post("/loginToManager", loginToManagerController)
  .post("/addNewClient", addNewClientController)
  .get("/getAllClients", getAllClientsController)
  .delete("/deleteClient", deleteClientController)
  .put("/updateClient", updateClientController)
  
  .post("/send-otp", generateAndSendOtpController)
  .post("/verify-otp", verifyOTPController)
  .post("/newsletter", sendNewsletter)
  .post("/send-email", sendEmail)
  .get("/get-email", getEmail)
  .get("/get-file/:name", getFile)
  .post("/upload-pdf", upload.single("file"), uploadPDF)
  .get("/deleteAllDB", deleteAllDB);

module.exports = userManagerRouter;
