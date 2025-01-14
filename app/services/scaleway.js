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

module.exports = {
  getUserFiles: getUserFiles,
  checkOrCreateUserBucket: checkOrCreateUserBucket,
  uploadFilesService: uploadFilesService,
};
