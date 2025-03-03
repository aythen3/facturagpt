const { Router } = require("express");

const { authenticateToken } = require('../middlewares/auth/auth')

const multer = require("multer");
const upload = multer();

const scalewayRouter = Router();
const {
  checkOrCreateUserBucketController,
  getUserFilesController,
  uploadFilesController,
  createFolderController,
  moveObjectController,
  deleteObjectController,
} = require("../controllers/scaleway");

// -------------------------------
scalewayRouter
  .get("/check-user-bucket/:userId", authenticateToken, checkOrCreateUserBucketController)
  .get("/get-user-files/:userId", authenticateToken, getUserFilesController)
  .post("/upload-files", authenticateToken, upload.array("files"), uploadFilesController)
  .post("/create-folder", authenticateToken, createFolderController)
  .post("/move-object", authenticateToken, moveObjectController)
  .post("/delete-object", authenticateToken, deleteObjectController);

module.exports = scalewayRouter;
