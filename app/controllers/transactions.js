
const schedule = require('node-schedule');
const { catchedAsync } = require("../utils/err");

const { connectDB } = require("./utils");

// const {
//   getAllTransactionsByClient,
//   deleteTransactions,
//   deleteProductFromTransactions,
//   getTransactionById,
//   automateTransactions,
// } = require("../services/transactions");



const getAllTransactionsByClientController = async (req, res) => {
  try {
    const { idsEmails } = req.body;

    if (!idsEmails || !Array.isArray(idsEmails)) {
      return res
        .status(400)
        .json({ error: "Se requiere un array de idsEmails válido" });
    }

    // const filteredDatabases = await getAllTransactionsByClient({ idsEmails });


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


      // return {
      //   matchingDocuments,
      // };


      return res.status(200).json({
        success: true,
        message: "Bases de datos obtenidas correctamente",
        databases: matchingDocuments,
      });


    } catch (error) {
      console.error("Error al obtener las transacciones:", error);
      throw new Error("No se pudieron obtener las transacciones");
    }



  } catch (error) {
    console.error("Error en getAllTransactionsByClientController:", error);
    return res.status(500).json({
      success: false,
      error: "Error al obtener las bases de datos",
    });
  }
};

const getTransactionByIdController = async (req, res) => {
  try {
    const { transactionId } = req.params;

    console.log("ID EN CONTROLLER--------------------", transactionId);

    // Validación del transactionId
    if (!transactionId || typeof transactionId !== "string") {
      return res
        .status(400)
        .json({ error: "Se requiere un transactionId válido" });
    }


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

      // return {
      //   success: true,
      //   matchingDocuments,
      // };

      if (!matchingDocuments.success) {
        return res.status(404).json({
          success: false,
          message: matchingDocuments,
          matchingDocuments: [],
        });
      }


    } catch (error) {
      console.error("Error al obtener la transacción:", error);
      throw new Error("No se pudo obtener la transacción");
    }


    // Llamar al servicio para obtener la transacción
    // const result = await getTransactionById(transactionId);

    // Si la transacción no se encuentra


    // Retornar la transacción encontrada
    return res.status(200).json({
      success: true,
      message: "Transacción obtenida correctamente",
      matchingDocuments: result.matchingDocuments, // Ahora es un array
    });
  } catch (error) {
    console.error("Error en getTransactionByIdController:", error);
    return res.status(500).json({
      success: false,
      error: "Error al obtener la transacción",
    });
  }
};

const deleteTransactionsController = async (req, res) => {
  try {
    const { transactionsIds } = req.body;

    console.log("MIS IDSSSSS-------------", transactionsIds);

    if (
      !transactionsIds ||
      !Array.isArray(transactionsIds) ||
      transactionsIds.length === 0
    ) {
      return res
        .status(400)
        .send("transactionIds es requerido y debe ser un array no vacío.");
    }

    console.log("Eliminando transacciones con IDs:", transactionsIds);

    // Llamar a la función para eliminar las transacciones
    // const response = await deleteTransactions({ transactionsIds });

    // return res.status(200).json({
    //   message: "Transacciones eliminadas exitosamente.",
    //   data: response,
    // });


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

      // return 

      return res.status(200).json({
        message: "Transacciones eliminadas exitosamente.",
        data: {
          success: true,
          message:
            "Transacciones eliminadas correctamente de las bases de datos procesadas.",
        }
      });

    } catch (error) {
      console.error("Error al procesar las transacciones:", error);
      throw new Error("Falló la eliminación de transacciones.");
    }


  } catch (err) {
    console.error("Error en deleteTransactionController:", err);
    return res
      .status(500)
      .send("Ocurrió un error al intentar eliminar las transacciones.");
  }
};

const deleteProductFromTransactionsController = async (req, res) => {
  try {
    const { transactionId, productRef } = req.body;

    console.log("MI ID-------------", transactionId);
    console.log("MI REF-------------", productRef);

    // Llamar a la función para eliminar las transacciones
    // const response = await deleteProductFromTransactions({
    //   transactionId,
    //   productRef,
    // });

    // return res.status(200).json({
    //   message: "Transacciones eliminadas exitosamente.",
    //   data: response,
    // });



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

      // return {
      //   success: true,
      //   message:
      //     "Transacciones procesadas correctamente en las bases de datos seleccionadas.",
      // };


      return res.status(200).json({
        message: "Transacciones eliminadas exitosamente.",
        data: {
          success: true,
          message:
            "Transacciones procesadas correctamente en las bases de datos seleccionadas.",
        }
      });

    } catch (error) {
      console.error("Error al procesar las transacciones:", error);
      throw new Error("Falló la eliminación de transacciones.");
    }


  } catch (err) {
    console.error("Error en deleteTransactionController:", err);
    return res
      .status(500)
      .send("Ocurrió un error al intentar eliminar las transacciones.");
  }
};



const automateTransactionsController = async (req, res) => {
  try {
    // const { transactionId } = req.body;

    console.log('HELLO WORLD AUTOMATING SYSTEM')
    if (global.automationJob) {
      global.automationJob.cancel();
    }


    const db = await connectDB('db_accounts');

    if (true) {

      // Configurar la paginación
      const batchSize = 100;
      let currentPage = 0;
      let accounts = [];

      // Obtener todos los documentos con paginación en CouchDB usando Nano
      try {
        const result = await db.find({
          selector: {},
          limit: batchSize,
          skip: currentPage * batchSize,
          fields: ['_id', 'email', 'automations']
        });


        accounts = result.docs;
      } catch (error) {
        console.error('Error al obtener documentos:', error);
        throw error;
      }

      console.log('ACCOUNTS', accounts);

      global.automationJob = schedule.scheduleJob({ rule: '*/10 * * * * *' }, async () => {
        try {
          console.log('Ejecutando automatización de transacciones...');
          // await automateTransactions();
          try {
            console.log('HELLO WORLD AUTOMATING SYSTEM')
          } catch (error) {
            console.error("Error en automateTransactions:", error);
          }
        } catch (error) {
          console.error('Error en la automatización programada:', error);
        }
      });
    }



    return res.status(200).json({
      success: true,
      message: "Automating transactions",
    });
  } catch (error) {
    console.error("Error en automateTransactionsController:", error);
  }
};

module.exports = {
  getAllTransactionsByClientController: catchedAsync(getAllTransactionsByClientController),
  deleteTransactionsController: catchedAsync(deleteTransactionsController),
  deleteProductFromTransactionsController: catchedAsync(deleteProductFromTransactionsController),
  getTransactionByIdController: catchedAsync(getTransactionByIdController),

  automateTransactionsController: catchedAsync(automateTransactionsController),
};
