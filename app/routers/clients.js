const { Router } = require("express");
const clientsRouter = Router();

const {
  createClientController,
  getAllClientsController,
  updateClientController,
  deleteClientController,
  getOneClientController,
  createClientsController,
} = require("../controllers/clients");

clientsRouter
  .post("/createClient", createClientController)
  .post("/createClients", createClientsController)
  .get("/getAllClients/:userId", getAllClientsController)
  .put("/updateClient/:clientId", updateClientController)
  .delete("/deleteClients", deleteClientController)
  .get("/getClient/:clientId/:userId", getOneClientController);

module.exports = clientsRouter;
