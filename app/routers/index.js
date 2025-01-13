const { Router } = require("express");
const mainRouter = Router();

const routerReseller = require("./reseller");
const routerEmailManager = require("./emailManager");
const routerStripe = require("./stripe");
const routerUser = require("./user");
const automationsRouter = require("./automations");
const clientRouter = require("./clients");

mainRouter.use("/emailManager", routerEmailManager);
mainRouter.use("/reseller", routerReseller);
mainRouter.use("/stripe", routerStripe);
mainRouter.use("/user", routerUser);
mainRouter.use("/automations", automationsRouter);
mainRouter.use("/clients", clientRouter);

module.exports = mainRouter;
