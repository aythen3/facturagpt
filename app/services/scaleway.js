const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: "SCW8EPCVF1YTQXK0AC7P",
  secretAccessKey: "cd4ea464-15e8-4baf-848d-8db28cd880cf",
  endpoint: "https://s3.fr-par.scw.cloud",
  s3ForcePathStyle: true,
});

const checkOrCreateUserBucket = async (userId) => {
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
};

const getUserFiles = async (userId) => {
  const bucketName = "factura-gpt";
  const userPrefix = `${userId}/`;

  const params = {
    Bucket: bucketName,
    Prefix: userPrefix,
  };

  try {
    const data = await s3.listObjectsV2(params).promise();
    const userData = data.Contents.filter((item) => item.Key !== userPrefix);
    return userData;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

const uploadFilesService = async (files, path) => {
  console.log("on uploadFilesService", { files, path });
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
};

const createFolderService = async (folderPath) => {
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
      console.log("Folder created:", fullFolderKey);

      return newFolderData ? [newFolderData] : [];
    } else {
      console.log("Folder already exists:", fullFolderKey);
      const existingFolderData = await getFolderData(bucketName, fullFolderKey);

      return existingFolderData ? [existingFolderData] : [];
    }
  } catch (error) {
    console.error("Error in createFolderService:", error);
    throw new Error(error.message);
  }
};

const doesFolderExist = async (bucket, folderKey) => {
  try {
    const params = {
      Bucket: bucket,
      Prefix: folderKey,
      MaxKeys: 1,
    };
    const data = await s3.listObjectsV2(params).promise();
    return data.Contents && data.Contents.length > 0;
  } catch (error) {
    console.error(`Error checking folder "${folderKey}":`, error);
    return false;
  }
};

const putFolderObject = async (bucket, folderKey) => {
  const params = {
    Bucket: bucket,
    Key: folderKey,
    Body: "",
  };
  await s3.putObject(params).promise();
};

const getFolderData = async (bucket, folderKey) => {
  try {
    const params = {
      Bucket: bucket,
      Prefix: folderKey,
      MaxKeys: 1,
    };
    const data = await s3.listObjectsV2(params).promise();

    if (data.Contents && data.Contents.length > 0) {
      const folder = data.Contents[0];
      return {
        Key: folder.Key,
        LastModified: folder.LastModified,
        ETag: folder.ETag,
        Size: folder.Size,
        StorageClass: folder.StorageClass,
      };
    }
    return null;
  } catch (error) {
    console.error(`Error getting folder data "${folderKey}":`, error);
    return null;
  }
};

const moveObjectService = async (sourceKey, destinationKey, isFolder) => {
  const bucketName = "factura-gpt";

  if (!destinationKey.endsWith("/")) {
    destinationKey += "/";
  }

  if (!isFolder) {
    const fileName = sourceKey.split("/").pop();
    const newKey = `${destinationKey}${fileName}`;

    console.log("Moving single file:", sourceKey, "->", newKey);

    await copyObject(bucketName, sourceKey, newKey);
    await deleteObject(bucketName, sourceKey);

    return { success: true, message: "File moved", newKey };
  } else {
    if (!sourceKey.endsWith("/")) {
      sourceKey += "/";
    }

    console.log("Moving folder:", sourceKey, "->", destinationKey);

    const folderSegments = sourceKey.split("/").filter(Boolean);
    const folderName = folderSegments[folderSegments.length - 1];

    const targetFolderKey = `${destinationKey}${folderName}/`;
    console.log("Creating new folder object:", targetFolderKey);
    await putFolderObject(bucketName, targetFolderKey);

    const data = await s3
      .listObjectsV2({
        Bucket: bucketName,
        Prefix: sourceKey,
      })
      .promise();

    if (!data.Contents || data.Contents.length === 0) {
      console.log("Source folder is empty, nothing to move.");
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

      console.log(`Copying ${oldKey} to ${newKey}`);
      await copyObject(bucketName, oldKey, newKey);
      await deleteObject(bucketName, oldKey);

      itemsMoved.push({ oldKey, newKey });
    }

    console.log("Removing old folder object:", sourceKey);
    await deleteObject(bucketName, sourceKey);

    return {
      success: true,
      message: "Folder moved",
      targetFolderKey,
      itemsMoved,
    };
  }
};

async function copyObject(bucket, sourceKey, destinationKey) {
  const params = {
    Bucket: bucket,
    CopySource: `/${bucket}/${sourceKey}`,
    Key: destinationKey,
  };
  console.log("Params to copyObject:", params);
  await s3.copyObject(params).promise();
}

async function deleteObject(bucket, objectKey) {
  const params = {
    Bucket: bucket,
    Key: objectKey,
  };
  await s3.deleteObject(params).promise();
}

async function deleteObjectService(key, isFolder) {
  const bucketName = "factura-gpt";

  if (!isFolder) {
    console.log("Deleting single file:", key);
    await deleteObject(bucketName, key);
    return { success: true, message: "File deleted", deletedKey: key };
  } else {
    let folderKey = key;
    if (!folderKey.endsWith("/")) {
      folderKey += "/";
    }

    console.log("Deleting folder:", folderKey);

    const listParams = {
      Bucket: bucketName,
      Prefix: folderKey,
    };
    const data = await s3.listObjectsV2(listParams).promise();
    if (!data.Contents || data.Contents.length === 0) {
      console.log("Folder is empty or doesn't exist:", folderKey);
      await deleteObject(bucketName, folderKey);
      return { success: true, message: "Folder was empty or not found" };
    }

    const deletedItems = [];
    for (const obj of data.Contents) {
      console.log("Deleting:", obj.Key);
      await deleteObject(bucketName, obj.Key);
      deletedItems.push(obj.Key);
    }

    return {
      success: true,
      message: "Folder and all nested objects deleted",
      folderKey,
      deletedItems,
    };
  }
}

module.exports = {
  getUserFiles: getUserFiles,
  checkOrCreateUserBucket: checkOrCreateUserBucket,
  uploadFilesService: uploadFilesService,
  createFolderService: createFolderService,
  moveObjectService: moveObjectService,
  deleteObjectService: deleteObjectService,
};
