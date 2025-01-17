const {
  getAllTransactionsByClient,
  deleteTransactions,
  deleteProductFromTransactions,
  getTransactionById,
} = require("../services/transactions");
const { catchedAsync } = require("../utils/err");

const getAllTransactionsByClientController = async (req, res) => {
  try {
    const { idsEmails } = req.body;

    if (!idsEmails || !Array.isArray(idsEmails)) {
      return res
        .status(400)
        .json({ error: "Se requiere un array de idsEmails válido" });
    }

    const filteredDatabases = await getAllTransactionsByClient({ idsEmails });

    return res.status(200).json({
      success: true,
      message: "Bases de datos obtenidas correctamente",
      databases: filteredDatabases,
    });
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

    // Llamar al servicio para obtener la transacción
    const result = await getTransactionById(transactionId);

    // Si la transacción no se encuentra
    if (!result.success) {
      return res.status(404).json({
        success: false,
        message: result.message,
        matchingDocuments: [],
      });
    }

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
    const response = await deleteTransactions({ transactionsIds });

    return res.status(200).json({
      message: "Transacciones eliminadas exitosamente.",
      data: response,
    });
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
    const response = await deleteProductFromTransactions({
      transactionId,
      productRef,
    });

    return res.status(200).json({
      message: "Transacciones eliminadas exitosamente.",
      data: response,
    });
  } catch (err) {
    console.error("Error en deleteTransactionController:", err);
    return res
      .status(500)
      .send("Ocurrió un error al intentar eliminar las transacciones.");
  }
};

module.exports = {
  getAllTransactionsByClientController: catchedAsync(
    getAllTransactionsByClientController
  ),
  deleteTransactionsController: catchedAsync(deleteTransactionsController),
  deleteProductFromTransactionsController: catchedAsync(
    deleteProductFromTransactionsController
  ),
  getTransactionByIdController: catchedAsync(getTransactionByIdController),
};
