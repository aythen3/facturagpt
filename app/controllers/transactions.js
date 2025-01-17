const { getAllTransactionsByClient } = require("../services/transactions");
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

module.exports = {
  getAllTransactionsByClientController: catchedAsync(
    getAllTransactionsByClientController
  ),
};
