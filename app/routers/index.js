const { Router } = require("express");
const mainRouter = Router();

const routerReseller = require("./reseller");
const routerEmailManager = require("./emailManager");

mainRouter.use("/emailManager", routerEmailManager);
mainRouter.use("/reseller", routerReseller);


module.exports = mainRouter;
