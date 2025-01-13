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

    console.log(
      `Found ${clients.docs.length} automations for userId ${userId}`
    );

    return clients.docs.length > 0 ? clients.docs : [];
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw new Error("Failed to fetch clients");
  }
};

const deleteClient = async ({ clientIds, userId }) => {
  const dbClientsName = "db_emailmanager_clients";
  const dbAccountsName = "db_emailmanager_accounts";
  let dbClients, dbAccounts;

  try {
    dbClients = nano.use(dbClientsName);
    dbAccounts = nano.use(dbAccountsName);

    const userDoc = await dbAccounts.get(userId);

    for (const clientId of clientIds) {
      const clientDoc = await dbClients.get(clientId);

      await dbClients.destroy(clientDoc._id, clientDoc._rev);
      console.log(`Client ${clientId} deleted successfully.`);

      userDoc.clients = userDoc.clients.filter((id) => id !== clientId);
    }

    await dbAccounts.insert(userDoc);

    const clients = await dbClients.find({
      selector: { userId },
    });

    return clients.docs;
  } catch (error) {
    console.error("Error deleting clients:", error);
    throw new Error("Failed to delete clients");
  }
};

module.exports = {
  createClient,
  getAllUserClients,
  deleteClient,
};
