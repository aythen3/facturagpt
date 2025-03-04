const { catchedAsync, response } = require("../../utils/err");
const { connectDB } = require("../../controllers/utils");
const { v4: uuidv4 } = require('uuid');

const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: "SCW8EPCVF1YTQXK0AC7P",
  secretAccessKey: "cd4ea464-15e8-4baf-848d-8db28cd880cf",
  endpoint: "https://s3.fr-par.scw.cloud",
  s3ForcePathStyle: true,
});

const fs = require("fs");
const path = require("path");
const { fromPath } = require("pdf2pic");
const sharp = require("sharp");
const { PDFDocument } = require("pdf-lib");
const convert = require("xml-js");

const { getImapConfig, connectToImap } = require('./gmail')

const { simpleParser } = require("mailparser");

const ftp = require("basic-ftp");

// const { updateClientService } = require("./emailManager");
// const tempDir = "./temp";
// const sheets = google.sheets("v4");
// const { mul } = require("@tensorflow/tfjs");


// const Imap = require("imap");

const facturaXMLPath = path.join(__dirname, "../emailXMLS/fac_data.txt");
const albaranXMLPath = path.join(__dirname, "../emailXMLS/alb_data.txt");

const facturaXML = fs.readFileSync(facturaXMLPath, "utf-8"); // Leer como texto
const albaranXML = fs.readFileSync(albaranXMLPath, "utf-8"); // Leer como texto


// const nano = require("nano")("http://admin:1234@127.0.0.1:5984");



// const { addTransaction } = require("./transactions");
// const { updateAccount } = require("./user");

const {
  documentGPT,
  getProductsGPT,
  processItems
} = require("../gpt");


const getAttachmentData = async (attach) => {
  // console.log("ATTACH RECEIVED", attach);
  try {
    const fileBuffer = attach.buffer;
    let imageBuffers = [];

    if (attach.mimeType === "application/pdf") {
      imageBuffers = await convertPDFToPNG(fileBuffer);
    } else if (attach.mimeType.startsWith("image/")) {
      imageBuffers.push(fileBuffer);
    }

    // const token =
    //   "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";

    const token = "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"

    console.log("TOKEN", token);
    let allErrors = [];
    let totalTokens = 0; // Track total tokens consumed
    let totalPrice = 0; // Track total price in USD
    let allResults = []; // Store all results

    for (const [index, imageBuffer] of imageBuffers.entries()) {
      const imageUrl = `data:image/png;base64,${imageBuffer.toString("base64")}`;

      let result = {};
      let attempts = 0;
      const maxAttempts = 1;
      let clientCifFound = false;
      let clientNifFound = false;

      while (attempts < maxAttempts) {
        attempts++;
        console.log(
          `Attempt ${attempts} for page ${index + 1}/${imageBuffers?.length}`
        );

        let attemptResult;

        if (attempts === 2 && !clientCifFound && !clientNifFound) {
          console.log(`Attempt 2, Searching for CIF and NIF`);
          attemptResult = await documentGPT({
            token,
            image: imageUrl,
            searchCif: true,
            searchNif: true,
          });
        }
        // ====================== UNCOMMENT BELOW =============================
        else if (attempts === 2 && clientCifFound && !clientNifFound) {
          console.log(
            `Attempt 2, Searching for NIF, CIF FOUND: ${clientCifFound}`
          );
          attemptResult = await documentGPT({
            token,
            image: imageUrl,
            searchNif: true,
          });
        } else if (attempts === 2 && !clientCifFound && clientNifFound) {
          console.log(
            `Attempt 2, Searching for CIF, NIF FOUND: ${clientNifFound}`
          );
          attemptResult = await documentGPT({
            token,
            image: imageUrl,
            searchCif: true,
          });
        }

        // ====================== UNCOMMENT ABOVE =============================
        else {
          // console.log("FALLS HERE ");

          attemptResult = await documentGPT({
            token,
            image: imageUrl,
            isDocument: true
          });
        }
        // console.log(
        //   "PRODUCT LIST==> of attempt: ",
        //   attempts,
        //   " ",
        //   attemptResult.productList
        // );

        totalTokens += attemptResult.totalTokens || 0;
        totalPrice += attemptResult.totalPrice || 0;

        if (attemptResult.error) {
          console.warn(
            `Error on attempt ${attempts} for page ${index + 1}/${imageBuffers?.length}: ${attemptResult.error}`
          );
          continue;
        }

        // console.log("ATTEMPTRESULT BEFORE MERGING...", attemptResult);

        // let productList = attemptResult.productList || [];

        // let filteredProductList = productList.filter((attemptProduct) => {
        //   const existsInResults = result?.productList?.some(
        //     (existingProduct) =>
        //       existingProduct.productRef === attemptProduct.productRef
        //   );
        //   return !existsInResults;
        // });

        // attemptResult.productList = filteredProductList;

        const keysToExclude = ["totalPrice", "totalTokens"];
        const remainingKeys = Object.keys(attemptResult).filter(
          (key) => !keysToExclude.includes(key)
        );

        if (
          remainingKeys.length > 0 &&
          remainingKeys.every(
            (key) => key === "clientCif" || key === "clientNif"
          )
        ) {
          remainingKeys.forEach((key) => {
            result[key] = attemptResult[key];
          });
        } else {
          result = mergeResults([result, attemptResult]);
        }

        if (
          attemptResult.clientCif &&
          attemptResult.clientCif !== "NOT FOUND" &&
          attemptResult.clientNif &&
          attemptResult.clientNif !== "NOT FOUND"
        ) {
          clientCifFound = true;
          clientNifFound = true;
          console.log(
            `clientCif and clientNif found on attempt ${attempts} for page ${index + 1}`
          );
          break;
        }

        if (attempts < maxAttempts) {
          console.log(`Retrying documentGPT for page ${index + 1}`);
        }
      }

      // ====================== UNCOMMENT BELOW =============================

      if (!clientCifFound || !clientNifFound) {
        console.log(
          `clientCif or clientNif not found after ${maxAttempts} attempts for page ${index + 1
          }, proceeding with processImageSections`
        );

        const sectionResult = await processImageSections(
          imageBuffer,
          token,
          !clientCifFound,
          !clientNifFound
        );

        totalTokens += sectionResult.totalTokens || 0;
        totalPrice += sectionResult.totalPrice || 0;

        if (sectionResult.error) {
          console.error(
            `Error in processImageSections for page ${index + 1}: ${sectionResult.error}`
          );
          allErrors.push({ page: index + 1, error: sectionResult.error });
        } else {
          if (
            sectionResult.clientCif &&
            sectionResult.clientCif !== "NOT FOUND"
          ) {
            result.clientCif = sectionResult.clientCif;
            clientCifFound = true;
            console.log(`Client CIF found: ${sectionResult.clientCif}`);
          }

          if (
            sectionResult.clientNif &&
            sectionResult.clientNif !== "NOT FOUND"
          ) {
            result.clientNif = sectionResult.clientNif;
            clientNifFound = true;
            console.log(`Client NIF found: ${sectionResult.clientNif}`);
          }
        }
      }

      // ====================== UNCOMMENT ABOVE =============================

      // let recheckProducts = await recheckProductList(
      //   token,
      //   imageUrl,
      //   result.productList
      // );

      // result.productList = recheckProducts || result.productList;
      let products = await processProductsSection(imageBuffer, token);
      result.productList = products ? JSON.parse(products) : [];
      totalTokens += 1406;
      totalPrice += 0.00372998;

      allResults.push(result);
    }

    let mergedResult = mergeResults(allResults);

    return {
      ...mergedResult,
      totalTokens,
      totalPrice,
      attachFromEmail: attach.emailId,
      attachFileName: attach.filename,
    };
  } catch (error) {
    console.log("ERROR ON GETATTACHMENTDATA", error);
    return {
      error: error.message || "An unexpected error occurred",
      totalTokens: 0,
      totalPrice: 0,
    };
  }
};



const processEmailsDetailedData = (emailData) => {
  return emailData.reduce((result, emailItem) => {
    console.log("===EMAIL ITEM===", emailItem);
    const fromEmail = emailItem.email.fromEmail;
    const toEmail = emailItem.email.toEmail;
    const emailId = emailItem.attachment.emailId;
    const attachFileName = emailItem.attachment.filename;
    const attachTokens = emailItem.processedData.totalTokens;
    const attachTokensPrice = emailItem.processedData.totalPrice;
    const totalData = emailItem.processedData;

    if (!result[emailId]) {
      result[emailId] = {
        processedAt: new Date(),
        totalTokens: 0,
        totalTokensPrice: 0,
        attachments: {},
      };
    }

    result[emailId].totalTokens += attachTokens;
    result[emailId].totalTokensPrice += attachTokensPrice;
    result[emailId].totalData = totalData;
    result[emailId].fromEmail = fromEmail;
    result[emailId].toEmail = toEmail;
    result[emailId].attachments[attachFileName] = {
      totalTokens: attachTokens,
      totalTokensPrice: attachTokensPrice,
    };

    return result;
  }, {});
};


const xmlFilter = async ({
  email,
  password,
  query,
  userId,
  logs,
  ftpData
}) => {
  try {

    // XML FILEs
    let xmlFile;
    let xmlData;
    let uploadType;
    const file_xml = `${attachment.filename.split(".")[0]}.xml`;
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
      originalname: attachment.filename,
    };

    const tempFilePath = path.join(__dirname, "./temp/" + file_xml);
    await fs.promises.writeFile(tempFilePath, xmlFile.buffer);
    // console.log('Local file path:', localFilePath)

    // Subir directamente desde el buffer

    console.log("File uploaded successfully. ");
  } catch (error) {
    console.log("ERROR ON XML FILTER", error);
  }
}

const ftpFilter = async ({
  email,
  password,
  query,
  userId,
  logs,
  ftpData
}) => {

  try {

    const ftpClient = new ftp.Client();
    // ftpClient.ftp.verbose = true
    const host = ftpData.host || "46.183.119.66";
    const port = ftpData.port || "21";
    const user = ftpData.user || "Aythen";
    const pw = ftpData.password || "Cloud@24";

    await ftpClient.access({
      host,
      port,
      user,
      password: pw,
      secure: false,
      connTimeout: 120000,
      pasvTimeout: 120000,
      keepalive: 30000,
    });

    // console.log('ftpClient', ftpClient)
    await ftpClient.uploadFrom(
      tempFilePath,
      `${uploadType}/${file_xml}`
    );

    // fileData.Body, // Buffer del archivo
    // await fs.promises.unlink(localFilePath)
    await ftpClient.close();
  } catch (error) {
    console.log("ERROR ON FTP FILTER", error);
  }
}

const gmailFilter = async ({
  email,
  password,
  query,
  userId,
  logs,
  // ftpData
}) => {
  try {
    ///
    //
    ///
    const imapConfig = getImapConfig(email, password);
    const imap = await connectToImap(imapConfig);
    await openInbox(imap);

    const emails = await searchEmails(imap, query, userId);

    const filteredEmails = [];
    const processedAttachments = [];

    for (const email of emails) {
      if (email.attachments && email.attachments.length > 0) {
        filteredEmails.push(email);

        for (const attachment of email.attachments) {
          let processedData = await getAttachmentData(attachment);
          let newProcessedData = await calculateTaxesAndDiscounts(processedData.productList);

          processedData.partialAmount = convertToNumber(processedData.partialAmount);
          processedData.productList = newProcessedData;

          processedData.taxesFromPartialAmount = processedData.partialAmount * 0.21;

          processedData = replaceNotFoundWithEmptyString(processedData);
          processedData.clientCif = extractCIF(processedData.clientCif);
          processedData.clientNif = extractNIF(processedData.clientNif);

          console.log("EMAIL", email);
          processedAttachments.push({
            email: {
              subject: email.subject,
              fromEmail: email.fromEmail,
              toEmail: email.toEmail,
              date: email.attrs.date,
              subject: attachment.subject,
            },
            attachment: {
              filename: attachment.filename,
              mimeType: attachment.mimeType,
              size: attachment.size,
              emailId: attachment.emailId,
            },
            processedData,
            xmlContent: obj,
          });
        }
      }
    }

    imap.end();

    ///
    //
    ///

    let dataByEmails = processEmailsDetailedData(processedAttachments);
    console.log('66666666666666666666666666666666666666666')
    console.log("dataByEmails:", dataByEmails);
    // updateClientService({
    //   clientId: userId,
    //   toUpdate: { detailedTokenConsumption: dataByEmails },
    // });



    let totalTokensConsumed = 0
    let totalTokensPrice = 0

    processedAttachments.forEach((attach) => {
      totalTokensConsumed += attach?.processedData?.totalTokens || 0
      totalTokensPrice += attach?.processedData?.totalPrice || 0
    });



    console.log('update account!!!')

    // processedAttachments.forEach((attach) => {
    //   updateClientService({
    //     clientId: userId,
    //     toUpdate: {
    //       tokensConsumed: attach?.processedData?.totalTokens || 0,
    //       totalTokensPrice: attach?.processedData?.totalPrice || 0,
    //     },
    //   });
    // });


    // AUTOMATES

    // const filteredEmailsProcessed = await processDataAndAppend(
    //   "1Qq_YHkphBhmLzZt4Nyyi4FvIOeEYq75zujj2DIMDg9I",
    //   processedAttachments
    // );

    return {
      filteredEmails,
      processedAttachments,
    };
  } catch (err) {
    console.error("Error fetching emails:", err);
    return {
      message: "Failed to fetch emails",
      error: err.message
    };
  }
}



const goAutomate = async (req, res) => {
  // return res.status(200).json({ message: "ok" });
  try {
    let automate = false
    console.log('33333333333333333333333333333333333333333')
    // const { userId, email, password, query, tokenGpt, logs, ftpData } =  req.body;
    // const { folder } = req.body

    const user = req.user
    const id = user._id.split('_').pop()

    console.log('id', user._id, id)

    const dbAccounts = await connectDB('db_accounts')
    const dbAutomations = await connectDB('db_automations')
    const dbAuth = await connectDB(`db_${id}_auth`)

    
    if (!automate) {
      try {
        const file = req.file
        console.log('file', file)
        const path = `${user._id}/`;
        const bucketName = "factura-gpt";
  
        const params = {
          Bucket: bucketName,
          // Key: `${path}${file.originalname}`,
          Key: `${path}FILE-${uuidv4()}_${file.originalname}`,
          Body: file.buffer,
          ContentType: file.mimetype,
        };
  
        await s3.upload(params).promise();
  
        console.log('file uploaded successfully')
        return res.status(200).json({ message: "ok not automations" });
      } catch (error) {
        console.log('error', error)
        return res.status(200).json({ message: "error uploading file" });
      }
    }


    // AUTOMATES
    const account = await dbAccounts.get(user._id)
    console.log('account AUTOMATIONS', account)

    if (!account.automations || account.automations.length === 0) {
      return res.status(200).json({ message: "Not found automations" });
    }

    let { automations } = account
    let docs = []
    console.log('automations', automations)

    for (const automation of automations) {
      console.log('automation', automation)
      const automationData = await dbAutomations.get(automation)
      console.log('automation / data', automationData)

      if (automationData.type === 'Gmail') {
        console.log('FILTER GMAIL')

        const token = await dbAuth.find({
          selector: {
            type: 'gmail'
          }
        })

        console.log('token', token)

        if (token.docs.length === 0) {
          return res.status(200).json({ message: "Not found token" });
        }

        const tokenData = token.docs[0]

        console.log('tokenData', tokenData)


        docs = await gmailFilter({
          userId: user._id,
          email: tokenData?.email,
          password: tokenData?.appPassword,
          query: tokenData?.query,
          logs: tokenData?.logs,
          // ftpData: tokenData.ftpData
        });

      } else if (automationData.type === 'Outlook') {
        console.log('FILTER OUTLOOK')
      } else if (automationData.type === 'WhatsApp') {
        console.log('FILTER WHATSAPP')
      } else if (automationData.type === 'Telegram') {
        console.log('FILTER TELEGRAM')
      } else if (automationData.type === 'Discord') {
        console.log('FILTER DISCORD')
      } else if (automationData.type === 'Slack') {
        console.log('FILTER SLACK')
      } else {
        console.log('FILTER NOT FOUND')
      }
    }


    const resp = await updateAccount({
      id: user._id,
      text: 'hello world'
    }); 

    console.log('resp update account', resp)

    // updateAccount({
    //   id: userId,
    //   tokensConsumed: totalTokensConsumed,
    //   totalTokensPrice: totalTokensPrice,
    // }); 

  } catch (error) {
    console.log("ERRORRRRRRRRRRRR", error);
  }
};



module.exports = {
  goAutomate: catchedAsync(goAutomate),
};
