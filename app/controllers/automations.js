const {
  createAutomation,
  getAllUserAutomations,
  updateAutomation,
  deleteAutomation,
} = require("../services/automations");
const { catchedAsync } = require("../utils/err");

const createAutomationController = async (req, res) => {
  try {
    const { userId, email, automationData } = req.body;
    console.log("data from createAutomationController", {
      userId,
      email,
      automationData,
    });

    const resp = await createAutomation({ userId, email, automationData });

    return res.status(200).send(resp);
  } catch (err) {
    console.log("err", err);
    return res.status(500).send("Error on createAutomationController");
  }
};

const getAllUserAutomationsController = async (req, res) => {
  try {
    const { userId } = req.params;

    const resp = await getAllUserAutomations({ userId });

    return res.status(200).send(resp);
  } catch (err) {
    console.log("err", err);
    return res.status(500).send("Error on getAllUserAutomationsController");
  }
};

const updateAutomationController = async (req, res) => {
  try {
    const { automationId } = req.params;
    const { userId, ...toUpdate } = req.body;
    console.log(
      "Updating automation with ID:",
      automationId,
      "with data:",
      toUpdate
    );

    const resp = await updateAutomation({ automationId, toUpdate, userId });

    return res.status(200).send(resp);
  } catch (err) {
    console.log("err", err);
    return res.status(500).send("Error on updateAutomationController");
  }
};

const deleteAutomationController = async (req, res) => {
  try {
    const { automationId } = req.params;
    const { userId } = req.body;

    console.log(
      "Deleting automation with ID:",
      automationId,
      "for userId:",
      userId
    );

    const resp = await deleteAutomation({ automationId, userId });

    return res.status(200).send(resp);
  } catch (err) {
    console.error("Error on deleteAutomationController:", err);
    return res.status(500).send("Error on deleteAutomationController");
  }
};



module.exports = {
  deleteAutomationController,
  createAutomationController: catchedAsync(createAutomationController),
  getAllUserAutomationsController: catchedAsync(
    getAllUserAutomationsController
  ),
  updateAutomationController: catchedAsync(updateAutomationController),
  deleteAutomationController: catchedAsync(deleteAutomationController),
};
