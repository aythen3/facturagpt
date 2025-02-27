const { Router } = require("express");
const scalewayRouter = Router();
const {
  checkOrCreateUserBucketController,
  getUserFilesController,
  uploadFilesController,
  createFolderController,
  moveObjectController,
  deleteObjectController,
} = require("../controllers/scaleway");
const multer = require("multer");
const upload = multer();

// -------------------------------
scalewayRouter
  .get("/check-user-bucket/:userId", checkOrCreateUserBucketController)
  .get("/get-user-files/:userId", getUserFilesController)
  .post("/upload-files", upload.array("files"), uploadFilesController)
  .post("/create-folder", createFolderController)
  .post("/move-object", moveObjectController)
  .post("/delete-object", deleteObjectController);

module.exports = scalewayRouter;
