const { default: axios } = require("axios");
const { v4: uuidv4 } = require("uuid");
const nano = require("nano")("http://admin:1234@127.0.0.1:5984");

const saveTransaction = async ({ transactionData, userId }) => {
  const dbTransactionsName = "db_emailmanager_transactions";
  const dbAccountsName = "db_emailmanager_clients";

  let dbTransactions, dbAccounts;

  try {
    // Verificar y crear las bases de datos si no existen
    const dbs = await nano.db.list();

    if (!dbs.includes(dbTransactionsName)) {
      console.log(`Creating database: ${dbTransactionsName}`);
      await nano.db.create(dbTransactionsName);
    }
    dbTransactions = nano.use(dbTransactionsName);

    if (!dbs.includes(dbAccountsName)) {
      console.log(`Creating database: ${dbAccountsName}`);
      await nano.db.create(dbAccountsName);
    }
    dbAccounts = nano.use(dbAccountsName);
  } catch (error) {
    console.error("Error initializing databases:", error);
    throw new Error("Database initialization failed");
  }

  try {
    // Validar si el usuario existe
    let userDoc;
    try {
      userDoc = await dbAccounts.get(userId);
    } catch (error) {
      if (error.statusCode === 404) {
        throw new Error(`User with ID ${userId} does not exist`);
      }
      throw error;
    }

    console.log("User found:", userDoc);

    // Crear transacciones
    const transactions = transactionData.map((transaction) => ({
      _id: uuidv4(),
      userId,
      ...transaction,
      createdAt: new Date().toISOString(),
    }));

    // Guardar transacciones
    const bulkResponse = await dbTransactions.bulk({ docs: transactions });
    const failedDocs = bulkResponse.filter((resp) => resp.error);

    if (failedDocs.length > 0) {
      throw new Error("Failed to save some transactions");
    }

    // Actualizar el documento del usuario
    if (!userDoc.transactions) {
      userDoc.transactions = [];
    }
    userDoc.transactions.push(...transactions.map((t) => t._id));

    await dbAccounts.insert(userDoc);

    return { success: true, transactions };
  } catch (error) {
    console.error("Error saving transactions:", error.message);
    throw new Error(error.message || "Failed to save transactions");
  }
};

module.exports = {
  saveTransaction,
};
