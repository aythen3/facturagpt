const { catchedAsync } = require("../utils/err");
const { connectDB } = require("./utils");
const { v4: uuidv4 } = require('uuid');


const createAutomationController = async (req, res) => {
  try {
    const { userId, email, automationData } = req.body;


    console.log('userId', userId)
    // const resp = await createAutomation({ userId, email, automationData });
    // return res.status(200).send(resp);
    // try {
      const dbAutomations = await connectDB("db_automations");
      const dbAccounts = await connectDB("db_accounts");
  
      const automationId = uuidv4();
      const automationDoc = {
        _id: automationId,
        id: automationId,
        userId,
        email,
        ...automationData
        // automationData: { ...automationData, id: automationId },
      };
  
      
      
      console.log("automationDoc", automationDoc);
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
  
      // return automations.docs;

      return res.status(200).send(automations.docs);
    // } catch (error) {
    //   // throw new Error("Failed to create automation");
    // }
  } catch (err) {
    console.log("err", err);
    return res.status(500).send("Error on createAutomationController");
  }
};

const getAllUserAutomationsController = async (req, res) => {
  try {
    const { userId } = req.params;

    // const resp = await getAllUserAutomations({ userId });
    // return res.status(200).send(resp);

    try {
      const dbAutomations = await connectDB("db_automations");
  
      const automations = await dbAutomations.find({
        selector: { userId },
      });
  
      console.log(
        `Found ${automations.docs.length} automations for userId ${userId}`
      );
  
      const  data = automations.docs.length > 0 ? automations.docs : [];
      return res.status(200).send(data);
    } catch (error) {
      throw new Error("Failed to fetch automations");
    }

  } catch (err) {
    console.log("err", err);
    return res.status(500).send("Error on getAllUserAutomationsController");
  }
};

const updateAutomationController = async (req, res) => {
  try {
    const { automationId } = req.params;
    const { userId, ...toUpdate } = req.body;


    // const resp = await updateAutomation({ automationId, toUpdate, userId });
    // return res.status(200).send(resp);

    try {
      const dbAutomations = await connectDB("db_automations");
  
      const automationDoc = await dbAutomations.get(automationId);
  
  
      console.log("toUpdatetoUpdatetoUpdate", toUpdate);
      const updatedDoc = {
        ...automationDoc,
        ...toUpdate,
      };
  
      await dbAutomations.insert(updatedDoc);
      console.log(`Automation ${automationId} updated successfully`);
  
      const automations = await dbAutomations.find({
        selector: { userId },
      });
  
      // return automations.docs;

      return res.status(200).send(automations.docs);
    } catch (error) {
      console.error("Error updating automation:", error);
      throw new Error("Failed to update automation");
    }

  } catch (err) {
    console.log("err", err);
    return res.status(500).send("Error on updateAutomationController");
  }
};

const deleteAutomationController = async (req, res) => {
  try {
    const { automationId } = req.params;
    const { userId } = req.body;


    // const resp = await deleteAutomation({ automationId, userId });
    // return res.status(200).send(resp);

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
  
      // return automations.docs;

      return res.status(200).send(automations.docs);
    } catch (error) {
      console.error("Error deleting automation:", error);
      throw new Error("Failed to delete automation");
    }


  } catch (err) {
    console.error("Error on deleteAutomationController:", err);
    return res.status(500).send("Error on deleteAutomationController");
  }
};



module.exports = {
  deleteAutomationController: catchedAsync(deleteAutomationController),
  createAutomationController: catchedAsync(createAutomationController),
  getAllUserAutomationsController: catchedAsync( getAllUserAutomationsController ),
  updateAutomationController: catchedAsync(updateAutomationController),
  deleteAutomationController: catchedAsync(deleteAutomationController),
};
