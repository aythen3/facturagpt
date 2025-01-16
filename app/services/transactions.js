const { default: axios } = require("axios");
const { v4: uuidv4 } = require("uuid");
const nano = require("nano")("http://admin:1234@127.0.0.1:5984");

const saveTransaction = async ({ transactionData, userId }) => {};

const getAllTransactionsByClient = async ({ idsEmails }) => {
  try {
    console.log("EMAILS ID TRANSACCIONES", idsEmails);

    const allDatabases = await nano.db.list();

    const processedDbNames = allDatabases.filter((dbName) =>
      dbName.includes("_processedemails")
    );

    console.log(
      "Bases de datos que contienen '_processedemails':",
      processedDbNames
    );

    let matchingDocuments = [];

    for (const dbName of processedDbNames) {
      const processedDb = nano.use(dbName);

      const processedEmails = await processedDb.list({
        include_docs: true,
      });

      console.log(`Documentos de la base ${dbName}:`, processedEmails.rows);

      const matchingProcessedDocs = processedEmails.rows.filter(
        (processedEmailDoc) => idsEmails.includes(processedEmailDoc.doc._id) // Comparamos con los idsEmails
      );

      matchingDocuments = [...matchingDocuments, ...matchingProcessedDocs];
    }

    console.log("Documentos coincidentes:", matchingDocuments);

    return {
      matchingDocuments,
    };
  } catch (error) {
    console.error("Error al obtener las transacciones:", error);
    throw new Error("No se pudieron obtener las transacciones");
  }
};

module.exports = {
  saveTransaction,
  getAllTransactionsByClient,
};
