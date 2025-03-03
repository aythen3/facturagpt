const { Router } = require("express");
const automationsRouter = Router();

const multer = require("multer");
const upload = multer();

const { authenticateToken } = require('../middlewares/auth/auth')

const {
  createAutomationController,
  getAllUserAutomationsController,
  updateAutomationController,
  deleteAutomationController,

  addAuthController,
  getAuthController,
  deleteAuthController,
} = require("../controllers/automate");


const { goAutomate } = require("../services/automate/index");

// -------------------------------
automationsRouter
.post("/go", authenticateToken, upload.single("file"), goAutomate)

.post("/createAutomation", authenticateToken, createAutomationController)
.get("/getAllUserAutomations/:userId", authenticateToken, getAllUserAutomationsController)
.put("/updateAutomation/:automationId", authenticateToken, updateAutomationController)
.delete("/deleteAutomation/:automationId", authenticateToken, deleteAutomationController)

.post("/addAuth", authenticateToken, addAuthController)
.get("/getAuth/:type", authenticateToken, getAuthController)
.delete("/deleteAuth", authenticateToken, deleteAuthController)  

module.exports = automationsRouter;
