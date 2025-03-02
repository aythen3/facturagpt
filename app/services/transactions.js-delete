const { default: axios } = require("axios");
const { v4: uuidv4 } = require("uuid");
const nano = require("nano")("http://admin:1234@127.0.0.1:5984");

const { connectDB } = require('../controllers/utils')

const addTransaction = async ({ id, transaction }) => {
  try {
    const dbName = id.split('_')[2]

    const db = await connectDB(`db_${dbName}_processedemails`)
    const response = await db.insert(transaction);


    return response;
  } catch (error) {
    console.error("Error al agregar la transacción:", error);
    throw new Error("No se pudo agregar la transacción");
  }
};


const getAllTransactionsByClient = async ({ idsEmails }) => {
  try {
    const allDatabases = await nano.db.list();

    const processedDbNames = allDatabases.filter((dbName) =>
      dbName.includes("_processedemails")
    );

    let matchingDocuments = [];

    for (const dbName of processedDbNames) {
      const processedDb = nano.use(dbName);

      const processedEmails = await processedDb.list({
        include_docs: true,
      });


      const matchingProcessedDocs = processedEmails.rows.filter(
        (processedEmailDoc) => idsEmails.includes(processedEmailDoc.doc._id)
      );

      matchingDocuments = [...matchingDocuments, ...matchingProcessedDocs];
    }


    return {
      matchingDocuments,
    };
  } catch (error) {
    console.error("Error al obtener las transacciones:", error);
    throw new Error("No se pudieron obtener las transacciones");
  }
};

const getTransactionById = async (transactionId) => {
  try {
    const allDatabases = await nano.db.list();
    const processedDatabases = allDatabases.filter((dbName) =>
      dbName.endsWith("_processedemails")
    );


    let matchingDocuments = [];

    for (const dbName of processedDatabases) {
      const db = nano.use(dbName);

      try {
        const doc = await db.get(transactionId);

        if (doc) {
          matchingDocuments.push({
            id: doc._id,
            key: doc._id,
            value: { rev: doc._rev },
            doc, // Incluye el documento completo
          });
          break; 
        }
      } catch (docError) {
        if (docError.status !== 404) {
          console.error(
            `Error al obtener el documento ${transactionId} en la base ${dbName}:`,
            docError
          );
        }
      }
    }

    if (matchingDocuments.length === 0) {

      return {
        success: false,
        message: `No se encontró la transacción con ID ${transactionId}.`,
        matchingDocuments,
      };
    }

    return {
      success: true,
      matchingDocuments,
    };
  } catch (error) {
    console.error("Error al obtener la transacción:", error);
    throw new Error("No se pudo obtener la transacción");
  }
};

const deleteTransactions = async ({ transactionsIds }) => {
  try {
    const allDatabases = await nano.db.list();

    const processedDatabases = allDatabases.filter((dbName) =>
      dbName.endsWith("_processedemails")
    );

    if (processedDatabases.length === 0) {
      return {
        success: false,
        message: "No hay bases de datos para procesar.",
      };
    }

    for (const dbName of processedDatabases) {
      const db = nano.use(dbName);

      for (const transactionId of transactionsIds) {
        try {
          const query = { selector: { _id: transactionId } };
          const result = await db.find(query);

          if (result.docs.length > 0) {
            for (const doc of result.docs) {
              await db.destroy(doc._id, doc._rev);
        
            }
          } else {
          }
        } catch (error) {
          console.error(
            `Error al buscar o eliminar documentos en la base de datos ${dbName}:`,
            error
          );
        }
      }
    }

    return {
      success: true,
      message:
        "Transacciones eliminadas correctamente de las bases de datos procesadas.",
    };
  } catch (error) {
    console.error("Error al procesar las transacciones:", error);
    throw new Error("Falló la eliminación de transacciones.");
  }
};

const deleteProductFromTransactions = async ({ transactionId, productRef }) => {
  try {
    const allDatabases = await nano.db.list();

    const processedDatabases = allDatabases.filter((dbName) =>
      dbName.endsWith("_processedemails")
    );

    if (processedDatabases.length === 0) {
      console.log("No se encontraron bases de datos con '_processedemails'.");
      return {
        success: false,
        message: "No hay bases de datos para procesar.",
      };
    }

    for (const dbName of processedDatabases) {
      const db = nano.use(dbName);

      try {
        const doc = await db.get(transactionId);

        if (
          !doc ||
          !doc.totalData ||
          !Array.isArray(doc.totalData.productList)
        ) {
          continue;
        }

        const updatedProductList = doc.totalData.productList.filter(
          (product) => product.productRef !== productRef
        );

        if (updatedProductList.length === doc.totalData.productList.length) {

          continue;
        }

        doc.totalData.productList = updatedProductList;

        await db.insert(doc);
      } catch (docError) {
        console.error(
          `Error al procesar el documento ${transactionId} en la base de datos ${dbName}:`,
          docError
        );
      }
    }

    return {
      success: true,
      message:
        "Transacciones procesadas correctamente en las bases de datos seleccionadas.",
    };
  } catch (error) {
    console.error("Error al procesar las transacciones:", error);
    throw new Error("Falló la eliminación de transacciones.");
  }
};



const automateTransactions = async () => {
  try {
    console.log('HELLO WORLD AUTOMATING SYSTEM')
  } catch (error) {
    console.error("Error en automateTransactions:", error);
  }
};

module.exports = {
  addTransaction,
  getAllTransactionsByClient,
  deleteTransactions,
  deleteProductFromTransactions,
  getTransactionById,
  automateTransactions,
};
