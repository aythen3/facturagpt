const { default: axios } = require("axios");
const { v4: uuidv4 } = require("uuid");
const nano = require("nano")("http://admin:1234@127.0.0.1:5984");

const getAllTransactionsByClient = async ({ idsEmails }) => {
  try {
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
        (processedEmailDoc) => idsEmails.includes(processedEmailDoc.doc._id)
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

const getTransactionById = async (transactionId) => {
  try {
    // Obtener todas las bases de datos disponibles
    const allDatabases = await nano.db.list();

    // Filtrar las bases de datos que contienen "_processedemails"
    const processedDatabases = allDatabases.filter((dbName) =>
      dbName.endsWith("_processedemails")
    );

    console.log(
      "Bases de datos que contienen '_processedemails':",
      processedDatabases
    );

    let matchingDocuments = [];

    // Iterar sobre las bases de datos seleccionadas
    for (const dbName of processedDatabases) {
      const db = nano.use(dbName);

      try {
        // Intentar obtener el documento con el transactionId
        const doc = await db.get(transactionId);

        // Si se encuentra el documento, agregarlo a la lista de coincidencias
        if (doc) {
          matchingDocuments.push({
            id: doc._id,
            key: doc._id,
            value: { rev: doc._rev },
            doc, // Incluye el documento completo
          });
          console.log(`Documento encontrado en la base ${dbName}:`, doc);
          break; // Si encontramos el documento, no es necesario seguir buscando
        }
      } catch (docError) {
        // Si no se encuentra el documento en esta base de datos, continuar con la siguiente
        if (docError.status !== 404) {
          console.error(
            `Error al obtener el documento ${transactionId} en la base ${dbName}:`,
            docError
          );
        }
      }
    }

    // Verificar si se encontró algún documento
    if (matchingDocuments.length === 0) {
      console.log(
        `No se encontró el documento con transactionId ${transactionId}.`
      );
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
    // Obtener todas las bases de datos disponibles
    const allDatabases = await nano.db.list();

    // Filtrar las bases de datos que contienen "_processedemails"
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

    // Iterar sobre las bases de datos seleccionadas
    for (const dbName of processedDatabases) {
      const db = nano.use(dbName);

      // Iterar sobre los IDs de transacciones a eliminar
      for (const transactionId of transactionsIds) {
        try {
          // Buscar documentos que coincidan con el transactionId
          const query = { selector: { _id: transactionId } };
          const result = await db.find(query);

          if (result.docs.length > 0) {
            for (const doc of result.docs) {
              // Eliminar el documento encontrado
              await db.destroy(doc._id, doc._rev);
              console.log(
                `Documento con ID ${doc._id} eliminado de la base de datos ${dbName}.`
              );
            }
          } else {
            console.log(
              `Documento con ID ${transactionId} no encontrado en la base de datos ${dbName}.`
            );
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
    // Obtener todas las bases de datos disponibles
    const allDatabases = await nano.db.list();

    // Filtrar las bases de datos que contienen "_processedemails"
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

    // Iterar sobre las bases de datos seleccionadas
    for (const dbName of processedDatabases) {
      const db = nano.use(dbName);

      try {
        // Intentar obtener el documento con el transactionId
        const doc = await db.get(transactionId);

        if (
          !doc ||
          !doc.totalData ||
          !Array.isArray(doc.totalData.productList)
        ) {
          console.log(
            `Documento ${transactionId} no tiene una estructura válida en ${dbName}.`
          );
          continue;
        }

        // Filtrar la lista de productos para eliminar el producto deseado
        const updatedProductList = doc.totalData.productList.filter(
          (product) => product.productRef !== productRef
        );

        // Verificar si hubo cambios en la lista de productos
        if (updatedProductList.length === doc.totalData.productList.length) {
          console.log(
            `Producto con referencia ${productRef} no encontrado en la transacción ${transactionId} de la base de datos ${dbName}.`
          );
          continue;
        }

        // Actualizar el documento con la lista de productos filtrada
        doc.totalData.productList = updatedProductList;

        // Guardar los cambios en la base de datos
        await db.insert(doc);

        console.log(
          `Producto con referencia ${productRef} eliminado de la transacción ${transactionId} en la base de datos ${dbName}.`
        );
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

module.exports = {
  getAllTransactionsByClient,
  deleteTransactions,
  deleteProductFromTransactions,
  getTransactionById,
};
