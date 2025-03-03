const { Router } = require("express");
const clientsRouter = Router();

const { authenticateToken } = require('../middlewares/auth/auth')

const {
  createClientController,
  getAllClientsController,
  updateClientController,
  deleteClientController,
  getOneClientController,
  createClientsController,
} = require("../controllers/clients");

clientsRouter
  .post("/createClient", authenticateToken, createClientController)
  .post("/createClients", authenticateToken, createClientsController)
  .get("/getAllClients/:userId", authenticateToken, getAllClientsController)
  .put("/updateClient/:clientId", authenticateToken, updateClientController)
  .delete("/deleteClients", authenticateToken, deleteClientController)
  .get("/getClient/:clientId/:userId", authenticateToken, getOneClientController);

module.exports = clientsRouter;
