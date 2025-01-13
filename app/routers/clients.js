const { Router } = require("express");
const clientsRouter = Router();

const { createClientController } = require("../controllers/clients");

clientsRouter.post("/createClient", createClientController);

module.exports = clientsRouter;
