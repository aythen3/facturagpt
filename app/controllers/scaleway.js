
const { catchedAsync } = require("../utils/err");

const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: "SCW8EPCVF1YTQXK0AC7P",
  secretAccessKey: "cd4ea464-15e8-4baf-848d-8db28cd880cf",
  endpoint: "https://s3.fr-par.scw.cloud",
  s3ForcePathStyle: true,
});





const checkOrCreateUserBucketController = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("User id received, checking for bucket:", { userId });

    // const response = await checkOrCreateUserBucket(userId);
    // return res.status(200).send(response);


    const bucketName = "factura-gpt";
    const userFolder = `${userId}/`;
    const facturasFolder = `${userFolder}facturas/`;
    const recibosFolder = `${userFolder}recibos/`;

    // Función para verificar si una "carpeta" existe
    const folderExists = async (folderKey) => {
      try {
        const params = {
          Bucket: bucketName,
          Prefix: folderKey,
          MaxKeys: 1,
        };
        const data = await s3.listObjectsV2(params).promise();
        return data.Contents.length > 0;
      } catch (error) {
        console.error(`Error verificando la existencia de ${folderKey}:`, error);
        return false;
      }
    };

    // Función para crear una "carpeta"
    const createFolder = async (folderKey) => {
      try {
        const params = {
          Bucket: bucketName,
          Key: folderKey,
          Body: "",
        };
        await s3.putObject(params).promise();
        console.log(`Carpeta ${folderKey} creada exitosamente.`);
      } catch (error) {
        console.error(`Error creando la carpeta ${folderKey}:`, error);
      }
    };

    // Verificar y crear las carpetas si es necesario
    if (!(await folderExists(userFolder))) {
      await createFolder(userFolder);
    }
    if (!(await folderExists(facturasFolder))) {
      await createFolder(facturasFolder);
    }
    if (!(await folderExists(recibosFolder))) {
      await createFolder(recibosFolder);
    }

    return res.status(200).send("Bucket created successfully");

  } catch (err) {
    console.log("Error in checkOrCreateUserBucketController:", err);
    return res.status(500).send("Error checking for user bucket");
  }
};

const getUserFilesController = async (req, res) => {
  try {
    const { userId } = req.params;

    const bucketName = "factura-gpt";
    const userPrefix = `${userId}/`;

    const params = {
      Bucket: bucketName,
      Prefix: userPrefix,
    };

    try {
      const data = await s3.listObjectsV2(params).promise();
      const userData = data.Contents.filter((item) => item.Key !== userPrefix);
      return res.status(200).send(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }

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

    // const response = await uploadUserFile(userId, folder, file);

    const path = `${userId}/${folder}/`;

    const bucketName = "factura-gpt";
    const uploadPromises = files.map((file) => {
      const params = {
        Bucket: bucketName,
        Key: `${path}${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
      };
  
      return s3.upload(params).promise();
    });
  
    try {
      const results = await Promise.all(uploadPromises);
      return results;
    } catch (error) {
      console.error("Error uploading files to Scaleway:", error);
      throw error;
    }


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

    const bucketName = "factura-gpt";
    const uploadPromises = files.map((file) => {
      const params = {
        Bucket: bucketName,
        Key: `${path}${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      return s3.upload(params).promise();
    });

    try {
      const results = await Promise.all(uploadPromises);

      return res.status(200).send(results);
    } catch (error) {
      console.error("Error uploading files to Scaleway:", error);
      throw error;
    }

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


    try {
      const bucketName = "factura-gpt";

      let fullFolderKey = folderPath;
      if (!fullFolderKey.endsWith("/")) {
        fullFolderKey += "/";
      }

      const folderExists = await doesFolderExist(bucketName, fullFolderKey);
      if (!folderExists) {
        await putFolderObject(bucketName, fullFolderKey);

        const newFolderData = await getFolderData(bucketName, fullFolderKey);

        const data = newFolderData ? [newFolderData] : [];
        return res.status(200).send(data);
      } else {
        const existingFolderData = await getFolderData(bucketName, fullFolderKey);

        const data = existingFolderData ? [existingFolderData] : [];
        return res.status(200).send(data);
      }
    } catch (error) {
      console.error("Error in createFolderService:", error);
      throw new Error(error.message);
    }


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

    const bucketName = "factura-gpt";

    if (!destinationKey.endsWith("/")) {
      destinationKey += "/";
    }

    if (!isFolder) {
      const fileName = sourceKey.split("/").pop();
      const newKey = `${destinationKey}${fileName}`;


      await copyObject(bucketName, sourceKey, newKey);
      await deleteObject(bucketName, sourceKey);

      return { success: true, message: "File moved", newKey };
    } else {
      if (!sourceKey.endsWith("/")) {
        sourceKey += "/";
      }


      const folderSegments = sourceKey.split("/").filter(Boolean);
      const folderName = folderSegments[folderSegments.length - 1];

      const targetFolderKey = `${destinationKey}${folderName}/`;
      await putFolderObject(bucketName, targetFolderKey);

      const data = await s3
        .listObjectsV2({
          Bucket: bucketName,
          Prefix: sourceKey,
        })
        .promise();

      if (!data.Contents || data.Contents.length === 0) {
        await deleteObject(bucketName, sourceKey);
        return { success: true, message: "Empty folder moved" };
      }

      const itemsMoved = [];
      for (const obj of data.Contents) {
        const oldKey = obj.Key;
        const relativePath = oldKey.slice(sourceKey.length);

        const newKey = `${targetFolderKey}${relativePath}`;

        if (oldKey === sourceKey) {
          continue;
        }

        await copyObject(bucketName, oldKey, newKey);
        await deleteObject(bucketName, oldKey);

        itemsMoved.push({ oldKey, newKey });
      }

      await deleteObject(bucketName, sourceKey);

      return res.status(200).send({
        success: true,
        message: "Folder moved",
        targetFolderKey,
        itemsMoved,
      });
    }


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

    if (!key) {
      return res
        .status(400)
        .json({ success: false, message: "key is required" });
    }

    const bucketName = "factura-gpt";

    if (!isFolder) {
      await deleteObject(bucketName, key);
      return { success: true, message: "File deleted", deletedKey: key };
    } else {
      let folderKey = key;
      if (!folderKey.endsWith("/")) {
        folderKey += "/";
      }


      const listParams = {
        Bucket: bucketName,
        Prefix: folderKey,
      };
      const data = await s3.listObjectsV2(listParams).promise();
      if (!data.Contents || data.Contents.length === 0) {
        await deleteObject(bucketName, folderKey);
        return { success: true, message: "Folder was empty or not found" };
      }

      const deletedItems = [];
      for (const obj of data.Contents) {
        await deleteObject(bucketName, obj.Key);
        deletedItems.push(obj.Key);
      }

      return res.status(200).send({
        success: true,
        message: "Folder and all nested objects deleted",
        folderKey,
        deletedItems,
      });
    }


  } catch (err) {
    console.error("Error in deleteObjectController:", err);
    return res
      .status(500)
      .json({ success: false, message: "Error deleting object" });
  }
};

module.exports = {
  uploadUserFileController: catchedAsync(uploadUserFileController),
  deleteObjectController: catchedAsync(deleteObjectController),
  moveObjectController: catchedAsync(moveObjectController),
  createFolderController: catchedAsync(createFolderController),
  getUserFilesController: catchedAsync(getUserFilesController),
  checkOrCreateUserBucketController: catchedAsync( checkOrCreateUserBucketController ),
  uploadFilesController: catchedAsync(uploadFilesController),
};
