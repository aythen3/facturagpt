const { Router } = require("express");
const clientsRouter = Router();

const {
  createClientController,
  getAllUserClientsController,
} = require("../controllers/clients");

clientsRouter
  .post("/createClient", createClientController)
  .get("/getAllUserClients/:userId", getAllUserClientsController);

module.exports = clientsRouter;
