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
    testTwilio,

    gptLeads,
    deleteLeads,
    fetchLeads,
    saveLeads
} = require("../controllers/reseller.js");




routesRouter

    .get("/twilio", testTwilio)


    .post("/gpt-leads", gptLeads)
    .delete("/leads", deleteLeads)
    .get("/leads", fetchLeads)
    .post("/leads", saveLeads)

module.exports = routesRouter;
