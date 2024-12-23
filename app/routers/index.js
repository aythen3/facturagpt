const { Router } = require("express");
const mainRouter = Router();

const routerReseller = require("./reseller");

mainRouter.use("/reseller", routerReseller);


module.exports = mainRouter;
