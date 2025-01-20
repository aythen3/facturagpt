const { catchedAsync, response } = require("../utils/err");

const fs = require("fs");
const path = require("path");
const { fromPath } = require("pdf2pic");
const sharp = require("sharp");
const { PDFDocument } = require("pdf-lib");
const { default: axios } = require("axios");
const convert = require("xml-js");
const Imap = require("imap");
const facturaXMLPath = path.join(__dirname, "./emailXMLS/fac_data.txt");
const albaranXMLPath = path.join(__dirname, "./emailXMLS/alb_data.txt");
const { simpleParser } = require("mailparser");
const allowedExtensions = ["jpg", "png", "webp", "pdf"];
const facturaXML = fs.readFileSync(facturaXMLPath, "utf-8"); // Leer como texto
const albaranXML = fs.readFileSync(albaranXMLPath, "utf-8"); // Leer como texto
const ftp = require("basic-ftp");
const { updateClientService } = require("./emailManager");
const tempDir = "./temp";
const { google } = require("googleapis");
const sheets = google.sheets("v4");
const keys = require("./emailManagerRelated/service-account.json");
const { mul } = require("@tensorflow/tfjs");
const nano = require("nano")("http://admin:1234@127.0.0.1:5984");

const connectDB = async (tableName) => {
  let db;
  try {
    await nano.db.get(tableName);
    db = nano.db.use(tableName);
    return db;
  } catch (error) {
    if (error.statusCode === 404) {
      try {
        await nano.db.create(tableName);
        db = nano.db.use(tableName);
        return db;
      } catch (createError) {
        console.log("Error al crear la base de datos:", createError);
        throw createError;
      }
    } else {
      console.log("Error al obtener información de la base de datos:", error);
      throw error;
    }
  }
};

const client = new google.auth.JWT(keys.client_email, null, keys.private_key, [
  "https://www.googleapis.com/auth/spreadsheets",
]);

const connectToImap = (config) => {
  console.log("config", config);
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

const searchEmails = (imap, searchStrings, logs, clientId) => {
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

                if (logs && logs.includes(parsed.messageId)) {
                  console.log("Email already processed");
                  resolveMessage();
                  return;
                }

                updateClientService({
                  clientId,
                  toUpdate: { processedEmails: [parsed.messageId] },
                });
                email.fromEmail = parsed.from.value || "";
                email.toEmail = parsed.to.value || "";
                email.subject = parsed.subject || "";
                email.emailId = parsed.messageId;
                email.url = `https://mail.google.com/mail/u/0/#search/rfc822msgid%3A${encodeURIComponent(
                  parsed.messageId
                )}`;
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

function processItems(obj, gpt) {
  let forLines = {};
  function getDateComponent(dateString, opt) {
    const dateParts = dateString.split("/");
    let date;

    if (dateParts.length === 3) {
      const [day, month, year] = dateParts;
      date = new Date(`${year}-${month}-${day}`);
    } else {
      date = new Date(dateString);
    }

    if (isNaN(date)) {
      return "";
    }

    switch (opt) {
      case "day":
        return String(date.getDate());
      case "month":
        return String(date.getMonth() + 1);
      case "year":
        return String(date.getFullYear());
      default:
        return "";
    }
  }

  function replaceRecursive(variableName, innerGpt, gptTotal) {
    let gpt = innerGpt;
    let opt = variableName.split("::")[1];
    let name = variableName.split("::")[0];

    if (!gpt[name] && name === "invoiceDate") {
      gpt = gptTotal;

      if (gpt[name] && typeof gpt[name] === "string") {
        let dateResponse = getDateComponent(gpt[name], opt);
        return dateResponse;
      }
    }

    let updatedGPT = gpt[name];

    let replacementValue = "";

    // Handle number values
    if (typeof updatedGPT === "string") {
      let dateResponse = getDateComponent(updatedGPT, opt);
      return dateResponse;
    }
    if (typeof updatedGPT === "number" && Number.isFinite(updatedGPT)) {
      let operator = opt.charAt(0);
      let value = opt.slice(1);

      if (typeof value === "string" && gpt[value]) {
        value = parseFloat(gpt[value]);
      } else {
        value = parseFloat(value);
      }

      if (operator === "+") {
        replacementValue = (updatedGPT + value).toFixed(3);
      } else if (operator === "-") {
        replacementValue = (updatedGPT - value).toFixed(3);
      } else if (operator === "*" || operator === "x") {
        replacementValue = (updatedGPT * value).toFixed(3);
      } else if (operator === "/" || operator === ":" || operator === "%") {
        replacementValue = (updatedGPT / value).toFixed(3);
      } else {
        console.log("Operador no válido");
      }
    } else if (updatedGPT instanceof Date && !isNaN(updatedGPT.getTime())) {
      const year = updatedGPT.getFullYear();
      const month = updatedGPT.getMonth() + 1;
      const day = updatedGPT.getDate();

      if (opt === "quarter") {
        replacementValue = Math.floor((month - 1) / 3) + 1;
      } else if (opt === "year") {
        replacementValue = year;
      } else if (opt === "month") {
        replacementValue = month;
      } else if (opt === "day") {
        replacementValue = day;
      }
    }

    return replacementValue;
  }

  function searchRecursive(currentObj, parentKey = null, parentData = null) {
    let modifiedObj = { ...currentObj };

    function isNumericKeyedObject(obj) {
      return (
        Object.keys(obj).length > 0 &&
        Object.keys(obj).every((key) => !isNaN(key))
      );
    }

    for (let key in modifiedObj) {
      if (
        modifiedObj[key] &&
        modifiedObj[key]._attributes &&
        modifiedObj[key]._attributes["for-data"]
      ) {
        // console.log("key===", key);
        const variable = modifiedObj[key]._attributes["for-data"];
        // console.log("VARIABLE===", variable);

        if (!forLines[variable]) {
          forLines[variable] = { n: 0 };
        }

        delete modifiedObj[key]._attributes;
        let updatedArray = [];

        if (gpt[variable] && Array.isArray(gpt[variable])) {
          for (let i = 0; i < gpt[variable].length; i++) {
            let clonedItem = JSON.parse(JSON.stringify(modifiedObj[key]));
            clonedItem = searchRecursive(clonedItem, key, variable);

            clonedItem._attributes = { id: i + 1 };
            updatedArray.push(clonedItem);
            forLines[variable].n++;
          }
        }

        modifiedObj[key] = updatedArray;
      } else if (
        typeof modifiedObj[key] === "object" &&
        modifiedObj[key] !== null
      ) {
        if (isNumericKeyedObject(modifiedObj[key])) {
          let updatedArray = [];
          for (let i = 0; i < modifiedObj[key].length; i++) {
            let clonedItem = JSON.parse(JSON.stringify(modifiedObj[key][i]));
            clonedItem = searchRecursive(clonedItem, key, parentData);
            updatedArray.push(clonedItem);
          }

          modifiedObj[key] = updatedArray;
        } else {
          modifiedObj[key] = searchRecursive(modifiedObj[key], key, parentData);
        }
      } else if (
        typeof modifiedObj[key] === "string" &&
        modifiedObj[key].match(/^\%.*\%$/)
      ) {
        let variableName = modifiedObj[key].slice(1, -1);
        let replacementValue = "";
        let valueGPT = gpt;

        if (!gpt[variableName] && parentData && forLines[parentData]) {
          const n = forLines[parentData].n;
          valueGPT = {
            ...gpt[parentData][n],
            n: n + 1,
          };
        }

        replacementValue = valueGPT.hasOwnProperty(variableName)
          ? valueGPT[variableName]
          : "";
        // : 'notfound'

        if (variableName.includes("::")) {
          replacementValue = replaceRecursive(variableName, valueGPT, gpt);
          // console.log('::', variableName, replacementValue)
        }
        // console.log('key to replace', key, 'object',modifiedObj,'replacement value', replacementValue)
        modifiedObj[key] = replacementValue;
      }
    }

    return modifiedObj;
  }

  // console.log("obj", obj);

  return searchRecursive(obj);
}

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
// const extractCIF = (inputString) => {
//   const numbersMatch = inputString.match(/\d{8}/);
//   if (!numbersMatch) return inputString;

//   const numbers = numbersMatch[0];
//   const regex = /[ABCDEFGH]/;
//   const before = inputString.slice(0, numbersMatch.index).match(regex);
//   const after = inputString.slice(numbersMatch.index + 8).match(regex);

//   let letter = null;
//   if (before) letter = before[0];
//   else if (after) letter = after[0];

//   return letter ? `${letter}${numbers}` : inputString;
// };
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
    throw new Error(`Unsupported email domain: ${domain}`);
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
        productImport -
        (productImport - (productImport * productDiscountRate) / 100)
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

const fetchEmailsByQuery = async (req, res) => {
  try {
    const { userId, email, password, query, tokenGpt, logs, ftpData } =
      req.body;

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
      const imap = await connectToImap(imapConfig);
      await openInbox(imap);

      const emails = await searchEmails(imap, query, logs, userId);
      // console.log(
      //   `Found ${emails.length} emails matching query: ${query}`,
      //   emails
      // );

      const filteredEmails = [];
      const processedAttachments = [];

      for (const email of emails) {
        if (email.attachments && email.attachments.length > 0) {
          filteredEmails.push(email);

          for (const attachment of email.attachments) {
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

      let dataByEmails = processEmailsDetailedData(processedAttachments);
      // console.log("dataByEmails:", dataByEmails);
      updateClientService({
        clientId: userId,
        toUpdate: { detailedTokenConsumption: dataByEmails },
      });

      processedAttachments.forEach((attach) => {
        updateClientService({
          clientId: userId,
          toUpdate: {
            tokensConsumed: attach?.processedData?.totalTokens || 0,
            totalTokensPrice: attach?.processedData?.totalPrice || 0,
          },
        });
      });

      const filteredEmailsProcessed = await processDataAndAppend(
        "1Qq_YHkphBhmLzZt4Nyyi4FvIOeEYq75zujj2DIMDg9I",
        processedAttachments
      );

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

async function extractCodeBlocks(fullCode) {
  try {
    const regexTripleQuotes = /```(\w+)[\s\S]*?```/g;
    let matchesTripleQuotes = [...fullCode.matchAll(regexTripleQuotes)];

    if (matchesTripleQuotes.length > 0) {
      const codeBlock = matchesTripleQuotes[0][0];
      const codeType = matchesTripleQuotes[0][1].toLowerCase();

      const cleanedCodeBlock = codeBlock
        .replace(/```(\w+)/, "")
        .replace(/```$/, "")
        .trim();

      const cleanedCodeWithoutComments = cleanedCodeBlock
        .split("\n")
        .filter((line) => !line.trim().startsWith("//"))
        .join("\n");

      return [codeType, cleanedCodeWithoutComments];
    } else {
      const regexComments = /^\/\/.*$/gm;
      const cleanedCodeWithoutComments = fullCode
        .replace(regexComments, "")
        .trim();

      return ["plaintext", cleanedCodeWithoutComments];
    }
  } catch (error) {
    console.error("Error in extractCodeBlocks:", error);
    return [
      "error",
      { error: error.message || "Error extracting code blocks" },
    ];
  }
}

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

const documentGPT = async ({
  token,
  image,
  document,
  searchCif = false,
  searchNif = false,
  imageSize = "1536x2048",
  recheckProducts = false,
}) => {
  let systemPrompt;

  if (searchNif && searchCif) {
    systemPrompt = `Busca ambos atributos: el CIF y el NIF del cliente.
    
    - **CIF**: Puede aparecer como "CIF", "C.I.F.", o variantes similares. 
      - Representado por 1 letra seguida de 8 números, separados opcionalmente por guiones o espacios (por ejemplo, "A-53466839").
      - Si encuentras el valor con la letra "A" y el número "58861311", descártalo, ya que corresponde al vendedor.
      - Puede aparecer sin estar precedido por ninguna etiqueta que haga referencia al CIF. (por ejemplo, "A53466839").
      - Si encuentras el CIF, devuélvelo como un objeto con la propiedad "clientCif" y ese valor. Si no encuentras ninguno, usa {"clientCif": "NOT FOUND"}.
  
    - **NIF**: Puede aparecer como "NIF", "N.I.F." o variantes similares.
      - Para ciudadanos con DNI: 8 números seguidos de una letra (por ejemplo, "12345678Z").
      - Para otros: 1 letra, 7 números, y otra letra (por ejemplo, "X1234567L").
      - Si encuentras el NIF, devuélvelo como un objeto con la propiedad "clientNif" y ese valor. Si no encuentras ninguno, usa {"clientNif": "NOT FOUND"}.
  
  Devuelve los resultados como un JSON válido, incluyendo ambos atributos.`;
  } else if (searchNif) {
    systemPrompt = `Busca el NIF del cliente (puede aparecer como "NIF", "N.I.F." o variantes similares).
    
    - **Formato del NIF**:
      - Para ciudadanos con DNI: 8 números seguidos de una letra (por ejemplo, "12345678Z").
      - Para otros: 1 letra, 7 números, y otra letra (por ejemplo, "X1234567L").
    
    - Si encuentras el NIF, devuélvelo como un objeto con la propiedad "clientNif" y ese valor.
    - Si no encuentras ningún NIF del cliente, devuelve {"clientNif": "NOT FOUND"}.`;
  } else if (searchCif) {
    systemPrompt = `Busca el CIF del cliente (puede aparecer como "CIF", "C.I.F." o variantes similares).
    
    - **Formato del CIF**:
      - Representado por 1 letra seguida de 8 números, separados opcionalmente por guiones o espacios (por ejemplo, "A-53466839").
      - Puede incluir un prefijo "ES" (por ejemplo, "ES A53466839").
    
    - **Validaciones**:
      - Si encuentras el valor con la letra "A" y el número "58861311", descártalo, ya que corresponde al vendedor.
    
    - **Respuesta**:
      - Si encuentras el CIF, devuélvelo como un objeto con la propiedad "clientCif" y ese valor.
      - Si no encuentras ninguno, devuelve {"clientCif": "NOT FOUND"}.`;
  } else if (recheckProducts) {
    systemPrompt = `Tu objetivo es verificar los productos que se encuentran en el objeto proporcionado y determinar si son correctos o incorrectos. Analiza profundamente la imagen. Manten el mismo formato exacto para la respuesta. Haz las correcciones necesarias, puede que algunos productRef no existan en la imagen, debes eliminarlos.`;
  } else {
    systemPrompt = `Tu objetivo es detectar atributos y devolver un bloque de código. 
    
    - **Formato de la Respuesta**:
      Si no encuentras ningún atributo, devuelve {"error": true}.
      Devuelve en formato JSON correcto:
      {
        "param1": "valor encontrado",
        "param2": "valor encontrado",
        ...
      }
    
    - **Atributos a detectar**:
      ${document?.prompt || "Sin especificar"}
    `;
  }

  const agents = searchCif || searchNif ? [] : document?.agents;

  if (agents && agents.length > 0) {
    systemPrompt += `\n\nTodas las condiciones extras añádelas en una clave "agent" que es un objeto con clave del id de la condición extra y valor booleano.
		Pon true si es verdadero, false si no es correcto, y si no hay información posible para contestar, pon null.\n`;

    agents.forEach((agent) => {
      systemPrompt += `\nCondición extra ${agent.id}: ${agent.prompt}\n`;
    });
  }

  const conversation = [
    {
      role: "user",
      content: [
        {
          type: "image_url",
          image_url: {
            url: image,
            detail: "high",
            size: imageSize,
          },
        },
        {
          type: "text",
          text: systemPrompt,
        },
      ],
    },
  ];

  try {
    const body = {
      model: "gpt-4o-mini",
      temperature: 0.3,
      max_tokens: 12096,
      messages: conversation,
    };

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = response.data.choices[0].message.content;
    // console.log("result", result);

    // Calculate token usage for text (input + output)
    const inputTokens = systemPrompt.split(/\s+/).length;
    const outputTokens = result.split(/\s+/).length;
    const totalTokens = inputTokens + outputTokens;

    // Token pricing
    // $0.150 per 1M input tokens = $0.00000015 per input token
    // $0.600 per 1M output tokens = $0.0000006 per output token
    const pricePerToken = {
      input: 0.00000015,
      output: 0.0000006,
    };

    // Text token-based cost
    const totalPriceTokens =
      inputTokens * pricePerToken.input + outputTokens * pricePerToken.output;

    // Calculate image cost based on size
    // Baseline: 2048x2048 = 4,194,304 pixels → $0.003825 total
    const [widthStr, heightStr] = imageSize.split("x");
    const imageWidth = parseInt(widthStr, 10);
    const imageHeight = parseInt(heightStr, 10);

    const baselineWidth = 1536;
    const baselineHeight = 2048;
    const baselinePixels = baselineWidth * baselineHeight;
    const baselineCost = 0.003825; // cost for 1536x2048 image

    // Cost per pixel
    const costPerPixel = baselineCost / baselinePixels;

    // Calculate the cost for the given image size
    const pixels = imageWidth * imageHeight;
    const imageCost = pixels * costPerPixel;

    // Final price = token text cost + image cost
    const finalPrice = totalPriceTokens + imageCost;

    let [codeType, cleanedCode] = await extractCodeBlocks(result);

    let parsedResponse;
    try {
      parsedResponse = JSON.parse(cleanedCode);
    } catch (parseError) {
      // console.error('JSON parse error:', parseError);
      // return { error: 'Failed to parse JSON response', totalTokens, totalPrice: finalPrice };
    }

    // console.log(
    //   "TOTAL TOKENS CONSUMED:",
    //   totalTokens,
    //   "FINAL REQUEST PRICE:",
    //   finalPrice,
    //   "IMG SIZE:",
    //   imageSize
    // );
    if (parsedResponse.error) {
      return {
        error: parsedResponse?.error,
        totalTokens,
        totalPrice: finalPrice,
      };
    }

    return { ...parsedResponse, totalTokens, totalPrice: finalPrice };
  } catch (e) {
    console.error("Error in documentGPT:", e);
    return {
      error: e.message || "An error occurred in documentGPT",
      totalTokens: 0,
      totalPrice: 0,
    };
  }
};

const getProductsGPT = async ({
  token,
  image,
  imageSize = "1536x2048",
  previousData = null,
}) => {
  let systemPrompt;

  if (previousData) {
    systemPrompt = `Obtuve esta informacion en la iteracion anterior: ${JSON.stringify(previousData)}. Por favor, revisa estos datos, REALIZA UNA BUSQUEDA INTENSIVA PARA ASEGURAR DE QUE NO HAYA MAS PRODUCTOS. Mejora la precisión de los campos si ves inconsistencias, este es el prompt anterior: 
    
Analiza el contenido del documento e identifica las filas que correspondan a productos individuales. Un producto se caracteriza por tener al menos:
- Una descripción que no contenga la palabra "albaran".
- Una cantidad (un valor numérico).
- Un precio unitario o parcial.
- Una referencia del producto (Se muestra en una columna o campo separado de la descripción, hay casos en los que puede no aparecer).
- Un importe final.
  
Pueden existir cabeceras o filas con información que no corresponde a productos (como líneas que contienen la palabra "albaran" o encabezados de columnas). Ignora esas líneas que no representen un producto individual.

Propiedades a extraer para cada producto:
- "productRef": Referencia del producto (Ejemplos: "ABC123", 'REF. XXX', '66200', '180.180','625').
- "productDescription": Descripción del producto (texto que identifica el producto, sin incluir la palabra "albaran").
- "productQuantity": Cantidad del producto (un valor numérico).
- "productUnit": Unidad de medida (si aplica, si no se encuentra dejar "UN").
- "productPartial": Importe parcial o precio unitario antes de descuento (si se identifica, en caso contrario "").
- "productDiscountRate": Porcentaje de descuento aplicado (si aparece, por ejemplo en una columna 'Dto.'), de lo contrario "".
- "productDiscount": Valor absoluto del descuento (si puede inferirse o se muestra, en caso contrario "").
- "productImport": Importe final del producto tras aplicar descuentos (si se identifica, caso contrario "").
- "productAlbaranDate": Fecha del albarán (si existe alguna referencia previa a un albarán con fecha arriba de los productos, extraer esa fecha; si no se encuentra, dejar "").
- "productAlbaran": Numero del albarán (si existe alguna referencia previa del tipo "R-XXXXXXXXXX" u "OBRA XXX" u otra en la fila de cabecera del bloque al que pertenece el producto (PRIORIZAR EL NUMERO DEL ALBARAN), si no se encuentra, dejar "").
- "productAlbaranRef": Referencia del albarán, suele estar a la derecha del numero del albarán (si existe alguna referencia previa del tipo "OBRA XXX" u otra en la fila de cabecera del bloque al que pertenece el producto, si no se encuentra, dejar "").
Reglas:
- Todas las referencias deberian aparecer en la misma columna en cada producto. Si encontramos una, la referencia del producto siguiente, debe estar justo debajo de la anterior.
- No confundir productRef con productPartial o productImport o productDiscountRate o productDiscount.
- No devuelvas texto adicional ni explicaciones, solo un array JSON con los productos.
- Si no encuentras una propiedad, déjala como una cadena vacía ("").
- Si existen líneas que sirven como título o contienen la palabra "albaran" y no corresponden a un producto, ignóralas. No las incluyas como producto.
- Puede haber casos donde no haya referencia a un albarán ni fecha asociada, en ese caso "productAlbaranDate" , "productAlbaran" y "productAlbaranRef"  serán "".
- Puede haber casos en que el producto aparezca sin descuento, entonces "productDiscountRate" y "productDiscount" serán "".
- Puede haber casos en que solo haya productos sin ningún encabezado, simplemente extrae la información de cada fila que parezca un producto.

Devuelve la respuesta en el siguiente formato (ejemplo con posibles datos, pero tú debes usar los datos reales extraídos):
[
  {
    "productRef": "ABC123",
    "productDescription": "Bombilla LED 60W",
    "productQuantity": "10",
    "productUnit": "UN",
    "productPartial": "2.50",
    "productDiscountRate": "10%",
    "productDiscount": "2.50",
    "productImport": "22.50",
    "productAlbaranDate": "16/12/2024",
    "productAlbaran": "R-12345678",
    "productAlbaranRef": "OBRA XXX"
  }
]
* IMPORTANTE *
Convierte TODOS los numeros a numeros con 2 decimales, por mas que sea entero. Eliminar tipo de moneda y simbolo. (2,000.24€ -> 2000.24, 12.770 -> 12.77)
No incluyas explicación ni texto adicional afuera del array.
`;
  } else {
    systemPrompt = `Analiza el contenido del documento e identifica las filas que correspondan a productos individuales. Un producto se caracteriza por tener al menos:
    - Una descripción que no contenga la palabra "albaran".
    - Una cantidad (un valor numérico).
    - Un precio unitario o parcial.
    - Una referencia del producto (Se muestra en una columna o campo separado de la descripción, hay casos en los que puede no aparecer).
    - Un importe final.
      
    Pueden existir cabeceras o filas con información que no corresponde a productos (como líneas que contienen la palabra "albaran" o encabezados de columnas). Ignora esas líneas que no representen un producto individual.
    
    Propiedades a extraer para cada producto:
    - "productRef": Referencia del producto (Ejemplos: "ABC123", 'REF. XXX', '66200', '180.180','625').
    - "productDescription": Descripción del producto (texto que identifica el producto, sin incluir la palabra "albaran").
    - "productQuantity": Cantidad del producto (un valor numérico).
    - "productUnit": Unidad de medida (si aplica, si no se encuentra dejar "UN").
    - "productPartial": Importe parcial o precio unitario antes de descuento (si se identifica, en caso contrario "").
    - "productDiscountRate": Porcentaje de descuento aplicado (si aparece, por ejemplo en una columna 'Dto.'), de lo contrario "".
    - "productDiscount": Valor absoluto del descuento (si puede inferirse o se muestra, en caso contrario "").
    - "productImport": Importe final del producto tras aplicar descuentos (si se identifica, caso contrario "").
    - "productAlbaranDate": Fecha del albarán (si existe alguna referencia previa a un albarán con fecha arriba de los productos, extraer esa fecha; si no se encuentra, dejar "").
    - "productAlbaran": Numero del albarán (si existe alguna referencia previa del tipo "R-XXXXXXXXXX" u "OBRA XXX" u otra en la fila de cabecera del bloque al que pertenece el producto (PRIORIZAR EL NUMERO DEL ALBARAN), si no se encuentra, dejar "").
    - "productAlbaranRef": Referencia del albarán (si existe alguna referencia previa del tipo "OBRA XXX" u otra en la fila de cabecera del bloque al que pertenece el producto, si no se encuentra, dejar "").
    
    Reglas:
    - Todas las referencias deberian aparecer en la misma columna en cada producto. Si encontramos una, la referencia del producto siguiente, debe estar justo debajo de la anterior.
    - No confundir productRef con productPartial o productImport o productDiscountRate o productDiscount.
    - No devuelvas texto adicional ni explicaciones, solo un array JSON con los productos.
    - Si no encuentras una propiedad, déjala como una cadena vacía ("").
    - Si existen líneas que sirven como título o contienen la palabra "albaran" y no corresponden a un producto, ignóralas. No las incluyas como producto.
    - Puede haber casos donde no haya referencia a un albarán ni fecha asociada, en ese caso "productAlbaranDate" , "productAlbaran" y "productAlbaranRef"  serán "".
    - Puede haber casos en que el producto aparezca sin descuento, entonces "productDiscountRate" y "productDiscount" serán "".
    - Puede haber casos en que solo haya productos sin ningún encabezado, simplemente extrae la información de cada fila que parezca un producto.
    
    Devuelve la respuesta en el siguiente formato (ejemplo con posibles datos, pero tú debes usar los datos reales extraídos):
    [
      {
        "productRef": "ABC123",
        "productDescription": "Bombilla LED 60W",
        "productQuantity": "10",
        "productUnit": "UN",
        "productPartial": "2.50",
        "productDiscountRate": "10%",
        "productDiscount": "2.50",
        "productImport": "22.50",
        "productAlbaranDate": "16/12/2024",
        "productAlbaran": "R-12345678"
        "productAlbaranRef": "OBRA XXX"
      }
    ]
    
    No incluyas explicación ni texto adicional afuera del array.
    `;
  }

  const conversation = [
    {
      role: "user",
      content: [
        {
          type: "image_url",
          image_url: {
            url: image,
            detail: "high",
            size: imageSize,
          },
        },
        {
          type: "text",
          text: systemPrompt,
        },
      ],
    },
  ];

  try {
    const body = {
      model: "gpt-4o-mini",
      temperature: 0.3,
      max_tokens: 12096,
      messages: conversation,
    };

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = response.data.choices[0].message.content;
    // console.log("result", result);
    return result;
  } catch (e) {
    console.error("Error in documentGPT:", e);
    return {
      error: e.message || "An error occurred in documentGPT",
      totalTokens: 0,
      totalPrice: 0,
    };
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
      // console.log("First pass result:", firstPassResult);

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
      // console.log(
      //   "RETURNING DATA FROM PRODUCTS SECTION (Refined):",
      //   secondPassResult
      // );
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

const document = {
  prompt: `**INSTRUCCIONES**
  Tu tarea es analizar el contenido del documento proporcionado para extraer información relevante. Debes seguir estas reglas estrictamente:
  
  1. **Identificar el Tipo de Documento**
	 - Determina si el documento es una **factura** o un **albarán**. En los casos en los que se encuentre la palabra "factura" en el documento, considera que es una factura. De caso contrario, considera que es un albarán. ESTA PROPIEDAD TIENE QUE TENER UNO DE LOS DOS VALORES OBLIGATORIOS: "factura" o "albarán".
	 - Devuelve una propiedad llamada "documentType" con los valores "factura" o "albarán" según corresponda.
  
  2. **Valores Comunes para Ambos Tipos de Documento**
	  - **Número de Pedido (numberOrder)**: Busca el número de pedido (puede aparecer como "Número de pedido:", "Pedido:", "Ped: " o variantes similares).
	   - *Nota*: Este número no debe confundirse con el número de factura o albarán.
	   - Si no encuentras este dato, devuelve "numberOrder": "NOT FOUND".

    - **Número de Cliente**: Este dato es confidencial. Siempre devuelve "clientNumber": "PRIVATE".

- **CIF del Cliente**: Busca y extrae el CIF del cliente siguiendo estas reglas:

El CIF puede aparecer precedido de etiquetas como "CIF", "C.I.F.", "CF" (o variantes similares). Estas etiquetas pueden estar en mayúsculas, minúsculas o una combinación de ambas.
Formato esperado:
Un CIF válido está compuesto de:
1 letra inicial (puede ser A, B, C, etc.).
8 números consecutivos.
Pueden estar separados por guiones o espacios (por ejemplo, "A-12345678", "A 12345678").
Puede incluir el prefijo "ES" antes del valor (por ejemplo, "ES A12345678").
Validaciones:
Si el valor encontrado tiene la letra A y los números 58861311, descártalo porque corresponde al vendedor, no al cliente.
Si encuentras más de un CIF posible, selecciona el primero que cumpla con las reglas anteriores y que no sea del vendedor.
Respuesta en caso de no encontrar un CIF válido:
Si no encuentras ningún CIF del cliente, devuelve: {"clientCif": "NOT FOUND"}.
NIF del Cliente: Busca y extrae el NIF del cliente siguiendo estas reglas:

- **NIF del Cliente**:
El NIF puede aparecer precedido de etiquetas como "NIF", "N.I.F." o variantes similares. Estas etiquetas pueden estar en mayúsculas, minúsculas o una combinación de ambas.
Formato esperado:
Un NIF válido está compuesto de:
Para ciudadanos españoles con DNI: 8 números consecutivos + 1 letra de control (por ejemplo, "12345678Z").
Para otros casos: 1 letra inicial + 7 números consecutivos + 1 letra de control (por ejemplo, "X1234567L").
Los números y letras pueden estar separados por guiones o espacios.
Validaciones:
Asegúrate de que el valor encontrado cumple estrictamente con el formato descrito.
Si encuentras múltiples valores posibles, selecciona el primero que cumpla con las reglas.
Respuesta en caso de no encontrar un NIF válido:
Si no encuentras ningún NIF del cliente, devuelve: {"clientNif": "NOT FOUND"}.
  
  3. **Reglas Generales**
	 - Si no encuentras un valor esperado, asignale "NOT FOUND".
  
  4. **Datos Específicos por Tipo de Documento**

	 - Extrae los siguientes datos:
	   - "documentType": Si es un albaran o factura
	   - "invoiceDate": Fecha de la factura
     - "invoiceIssueDate": Fecha de emisión de la factura en formato YYYY-MM-DD.
	   - "expirationDateYear": Año de vencimiento de la factura.
	   - "expirationDateMonth": Mes de vencimiento de la factura.
	   - "expirationDateDay": Día de vencimiento de la factura.
	   - "numberDocument": Número de la factura / albaran.
	   - "clientCif": CIF del cliente.
	   - "clientNif": NIF del cliente.
     - "clientPhoneNumber": Número de telefono del cliente.
     - "clientEmail": Correo electrónico del cliente.
	   - "clientName": Nombre del cliente.
	   - "clientAddress": Dirección completa del cliente.
     - "clientAddressNumber": Número de la dirección del cliente.
     - "clientAddressStreet": Calle de la dirección del cliente.
     - "clientAddressFloor": Piso de la dirección del cliente.
	   - "clientCity": Ciudad del cliente.
     - "clientProvince": Provincia del cliente.
	   - "clientZip": Código postal del cliente.
     - "companyPhoneNumber": Número de telefono de la empresa.
     - "companyEmail": Correo electrónico de la empresa.
	   - "companyName": Nombre de la empresa.
	   - "companyAddress": Dirección completa de la empresa.
	   - "companyCity": Ciudad de la empresa.
     - "companyProvince": Provincia de la empresa.
	   - "companyZip": Código postal de la empresa.
	   - "conditionPay": Condición de pago.
	   - Totales:
		 - "totalAmount": Importe total de la factura.
		 - "partialAmount": Importe parcial de la factura.
		 - "discountAmount": Descuento aplicado en la factura.
  
  5. **Formato de Respuesta Ejemplo**

  {
	"documentType": "factura",
	"invoiceDate": "DD/MM/YYYY",
	"numberDocument": "404302292",
	"clientCif": "B12345678",
	"clientNif": "12345678B",
	"clientName": "APOLO SOLIS, JOSE LUIS",
  ...
  }
  
  Consideraciones Finales:
  Intentar buscar clientAddress, clientCity, clientProvince, clientZip, companyAddress, companyCity, companyProvince, companyZip. (Los del cliente suelen estar en la parte inferior del documento, mientras que los de la empresa en la parte superior).
  Convierte TODOS los numeros a numeros con 2 decimales, por mas que sea entero. Eliminar tipo de moneda y simbolo. (2,000.24€ -> 2000.24, 20€ -> 20.00)
  Evita confusiones entre el número de pedido, número de factura, y número de albarán.
  No incluyas datos confidenciales, como el número de cliente, más allá de lo especificado.
  `,
  agents: [],
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

    const token =
      "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";

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
        } else if (attempts === 2 && clientCifFound && !clientNifFound) {
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
        } else {
          // console.log("FALLS HERE ");

          attemptResult = await documentGPT({
            token,
            image: imageUrl,
            document,
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

      if (!clientCifFound || !clientNifFound) {
        console.log(
          `clientCif or clientNif not found after ${maxAttempts} attempts for page ${
            index + 1
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
