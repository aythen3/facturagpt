const { catchedAsync } = require("../utils/err");
const { connectDB } = require("./utils");
const { v4: uuidv4 } = require('uuid');





const addAuthController = async (req, res) => {
  try {
    console.log("addAuthController");
    const user = req.user;
    const id = user._id.split('_').pop(); 

    const dbAutomations = await connectDB(`db_${id}_auth`);

    const auth = req.body;

    console.log("auth", auth);

    if(!auth.type) {
      return res.status(400).send("Type is required");
    }
    


    // Check if auth with same email already exists
    const existingAuth = await dbAutomations.find({
      selector: {
        email: auth.email,
        type: auth.type
      }
    });
    
    if (existingAuth.docs.length > 0) {
      return res.status(400).send("Auth with this email already exists");
    }



    await dbAutomations.insert(auth);

    console.log("auth", auth);

    return res.status(200).send(auth);
  } catch(err) {
    console.log("err", err);
    return res.status(500).send("Error on addAuthController");
  }
}


const getAuthController = async (req, res) => {
  try {
    const user = req.user;
    const { type } = req.params;

    // console.log("user!!", user);
    const id = user._id.split('_').pop(); 

    console.log("type automate auth getAuthController", type);

    const dbAutomations = await connectDB(`db_${id}_auth`);

    const automations = await dbAutomations.find({
      selector: { 
        type: type
       },
    });

    console.log("automations", automations);

    return res.status(200).send(automations.docs);
  } catch(err) {
    console.log("err", err);
    return res.status(500).send("Error on getAuthController");
  }
}


const deleteAuthController = async (req, res) => {
  try {
    const { automationId } = req.params;
    const { userId } = req.body;
  } catch(err) {
    console.log("err", err);
    return res.status(500).send("Error on deleteAuthController");
  }
}





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

const getAllUserAutomationsByInputSeachController = async (req, res) => {
  try {
    const { userId, inputValue } = req.body;

    console.log("entro en con userId en getAllUserAutomationsByInputSeachController", { userId, inputValue });

    const dbAutomations = await connectDB("db_automations");

    // Búsqueda por userId
    let query = {
      selector: { userId },
    };

    const automations = await dbAutomations.find(query);
    let data = automations.docs || [];

    // Si inputValue existe, filtramos los resultados
    if (inputValue) {
      const searchTerm = inputValue.toLowerCase();
      data = data.filter((doc) =>
        Object.values(doc).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(searchTerm)
        )
      );
    }

    console.log(`Found ${data.length} automations for userId ${userId}`);
    return res.status(200).send(data);
  } catch (err) {
    console.error("Error in getAllUserAutomationsController", err);
    return res.status(500).send("Error retrieving automations");
  }
};

module.exports = {
  addAuthController: catchedAsync(addAuthController),
  getAuthController: catchedAsync(getAuthController),
  deleteAuthController: catchedAsync(deleteAuthController),
  
  deleteAutomationController: catchedAsync(deleteAutomationController),
  createAutomationController: catchedAsync(createAutomationController),
  getAllUserAutomationsController: catchedAsync( getAllUserAutomationsController ),
  updateAutomationController: catchedAsync(updateAutomationController),
  deleteAutomationController: catchedAsync(deleteAutomationController),
  getAllUserAutomationsByInputSeachController: catchedAsync(
    getAllUserAutomationsByInputSeachController
  ),
};
