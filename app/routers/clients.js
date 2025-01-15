const { Router } = require("express");
const clientsRouter = Router();

const {
  createClientController,
  getAllUserClientsController,
  updateClientController,
  deleteClientController,
  getOneClientController,
  createClientsController,
} = require("../controllers/clients");

clientsRouter
  .post("/createClient", createClientController)
  .post("/createClients", createClientsController)
  .get("/getAllUserClients/:userId", getAllUserClientsController)
  .put("/updateClient/:clientId", updateClientController)
  .delete("/deleteClients", deleteClientController)
  .get("/getClient/:clientId", getOneClientController);

module.exports = clientsRouter;
