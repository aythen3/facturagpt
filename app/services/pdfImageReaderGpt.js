const { catchedAsync, response } = require("../utils/err");

const fs = require("fs");
const path = require("path");
const { fromPath } = require("pdf2pic");
const sharp = require("sharp");
const { PDFDocument } = require("pdf-lib");
// const { default: axios } = require("axios");
const convert = require("xml-js");


const { simpleParser } = require("mailparser");

const ftp = require("basic-ftp");

// const { updateClientService } = require("./emailManager");
// const tempDir = "./temp";
const Imap = require("imap");
const { google } = require("googleapis");
// const sheets = google.sheets("v4");
// const { mul } = require("@tensorflow/tfjs");
const facturaXMLPath = path.join(__dirname, "./emailXMLS/fac_data.txt");
const albaranXMLPath = path.join(__dirname, "./emailXMLS/alb_data.txt");

const facturaXML = fs.readFileSync(facturaXMLPath, "utf-8"); // Leer como texto
const albaranXML = fs.readFileSync(albaranXMLPath, "utf-8"); // Leer como texto

const keys = require("./emailManagerRelated/service-account.json");
const nano = require("nano")("http://admin:1234@127.0.0.1:5984");

const allowedExtensions = ["jpg", "png", "webp", "pdf"];

const { addTransaction } = require("./transactions");

const { updateAccount } = require("./user");

const {
  documentGPT,
  getProductsGPT,
  processItems
} = require("./gpt");


// const connectDB = async (tableName) => {
//   let db;
//   try {
//     await nano.db.get(tableName);
//     db = nano.db.use(tableName);
//     return db;
//   } catch (error) {
//     if (error.statusCode === 404) {
//       try {
//         await nano.db.create(tableName);
//         db = nano.db.use(tableName);
//         return db;
//       } catch (createError) {
//         console.log("Error al crear la base de datos:", createError);
//         throw createError;
//       }
//     } else {
//       console.log("Error al obtener información de la base de datos:", error);
//       throw error;
//     }
//   }
// };

const client = new google.auth.JWT(keys.client_email, null, keys.private_key, [
  "https://www.googleapis.com/auth/spreadsheets",
]);



const connectToImap = (config) => {
  // console.log("config", config);
  return new Promise((resolve, reject) => {
    const imap = new Imap(config);

    imap.once("ready", () => resolve(imap));
    imap.once("error", (err) => {
      console.error("IMAP Connection Error:", err);
      reject(err);
    });

    imap.connect();
  });
};

// Open INBOX
const openInbox = (imap) => {
  return new Promise((resolve, reject) => {
    imap.openBox("INBOX", true, (err, box) => {
      if (err) {
        console.error("Error opening INBOX:", err);
        reject(err);
      } else {
        resolve(box);
      }
    });
  });
};


const getImapConfig = (email, password) => {
  const domain = email.split("@")[1];

  let host, port;

  if (domain === "gmail.com") {
    host = "imap.gmail.com";
    port = 993;
  } else if (
    domain === "outlook.com" ||
    domain === "hotmail.com" ||
    domain === "live.com"
  ) {
    host = "imap-mail.outlook.com"; //'outlook.office365.com'
    port = 993;
  } else {
    // throw new Error(`Unsupported email domain: ${domain}`);
    host = "imap.gmail.com";
    port = 993;
  }

  return {
    user: email,
    password: password,
    host: host,
    port: port,
    tls: true,
    tlsOptions: {
      rejectUnauthorized: false,
    },
    authTimeout: 30000,
  };
};



const searchEmails = (imap, searchStrings, clientId) => {
  // console.log("clientId from searchEmails", clientId);
  return new Promise((resolve, reject) => {
    // Dynamically build the search query for multiple strings
    const searchQuery = ["ALL"];

    if (Array.isArray(searchStrings) && searchStrings.length > 0) {
      let combinedConditions = [];
      searchStrings.forEach((searchString) => {
        console.log("searching by", searchString);
        combinedConditions.push(["SUBJECT", searchString]);
        combinedConditions.push(["TEXT", searchString]);
      });

      // Combine all search conditions with "OR"
      let query = combinedConditions.shift(); // Take the first condition
      while (combinedConditions.length > 0) {
        query = ["OR", query, combinedConditions.shift()];
      }

      searchQuery.push(query);
    }

    imap.search(searchQuery, (err, results) => {
      if (err) {
        console.error("Error searching emails:", err);
        reject(err);
        return;
      }

      if (!results || results.length === 0) {
        console.log("No matching emails found");
        resolve([]);
        return;
      }

      const fetch = imap.fetch(results, { bodies: "", struct: true });
      const emails = [];
      const fetchPromises = [];

      fetch.on("message", (msg, seqno) => {
        const email = {
          seqno,
          attrs: null,
          attachments: [],
          subject: "",
        };

        const parserPromise = new Promise((resolveMessage, rejectMessage) => {
          let rawMessage = "";

          msg.on("body", (stream) => {
            stream.on("data", (chunk) => {
              rawMessage += chunk.toString("utf8");
            });

            stream.once("end", async () => {
              try {
                const parsed = await simpleParser(rawMessage);
                // console.log("parsed email", parsed);
                // console.log("parsedMessageId", parsed.messageId);
                // if (logs && logs.includes(parsed.messageId)) {
                //   console.log("Email already processed");
                //   resolveMessage();
                //   return;
                // }

                // updateClientService({
                //   clientId,
                //   toUpdate: { processedEmails: [parsed.messageId] },
                // });


                // const response = await updateAccount({
                //   id: clientId,
                //  processedEmails: [parsed.messageId],
                // });

                // console.log("response!!!!", response);
                email.ref = parsed.messageId
                email.fromEmail = parsed.from.value || "";
                email.toEmail = parsed.to.value || "";
                email.subject = parsed.subject || "";
                email.emailId = parsed.messageId;
                email.url = `https://mail.google.com/mail/u/0/#search/rfc822msgid%3A${encodeURIComponent(
                  parsed.messageId
                )}`;


                const response = await addTransaction({
                  id: clientId,
                  transaction: email,
                  // transaction: parsed.messageId
                  // processedEmails: [parsed.messageId],
                })

                console.log('response 1234567', response)



                email.attachments = parsed.attachments
                  .filter((att) =>
                    allowedExtensions.includes(
                      att.filename.split(".").pop().toLowerCase()
                    )
                  )
                  .map((att) => {
                    // console.log("ATTACHMENT DATA", att);
                    return {
                      mimeType: att.contentType,
                      filename: att.filename,
                      buffer: att.content,
                      size: att.size,
                      emailId: parsed.messageId,
                    };
                  });




                resolveMessage();
              } catch (error) {
                console.error("Error parsing email:", error);
                rejectMessage(error);
              }
            });
          });

          msg.on("attributes", (attrs) => {
            email.attrs = attrs;
          });

          msg.once("end", () => {
            emails.push(email);
          });
        });

        fetchPromises.push(parserPromise);
      });

      fetch.once("error", (err) => {
        console.error("Error fetching emails:", err);
        reject(err);
      });

      fetch.once("end", () => {
        Promise.all(fetchPromises)
          .then(() => resolve(emails))
          .catch(reject);
      });
    });
  });
};



const replaceNotFoundWithEmptyString = (obj) => {
  for (const key in obj) {
    if (obj[key] === "NOT FOUND" || obj[key] === "notfound") {
      obj[key] = ""; // Cambia "NOT FOUND" por un string vacío
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      // Si es un objeto, llama recursivamente a la función
      obj[key] = replaceNotFoundWithEmptyString(obj[key]);
    }
  }
  return obj;
};

const extractCIF = (inputString) => {
  if (!inputString) return "";

  const sanitizedString = inputString.replace(/[\s-]/g, "");

  const cifMatch = sanitizedString.match(/(?:ES)?([A-Z])(\d{8})/i);

  if (!cifMatch) {
    return inputString;
  }

  const [, letter, numbers] = cifMatch;

  return `${letter.toUpperCase()}${numbers}`;
};

const extractNIF = (inputString) => {
  const numbersMatch = inputString?.match(/\d{8}/);
  if (!numbersMatch) return inputString;

  const numbers = numbersMatch[0];
  const regex = /[A-Z]/;
  const after = inputString.slice(numbersMatch.index + 8).match(regex);

  return after ? `${numbers}${after[0]}` : inputString;
};


const prepareValuesForGoogleSheet = (data) => {
  const { productList, ...rest } = data;
  const productListLength = productList?.length;

  return [
    rest.documentType,
    rest.invoiceDate,
    `${rest.expirationDateYear}-${rest.expirationDateMonth}-${rest.expirationDateDay}`,
    rest.numberDocument,
    rest.clientCif,
    rest.clientNif,
    rest.clientName,
    rest.clientAddress,
    rest.clientCity,
    rest.clientZip,
    rest.conditionPay,
    rest.partialAmount,
    rest.discountAmount,
    rest.totalAmount,
    productListLength,
    rest.attachFileName,
  ];
};

const appendDataToGoogleSheet = async (spreadsheetId, data) => {
  // console.log("spreadsheetId =============", spreadsheetId);
  // console.log("data =============", data);
  const headers = [
    "Document Type",
    "Invoice Date",
    "Expiration Date",
    "Document Number",
    "Client CIF",
    "Client NIF",
    "Client Name",
    "Client Address",
    "Client City",
    "Client Zip",
    "Payment Condition",
    "Partial Amount",
    "Discount Amount",
    "Total Amount",
    "Product Count",
    "Attachment File Name",
  ];
  const sheetsInstance = google.sheets({ version: "v4", auth: client });

  try {
    const readResponse = await sheetsInstance.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: "Hoja 1!A1:Z1",
    });

    if (!readResponse.data.values || readResponse.data.values.length === 0) {
      await sheetsInstance.spreadsheets.values.append({
        spreadsheetId,
        range: "Hoja 1!A1",
        valueInputOption: "RAW",
        resource: { values: [headers] },
      });
    }
  } catch (err) {
    console.error(
      "Read operation failed, assuming need for headers:",
      err.message
    );

    await sheetsInstance.spreadsheets.values.update({
      spreadsheetId,
      range: "Hoja 1!A1",
      valueInputOption: "RAW",
      resource: { values: [headers] },
    });
  }

  const resource = { values: [data] };
  const request = {
    spreadsheetId,
    range: "Hoja 1",
    valueInputOption: "RAW",
    resource,
  };

  try {
    const response = await sheetsInstance.spreadsheets.values.append(request);
    // console.log("Data appended:", response.data);
  } catch (err) {
    console.error("API returned an error during append:", err);
  }
};

const processDataAndAppend = async (spreadsheetId, items) => {
  for (const item of items) {
    if (item?.processedData) {
      const data = prepareValuesForGoogleSheet(item?.processedData);
      await appendDataToGoogleSheet(spreadsheetId, data);
    }
  }
};

const calculateTaxesAndDiscounts = (products) => {
  return products.map((product) => {
    let {
      productQuantity,
      productPartial,
      productDiscountRate,
      productImport,
    } = product;

    productQuantity = Number(productQuantity) || 0;
    productPartial = Number(productPartial) || 0;
    productDiscountRate = Number(productDiscountRate) || 0;
    productImport = Number(productImport) || 0;

    const productImportWithoutDiscount = parseFloat(
      (productQuantity * productPartial).toFixed(2)
    );
    const productDiscountAmount = parseFloat(
      (
        productImportWithoutDiscount -
        (productImportWithoutDiscount -
          (productImportWithoutDiscount * productDiscountRate) / 100)
      ).toFixed(2)
    );
    const productImportWithTaxes = parseFloat(
      (productImport * 1.21).toFixed(2)
    );

    return {
      ...product,
      productImportWithoutDiscount: productImportWithoutDiscount.toFixed(2),
      productDiscountAmount: productDiscountAmount.toFixed(2),
      productImportWithTaxes: productImportWithTaxes.toFixed(2),
      productDiscountRate: productDiscountRate.toFixed(2),
    };
  });
};

const convertToNumber = (input) => {
  const number = parseFloat(input);

  if (isNaN(number)) {
    return 0;
  }

  return parseFloat(number.toFixed(2));
};




const mergeResults = (resultsArray) => {
  // console.log("resultsArray from mergeResults", resultsArray);
  const mergedResult = {};

  resultsArray.forEach((result) => {
    for (const key in result) {
      if (Array.isArray(result[key])) {
        mergedResult[key] = mergedResult[key] || [];
        mergedResult[key] = [...mergedResult[key], ...result[key]];
        mergedResult[key] = removeDuplicatesFromArray(mergedResult[key]);
      } else if (typeof result[key] === "object" && result[key] !== null) {
        mergedResult[key] = mergedResult[key] || {};
        mergedResult[key] = { ...mergedResult[key], ...result[key] };
      } else {
        if (!mergedResult[key]) {
          mergedResult[key] = result[key];
        }
      }
    }
  });

  return mergedResult;
};

const removeDuplicatesFromArray = (array) => {
  const seen = new Set();
  return array.filter((item) => {
    const serializedItem = JSON.stringify(item);
    return seen.has(serializedItem) ? false : seen.add(serializedItem);
  });
};


const convertPDFToPNG = async (buffer) => {
  const tempDir = path.join(__dirname, "./temp");
  const tempPdfPath = path.join(tempDir, "temp.pdf");

  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  await fs.promises.writeFile(tempPdfPath, buffer);

  const pdfDoc = await PDFDocument.load(buffer);
  const totalPages = pdfDoc.getPageCount();

  const pdf2pic = fromPath(tempPdfPath, {
    density: 600,
    saveFilename: "temp",
    savePath: tempDir,
    format: "png",
    width: 1536,
    height: 2048,
  });

  const imageBuffers = [];

  for (let page = 1; page <= totalPages; page++) {
    try {
      const pageResult = await pdf2pic(page, { responseType: "image" });

      if (pageResult && pageResult.path) {
        const pngBuffer = await fs.promises.readFile(pageResult.path);
        imageBuffers.push(pngBuffer);

        await fs.promises.unlink(pageResult.path);
      } else {
        console.warn(`Failed to convert page ${page} to PNG`);
      }
    } catch (error) {
      console.error(`Error converting page ${page} to PNG:`, error);
    }
  }

  await fs.promises.unlink(tempPdfPath);

  return imageBuffers;
};

const processImageSections = async (
  imageBuffer,
  token,
  searchCif = false,
  searchNif = false
) => {
  try {
    if (!searchCif && !searchNif) {
      throw new Error("At least one of searchCif or searchNif must be true.");
    }

    const image = sharp(imageBuffer);
    const metadata = await image.metadata();

    if (!metadata.width || !metadata.height) {
      throw new Error("Invalid image dimensions.");
    }

    const { width, height } = metadata;

    // console.log("Image dimensions", width, height);

    const sections = [
      {
        name: "Left Side",
        left: 0,
        top: Math.round(height * 0.2),
        width: Math.round(width * 0.15),
        height: Math.round(height * 0.6),
        rotate: true,
      },
      {
        name: "Bottom",
        left: Math.round(width * 0.1),
        top: Math.round(height * 0.9),
        width: Math.round(width * 0.9),
        height: Math.round(height * 0.1 - 1),
        rotate: false,
      },
      {
        name: "Right Side",
        left: Math.round(width * 0.85 - 1),
        top: Math.round(height * 0.2),
        width: Math.round(width * 0.15),
        height: Math.round(height * 0.6),
        rotate: true,
      },
    ];

    for (const section of sections) {
      const sectionImage = sharp(imageBuffer);

      const validSection = {
        left: Math.max(0, Math.min(section.left, width)),
        top: Math.max(0, Math.min(section.top, height)),
        width: Math.max(1, Math.min(section.width, width - section.left)),
        height: Math.max(1, Math.min(section.height, height - section.top)),
      };

      console.log(`Processing section "${section.name}"`);

      if (validSection.width <= 0 || validSection.height <= 0) {
        console.warn(`Skipping invalid section: ${section.name}`);
        continue;
      }

      try {
        let sectionBuffer = await sectionImage.extract(validSection).toBuffer();
        if (section.rotate) {
          sectionBuffer = await sharp(sectionBuffer).rotate(90).toBuffer();
        }
        const sectionImageUrl = `data:image/png;base64,${sectionBuffer.toString("base64")}`;

        const imageSize = `${validSection.width}x${validSection.height}`;

        console.log(`Calling documentGPT for section: ${section.name}`);
        const result = await documentGPT({
          token,
          image: sectionImageUrl,
          searchCif,
          searchNif,
          imageSize,
        });

        if (result.error) {
          console.warn(
            `Error in documentGPT for section "${section.name}": ${result.error}`
          );
          continue;
        }

        if (searchCif && result.clientCif && result.clientCif !== "NOT FOUND") {
          console.log(
            `Client CIF found in section: ${section.name}, CIF: ${result.clientCif}`
          );
          return result;
        }

        if (searchNif && result.clientNif && result.clientNif !== "NOT FOUND") {
          console.log(
            `Client NIF found in section: ${section.name}, NIF: ${result.clientNif}`
          );
          return result;
        }
      } catch (sectionError) {
        console.error(
          `Error processing section "${section.name}":`,
          sectionError
        );
      }
    }

    console.warn("Client CIF or NIF not found in any image section.");
    return { error: "Client CIF or NIF not found in any image section" };
  } catch (error) {
    console.error("Error in processImageSections:", error);
    return { error: error.message || "Failed to process image sections" };
  }
};


const processProductsSection = async (imageBuffer, token) => {
  try {
    const image = sharp(imageBuffer);
    const metadata = await image.metadata();

    if (!metadata.width || !metadata.height) {
      throw new Error("Invalid image dimensions.");
    }

    const { width, height } = metadata;
    // console.log("Image dimensions", width, height);

    const sectionImage = sharp(imageBuffer);
    const validSection = {
      left: 50,
      top: Math.round(height * 0.2),
      width: Math.round(width - 50),
      height: Math.round(height * 0.6),
    };

    console.log(`Processing section "Products Section"`);

    try {
      const rawSectionBuffer = await sectionImage
        .extract(validSection)
        .toBuffer();

      const sectionBuffer = await sharp(rawSectionBuffer)
        .png({ quality: 100 })
        .toBuffer();

      // fs.writeFileSync("products_section.png", sectionBuffer);
      // console.log("Saved converted section as products_section.png");

      const sectionImageUrl = `data:image/png;base64,${sectionBuffer.toString("base64")}`;
      const imageSize = `${validSection.width}x${validSection.height}`;

      console.log("Calling getProductsGPT for FIRST pass");
      const firstPassResult = await getProductsGPT({
        token,
        image: sectionImageUrl,
        imageSize,
      });
      console.log(
        "First pass result:",

        firstPassResult
        // JSON.parse(firstPassResult).map((item) => item.productDescription)
      );

      let firstPassProducts = [];
      try {
        firstPassProducts = JSON.parse(firstPassResult);
      } catch (parseError) {
        console.error("Could not parse first pass JSON:", parseError);
        return firstPassResult;
      }

      console.log("Calling for SECOND pass with previous data");
      const secondPassResult = await getProductsGPT({
        token,
        image: sectionImageUrl,
        imageSize,
        previousData: firstPassProducts,
      });
      console.log('secondPassResult', secondPassResult)
      console.log(
        "RETURNING DATA FROM PRODUCTS SECTION (Refined):",
        JSON.parse(secondPassResult).map((item) => item.productDescription)
      );
      return secondPassResult;
    } catch (sectionError) {
      console.error("Error processing document:", sectionError);
      return { error: sectionError.message };
    }
  } catch (error) {
    console.error("Error in processProductsSection:", error);
    return { error: error.message || "Failed to process image sections" };
  }
};





const fetchEmailsByQuery = async (req, res) => {
  // return res.status(200).json({ message: "ok" });
  try {

    console.log('33333333333333333333333333333333333333333')
    const { userId, email, password, query, tokenGpt, logs, ftpData } =
      req.body;

    // console.log("On fetchEmailsByQuery", {
    //   userId,
    //   email,
    //   password,
    //   query,
    //   logs,
    // });


    if (!email || !password || !query) {
      return res.status(400).json({ message: "Missing required parameters" });
    }

    // console.log("EMAIL FETCH REQUEST BACK:", {
    //   userId,
    //   email,
    //   query,
    //   password,
    // });

    const imapConfig = getImapConfig(email, password);
    // console.log("imapConfig", imapConfig);

    try {

      console.log('44444444444444444444444444444444444444444')
      const imap = await connectToImap(imapConfig);
      await openInbox(imap);


      const emails = await searchEmails(imap, query, userId);
      console.log(
        `Found ${emails.length} emails matching query: ${query}`,
        // emails
        logs
      );


      console.log('55555555555555555555555555555555555555555')

      const filteredEmails = [];
      const processedAttachments = [];

      console.log('5111', emails)
      for (const email of emails) {
        if (email.attachments && email.attachments.length > 0) {
          console.log('funca0')
          filteredEmails.push(email);

          for (const attachment of email.attachments) {
            console.log('funca1')
            let processedData = await getAttachmentData(attachment);
            console.log(
              "PRODUCT LIST BEFORE CALCULATING TAXES/DISCOUNTS",
              processedData.productList
            );

            let newProcessedData = await calculateTaxesAndDiscounts(
              processedData.productList
            );
            console.log(
              "PRODUCT LIST AFTER CALCULATING TAXES/DISCOUNTS",
              newProcessedData
            );
            processedData.partialAmount = convertToNumber(
              processedData.partialAmount
            );
            processedData.productList = newProcessedData;

            processedData.taxesFromPartialAmount =
              processedData.partialAmount * 0.21;

            processedData = replaceNotFoundWithEmptyString(processedData);
            console.log("clientCif", processedData.clientCif);
            processedData.clientCif = extractCIF(processedData.clientCif);
            console.log("clientNif", processedData.clientNif);
            processedData.clientNif = extractNIF(processedData.clientNif);

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

            // console.log("processedData", processedData);

            const obj = processItems(xmlData, processedData);

            let text = convert.json2xml(JSON.stringify(obj), {
              compact: true,
              spaces: 4,
            });

            xmlFile = {
              buffer: text,
              originalname: attachment.filename,
            };

            const tempFilePath = path.join(__dirname, "./temp/" + file_xml);

            // Escribe el contenido en el archivo
            // fs.writeFileSync(tempFilePath, xmlFile.buffer, 'utf-8')

            // const localFilePath = path.join(__dirname, file_xml)
            await fs.promises.writeFile(tempFilePath, xmlFile.buffer);
            // console.log('Local file path:', localFilePath)

            // Subir directamente desde el buffer

            console.log("File uploaded successfully. ");

            // COMENTAMOS MOMENTANEAMENTE EL FTP -------------------------------

            // Tenemos listas las credentials del ftp en ftpData (checkear cuando volvamos al ssh)

            // const ftpClient = new ftp.Client();
            // // ftpClient.ftp.verbose = true
            // const host = ftpData.host || "46.183.119.66";
            // const port = ftpData.port || "21";
            // const user = ftpData.user || "Aythen";
            // const pw =  ftpData.password || "Cloud@24";

            // await ftpClient.access({
            //   host,
            //   port,
            //   user,
            //   password: pw,
            //   secure: false,
            //   connTimeout: 120000,
            //   pasvTimeout: 120000,
            //   keepalive: 30000,
            // });

            // // console.log('ftpClient', ftpClient)
            // await ftpClient.uploadFrom(
            //   tempFilePath,
            //   `${uploadType}/${file_xml}`
            // );

            // // fileData.Body, // Buffer del archivo
            // // await fs.promises.unlink(localFilePath)
            // await ftpClient.close();
            // ---------------------------------------------------------------------
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

      console.log('66666666666666666666666666666666666666666')
      let dataByEmails = processEmailsDetailedData(processedAttachments);
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

      updateAccount({
        id: userId,
        tokensConsumed: totalTokensConsumed,
        totalTokensPrice: totalTokensPrice,
      }); 
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

      return res.status(200).json({
        filteredEmails,
        processedAttachments,
      });
    } catch (err) {
      console.error("Error fetching emails:", err);
      return res
        .status(500)
        .json({ message: "Failed to fetch emails", error: err.message });
    }
  } catch (error) {
    console.log("ERRORRRRRRRRRRRR", error);
  }
};





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

module.exports = {
  fetchEmailsByQuery: catchedAsync(fetchEmailsByQuery),
};
