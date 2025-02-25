const { default: axios } = require("axios");
const { v4: uuidv4 } = require("uuid");
const nano = require("nano")("http://admin:1234@127.0.0.1:5984");

const { connectDB } = require("../controllers/utils");

const createClient = async ({ email, userId, clientData }) => {
  const extractLastId = (id) => {
    const parts = id.split("_");
    return parts[parts.length - 1];
  };

  const extractedId = extractLastId(userId);

  let dbClients, dbAccounts;

  try {


    dbClients = await connectDB(`db_${extractedId}_clients`);
    dbAccounts = await connectDB(`db_accounts`);


    try {
      const clientId = uuidv4();
      const clientDoc = {
        _id: clientId,
        id: clientId,
        userId,
        email,
        ...clientData,
      };
  
      await dbClients.insert(clientDoc);
  
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
  } catch (error) {
    console.error("Error checking/creating databases:", error);
    throw new Error("Database initialization failed");
  }

 
};

const createClients = async ({ userId, clientsData }) => {
  const normalizeDatabaseName = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9_$()+\-/]/g, "_")
      .replace(/^[^a-z]/, "db_");
  };

  const extractLastId = (id) => {
    const parts = id.split("_");
    return parts[parts.length - 1];
  };

  const extractedId = extractLastId(userId);

  const dbClientsName = normalizeDatabaseName(
    `db_${extractedId}_clients`
  );
  const dbAccountsName = normalizeDatabaseName("db_accounts");

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
    const clientDocs = [];

    for (const clientData of clientsData) {
      const { attachment, email, processedData, processedemails } = clientData;

      const emailId = attachment?.attachment?.emailId || "";

      if (!emailId) {
        console.log("Error: emailId no está presente en attachment");
        continue;
      }

      const sanitizedEmailId = emailId.replace(/[^a-zA-Z0-9-_@.]+/g, "_");
      const clientId = `client_${sanitizedEmailId}`;

      const existingClient = await dbClients.find({
        selector: { email: email },
        limit: 1,
      });


      if (existingClient.docs.length > 0) {
        console.log("YA EXISTE UN DOC CON ESE emailId");
      } else {
        const clientDoc = {
          _id: clientId,
          id: clientId,
          userId,
          email: email,
          emailId: attachment?.attachment?.emailId,
          processedemails,
          clientData: processedData,
        };

        console.log("Cliente a insertar:", clientDoc);

        try {
          const result = await dbClients.insert(clientDoc);

        } catch (err) {
          console.error("Error inserting client document:", err);
        }

        const userDoc = await dbAccounts.get(userId);
        if (!userDoc.clients) {
          userDoc.clients = [];
        }
        userDoc.clients.push(clientId);

        await dbAccounts.insert(userDoc);

        clientDocs.push(clientDoc);
      }
    }

    return clientDocs;
  } catch (error) {
    console.error("Error creating clients:", error);
    throw new Error("Failed to create clients");
  }
};

const getAllUserClients = async ({ userId }) => {
  const normalizeDatabaseName = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9_$()+\-/]/g, "_")
      .replace(/^[^a-z]/, "db_");
  };

  const extractLastId = (id) => {
    const parts = id.split("_");
    return parts[parts.length - 1];
  };

  const extractedId = extractLastId(userId);

  const dbClientsName = normalizeDatabaseName(
    `db_${extractedId}_clients`
  );


  let dbClients;

  try {
    const dbs = await nano.db.list();
    if (!dbs.includes(dbClientsName)) {
      await nano.db.create(dbClientsName);
    }
    dbClients = nano.use(dbClientsName);

    const clients = await dbClients.find({
      selector: { userId },
    });


    return clients.docs.length > 0 ? clients.docs : [];
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw new Error("Failed to fetch clients");
  }
};

const deleteClient = async ({ clientIds, userId }) => {
  const userIdUid = userId.split("_")[2];
  const dbClientsName = `db_${userIdUid}_clients`;

  const dbAccountsName = "db_accounts";
  let dbClients, dbAccounts;

  try {
    dbClients = nano.use(dbClientsName);
    dbAccounts = nano.use(dbAccountsName);

    const userDoc = await dbAccounts.get(userId);

    for (const clientId of clientIds) {
      const clientDoc = await dbClients.get(clientId);

      await dbClients.destroy(clientDoc._id, clientDoc._rev);

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

const updateClient = async ({ clientId, userId, clientData }) => {
  const userIdUid = userId.split("_")[2];
  const dbClientsName = `db_${userIdUid}_clients`;
  let dbClients;

  try {
    dbClients = nano.use(dbClientsName);

    const clientDoc = await dbClients.get(clientId);

    const updatedDoc = {
      ...clientDoc,
      clientData: {
        ...clientDoc.clientData,
        ...clientData,
      },
    };


    await dbClients.insert(updatedDoc);

    const clients = await dbClients.find({
      selector: { userId },
    });

    return clients.docs;
  } catch (error) {
    console.error("Error updating client:", error);
    throw new Error("Failed to update client");
  }
};

const getOneClient = async ({ userId, clientId }) => {
  const normalizeDatabaseName = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9_$()+\-/]/g, "_")
      .replace(/^[^a-z]/, "db_");
  };

  const extractLastId = (id) => {
    const parts = id.split("_");
    return parts[parts.length - 1];
  };

  const extractedId = extractLastId(userId);

  const dbClientsName = normalizeDatabaseName(
    `db_${extractedId}_clients`
  );

  let dbClients;

  try {
    dbClients = nano.use(dbClientsName);

    const clientDoc = await dbClients.get(clientId);

    return clientDoc;
  } catch (error) {
    console.error("Error retrieving client:", error);
    throw new Error("Failed to retrieve client");
  }
};

module.exports = {
  createClient,
  createClients,
  getAllUserClients,
  deleteClient,
  updateClient,
  getOneClient,
};
