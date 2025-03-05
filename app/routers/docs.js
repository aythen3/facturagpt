const { Router } = require("express");

const { authenticateToken } = require('../middlewares/auth/auth')


const {
  getAllDocsByClientController,
  deleteDocsController,
  deleteProductFromDocsController,
  getDocByIdController,

  automateDocsController,
  addDoc,

  getAllProducts,
} = require("../controllers/docs");


// const { get } = require("jquery");
const docsByClientRouter = Router();

docsByClientRouter
  .get("/active", authenticateToken, automateDocsController)
  .post("/alldocsByClient", authenticateToken, getAllDocsByClientController)
  .post("/deleteDocs", authenticateToken, deleteDocsController)
  .post("/deleteProductFromDocs", authenticateToken, deleteProductFromDocsController)
  .get("/getOneDocs/:docId", authenticateToken, getDocByIdController)
  .post("/addDocs", authenticateToken, addDoc)
  .post("/getAllProducts", authenticateToken, getAllProducts)

module.exports = docsByClientRouter;
