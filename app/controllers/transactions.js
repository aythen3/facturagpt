const { saveTransaction } = require("../services/transactions");
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

module.exports = {
  saveTransactionController: catchedAsync(saveTransactionController),
};
