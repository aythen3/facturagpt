const { Router } = require("express");
const automationsRouter = Router();
const {
  createAutomationController,
  getAllUserAutomationsController,
  updateAutomationController,
  deleteAutomationController,
} = require("../controllers/automations");

// -------------------------------
automationsRouter
.post("/createAutomation", createAutomationController)
.get("/getAllUserAutomations/:userId", getAllUserAutomationsController)
.put("/updateAutomation/:automationId", updateAutomationController)
  .delete("/deleteAutomation/:automationId", deleteAutomationController);

module.exports = automationsRouter;
