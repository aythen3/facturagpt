
const { catchedAsync, response } = require("../../../utils/err");

const { v4: uuidv4 } = require('uuid');

const fs = require("fs");
const path = require("path");

const facturaXMLPath = path.join(__dirname, "../../emailXMLS/fac_data.txt");
const albaranXMLPath = path.join(__dirname, "../../emailXMLS/alb_data.txt");

const facturaXML = fs.readFileSync(facturaXMLPath, "utf-8"); // Leer como texto
const albaranXML = fs.readFileSync(albaranXMLPath, "utf-8"); // Leer como texto

const { processItems } = require('../gpt')

const convert = require("xml-js");


const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: "SCW8EPCVF1YTQXK0AC7P",
  secretAccessKey: "cd4ea464-15e8-4baf-848d-8db28cd880cf",
  endpoint: "https://s3.fr-par.scw.cloud",
  s3ForcePathStyle: true,
});



const xmlFilter = async ({
    user,
    attach,
    processedData
  }) => {
    try {
  
      // XML FILEs
      let xmlFile;
      let xmlData;
      let uploadType;
  
      console.log('original', attach)
  
      // const file_xml = `${attach.filename.split(".")[0]}.xml`;
      const file_xml = `${attach.originalname.split(".")[0]}.xml`;
      
      console.log('processedData ALBARAN', processedData)
      if (processedData?.documentType === "factura") {
        xmlFile = facturaXML;
        uploadType = "notificacion_fraC";
      } else if (processedData?.documentType === "albarán") {
        xmlFile = albaranXML;
        uploadType = "notificacion_albC";
      }

      // console.log("xmlFile", typeof xmlFile);
      if (processedData?.documentType && xmlFile) {
        const json = convert.xml2json(xmlFile, {
          compact: true,
          spaces: 4,
        });
  
        xmlData = JSON.parse(json);
      }
  
      // Change variables
      const obj = processItems(xmlData, processedData);
  
      // JSON CONVER
      let text = convert.json2xml(JSON.stringify(obj), {
        compact: true,
        spaces: 4,
      });
  
  
      xmlFile = {
        buffer: text,
        // originalname: attachment.filename,
        originalname: attach.originalname,
      };
  
      const tempFilePath = path.join(__dirname, "../temp/" + file_xml);
      await fs.promises.writeFile(tempFilePath, xmlFile.buffer);
      // console.log('Local file path:', localFilePath)
  
      // Subir directamente en el S3
      // const file = req.file
      // console.log('file', file)
      // const path = `${user._id}/`;
      // const bucketName = "factura-gpt";
  
      // Preparar la ruta para S3
      const userPath = `${user._id}/`;
      const xmlPath = `${userPath}xml/`;
      const bucketName = "factura-gpt";
  
      // Crear la carpeta xml/ si no existe
      try {
        await s3.putObject({
          Bucket: bucketName,
          Key: xmlPath,
          Body: ''
        }).promise();
      } catch (error) {
        console.log('Error creating xml folder:', error);
      }
      
      const params = {
        // Key: `${path}${file.originalname}`,
        Bucket: bucketName,
        Key: `${xmlPath}FILE-${uuidv4()}_${file_xml}`,
        Body: xmlFile.buffer,
        ContentType: 'application/xml',
      };
  
      await s3.upload(params).promise();
  
      console.log("File uploaded successfully. ");
    } catch (error) {
      console.log("ERROR ON XML FILTER", error);
    }
  }
  

  module.exports = {
    xmlFilter: catchedAsync(xmlFilter),
  };
  