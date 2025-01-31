const { default: axios } = require("axios");
const { v4: uuidv4 } = require("uuid");
const nano = require("nano")("http://admin:1234@127.0.0.1:5984");
const { sendOtpEmail } = require("./email");
const nodemailer = require("nodemailer");
const { checkOrCreateUserBucket } = require("./scaleway");

const jwt = require("jsonwebtoken");

const createAccount = async (account) => {
  // console.log("Data received in createAccount service:", {
  //   nombre,
  //   email,
  //   password,
  // });

  const dbName = "db_emailmanager_accounts";
  let db;

  try {
    const dbs = await nano.db.list();
    if (!dbs.includes(dbName)) {
      console.log(`Database ${dbName} does not exist. Creating...`);
      await nano.db.create(dbName);
    }
    db = nano.use(dbName);
  } catch (error) {
    console.error("Error checking/creating database:", error);
    throw new Error("Database initialization failed");
  }

  try {
    const existingDocs = await db.list({ include_docs: true });
    const accountExists = existingDocs.rows.some(
      (doc) => doc.doc.email === account.email
    );

    if (accountExists) {
      console.log(`Account with email ${account.email} already exists.`);
      return { success: false, message: "Account already exists." };
    }

    const accountId = uuidv4();

    console.log('accountId', account)
    const docId = `account_${account.email}_${accountId}`;

    const role = account.email === "info@aythen.com" ? "superadmin" : "user";

    // const password  = '123456'
    const hashedPassword = Buffer.from(account?.password || '123456').toString("base64");

    console.log('hashedPassword', hashedPassword)

    const newAccount = {
      // _id: docId,
      // nombre,
      // email,
      // password: hashedPassword,
      // id: docId,
      // role,
      // companyName: "",
      // contactNumber: "",
      // companyName: 'fvecrdf',
      // email: '',
      // phoneNumber: '',
      // VatId: '',
      // address: '',
      // emergencyContact: '',
      // tokenGPT: '',
      // tokenEmail: '',
      // tokenPassword: '',
      // host: '',
      // port: '',
      // tokenUser: '',
      // tokenUserPassword: '',
      // firstTag: '',
      // selectedOption: '0,20€ / 20.000',
      // accountId: '4a74194a-9227-4bfd-afe5-896798a6dd36',
      // isPaymentConfigured: false,
      // emailQueries: [],
      // nextPaymentDate: '2025-01-31T23:00:00.000Z'

      ...account,
      _id: docId,
      id: docId,
      password: hashedPassword,
      role,
      bucketCreated: false,
    };

    console.log('newAccount', newAccount)
    const response = await db.insert(newAccount);
    console.log(`Account created successfully:`, response);

    return {
      success: true,
      message: "Account created successfully.",
      account: { ...account },
    };
  } catch (error) {
    console.error("Error creating account:", error);
    throw new Error("Failed to create account");
  }
};

const deleteAccount = async (account) => {
  console.log('account delete', account)
  const dbName = "db_emailmanager_accounts";
  let db;

  try {
    const dbs = await nano.db.list();
    if (!dbs.includes(dbName)) {
      console.log(`Database ${dbName} does not exist.`);
      return { success: false, message: "Database does not exist." };
    }
    db = nano.use(dbName);
  } catch (error) {
    console.error("Error checking database:", error);
    throw new Error("Database initialization failed");
  }

  try {
    // Get the document using the ID
    const doc = await db.find({ selector: { id: account } });
    
    console.log('doc', doc)
    // Delete the document using both _id and _rev
    await db.destroy(doc.docs[0]._id, doc.docs[0]._rev);
    
    console.log(`Account deleted successfully: ${account.id}`);
    return {
      success: true,
      message: "Account deleted successfully"
    };

  } catch (error) {
    if (error.statusCode === 404) {
      console.error(`Account with ID ${account.id} not found.`);
      return { success: false, message: "Account not found." };
    }
    console.error("Error deleting account:", error);
    throw new Error("Failed to delete account");
  }
};



const updateAccount = async (data) => {
  console.log("Data received in updateAccount service:", { data });

  const dbName = "db_emailmanager_accounts";
  let db;

  try {
    const dbs = await nano.db.list();
    if (!dbs.includes(dbName)) {
      console.log(`Database ${dbName} does not exist.`);
      return { success: false, message: "Database does not exist." };
    }
    db = nano.use(dbName);
  } catch (error) {
    console.error("Error checking database:", error);
    throw new Error("Database initialization failed");
  }

  try {
    let updatedDoc;

    console.log('data', data)
    if (data.id) {
      // Update existing account
      const existingDoc = await db.get(data.id);
      
      if (!existingDoc) {
        console.log(`No user found with ID: ${data.id}`);
        return { success: false, message: "User not found." };
      }

      updatedDoc = {
        ...existingDoc,
        ...data,
        _rev: existingDoc._rev,
      };
    } else {
      // Create new account
      const accountId = uuidv4();
      const docId = `account_${data.email}_${accountId}`;
      
      updatedDoc = {
        ...data,
        _id: docId,
        id: docId,
        role: data.email === "info@aythen.com" ? "superadmin" : "user",
        bucketCreated: false
      };
    }

    // Insert/Update the document in the database
    const response = await db.insert(updatedDoc);
    console.log(`Account ${data.id ? 'updated' : 'created'} successfully:`, response);

    const { _id, _rev, ...sanitizedDoc } = updatedDoc;
    return sanitizedDoc;

  } catch (error) {
    console.error("Error updating/creating account:", error);
    throw new Error("Failed to update/create account");
  }
};

const updateUserPassword = async ({ email, newPassword }) => {
  console.log("Data received in updateUserPassword service:", { email });

  const dbName = "db_emailmanager_accounts";
  let db;

  try {
    // Ensure the database exists
    const dbs = await nano.db.list();
    if (!dbs.includes(dbName)) {
      console.log(`Database ${dbName} does not exist.`);
      return { success: false, message: "Database does not exist." };
    }
    db = nano.use(dbName);
  } catch (error) {
    console.error("Error checking database:", error);
    throw new Error("Database initialization failed");
  }

  try {
    // Fetch the user document by email
    const queryResponse = await db.find({
      selector: { email },
    });

    if (queryResponse.docs.length === 0) {
      console.log(`No user found with email: ${email}`);
      return { success: false, message: "User not found." };
    }

    const userDoc = queryResponse.docs[0];

    // Hash the new password
    const hashedPassword = Buffer.from(newPassword).toString("base64");

    // Update the user document
    const updatedDoc = {
      ...userDoc,
      password: hashedPassword,
      _rev: userDoc._rev, // Ensure the correct revision is used
    };

    // Insert the updated document back into the database
    await db.insert(updatedDoc);
    console.log(`Password updated successfully for user with email: ${email}`);

    return {
      success: true,
      message: "Password updated successfully.",
    };
  } catch (error) {
    if (error.statusCode === 404) {
      console.error(`User with email ${email} not found.`);
      return { success: false, message: "User not found." };
    }
    console.error("Error updating password:", error);
    throw new Error("Failed to update password");
  }
};

const getAllAccounts = async () => {
  const dbName = "db_emailmanager_accounts";
  let db;

  try {
    const dbs = await nano.db.list();
    if (!dbs.includes(dbName)) {
      console.log(`Database ${dbName} does not exist.`);
      return { success: false, message: "Database does not exist." };
    }
    db = nano.use(dbName);
  } catch (error) {
    console.error("Error accessing database:", error);
    throw new Error("Database access failed");
  }

  try {
    const allDocs = await db.list({ include_docs: true });

    const users = allDocs.rows.map((row) => {
      const { _id, _rev, ...rest } = row.doc;
      return rest;
    });

    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
};

const loginToManagerService = async ({ email, password, accessToken }) => {
  console.log("Data received in loginToManagerService:", {
    email,
    password,
    accessToken,
  });

  const dbName = "db_emailmanager_accounts";
  let db;

  try {
    const dbs = await nano.db.list();
    if (!dbs.includes(dbName)) {
      console.log(`Database ${dbName} does not exist.`);
      return { success: false, message: "Account database does not exist." };
    }
    db = nano.use(dbName);
  } catch (error) {
    console.error("Error accessing database:", error);
    throw new Error("Database access failed");
  }

  try {
    let account;

    if (accessToken) {
      console.log("Attempting login with accessToken");
      const tokenQuery = await db.find({
        selector: { token: accessToken },
      });

      if (tokenQuery.docs.length === 0) {
        console.log("Invalid access token or account not found.");
        return { success: false, message: "Invalid access token." };
      }
      account = tokenQuery.docs[0];
      console.log(`Login successful for account via token: ${account._id}`);
    } else {
      console.log("Attempting login with email/password");
      const queryResponse = await db.find({
        selector: { email },
      });

      if (queryResponse.docs.length === 0) {
        console.log(`No account found for email: ${email}`);
        return { success: false, message: "Invalid email or password." };
      }

      account = queryResponse.docs[0];
      const hashedPassword = Buffer.from(password).toString("base64");

      if (
        account.password !== hashedPassword &&
        account.password !== password
      ) {
        console.log("Invalid password provided.");
        return { success: false, message: "Invalid email or password." };
      }

      // Generate JWT token
      const token = jwt.sign(
        {
          userId: account._id,
          email: account.email,
          role: account.role,
        },
        "your-secret-key", // Replace with a secure secret key from environment variables
        { expiresIn: "24h" }
      );

      // Update account with new token
      const updatedDoc = {
        ...account,
        token: token,
        _rev: account._rev,
      };

      // Save token to database
      await db.insert(updatedDoc);

      account = updatedDoc;
      // account.token = token

      console.log(`Login successful for account: ${account._id}`);
    }

    const { _id, _rev, ...rest } = account;
    if (!account.bucketCreated) {
      try {
        await checkOrCreateUserBucket(rest.id);

        const updatedDoc = {
          ...account,
          bucketCreated: true,
          _rev: account._rev,
        };
        const updateResponse = await db.insert(updatedDoc);
        console.log("Bucket created and account updated:", updateResponse);
      } catch (error) {
        console.error("Error creating bucket:", error);
      }
    }

    return rest;
  } catch (error) {
    console.error("Error during login:", error);
    throw new Error("Login process failed");
  }
};

const getAllClientsService = async () => {
  const mainDbName = "db_emailmanager_clients";
  let mainDb;

  try {
    const dbs = await nano.db.list();

    // Ensure the main database exists
    if (!dbs.includes(mainDbName)) {
      console.log(`Database ${mainDbName} does not exist. Creating...`);
      await nano.db.create(mainDbName);
    }
    mainDb = nano.use(mainDbName);
  } catch (error) {
    console.error("Error accessing or creating the main database:", error);
    throw new Error("Database initialization failed");
  }

  try {
    // Fetch all clients from the main database
    const clients = await mainDb.list({ include_docs: true });
    const clientsWithDetails = await Promise.all(
      clients.rows.map(async (row) => {
        const clientDoc = row.doc;
        if (!clientDoc.id) {
          clientDoc.id = clientDoc._id;
        }

        const { _id, _rev, ...rest } = clientDoc;
        const clientUid = clientDoc.id.split("_")[2];
        const processedEmailsDbName = `db_${clientUid}_processedemails`;

        // Fetch detailedTokenConsumption for each client
        let detailedTokenConsumption = {};
        try {
          if (
            await nano.db
              .list()
              .then((dbs) => dbs.includes(processedEmailsDbName))
          ) {
            const processedEmailsDb = nano.use(processedEmailsDbName);
            const detailedDocs = await processedEmailsDb.list({
              include_docs: true,
            });
            detailedTokenConsumption = detailedDocs.rows.reduce((acc, row) => {
              acc[row.id] = row.doc;
              return acc;
            }, {});
          } else {
            console.warn(
              `Database ${processedEmailsDbName} does not exist for client ${clientDoc.id}.`
            );
          }
        } catch (error) {
          console.error(
            `Error fetching detailedTokenConsumption for client ${clientDoc.id}:`,
            error
          );
        }

        return {
          ...rest,
          detailedTokenConsumption,
        };
      })
    );

    return clientsWithDetails;
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw new Error("Failed to fetch clients");
  }
};

const addNewClientService = async ({ clientData }) => {
  const dbName = "db_emailmanager_clients";
  let db;

  try {
    const dbs = await nano.db.list();
    if (!dbs.includes(dbName)) {
      console.log(`Database ${dbName} does not exist. Creating...`);
      await nano.db.create(dbName);
    }
    db = nano.use(dbName);
  } catch (error) {
    console.error("Error accessing or creating database:", error);
    throw new Error("Database initialization failed");
  }

  try {
    const existingDocs = await db.find({
      selector: { tokenEmail: clientData.tokenEmail },
    });

    if (existingDocs.docs.length > 0) {
      console.log(
        `Client with tokenEmail ${clientData.tokenEmail} already exists.`
      );
      return {
        success: false,
        message: "Client with this tokenEmail already exists.",
      };
    }

    const clientId = uuidv4();
    const docId = `client_${clientData.tokenEmail}_${clientId}`;

    let newClient = {
      _id: docId,
      id: docId,
      ...clientData,
      processedEmails: [],
      detailedTokenConsumption: {},
      tokensConsumed: 0,
      totalTokensPrice: 0,
      active: false,
    };

    await db.insert(newClient);
    console.log(`Client added successfully:`, newClient);

    const allClients = await db.list({ include_docs: true });
    const sanitizedClients = allClients.rows.map((row) => {
      let docData = row.doc;
      if (!docData.id) {
        docData.id = docData._id;
      }
      const { _id, _rev, ...rest } = docData;
      return rest;
    });

    return sanitizedClients;
  } catch (error) {
    console.error("Error adding new client:", error);
    throw new Error("Failed to add new client");
  }
};

const deleteClientService = async ({ clientId }) => {
  const dbName = "db_emailmanager_clients";
  let db;

  try {
    const dbs = await nano.db.list();
    if (!dbs.includes(dbName)) {
      console.log(`Database ${dbName} does not exist.`);
      return { success: false, message: "Database does not exist." };
    }
    db = nano.use(dbName);
  } catch (error) {
    console.error("Error accessing database:", error);
    throw new Error("Database access failed");
  }

  try {
    const clientDoc = await db.get(clientId);

    if (!clientDoc) {
      console.log(`No client found with ID: ${clientId}`);
      return { success: false, message: "Client not found." };
    }

    await db.destroy(clientDoc._id, clientDoc._rev);
    console.log(`Client with ID ${clientId} deleted successfully.`);

    const allClients = await db.list({ include_docs: true });
    const sanitizedClients = allClients.rows.map((row) => {
      let docData = row.doc;
      if (!docData.id) {
        docData.id = docData._id;
      }
      const { _id, _rev, ...rest } = docData;
      return rest;
    });

    return sanitizedClients;
  } catch (error) {
    console.error("Error deleting client:", error);
    throw new Error("Failed to delete client");
  }
};

const generateAndSendOtpService = async ({ nombre, email, language }) => {
  const dbName = "db_emailmanager_otp";
  let db;
  console.log(nombre);
  try {
    // Verificar y crear la base de datos si no existe
    const dbs = await nano.db.list();
    if (!dbs.includes(dbName)) {
      console.log(`Database ${dbName} does not exist. Creating...`);
      await nano.db.create(dbName);
    }
    db = nano.use(dbName);
  } catch (error) {
    console.error("Error accessing or creating database:", error);
    throw new Error("Database initialization failed");
  }

  try {
    // Generar OTP y su metadata
    const otp = String(Math.floor(100000 + Math.random() * 900000));

    const expirationTime = Date.now() + 5 * 60 * 1000;
    const otpId = uuidv4();
    const docId = `otp_${email}_${otpId}`;

    // Guardar el OTP en la base de datos
    const otpDocument = {
      _id: docId,
      email,
      otp,
      expirationTime,
      createdAt: new Date().toISOString(),
    };

    await db.insert(otpDocument);
    console.log(`OTP generado y guardado para ${email}:`, otp);

    // Enviar el correo electrónico con el OTP
    await sendOtpEmail(nombre, email, otp, language);

    return { success: true, message: "OTP generado y enviado exitosamente." };
  } catch (error) {
    console.error("Error generando o enviando OTP:", error);
    throw new Error("No se pudo generar o enviar el OTP.");
  }
};

const verifyOTPService = async ({ email, otp }) => {
  console.log("Data received in verifyOTPService:", { email, otp });

  const dbName = "db_emailmanager_otp";
  let db;

  try {
    const dbs = await nano.db.list();
    if (!dbs.includes(dbName)) {
      console.log(`Database ${dbName} does not exist.`);
      return { success: false, message: "OTP database does not exist." };
    }
    db = nano.use(dbName);
  } catch (error) {
    console.error("Error accessing database:", error);
    throw new Error("Database access failed");
  }

  try {
    const queryResponse = await db.find({
      selector: { email, otp },
    });
    console.log(`queryResponse ${queryResponse.docs}`);
    if (queryResponse.docs.length === 0) {
      console.log(`No matching OTP found for email: ${email}`);
      return { success: false, message: "Invalid or expired OTP." };
    }

    const otpDoc = queryResponse.docs[0];
    const now = new Date();
    const expiresAt = new Date(otpDoc.expirationTime);

    if (now > expiresAt) {
      console.log("OTP has expired.");
      return { success: false, message: "OTP has expired." };
    }

    // Delete OTP after successful verification
    await db.destroy(otpDoc._id, otpDoc._rev);
    console.log("OTP verified and deleted successfully.");

    return { success: true, message: "OTP verified successfully." };
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw new Error("Failed to verify OTP");
  }
};
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "yyeremi15@gmail.com",
    pass: "mosb cdlz wgqz ntdr",
  },
});

const newsletter = async ({
  name,
  email,
  message,
  work,
  phone,
  keepInformed,
}) => {
  console.log("desde actions");

  const mailToAythen = {
    from: email, // El correo del usuario que llenó el formulario
    to: "yyeremi15@gmail.com", // Tu correo donde recibirás los mensajes
    subject: `Nuevo mensaje de ${name}`,
    text: `Has recibido un nuevo mensaje de contacto.\n\nNombre: ${name}\nCorreo: ${email}\n\nMensaje:${message}\n\nTrabaja en:${work}\n\nTelefono:${phone}\n\nMantener Informando:${keepInformed}`,
  };

  const mailFromAythen = {
    from: "yyeremi15@gmail.com", // Tu correo
    to: email, // Correo del usuario que llenó el formulario
    subject: `Confirmación de recepción de mensaje de ${name}`,
    text: `Hola ${name},\n\nGracias por tu mensaje. Hemos recibido tu consulta y nos pondremos en contacto contigo pronto.\n\nMensaje recibido:\n${message}\n\nSaludos,\nEl equipo.`,
  };

  try {
    const infoToAythen = await transporter.sendMail(mailToAythen);
    console.log("Correo enviado a yyeremi15@gmail.com:", infoToAythen.response);

    const infoFromAythen = await transporter.sendMail(mailFromAythen);
    console.log("Correo enviado al usuario:", infoFromAythen.response);

    return { success: true, message: "Emails sent correctly" };
  } catch (error) {
    console.error("Error sending mail:", error);
    throw new Error("Error sending mail");
  }
};

module.exports = {
  deleteAccount: deleteAccount,
  getAllAccounts: getAllAccounts,
  createAccount: createAccount,
  updateAccount: updateAccount,
  loginToManagerService: loginToManagerService,
  getAllClientsService: getAllClientsService,
  addNewClientService: addNewClientService,
  deleteClientService: deleteClientService,
  generateAndSendOtp: generateAndSendOtpService,
  verifyOTP: verifyOTPService,
  newsletter: newsletter,
  updateUserPassword: updateUserPassword,
};
