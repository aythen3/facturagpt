const { Router } = require("express");
const { authenticateToken } = require('../middlewares/auth/auth')


const { 
  getChatListController,
  getChatMessagesController,
  deleteChatController,
  sendMessageController,
  validateTokenGPT
} = require("../controllers/chat");

const chatByClientRouter = Router();

chatByClientRouter

  .get("/list", authenticateToken, getChatListController)
  .get("/:chatId/messages", authenticateToken, getChatMessagesController)
  .delete("/:chatId", authenticateToken, deleteChatController)
  .post("/:chatId/messages", authenticateToken, sendMessageController)
  .post("/validate-token", authenticateToken, validateTokenGPT);

module.exports = chatByClientRouter;
