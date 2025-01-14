const { Router } = require("express");
const clientsRouter = Router();

const {
  createClientController,
  getAllUserClientsController,
  updateClientController,
  deleteClientController,
} = require("../controllers/clients");

clientsRouter
  .post("/createClient", createClientController)
  .get("/getAllUserClients/:userId", getAllUserClientsController)
  .put("/updateClient/:clientId", updateClientController)
  .delete("/deleteClients", deleteClientController);

module.exports = clientsRouter;
