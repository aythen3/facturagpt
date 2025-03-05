const { Router } = require("express");
const userManagerRouter = Router();

const { authenticateToken } = require('../middlewares/auth/auth')

const multer = require("multer");
const upload = multer();

const {
  // getEmailsByQuery,

  sendEmail,
  getEmail,
  getFile,

  getAllAccountsController,
  updateAccountPasswordController,
  deleteAccountController,
  createAccountController,

  loginToManagerController,
  // addNewClientController,
  // getAllClientsController,
  // deleteClientController,
  // updateClientController,
  updateAccountController,
  generateAndSendOtpController,
  verifyOTPController,
  sendNewsletter,
  uploadPDF,

  addNotificationController,
  getAllNotificationsController,
  deleteNotificationController,

  getResumeAccount,
  // upload,
  deleteAllDB,
} = require("../controllers/user");

// const { goAutomate } = require("../services/automate");

// -------------------------------
userManagerRouter
  // .post("/automate", upload.single("file"), goAutomate)

  .post("/resume", authenticateToken, getResumeAccount)

  .get("/getAllAccounts", authenticateToken, getAllAccountsController)
  .put("/updateAccount", authenticateToken, updateAccountController)
  .post("/deleteAccount", authenticateToken, deleteAccountController)
  
  .post("/addNotification", authenticateToken, addNotificationController)
  .get("/getAllNotifications", authenticateToken, getAllNotificationsController)
  .post("/deleteNotification", authenticateToken, deleteNotificationController)

  .post("/updateAccountPassword", updateAccountPasswordController)
  .post("/loginToManager", loginToManagerController)
  // .post("/addNewClient", addNewClientController)
  // .get("/getAllClients", getAllClientsController)
  // .delete("/deleteClient", deleteClientController)
  // .put("/updateClient", updateClientController)
  
  .post("/createAccount", createAccountController)
  .post("/send-otp", generateAndSendOtpController)
  .post("/verify-otp", verifyOTPController)
  .post("/newsletter", sendNewsletter)
  .post("/send-email", sendEmail)
  .get("/get-email", getEmail)
  .get("/get-file/:name", getFile)
  .post("/upload-pdf", upload.single("file"), uploadPDF)
  .get("/deleteAllDB", deleteAllDB)


module.exports = userManagerRouter;
