const { Router } = require("express");
const automationsRouter = Router();

const multer = require("multer");
const upload = multer();

const {
  createAutomationController,
  getAllUserAutomationsController,
  updateAutomationController,
  deleteAutomationController,
} = require("../controllers/automate");


const { goAutomate } = require("../services/automate/index");

// -------------------------------
automationsRouter
.post("/go", upload.single("file"), goAutomate)

.post("/createAutomation", createAutomationController)
.get("/getAllUserAutomations/:userId", getAllUserAutomationsController)
.put("/updateAutomation/:automationId", updateAutomationController)
.delete("/deleteAutomation/:automationId", deleteAutomationController);

module.exports = automationsRouter;
