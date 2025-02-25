const getPaymentMethodService = async ({ clientId }) => {

  try {
    const db = await connectDB("db_clients");
    // Retrieve the client document by clientId
    const clientDoc = await db.get(clientId);

    if (!clientDoc) {
      return {
        success: false,
        message: "Client not found",
      };
    }

    const { paymentMethodId, stripeCustomerId } = clientDoc;
    if (!paymentMethodId) {
      return {
        success: false,
        message: "Payment method not found for this client",
      };
    }


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
  const clientUid = clientId.split("_")[2];

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const withRetry = async (fn, maxRetries, initialDelay) => {
    let attempts = 0;
    let delay = initialDelay;
    while (attempts < maxRetries) {
      try {
        return await fn();
      } catch (error) {
        if (error.statusCode === 409) {
          attempts++;
          console.warn(
            `Attempt ${attempts} failed due to conflict. Retrying in ${delay}ms...`
          );
          if (attempts >= maxRetries) {
            console.error(
              `All ${maxRetries} attempts failed due to document conflicts.`
            );
            throw error; 
          }
          await sleep(delay);
          delay *= 2; 
        } else {
          throw error;
        }
      }
    }
  };

  let clientDoc;

  const mainDb = await connectDB("db_clients");
  const processedEmailsDb = await connectDB(`db_${clientUid}_processedemails`);

  try {

   
    clientDoc = await withRetry(() => mainDb.get(clientId), 5, 300);
    if (!clientDoc) {
      throw new Error(`No client found with ID: ${clientId}`);
    }
  } catch (error) {
    console.error("Error fetching client document:", error);
    throw new Error("Failed to fetch client document");
  }


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

  try {
    await withRetry(
      async () => {
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
