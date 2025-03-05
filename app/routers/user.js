const { Router } = require("express");
const userManagerRouter = Router();

const { authenticateToken } = require('../middlewares/auth/auth')

const multer = require("multer");
const upload = multer();

const {
  getDB,
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
  // deleteAllDB,
  // getDB
} = require("../controllers/user");

// const { goAutomate } = require("../services/automate");

// -------------------------------
userManagerRouter
  // .post("/automate", upload.single("file"), goAutomate)

  .get("/db", getDB)
  .get("/db/:type", getDB)
  // .get("/deleteAllDB", deleteAllDB)


  .post("/resume", authenticateToken, getResumeAccount)
  .post("/addNotification", authenticateToken, addNotificationController)
  .get("/getAllNotifications", authenticateToken, getAllNotificationsController)
  .post("/deleteNotification", authenticateToken, deleteNotificationController)

  .get("/getAllAccounts", authenticateToken, getAllAccountsController)
  .put("/updateAccount", authenticateToken, updateAccountController)
  .post("/deleteAccount", authenticateToken, deleteAccountController)
  

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


module.exports = userManagerRouter;
