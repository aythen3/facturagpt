
const { catchedAsync, response } = require("../../../utils/err");


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
      
      if (processedData?.documentType === "factura") {
        xmlFile = facturaXML;
        uploadType = "notificacion_fraC";
      } else {
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
  
      const tempFilePath = path.join(__dirname, "./temp/" + file_xml);
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
  