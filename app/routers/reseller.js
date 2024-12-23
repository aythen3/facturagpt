const { Router } = require("express");
const routesRouter = Router();

const { authenticateToken } = require("../middlewares/auth/auth");
const { multerUploads } = require("../middlewares/multer");

const multer = require("multer");

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
}).single("file");


const {
    testReseller,
    mainReseller,
    testTwilio
} = require("../controllers/reseller.js");




routesRouter

    .get("/", mainReseller)
    .get("/twilio", testTwilio)
    .get("/test", testReseller)

module.exports = routesRouter;
