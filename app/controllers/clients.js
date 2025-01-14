const {
  createClient,
  getAllUserClients,
  deleteClient,
  updateClient,
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
    console.log("Updating client with ID:", userId, "with data:", toUpdate);

    const resp = await updateClient({ clientId, toUpdate, userId });

    return res.status(200).send(resp);
  } catch (err) {
    console.log("err", err);
    return res.status(500).send("Error on updateClientController");
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
};
