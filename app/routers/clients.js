const { Router } = require("express");
const clientsRouter = Router();

const {
  createClientController,
  getAllUserClientsController,
  deleteClientController,
} = require("../controllers/clients");

clientsRouter
  .post("/createClient", createClientController)
  .get("/getAllUserClients/:userId", getAllUserClientsController)
  .delete("/deleteClients", deleteClientController);

module.exports = clientsRouter;
