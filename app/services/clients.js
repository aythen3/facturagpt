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

const createClients = async ({ userId, clientsData }) => {
  const dbClientsName = "db_emailmanager_clients";
  const dbAccountsName = "db_emailmanager_accounts";
  let dbClients, dbAccounts;

  try {
    // Verificar si las bases de datos existen
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

    // Iterar sobre cada attachment
    for (const clientData of clientsData) {
      const { attachment, email, processedData } = clientData;
      console.log("ATTACHMENT", attachment);

      // Asegurarse de que attachment.emailId esté definido
      const emailId = attachment?.attachment?.emailId || ""; // Si no existe, se asigna una cadena vacía

      if (!emailId) {
        console.log("Error: emailId no está presente en attachment");
        continue; // Si no hay emailId, omite este cliente
      }

      // Sanitizar el emailId para crear un clientId válido
      const sanitizedEmailId = emailId.replace(/[^a-zA-Z0-9-_@.]+/g, "_"); // Reemplazar caracteres no válidos por guiones bajos
      const clientId = `client_${sanitizedEmailId}`; // Crear ID basado en emailId sanitizado

      console.log("Procesando cliente:", { attachment, email, processedData });

      // Buscar si ya existe un cliente con ese ID
      const existingClient = await dbClients.find({
        selector: { _id: clientId }, // Buscar por _id (que es client_emailId)
        limit: 1,
      });

      console.log("Existing client found:", existingClient.docs);

      if (existingClient.docs.length > 0) {
        console.log("YA EXISTE UN DOC CON ESE emailId");
      } else {
        console.log("CREANDO UN DOC NUEVO");

        // Si no existe, crear el cliente
        const clientDoc = {
          _id: clientId, // Usar client_emailId como _id
          id: clientId, // También puedes tener un campo `id` si lo necesitas
          userId,
          email: email,
          clientData: processedData, // Aquí puedes personalizar lo que se guarda en clientData
        };

        // Verificar si clientDoc tiene todos los campos requeridos
        console.log("Cliente a insertar:", clientDoc);

        // Insertar el cliente en la base de datos
        try {
          const result = await dbClients.insert(clientDoc);
          console.log(
            `Client document with ID ${clientId} has been created in ${dbClientsName}. Result:`,
            result
          );
        } catch (err) {
          console.error("Error inserting client document:", err);
        }

        // Asociar el cliente con el usuario
        const userDoc = await dbAccounts.get(userId);
        if (!userDoc.clients) {
          userDoc.clients = [];
        }
        userDoc.clients.push(clientId);

        await dbAccounts.insert(userDoc);

        clientDocs.push(clientDoc); // Agregar el cliente creado a la lista
      }
    }
    console.log("Clientes creados:", clientDocs); // Verifica si clientDocs tiene datos

    return clientDocs; // Retornar los clientes creados
  } catch (error) {
    console.error("Error creating clients:", error);
    throw new Error("Failed to create clients");
  }
};

// const createClients = async ({ userId, clientsData }) => {
//   const dbClientsName = "db_emailmanager_clients";
//   const dbAccountsName = "db_emailmanager_accounts";
//   let dbClients, dbAccounts;

//   try {
//     const dbs = await nano.db.list();

//     if (!dbs.includes(dbClientsName)) {
//       console.log(`Database ${dbClientsName} does not exist. Creating...`);
//       await nano.db.create(dbClientsName);
//     }
//     dbClients = nano.use(dbClientsName);

//     if (!dbs.includes(dbAccountsName)) {
//       console.log(`Database ${dbAccountsName} does not exist. Creating...`);
//       await nano.db.create(dbAccountsName);
//     }
//     dbAccounts = nano.use(dbAccountsName);
//   } catch (error) {
//     console.error("Error checking/creating databases:", error);
//     throw new Error("Database initialization failed");
//   }

//   try {
//     const clientIds = [];
//     for (const client of clientsData) {
//       const clientId = uuidv4();
//       const clientDoc = {
//         _id: clientId,
//         id: clientId,
//         userId,
//         clientData: client,
//       };
//       await dbClients.insert(clientDoc);
//       clientIds.push(clientId);
//     }

//     const userDoc = await dbAccounts.get(userId);
//     if (!userDoc.clients) {
//       userDoc.clients = [];
//     }
//     userDoc.clients.push(...clientIds);

//     await dbAccounts.insert(userDoc);

//     const clients = await dbClients.find({
//       selector: { userId },
//     });

//     return clients.docs;
//   } catch (error) {
//     console.error("Error creating clients:", error);
//     throw new Error("Failed to create clients");
//   }
// };

// const createClients = async ({ userId, clientsData }) => {
//   const dbClientsName = "db_emailmanager_clients";
//   const dbAccountsName = "db_emailmanager_accounts";
//   let dbClients, dbAccounts;

//   try {
//     const dbs = await nano.db.list();

//     if (!dbs.includes(dbClientsName)) {
//       console.log(`Database ${dbClientsName} does not exist. Creating...`);
//       await nano.db.create(dbClientsName);
//     }
//     dbClients = nano.use(dbClientsName);

//     if (!dbs.includes(dbAccountsName)) {
//       console.log(`Database ${dbAccountsName} does not exist. Creating...`);
//       await nano.db.create(dbAccountsName);
//     }
//     dbAccounts = nano.use(dbAccountsName);
//   } catch (error) {
//     console.error("Error checking/creating databases:", error);
//     throw new Error("Database initialization failed");
//   }

//   try {
//     // Usar un mapa para asegurar la unicidad de los clientes
//     const uniqueClients = new Map();

//     clientsData.forEach(({ processedAttachments }) => {
//       console.log("PROCESOOOOOOO", processedAttachments);

//       processedAttachments.forEach(({ fromEmail, processedData }) => {
//         // Aquí estamos creando la estructura que necesitas para los clientes
//         const clientDoc = {
//           fromEmail: fromEmail?.[0]?.address, // Dirección de email del remitente
//           processedData: {
//             fullName: processedData?.clientName || "",
//             email: processedData?.clientEmail || "", // Este campo lo extraemos de processedData
//             numberPhone: processedData?.clientPhoneNumber || "",
//             codeCountry: processedData?.clientCif ? "+34" : "", // Puedes ajustar el código según los datos
//             webSite: processedData?.clientWebsite || "", // Si tienes el campo en processedData
//             billingEmail: processedData?.clientEmail || "", // O puedes usar otro campo si lo tienes
//             zipCode: processedData?.clientZip || "",
//             country: processedData?.country, // Suponiendo que siempre sea Argentina
//             taxNumber: processedData?.clientNif || "",
//             preferredCurrency: "", // Asegúrate de modificarlo según la lógica de tu app
//             cardNumber: processedData?.companyPhoneNumber || "", // Puedes ajustarlo según los datos disponibles
//           },
//         };

//         // Aseguramos que el cliente sea único
//         uniqueClients.set(processedData?.clientCif, clientDoc); // Usamos clientCif como identificador único
//       });
//     });

//     const clientIds = [];
//     for (const [clientCif, clientDoc] of uniqueClients.entries()) {
//       const clientId = uuidv4();
//       const newClientDoc = {
//         _id: clientId,
//         id: clientId,
//         userId,
//         clientData: clientDoc,
//       };
//       await dbClients.insert(newClientDoc);
//       clientIds.push(clientId);
//     }

//     // Actualizar el documento del usuario en dbAccounts
//     const userDoc = await dbAccounts.get(userId);
//     if (!userDoc.clients) {
//       userDoc.clients = [];
//     }
//     userDoc.clients.push(...clientIds);

//     await dbAccounts.insert(userDoc);

//     // Recuperar todos los clientes del usuario
//     const clients = await dbClients.find({
//       selector: { userId },
//     });

//     return clients.docs;
//   } catch (error) {
//     console.error("Error creating clients:", error);
//     throw new Error("Failed to create clients");
//   }
// };

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

const updateClient = async ({ clientId, userId, toUpdate }) => {
  const dbClientsName = "db_emailmanager_clients";
  let dbClients;

  try {
    dbClients = nano.use(dbClientsName);

    const clientDoc = await dbClients.get(clientId);

    const updatedDoc = {
      ...clientDoc,
      clientData: {
        ...clientDoc.clientData,
        ...toUpdate,
      },
    };

    await dbClients.insert(updatedDoc);
    console.log(`Client ${clientId} updated successfully`);

    const clients = await dbClients.find({
      selector: { userId },
    });

    return clients.docs;
  } catch (error) {
    console.error("Error updating client:", error);
    throw new Error("Failed to update client");
  }
};

const getOneClient = async ({ clientId }) => {
  const dbClientsName = "db_emailmanager_clients";
  let dbClients;

  try {
    dbClients = nano.use(dbClientsName);

    const clientDoc = await dbClients.get(clientId);
    console.log(`Client ${clientId} retrieved successfully`);

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
