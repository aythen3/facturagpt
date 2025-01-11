const { default: axios } = require("axios");
const { v4: uuidv4 } = require("uuid");
const nano = require("nano")("http://admin:1234@127.0.0.1:5984");

const createAutomation = async ({ userId, email, automationData }) => {
  console.log("Data received in createAutomation:", {
    userId,
    email,
    automationData,
  });

  const dbAutomationsName = "db_automations";
  const dbAccountsName = "db_emailmanager_accounts";
  let dbAutomations, dbAccounts;

  try {
    const dbs = await nano.db.list();

    if (!dbs.includes(dbAutomationsName)) {
      console.log(`Database ${dbAutomationsName} does not exist. Creating...`);
      await nano.db.create(dbAutomationsName);
    }
    dbAutomations = nano.use(dbAutomationsName);

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
    const automationId = uuidv4();
    const automationDoc = {
      _id: automationId,
      id: automationId,
      userId,
      email,
      automationData,
    };

    await dbAutomations.insert(automationDoc);
    console.log(`Automation created successfully: ${automationId}`);

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
    console.error("Error creating automation:", error);
    throw new Error("Failed to create automation");
  }
};

const getAllUserAutomations = async ({ userId }) => {
  console.log("Fetching automations for userId (SERVICE):", userId);

  const dbAutomationsName = "db_automations";
  let dbAutomations;

  try {
    const dbs = await nano.db.list();
    if (!dbs.includes(dbAutomationsName)) {
      console.log(`Database ${dbAutomationsName} does not exist. Creating...`);
      await nano.db.create(dbAutomationsName);
    }
    dbAutomations = nano.use(dbAutomationsName);

    const automations = await dbAutomations.find({
      selector: { userId },
    });

    console.log(
      `Found ${automations.docs.length} automations for userId ${userId}`
    );

    return automations.docs.length > 0 ? automations.docs : [];
  } catch (error) {
    console.error("Error fetching automations:", error);
    throw new Error("Failed to fetch automations");
  }
};

const updateAutomation = async ({ automationId, userId, toUpdate }) => {
  console.log(
    "Updating automation with ID:",
    automationId,
    "with data:",
    toUpdate
  );

  const dbAutomationsName = "db_automations";
  let dbAutomations;

  try {
    dbAutomations = nano.use(dbAutomationsName);

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

  const dbAutomationsName = "db_automations";
  const dbAccountsName = "db_emailmanager_accounts";
  let dbAutomations, dbAccounts;

  try {
    dbAutomations = nano.use(dbAutomationsName);
    dbAccounts = nano.use(dbAccountsName);

    const automationDoc = await dbAutomations.get(automationId);

    await dbAutomations.destroy(automationDoc._id, automationDoc._rev);
    console.log(`Automation ${automationId} deleted successfully.`);

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
