// const { default: axios } = require("axios");
// const { v4: uuidv4 } = require("uuid");
// const nano = require("nano")("http://admin:1234@127.0.0.1:5984");
// const { sendOtpEmail } = require("./email");

// const createAccount = async ({ nombre, email, password }) => {
//   console.log("Data received in createAccount service:", {
//     nombre,
//     email,
//     password,
//   });

//   const dbName = "db_emailmanager_accounts";
//   let db;

//   try {
//     const dbs = await nano.db.list();
//     if (!dbs.includes(dbName)) {
//       console.log(`Database ${dbName} does not exist. Creating...`);
//       await nano.db.create(dbName);
//     }
//     db = nano.use(dbName);
//   } catch (error) {
//     console.error("Error checking/creating database:", error);
//     throw new Error("Database initialization failed");
//   }

//   try {
//     const existingDocs = await db.list({ include_docs: true });
//     const accountExists = existingDocs.rows.some(
//       (doc) => doc.doc.email === email
//     );

//     if (accountExists) {
//       console.log(`Account with email ${email} already exists.`);
//       return { success: false, message: "Account already exists." };
//     }

//     const accountId = uuidv4();
//     const docId = `account_${email}_${accountId}`;

//     const role = email === "info@aythen.com" ? "superadmin" : "user";

//     const hashedPassword = Buffer.from(password).toString("base64");

//     const newAccount = {
//       _id: docId,
//       nombre,
//       email,
//       password: hashedPassword,
//       id: docId,
//       role,
//       companyName: "",
//       contactNumber: "",
//     };

//     const response = await db.insert(newAccount);
//     console.log(`Account created successfully:`, response);

//     return {
//       success: true,
//       message: "Account created successfully.",
//       account: { nombre, email, docId, role },
//     };
//   } catch (error) {
//     console.error("Error creating account:", error);
//     throw new Error("Failed to create account");
//   }
// };

// const updateAccount = async ({ userId, toUpdate }) => {
//   console.log("Data received in updateAccount service:", { userId, toUpdate });

//   const dbName = "db_emailmanager_accounts";
//   let db;

//   try {
//     // Ensure the database exists
//     const dbs = await nano.db.list();
//     if (!dbs.includes(dbName)) {
//       console.log(`Database ${dbName} does not exist.`);
//       return { success: false, message: "Database does not exist." };
//     }
//     db = nano.use(dbName);
//   } catch (error) {
//     console.error("Error checking database:", error);
//     throw new Error("Database initialization failed");
//   }

//   try {
//     // Fetch the existing user document
//     const existingDoc = await db.get(userId);

//     if (!existingDoc) {
//       console.log(`No user found with ID: ${userId}`);
//       return { success: false, message: "User not found." };
//     }

//     // Merge the existing document with the updates
//     const updatedDoc = {
//       ...existingDoc,
//       ...toUpdate,
//       _rev: existingDoc._rev, // Ensure the correct revision is used
//     };

//     // Insert the updated document back into the database
//     await db.insert(updatedDoc);
//     console.log(`User with ID ${userId} updated successfully.`);

//     // Fetch all users and sanitize the response
//     const allUsersResponse = await db.list({ include_docs: true });
//     const allUsers = allUsersResponse.rows.map((row) => {
//       const { _id, _rev, ...rest } = row.doc;
//       return rest; // Remove internal CouchDB fields (_id and _rev)
//     });

//     return allUsers;
//   } catch (error) {
//     if (error.statusCode === 404) {
//       console.error(`User with ID ${userId} not found.`);
//       return { success: false, message: "User not found." };
//     }
//     console.error("Error updating user:", error);
//     throw new Error("Failed to update user");
//   }
// };

// const getAllUsers = async () => {
//   const dbName = "db_emailmanager_accounts";
//   let db;

//   try {
//     const dbs = await nano.db.list();
//     if (!dbs.includes(dbName)) {
//       console.log(`Database ${dbName} does not exist.`);
//       return { success: false, message: "Database does not exist." };
//     }
//     db = nano.use(dbName);
//   } catch (error) {
//     console.error("Error accessing database:", error);
//     throw new Error("Database access failed");
//   }

//   try {
//     const allDocs = await db.list({ include_docs: true });

//     const users = allDocs.rows.map((row) => {
//       const { _id, _rev, ...rest } = row.doc;
//       return rest;
//     });

//     return users;
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     throw new Error("Failed to fetch users");
//   }
// };

// const loginToManagerService = async ({ email, password }) => {
//   console.log("Data received in loginToManagerService:", { email, password });

//   const dbName = "db_emailmanager_accounts";
//   let db;

//   try {
//     const dbs = await nano.db.list();
//     if (!dbs.includes(dbName)) {
//       console.log(`Database ${dbName} does not exist.`);
//       return { success: false, message: "Account database does not exist." };
//     }

//     db = nano.use(dbName);
//   } catch (error) {
//     console.error("Error accessing database:", error);
//     throw new Error("Database access failed");
//   }

//   try {
//     const queryResponse = await db.find({
//       selector: { email },
//     });

//     if (queryResponse.docs.length === 0) {
//       console.log(`No account found for email: ${email}`);
//       return { success: false, message: "Invalid email or password." };
//     }

//     const account = queryResponse.docs[0];
//     const hashedPassword = Buffer.from(password).toString("base64");

//     if (account.password !== hashedPassword) {
//       console.log("Invalid password provided.");
//       return { success: false, message: "Invalid email or password." };
//     }

//     console.log(`Login successful for account: ${account._id}`);
//     return {
//       success: true,
//       message: "Login successful.",
//       account,
//     };
//   } catch (error) {
//     console.error("Error during login:", error);
//     throw new Error("Login process failed");
//   }
// };

// const getAllClientsService = async () => {
//   const mainDbName = "db_emailmanager_clients";
//   let mainDb;

//   try {
//     const dbs = await nano.db.list();

//     // Ensure the main database exists
//     if (!dbs.includes(mainDbName)) {
//       console.log(`Database ${mainDbName} does not exist. Creating...`);
//       await nano.db.create(mainDbName);
//     }
//     mainDb = nano.use(mainDbName);
//   } catch (error) {
//     console.error("Error accessing or creating the main database:", error);
//     throw new Error("Database initialization failed");
//   }

//   try {
//     // Fetch all clients from the main database
//     const clients = await mainDb.list({ include_docs: true });
//     const clientsWithDetails = await Promise.all(
//       clients.rows.map(async (row) => {
//         const clientDoc = row.doc;
//         if (!clientDoc.id) {
//           clientDoc.id = clientDoc._id;
//         }

//         const { _id, _rev, ...rest } = clientDoc;
//         const clientUid = clientDoc.id.split("_")[2];
//         const processedEmailsDbName = `db_${clientUid}_processedemails`;

//         // Fetch detailedTokenConsumption for each client
//         let detailedTokenConsumption = {};
//         try {
//           if (
//             await nano.db
//               .list()
//               .then((dbs) => dbs.includes(processedEmailsDbName))
//           ) {
//             const processedEmailsDb = nano.use(processedEmailsDbName);
//             const detailedDocs = await processedEmailsDb.list({
//               include_docs: true,
//             });
//             detailedTokenConsumption = detailedDocs.rows.reduce((acc, row) => {
//               acc[row.id] = row.doc;
//               return acc;
//             }, {});
//           } else {
//             console.warn(
//               `Database ${processedEmailsDbName} does not exist for client ${clientDoc.id}.`
//             );
//           }
//         } catch (error) {
//           console.error(
//             `Error fetching detailedTokenConsumption for client ${clientDoc.id}:`,
//             error
//           );
//         }

//         return {
//           ...rest,
//           detailedTokenConsumption,
//         };
//       })
//     );

//     return clientsWithDetails;
//   } catch (error) {
//     console.error("Error fetching clients:", error);
//     throw new Error("Failed to fetch clients");
//   }
// };

// const addNewClientService = async ({ clientData }) => {
//   const dbName = "db_emailmanager_clients";
//   let db;

//   try {
//     const dbs = await nano.db.list();
//     if (!dbs.includes(dbName)) {
//       console.log(`Database ${dbName} does not exist. Creating...`);
//       await nano.db.create(dbName);
//     }
//     db = nano.use(dbName);
//   } catch (error) {
//     console.error("Error accessing or creating database:", error);
//     throw new Error("Database initialization failed");
//   }

//   try {
//     const existingDocs = await db.find({
//       selector: { tokenEmail: clientData.tokenEmail },
//     });

//     if (existingDocs.docs.length > 0) {
//       console.log(
//         `Client with tokenEmail ${clientData.tokenEmail} already exists.`
//       );
//       return {
//         success: false,
//         message: "Client with this tokenEmail already exists.",
//       };
//     }

//     const clientId = uuidv4();
//     const docId = `client_${clientData.tokenEmail}_${clientId}`;

//     let newClient = {
//       _id: docId,
//       id: docId,
//       ...clientData,
//       processedEmails: [],
//       detailedTokenConsumption: {},
//       tokensConsumed: 0,
//       totalTokensPrice: 0,
//       active: false,
//     };

//     await db.insert(newClient);
//     console.log(`Client added successfully:`, newClient);

//     const allClients = await db.list({ include_docs: true });
//     const sanitizedClients = allClients.rows.map((row) => {
//       let docData = row.doc;
//       if (!docData.id) {
//         docData.id = docData._id;
//       }
//       const { _id, _rev, ...rest } = docData;
//       return rest;
//     });

//     return sanitizedClients;
//   } catch (error) {
//     console.error("Error adding new client:", error);
//     throw new Error("Failed to add new client");
//   }
// };

// const deleteClientService = async ({ clientId }) => {
//   const dbName = "db_emailmanager_clients";
//   let db;

//   try {
//     const dbs = await nano.db.list();
//     if (!dbs.includes(dbName)) {
//       console.log(`Database ${dbName} does not exist.`);
//       return { success: false, message: "Database does not exist." };
//     }
//     db = nano.use(dbName);
//   } catch (error) {
//     console.error("Error accessing database:", error);
//     throw new Error("Database access failed");
//   }

//   try {
//     const clientDoc = await db.get(clientId);

//     if (!clientDoc) {
//       console.log(`No client found with ID: ${clientId}`);
//       return { success: false, message: "Client not found." };
//     }

//     await db.destroy(clientDoc._id, clientDoc._rev);
//     console.log(`Client with ID ${clientId} deleted successfully.`);

//     const allClients = await db.list({ include_docs: true });
//     const sanitizedClients = allClients.rows.map((row) => {
//       let docData = row.doc;
//       if (!docData.id) {
//         docData.id = docData._id;
//       }
//       const { _id, _rev, ...rest } = docData;
//       return rest;
//     });

//     return sanitizedClients;
//   } catch (error) {
//     console.error("Error deleting client:", error);
//     throw new Error("Failed to delete client");
//   }
// };

// const updateClientService = async ({ clientId, toUpdate }) => {
//   const mainDbName = "db_emailmanager_clients";
//   const clientUid = clientId.split("_")[2];
//   const processedEmailsDbName = `db_${clientUid}_processedemails`;
//   let mainDb, processedEmailsDb;

//   // Utility function for sleep
//   const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

//   const withRetry = async (fn, maxRetries, initialDelay) => {
//     let attempts = 0;
//     let delay = initialDelay;
//     while (attempts < maxRetries) {
//       try {
//         return await fn();
//       } catch (error) {
//         // Retry only on 409 Conflict errors
//         if (error.statusCode === 409) {
//           attempts++;
//           console.warn(
//             `Attempt ${attempts} failed due to conflict. Retrying in ${delay}ms...`
//           );
//           if (attempts >= maxRetries) {
//             console.error(
//               `All ${maxRetries} attempts failed due to document conflicts.`
//             );
//             throw error; // Rethrow after max retries
//           }
//           await sleep(delay);
//           delay *= 2; // Exponential backoff
//         } else {
//           // For other errors, do not retry
//           throw error;
//         }
//       }
//     }
//   };

//   try {
//     // Initialize databases
//     const dbs = await withRetry(() => nano.db.list(), 5, 300);
//     if (!dbs.includes(mainDbName)) {
//       throw new Error(`Main database ${mainDbName} does not exist.`);
//     }
//     mainDb = nano.use(mainDbName);

//     if (!dbs.includes(processedEmailsDbName)) {
//       console.log(
//         `Database ${processedEmailsDbName} does not exist. Creating...`
//       );
//       await nano.db.create(processedEmailsDbName);
//     }
//     processedEmailsDb = nano.use(processedEmailsDbName);
//   } catch (error) {
//     console.error("Error accessing databases:", error);
//     throw new Error("Database initialization failed");
//   }

//   // Fetch client document from the main database
//   let clientDoc;
//   try {
//     clientDoc = await withRetry(() => mainDb.get(clientId), 5, 300);
//     if (!clientDoc) {
//       throw new Error(`No client found with ID: ${clientId}`);
//     }
//   } catch (error) {
//     console.error("Error fetching client document:", error);
//     throw new Error("Failed to fetch client document");
//   }

//   // Update detailedTokenConsumption in the processed emails database first
//   if (toUpdate.detailedTokenConsumption) {
//     for (const [key, value] of Object.entries(
//       toUpdate.detailedTokenConsumption
//     )) {
//       try {
//         await withRetry(
//           async () => {
//             // Check if document already exists in processedEmailsDb
//             let existingDoc;
//             try {
//               existingDoc = await processedEmailsDb.get(key);
//             } catch (err) {
//               if (err.statusCode !== 404) throw err;
//             }

//             if (existingDoc) {
//               // Merge with existing document
//               return processedEmailsDb.insert({
//                 ...existingDoc,
//                 ...value,
//                 _id: key,
//                 _rev: existingDoc._rev, // Use latest revision
//               });
//             } else {
//               // Create new document
//               return processedEmailsDb.insert({
//                 _id: key,
//                 ...value,
//               });
//             }
//           },
//           5,
//           300
//         );
//       } catch (error) {
//         console.error(`Failed to insert document for key ${key}:`, error);
//       }
//     }
//   }

//   // Fetch all detailedTokenConsumption from the processed emails database
//   let detailedTokenConsumption;
//   try {
//     const processedEmailsDocs = await withRetry(
//       () => processedEmailsDb.list({ include_docs: true }),
//       5,
//       300
//     );
//     detailedTokenConsumption = processedEmailsDocs.rows.reduce((acc, row) => {
//       acc[row.id] = row.doc;
//       return acc;
//     }, {});
//   } catch (error) {
//     console.error("Error fetching processed emails:", error);
//     throw new Error("Failed to fetch processed emails");
//   }

//   // Perform a single final update to the main client document
//   try {
//     await withRetry(
//       async () => {
//         // Always get the latest revision of the client doc
//         const latestDoc = await mainDb.get(clientId);
//         const updatedDoc = {
//           ...latestDoc,
//           ...toUpdate,
//           processedEmails: [
//             ...(clientDoc.processedEmails || []),
//             ...(toUpdate.processedEmails || []),
//           ],
//           detailedTokenConsumption: undefined,
//           tokensConsumed:
//             (latestDoc.tokensConsumed || 0) + (toUpdate.tokensConsumed || 0),
//           totalTokensPrice:
//             (latestDoc.totalTokensPrice || 0) +
//             (toUpdate.totalTokensPrice || 0),
//         };

//         if (
//           toUpdate.processedEmails &&
//           toUpdate.processedEmails[0] === "reset"
//         ) {
//           updatedDoc.processedEmails = [];
//         }

//         return mainDb.insert(updatedDoc);
//       },
//       5,
//       300
//     );
//   } catch (error) {
//     console.error("Error updating client:", error);
//     throw new Error("Failed to update client");
//   }

//   // Return the updated client data
//   // Need to fetch the latest client doc again to have the final state after update
//   let finalDoc;
//   try {
//     finalDoc = await mainDb.get(clientId);
//   } catch (error) {
//     console.error("Error fetching final updated client doc:", error);
//     throw new Error("Failed to fetch final updated client doc");
//   }

//   const sanitizedDoc = {
//     ...finalDoc,
//     detailedTokenConsumption,
//   };
//   delete sanitizedDoc._id;
//   delete sanitizedDoc._rev;

//   return sanitizedDoc;
// };

// const getPaymentMethodService = async ({ clientId }) => {
//   const dbName = "db_emailmanager_clients";
//   let db;

//   try {
//     // Ensure the database exists
//     const dbs = await nano.db.list();
//     if (!dbs.includes(dbName)) {
//       console.log(`Database ${dbName} does not exist.`);
//       throw new Error("Database does not exist");
//     }
//     db = nano.use(dbName);
//   } catch (error) {
//     console.error("Error accessing database:", error);
//     throw new Error("Database access failed");
//   }

//   try {
//     // Retrieve the client document by clientId
//     const clientDoc = await db.get(clientId);

//     if (!clientDoc) {
//       console.log(`No client found with ID: ${clientId}`);
//       return {
//         success: false,
//         message: "Client not found",
//       };
//     }

//     // Check if paymentMethodId exists in the client document
//     const { paymentMethodId, stripeCustomerId } = clientDoc;
//     if (!paymentMethodId) {
//       console.log(`No payment method found for client with ID: ${clientId}`);
//       return {
//         success: false,
//         message: "Payment method not found for this client",
//       };
//     }

//     console.log(
//       `Payment method found for client with ID: ${clientId}`,
//       paymentMethodId
//     );
//     return {
//       success: true,
//       paymentMethodId,
//       stripeCustomerId,
//     };
//   } catch (error) {
//     console.error("Error retrieving client document:", error);
//     throw new Error("Failed to retrieve client document");
//   }
// };

// const generateAndSendOtpService = async ({ email }) => {
//   const dbName = "db_emailmanager_otp";
//   let db;

//   try {
//     // Verificar y crear la base de datos si no existe
//     const dbs = await nano.db.list();
//     if (!dbs.includes(dbName)) {
//       console.log(`Database ${dbName} does not exist. Creating...`);
//       await nano.db.create(dbName);
//     }
//     db = nano.use(dbName);
//   } catch (error) {
//     console.error("Error accessing or creating database:", error);
//     throw new Error("Database initialization failed");
//   }

//   try {
//     // Generar OTP y su metadata
//     const otp = String(Math.floor(100000 + Math.random() * 900000));

//     const expirationTime = Date.now() + 5 * 60 * 1000;
//     const otpId = uuidv4();
//     const docId = `otp_${email}_${otpId}`;

//     // Guardar el OTP en la base de datos
//     const otpDocument = {
//       _id: docId,
//       email,
//       otp,
//       expirationTime,
//       createdAt: new Date().toISOString(),
//     };

//     await db.insert(otpDocument);
//     console.log(`OTP generado y guardado para ${email}:`, otp);

//     // Enviar el correo electrónico con el OTP
//     await sendOtpEmail(email, otp);

//     return { success: true, message: "OTP generado y enviado exitosamente." };
//   } catch (error) {
//     console.error("Error generando o enviando OTP:", error);
//     throw new Error("No se pudo generar o enviar el OTP.");
//   }
// };

// const verifyOTPService = async ({ email, otp }) => {
//   console.log("Data received in verifyOTPService:", { email, otp });

//   const dbName = "db_emailmanager_otp";
//   let db;

//   try {
//     const dbs = await nano.db.list();
//     if (!dbs.includes(dbName)) {
//       console.log(`Database ${dbName} does not exist.`);
//       return { success: false, message: "OTP database does not exist." };
//     }
//     db = nano.use(dbName);
//   } catch (error) {
//     console.error("Error accessing database:", error);
//     throw new Error("Database access failed");
//   }

//   try {
//     const queryResponse = await db.find({
//       selector: { email, otp },
//     });

//     if (queryResponse.docs.length === 0) {
//       console.log(`No matching OTP found for email: ${email}`);
//       return { success: false, message: "Invalid or expired OTP." };
//     }

//     const otpDoc = queryResponse.docs[0];
//     const now = new Date();
//     const expiresAt = new Date(otpDoc.expirationTime);

//     if (now > expiresAt) {
//       console.log("OTP has expired.");
//       return { success: false, message: "OTP has expired." };
//     }

//     // Delete OTP after successful verification
//     await db.destroy(otpDoc._id, otpDoc._rev);
//     console.log("OTP verified and deleted successfully.");

//     return { success: true, message: "OTP verified successfully." };
//   } catch (error) {
//     console.error("Error verifying OTP:", error);
//     throw new Error("Failed to verify OTP");
//   }
// };

// module.exports = {
//   createAccount: createAccount,
//   updateAccount: updateAccount,
//   loginToManagerService: loginToManagerService,
//   getAllClientsService: getAllClientsService,
//   addNewClientService: addNewClientService,
//   deleteClientService: deleteClientService,
//   updateClientService: updateClientService,
//   getAllUsers: getAllUsers,
//   getPaymentMethodService: getPaymentMethodService,
//   generateAndSendOtp: generateAndSendOtpService,
//   verifyOTP: verifyOTPService,
// };

