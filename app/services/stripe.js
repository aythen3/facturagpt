const getPaymentMethodService = async ({ clientId }) => {
  const dbName = "db_emailmanager_clients";
  let db;

  try {
    // Ensure the database exists
    const dbs = await nano.db.list();
    if (!dbs.includes(dbName)) {
      console.log(`Database ${dbName} does not exist.`);
      throw new Error("Database does not exist");
    }
    db = nano.use(dbName);
  } catch (error) {
    console.error("Error accessing database:", error);
    throw new Error("Database access failed");
  }

  try {
    // Retrieve the client document by clientId
    const clientDoc = await db.get(clientId);

    if (!clientDoc) {
      console.log(`No client found with ID: ${clientId}`);
      return {
        success: false,
        message: "Client not found",
      };
    }

    // Check if paymentMethodId exists in the client document
    const { paymentMethodId, stripeCustomerId } = clientDoc;
    if (!paymentMethodId) {
      console.log(`No payment method found for client with ID: ${clientId}`);
      return {
        success: false,
        message: "Payment method not found for this client",
      };
    }

    console.log(
      `Payment method found for client with ID: ${clientId}`,
      paymentMethodId
    );
    return {
      success: true,
      paymentMethodId,
      stripeCustomerId,
    };
  } catch (error) {
    console.error("Error retrieving client document:", error);
    throw new Error("Failed to retrieve client document");
  }
};

const updateClientService = async ({ clientId, toUpdate }) => {
  const mainDbName = "db_emailmanager_clients";
  const clientUid = clientId.split("_")[2];
  const processedEmailsDbName = `db_${clientUid}_processedemails`;
  let mainDb, processedEmailsDb;

  // Utility function for sleep
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const withRetry = async (fn, maxRetries, initialDelay) => {
    let attempts = 0;
    let delay = initialDelay;
    while (attempts < maxRetries) {
      try {
        return await fn();
      } catch (error) {
        // Retry only on 409 Conflict errors
        if (error.statusCode === 409) {
          attempts++;
          console.warn(
            `Attempt ${attempts} failed due to conflict. Retrying in ${delay}ms...`
          );
          if (attempts >= maxRetries) {
            console.error(
              `All ${maxRetries} attempts failed due to document conflicts.`
            );
            throw error; // Rethrow after max retries
          }
          await sleep(delay);
          delay *= 2; // Exponential backoff
        } else {
          // For other errors, do not retry
          throw error;
        }
      }
    }
  };

  try {
    // Initialize databases
    const dbs = await withRetry(() => nano.db.list(), 5, 300);
    if (!dbs.includes(mainDbName)) {
      throw new Error(`Main database ${mainDbName} does not exist.`);
    }
    mainDb = nano.use(mainDbName);

    if (!dbs.includes(processedEmailsDbName)) {
      console.log(
        `Database ${processedEmailsDbName} does not exist. Creating...`
      );
      await nano.db.create(processedEmailsDbName);
    }
    processedEmailsDb = nano.use(processedEmailsDbName);
  } catch (error) {
    console.error("Error accessing databases:", error);
    throw new Error("Database initialization failed");
  }

  // Fetch client document from the main database
  let clientDoc;
  try {
    clientDoc = await withRetry(() => mainDb.get(clientId), 5, 300);
    if (!clientDoc) {
      throw new Error(`No client found with ID: ${clientId}`);
    }
  } catch (error) {
    console.error("Error fetching client document:", error);
    throw new Error("Failed to fetch client document");
  }

  // Update detailedTokenConsumption in the processed emails database first
  if (toUpdate.detailedTokenConsumption) {
    for (const [key, value] of Object.entries(
      toUpdate.detailedTokenConsumption
    )) {
      try {
        await withRetry(
          async () => {
            // Check if document already exists in processedEmailsDb
            let existingDoc;
            try {
              existingDoc = await processedEmailsDb.get(key);
            } catch (err) {
              if (err.statusCode !== 404) throw err;
            }

            if (existingDoc) {
              // Merge with existing document
              return processedEmailsDb.insert({
                ...existingDoc,
                ...value,
                _id: key,
                _rev: existingDoc._rev, // Use latest revision
              });
            } else {
              // Create new document
              return processedEmailsDb.insert({
                _id: key,
                ...value,
              });
            }
          },
          5,
          300
        );
      } catch (error) {
        console.error(`Failed to insert document for key ${key}:`, error);
      }
    }
  }

  // Fetch all detailedTokenConsumption from the processed emails database
  let detailedTokenConsumption;
  try {
    const processedEmailsDocs = await withRetry(
      () => processedEmailsDb.list({ include_docs: true }),
      5,
      300
    );
    detailedTokenConsumption = processedEmailsDocs.rows.reduce((acc, row) => {
      acc[row.id] = row.doc;
      return acc;
    }, {});
  } catch (error) {
    console.error("Error fetching processed emails:", error);
    throw new Error("Failed to fetch processed emails");
  }

  // Perform a single final update to the main client document
  try {
    await withRetry(
      async () => {
        // Always get the latest revision of the client doc
        const latestDoc = await mainDb.get(clientId);
        const updatedDoc = {
          ...latestDoc,
          ...toUpdate,
          processedEmails: [
            ...(clientDoc.processedEmails || []),
            ...(toUpdate.processedEmails || []),
          ],
          detailedTokenConsumption: undefined,
          tokensConsumed:
            (latestDoc.tokensConsumed || 0) + (toUpdate.tokensConsumed || 0),
          totalTokensPrice:
            (latestDoc.totalTokensPrice || 0) +
            (toUpdate.totalTokensPrice || 0),
        };

        if (
          toUpdate.processedEmails &&
          toUpdate.processedEmails[0] === "reset"
        ) {
          updatedDoc.processedEmails = [];
        }

        return mainDb.insert(updatedDoc);
      },
      5,
      300
    );
  } catch (error) {
    console.error("Error updating client:", error);
    throw new Error("Failed to update client");
  }

  // Return the updated client data
  // Need to fetch the latest client doc again to have the final state after update
  let finalDoc;
  try {
    finalDoc = await mainDb.get(clientId);
  } catch (error) {
    console.error("Error fetching final updated client doc:", error);
    throw new Error("Failed to fetch final updated client doc");
  }

  const sanitizedDoc = {
    ...finalDoc,
    detailedTokenConsumption,
  };
  delete sanitizedDoc._id;
  delete sanitizedDoc._rev;

  return sanitizedDoc;
};

module.exports = {
  getPaymentMethodService,
  updateClientService,
};
