const {
  saveTransaction,
  getAllTransactionsByClient,
} = require("../services/transactions");
const { catchedAsync } = require("../utils/err");

const saveTransactionController = async (req, res) => {
  try {
    const { transactionData, userId } = req.body;

    console.log("Received data:", { transactionData, userId });

    // Llamar al servicio
    const response = await saveTransaction({ transactionData, userId });

    // Responder con éxito
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error in saveTransactionController:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

const getAllTransactionsByClientController = async (req, res) => {
  try {
    // Obtiene los parámetros del cuerpo de la solicitud
    const { idsEmails } = req.body;

    // Valida que se hayan proporcionado los idsEmails
    if (!idsEmails || !Array.isArray(idsEmails)) {
      return res
        .status(400)
        .json({ error: "Se requiere un array de idsEmails válido" });
    }

    // Llama al servicio para obtener las bases de datos filtradas
    const filteredDatabases = await getAllTransactionsByClient({ idsEmails });

    // Devuelve la respuesta con las bases de datos filtradas
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

module.exports = {
  saveTransactionController: catchedAsync(saveTransactionController),
  getAllTransactionsByClientController: catchedAsync(
    getAllTransactionsByClientController
  ),
};
