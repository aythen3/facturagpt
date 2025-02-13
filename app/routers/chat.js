const { Router } = require("express");
const { authenticateToken } = require('../middlewares/auth/auth')


const { 
  getChatListController,
  getChatMessagesController,
  deleteChatController,
  sendMessageController
} = require("../controllers/chat");

const transactionsByClientRouter = Router();

transactionsByClientRouter

  .get("/list", authenticateToken, getChatListController)
  .get("/:chatId/messages", authenticateToken, getChatMessagesController)
  .delete("/:chatId", authenticateToken, deleteChatController)
  .post("/:chatId/messages", authenticateToken, sendMessageController);

module.exports = transactionsByClientRouter;
