const { Router } = require("express");
const mainRouter = Router();

// const routerReseller = require("./reseller");
const routerEmailManager = require("./emailManager");
const routerStripe = require("./stripe");
const routerUser = require("./user");
const automateRouter = require("./automate");
const scalewayRouter = require("./scaleway");
const clientRouter = require("./clients");
const docsRouter = require("./docs");
const chatRouter = require("./chat");

mainRouter.use("/emailManager", routerEmailManager);

mainRouter.use("/user", routerUser);
mainRouter.use("/stripe", routerStripe);
mainRouter.use("/scaleway", scalewayRouter);

mainRouter.use("/clients", clientRouter);
mainRouter.use("/docs", docsRouter);

mainRouter.use("/chat", chatRouter);
mainRouter.use("/automate", automateRouter);

module.exports = mainRouter;
