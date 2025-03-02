const { catchedAsync } = require("../utils/err");
const { connectDB } = require("./utils");


const createClientController = async (req, res) => {
  try {
    const { email, userId, clientData: clientsData } = req.body;

    // const resp = await createClient({ email, userId, clientData });
    // return res.status(200).send(resp);

    const extractedId = userId.split('_').pop();
    const dbClients = await connectDB(`db_${extractedId}_clients`);

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
  
      // return clientDocs;
      return res.status(200).send(clientDocs);
    } catch (error) {
      console.error("Error creating clients:", error);
      throw new Error("Failed to create clients");
    }



  } catch (err) {
    console.log("err", err);
    return res.status(500).send("Error on createClientController");
  }
};

const createClientsController = async (req, res) => {
  try {
    const { userId, clientsData } = req.body;


    // const createdClients = await createClients({ userId, clientsData });
    // return res.status(200).send(createdClients);


    const extractedId = userId.split('_').pop();
    const dbClients = await connectDB(`db_${extractedId}_clients`);

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


  } catch (err) {
    console.log("Error:", err);
    return res.status(500).send("Error on createClientsController");
  }
};

const getAllClientsController = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("Fetching clients for userId (CONTROLLER):", userId);

    // const resp = await getAllUserClients({ userId });
    // return res.status(200).send(resp);

    const extractedId = userId.split('_').pop();
    const dbClients = await connectDB(`db_${extractedId}_clients`);

    const clients = await dbClients.find({
      selector: { userId },
    });

    const data = clients.docs.length > 0 ? clients.docs : [];

    return res.status(200).send(data);
    

  } catch (err) {
    console.log("err", err);
    return res.status(500).send("Error on getAllUserClientsController");
  }
};

const updateClientController = async (req, res) => {
  try {
    const { clientId } = req.params;
    const { userId, ...clientData } = req.body;


    const extractedId = userId.split('_').pop();
    const dbClients = await connectDB(`db_${extractedId}_clients`);


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

    // return clients.docs;
    return res.status(200).send(clients.docs);

  } catch (err) {
    console.log("err", err);
    return res.status(500).send("Error on updateClientController");
  }
};

const getOneClientController = async (req, res) => {
  try {
    const { clientId, userId } = req.params;

    // const client = await getOneClient({ userId, clientId });
    // return res.status(200).send(client);
    const extractedId = userId.split('_').pop();
    const dbClients = await connectDB(`db_${extractedId}_clients`);
    
    dbClients = nano.use(dbClientsName);

    const clientDoc = await dbClients.get(clientId);

    // return clientDoc;
    return res.status(200).send(clientDoc);
  } catch (err) {
    console.error("Error in getOneClientController:", err);
    return res.status(500).send("Error on getOneClientController");
  }
};

const deleteClientController = async (req, res) => {
  try {
    const { clientIds } = req.body;
    const { userId } = req.body;


    const extractedId = userId.split('_').pop();
    const dbClients = await connectDB(`db_${extractedId}_clients`);
    const dbAccounts = await connectDB("db_accounts");

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

    return res.status(200).send(clients.docs);  

  } catch (err) {
    console.error("Error on deleteClientsController:", err);
    return res.status(500).send("Error on deleteClientsController");
  }
};

module.exports = {
  createClientController: catchedAsync(createClientController),
  getAllClientsController: catchedAsync(getAllClientsController),
  deleteClientController: catchedAsync(deleteClientController),
  updateClientController: catchedAsync(updateClientController),
  getOneClientController: catchedAsync(getOneClientController),
  createClientsController: catchedAsync(createClientsController),
};
