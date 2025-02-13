const { Router } = require("express");
const mainRouter = Router();

const routerReseller = require("./reseller");
const routerEmailManager = require("./emailManager");
const routerStripe = require("./stripe");
const routerUser = require("./user");
const automationsRouter = require("./automations");
const scalewayRouter = require("./scaleway");
const clientRouter = require("./clients");
const transactionsByClientRouter = require("./transactions");
const chatRouter = require("./chat");

mainRouter.use("/chat", chatRouter);
mainRouter.use("/emailManager", routerEmailManager);
mainRouter.use("/reseller", routerReseller);
mainRouter.use("/stripe", routerStripe);
mainRouter.use("/user", routerUser);
mainRouter.use("/automations", automationsRouter);
mainRouter.use("/scaleway", scalewayRouter);
mainRouter.use("/clients", clientRouter);
mainRouter.use("/transactions", transactionsByClientRouter);

module.exports = mainRouter;
