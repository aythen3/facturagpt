const {
  getAllTransactionsByClient,
  deleteTransactions,
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

module.exports = {
  getAllTransactionsByClientController: catchedAsync(
    getAllTransactionsByClientController
  ),
  deleteTransactionsController: catchedAsync(deleteTransactionsController),
};
