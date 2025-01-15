const {
  createClient,
  getAllUserClients,
  deleteClient,
  updateClient,
  getOneClient,
  createClients,
} = require("../services/clients");
const { catchedAsync } = require("../utils/err");

const createClientController = async (req, res) => {
  try {
    const { email, userId, clientData } = req.body;
    console.log("data from createClientController", {
      email,
      userId,
      clientData,
    });

    const resp = await createClient({ email, userId, clientData });

    return res.status(200).send(resp);
  } catch (err) {
    console.log("err", err);
    return res.status(500).send("Error on createClientController");
  }
};

const createClientsController = async (req, res) => {
  try {
    const { userId, clientsData } = req.body; // Ahora esperamos un array de clientsData
    console.log("Data from createClientsController", {
      userId,
      clientsData,
    });

    // Llamada al servicio createClients para crear los clientes
    const createdClients = await createClients({ userId, clientsData });

    // Retornar la respuesta con los clientes creados
    return res.status(200).send(createdClients);
  } catch (err) {
    console.log("Error:", err);
    return res.status(500).send("Error on createClientsController");
  }
};

// const createClientsController = async (req, res) => {
//   try {
//     const { userId, clientsData } = req.body;
//     console.log("Data from createClientsController", {
//       userId,
//       clientsData,
//     });

//     if (!Array.isArray(clientsData) || clientsData.length === 0) {
//       return res.status(400).send("clientsData debe ser un array no vacío.");
//     }

//     const clients = await createClients({ userId, clientsData });

//     return res.status(200).json(clients); // Asegurar que devuelva JSON
//   } catch (err) {
//     console.error("Error in createClientsController:", err);
//     return res.status(500).send("Error en createClientsController.");
//   }
// };

const getAllUserClientsController = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("Fetching clients for userId (CONTROLLER):", userId);

    const resp = await getAllUserClients({ userId });

    return res.status(200).send(resp);
  } catch (err) {
    console.log("err", err);
    return res.status(500).send("Error on getAllUserClientsController");
  }
};

const updateClientController = async (req, res) => {
  try {
    const { clientId } = req.params;
    const { userId, ...toUpdate } = req.body;

    const resp = await updateClient({ clientId, toUpdate, userId });

    return res.status(200).send(resp);
  } catch (err) {
    console.log("err", err);
    return res.status(500).send("Error on updateClientController");
  }
};

const getOneClientController = async (req, res) => {
  console.log("ENTRE AL CONTROLLERRRRR");
  try {
    const { clientId } = req.params;

    const client = await getOneClient({ clientId });

    return res.status(200).send(client);
  } catch (err) {
    console.error("Error in getOneClientController:", err);
    return res.status(500).send("Error on getOneClientController");
  }
};

const deleteClientController = async (req, res) => {
  try {
    const { clientIds } = req.body;
    const { userId } = req.body;

    console.log("Deleting clients with IDs:", clientIds, "for userId:", userId);

    const resp = await deleteClient({ clientIds, userId });

    return res.status(200).send(resp);
  } catch (err) {
    console.error("Error on deleteClientsController:", err);
    return res.status(500).send("Error on deleteClientsController");
  }
};

module.exports = {
  createClientController: catchedAsync(createClientController),
  getAllUserClientsController: catchedAsync(getAllUserClientsController),
  deleteClientController: catchedAsync(deleteClientController),
  updateClientController: catchedAsync(updateClientController),
  getOneClientController: catchedAsync(getOneClientController),
  createClientsController: catchedAsync(createClientsController),
};
