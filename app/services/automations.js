const { default: axios } = require("axios");
const { v4: uuidv4 } = require("uuid");
const nano = require("nano")("http://admin:1234@127.0.0.1:5984");

const { connectDB } = require('../controllers/utils')


const createAutomation = async ({ userId, email, automationData }) => {
  try {
    const dbAutomations = await connectDB("db_automations");
    const dbAccounts = await connectDB("db_accounts");

    const automationId = uuidv4();
    const automationDoc = {
      _id: automationId,
      id: automationId,
      userId,
      email,
      automationData: { ...automationData, id: automationId },
    };

    await dbAutomations.insert(automationDoc);

    const userDoc = await dbAccounts.get(userId);
    if (!userDoc.automations) {
      userDoc.automations = [];
    }
    userDoc.automations.push(automationId);

    await dbAccounts.insert(userDoc);

    const automations = await dbAutomations.find({
      selector: { userId },
    });

    return automations.docs;
  } catch (error) {
    throw new Error("Failed to create automation");
  }
};

const getAllUserAutomations = async ({ userId }) => {
  try {
    const dbAutomations = await connectDB("db_automations");

    const automations = await dbAutomations.find({
      selector: { userId },
    });

    console.log(
      `Found ${automations.docs.length} automations for userId ${userId}`
    );

    return automations.docs.length > 0 ? automations.docs : [];
  } catch (error) {
    throw new Error("Failed to fetch automations");
  }
};

const updateAutomation = async ({ automationId, userId, toUpdate }) => {

  try {
    const dbAutomations = await connectDB("db_automations");

    const automationDoc = await dbAutomations.get(automationId);

    const updatedDoc = {
      ...automationDoc,
      ...toUpdate,
    };

    await dbAutomations.insert(updatedDoc);
    console.log(`Automation ${automationId} updated successfully`);

    const automations = await dbAutomations.find({
      selector: { userId },
    });

    return automations.docs;
  } catch (error) {
    console.error("Error updating automation:", error);
    throw new Error("Failed to update automation");
  }
};

const deleteAutomation = async ({ automationId, userId }) => {
  console.log("Deleting automation with ID:", automationId);
  try {
    const dbAutomations = await connectDB("db_automations");
    const dbAccounts = await connectDB("db_accounts");

    const automationDoc = await dbAutomations.get(automationId);

    await dbAutomations.destroy(automationDoc._id, automationDoc._rev);

    let userDoc = await dbAccounts.get(automationDoc.userId);
    userDoc.automations = userDoc.automations.filter(
      (id) => id !== automationId
    );

    await dbAccounts.insert(userDoc);

    const automations = await dbAutomations.find({
      selector: { userId },
    });

    return automations.docs;
  } catch (error) {
    console.error("Error deleting automation:", error);
    throw new Error("Failed to delete automation");
  }
};

module.exports = {
  createAutomation: createAutomation,
  getAllUserAutomations: getAllUserAutomations,
  updateAutomation: updateAutomation,
  deleteAutomation: deleteAutomation,
};
