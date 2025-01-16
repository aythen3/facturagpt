const {
  getUserFiles,
  checkOrCreateUserBucket,
  uploadFilesService,
  createFolderService,
  moveObjectService,
  deleteObjectService,
} = require("../services/scaleway");
const { catchedAsync } = require("../utils/err");

const checkOrCreateUserBucketController = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("User id received, checking for bucket:", { userId });

    const response = await checkOrCreateUserBucket(userId);

    return res.status(200).send(response);
  } catch (err) {
    console.log("Error in checkOrCreateUserBucketController:", err);
    return res.status(500).send("Error checking for user bucket");
  }
};

const getUserFilesController = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("User id received, checking for bucket files:", { userId });

    const response = await getUserFiles(userId);

    return res.status(200).send(response);
  } catch (err) {
    console.log("Error in getUserFilesController:", err);
    return res.status(500).send("Error getting user files");
  }
};

const uploadUserFileController = async (req, res) => {
  try {
    const { userId } = req.params;
    const { folder } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).send("No file provided");
    }

    const response = await uploadUserFile(userId, folder, file);

    return res.status(200).send(response);
  } catch (err) {
    console.log("Error in uploadUserFileController:", err);
    return res.status(500).send("Error uploading user file");
  }
};

const uploadFilesController = async (req, res) => {
  try {
    const { path } = req.body;
    const files = req.files;

    console.log("files from (CONTROLLER)", files);

    if (!files || files.length === 0) {
      return res.status(400).send("No files uploaded.");
    }

    const uploadResults = await uploadFilesService(files, path);

    return res.status(200).json(uploadResults);
  } catch (error) {
    console.error("Error in uploadFilesController:", error);
    return res.status(500).send("Error uploading files");
  }
};

const createFolderController = async (req, res) => {
  try {
    const { folderPath } = req.body;
    console.log("Received create-folder request:", { folderPath });

    if (!folderPath) {
      return res.status(400).json({
        success: false,
        message: "folderPath is required",
      });
    }

    const response = await createFolderService(folderPath);

    return res.status(200).json(response);
  } catch (err) {
    console.error("Error in createFolderController:", err);
    return res
      .status(500)
      .json({ success: false, message: "Error creating folder" });
  }
};

const moveObjectController = async (req, res) => {
  try {
    const { sourceKey, destinationKey, isFolder } = req.body;
    console.log("Received move-object request:", {
      sourceKey,
      destinationKey,
      isFolder,
    });

    if (!sourceKey || !destinationKey) {
      return res.status(400).json({
        success: false,
        message: "sourceKey and destinationKey are required",
      });
    }

    const result = await moveObjectService(sourceKey, destinationKey, isFolder);
    return res.status(200).json(result);
  } catch (err) {
    console.error("Error in moveObjectController:", err);
    return res
      .status(500)
      .json({ success: false, message: "Error moving object" });
  }
};

const deleteObjectController = async (req, res) => {
  try {
    const { key, isFolder } = req.body;
    console.log("Received delete-object request:", { key, isFolder });

    if (!key) {
      return res
        .status(400)
        .json({ success: false, message: "key is required" });
    }

    const result = await deleteObjectService(key, isFolder);
    return res.status(200).json(result);
  } catch (err) {
    console.error("Error in deleteObjectController:", err);
    return res
      .status(500)
      .json({ success: false, message: "Error deleting object" });
  }
};

module.exports = {
  deleteObjectController: catchedAsync(deleteObjectController),
  moveObjectController: catchedAsync(moveObjectController),
  createFolderController: catchedAsync(createFolderController),
  uploadUserFileController: catchedAsync(uploadUserFileController),
  getUserFilesController: catchedAsync(getUserFilesController),
  checkOrCreateUserBucketController: catchedAsync(
    checkOrCreateUserBucketController
  ),
  uploadFilesController: catchedAsync(uploadFilesController),
};
