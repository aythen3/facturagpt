
const schedule = require('node-schedule');
const { catchedAsync } = require("../utils/err");

const { connectDB } = require("./utils");


const addDoc = async (req, res) => {
  try {

    const { doc } = req.body
    const user = req.user
    const id = user._id.split('_').pop()


    const db = await connectDB(`db_${id}_docs`)
    const response = await db.insert(doc);

    return res.status(200).json({
      success: true,
      message: "Transacción agregada correctamente",
      data: response,
    });
  } catch (error) {
    console.error("Error al agregar la transacción:", error);
    throw new Error("No se pudo agregar la transacción");
  }
};


const getAllDocsByClientController = async (req, res) => {
  try {
    const user = req.user
    const id = user._id.split('_').pop()

    const { idsEmails } = req.body;

    if (!idsEmails || !Array.isArray(idsEmails)) {
      return res
        .status(400)
        .json({ error: "Se requiere un array de idsEmails válido" });
    }

  


    const db = await connectDB(`db_${id}_docs`)
    // const allDatabases = await nano.db.list();

    // const processedDbNames = allDatabases.filter((dbName) =>
    //   dbName.includes("_processedemails")
    // );

    let matchingDocuments = [];


    const processedEmails = await db.list({
      include_docs: true,
    });


    const matchingProcessedDocs = processedEmails.rows.filter(
      (processedEmailDoc) => idsEmails.includes(processedEmailDoc.doc._id)
    );

    matchingDocuments = [...matchingDocuments, ...matchingProcessedDocs];




    return res.status(200).json({
      success: true,
      message: "Bases de datos obtenidas correctamente",
      databases: matchingDocuments,
    });



  } catch (error) {
    console.error("Error en getAllTransactionsByClientController:", error);
    return res.status(500).json({
      success: false,
      error: "Error al obtener las bases de datos",
    });
  }
};

const getDocByIdController = async (req, res) => {
  try {
    const { docId } = req.params;

    console.log("ID EN CONTROLLER--------------------", docId);

    // Validación del docId
    if (!docId || typeof docId !== "string") {
      return res
        .status(400)
        .json({ error: "Se requiere un docId válido" });
    }


    try {
      const user = req.user
      const id = user._id.split('_').pop()

      const db = await connectDB(`db_${id}_docs`)

      let matchingDocuments = [];

     
      try {
        const doc = await db.get(docId);

        if (doc) {
          matchingDocuments.push({
            id: doc._id,
            key: doc._id,
            value: { rev: doc._rev },
            doc, // Incluye el documento completo
          });
        }
      } catch (docError) {
        if (docError.status !== 404) {
          console.error(
            `Error al obtener el documento ${docId} en la base de datos`,
            // docError
          );
        }
      }
      if (matchingDocuments.length === 0) {

        return {
          success: false,
          message: `No se encontró el documento con ID ${docId}.`,
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
    // const result = await getTransactionById(docId);

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

const deleteDocsController = async (req, res) => {
  try {
    const { docsIds } = req.body;

    console.log("MIS IDSSSSS-------------", docsIds);

    if (
      !docsIds ||
      !Array.isArray(docsIds) ||
      docsIds.length === 0
    ) {
      return res
        .status(400)
        .send("docsIds es requerido y debe ser un array no vacío.");
    }

    console.log("Eliminando documentos con IDs:", docsIds);

    // Llamar a la función para eliminar las transacciones
    // const response = await deleteTransactions({ docsIds });

    // return res.status(200).json({
    //   message: "Transacciones eliminadas exitosamente.",
    //   data: response,
    // });

    const user = req.user
    const id = user._id.split('_').pop()  

    const db = await connectDB(`db_${id}_docs`)  

    try {

      
      for (const docId of docsIds) {
        try {
          const query = { selector: { _id: docId } };
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

const deleteProductFromDocsController = async (req, res) => {
  try {
    const { docId, productRef } = req.body;

    console.log("MI ID-------------", docId);
    console.log("MI REF-------------", productRef);

    // Llamar a la función para eliminar las transacciones
    // const response = await deleteProductFromTransactions({
    //   docId,
    //   productRef,
    // });

    // return res.status(200).json({
    //   message: "Transacciones eliminadas exitosamente.",
    //   data: response,
    // });



    try {
    
      const user = req.user
      const id = user._id.split('_').pop()  

      const db = await connectDB(`db_${id}_docs`)    

      try {
        const doc = await db.get(docId);

        // if (
        //   !doc ||
        //   !doc.totalData ||
        //   !Array.isArray(doc.totalData.productList)
        // ) {
        //   continue;
        // }

        const updatedProductList = doc.totalData.productList.filter(
          (product) => product.productRef !== productRef
        );

        // if (updatedProductList.length === doc.totalData.productList.length) {

        //   continue;
        // }

        doc.totalData.productList = updatedProductList;

        await db.insert(doc);
      } catch (docError) {
        console.error(
          `Error al procesar el documento ${docId} en la base de datos ${dbName}:`,
          docError
        );
      }

      // return {
      //   success: true,
      //   message:
      //     "Transacciones procesadas correctamente en las bases de datos seleccionadas.",
      // };


      return res.status(200).json({
        message: "Documento procesado correctamente en la base de datos.",
        data: {
          success: true,
          message:
            "Documento procesado correctamente en la base de datos.",
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

const automateDocsController = async (req, res) => {
  try {
    // const { docId } = req.body;

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
      message: "Automating docs",
    });
  } catch (error) {
    console.error("Error en automateTransactionsController:", error);
  }
};

module.exports = {
  addDoc: catchedAsync(addDoc),
  getDocByIdController: catchedAsync(getDocByIdController),
  getAllDocsByClientController: catchedAsync(getAllDocsByClientController),
  deleteDocsController: catchedAsync(deleteDocsController),
  deleteProductFromDocsController: catchedAsync(deleteProductFromDocsController),
  
  automateDocsController: catchedAsync(automateDocsController),
};
