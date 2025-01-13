const { createClient, getAllUserClients } = require("../services/clients");
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

module.exports = {
  createClientController: catchedAsync(createClientController),
  getAllUserClientsController: catchedAsync(getAllUserClientsController),
};
