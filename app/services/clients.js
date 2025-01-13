const { default: axios } = require("axios");
const { v4: uuidv4 } = require("uuid");
const nano = require("nano")("http://admin:1234@127.0.0.1:5984");

const createClient = async ({ email, userId, clientData }) => {
  const dbClientsName = "db_emailmanager_clients";
  const dbAccountsName = "db_emailmanager_accounts";
  let dbClients, dbAccounts;

  try {
    const dbs = await nano.db.list();

    if (!dbs.includes(dbClientsName)) {
      console.log(`Database ${dbClientsName} does not exist. Creating...`);
      await nano.db.create(dbClientsName);
    }
    dbClients = nano.use(dbClientsName);

    if (!dbs.includes(dbAccountsName)) {
      console.log(`Database ${dbAccountsName} does not exist. Creating...`);
      await nano.db.create(dbAccountsName);
    }
    dbAccounts = nano.use(dbAccountsName);
  } catch (error) {
    console.error("Error checking/creating databases:", error);
    throw new Error("Database initialization failed");
  }

  try {
    const clientId = uuidv4();
    const clientDoc = {
      _id: clientId,
      id: clientId,
      userId,
      email,
      clientData,
    };

    await dbClients.insert(clientDoc);
    console.log(`Client created successfully: ${clientId}`);

    const userDoc = await dbAccounts.get(userId);
    if (!userDoc.clients) {
      userDoc.clients = [];
    }
    userDoc.clients.push(clientId);

    await dbAccounts.insert(userDoc);

    const clients = await dbClients.find({
      selector: { userId },
    });

    return clients.docs;
  } catch (error) {
    console.error("Error creating client:", error);
    throw new Error("Failed to create client");
  }
};

const getAllUserClients = async ({ userId }) => {
  // console.log("Fetching automations for userId (SERVICE):", userId);

  const dbClientsName = "db_emailmanager_clients";

  let dbClients;

  try {
    const dbs = await nano.db.list();
    if (!dbs.includes(dbClientsName)) {
      console.log(`Database ${dbClientsName} does not exist. Creating...`);
      await nano.db.create(dbClientsName);
    }
    dbClients = nano.use(dbClientsName);

    const clients = await dbClients.find({
      selector: { userId },
    });

    console.log("CLCLCLCLC", clients);

    console.log(
      `Found ${clients.docs.length} automations for userId ${userId}`
    );

    return clients.docs.length > 0 ? clients.docs : [];
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw new Error("Failed to fetch clients");
  }
};

module.exports = {
  createClient,
  getAllUserClients,
};
