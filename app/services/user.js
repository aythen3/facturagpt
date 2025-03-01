const { default: axios } = require("axios");
const { v4: uuidv4 } = require("uuid");
const nano = require("nano")("http://admin:1234@127.0.0.1:5984");
const { sendOtpEmail } = require("./email");
const nodemailer = require("nodemailer");
// const { checkOrCreateUserBucket } = require("./scaleway");
const path = require("path");

const { connectDB } = require("../controllers/utils");

const jwt = require("jsonwebtoken");

const createAccount = async (account) => {
  try {
    const db = await connectDB("db_accounts");
    const existingDocs = await db.list({ include_docs: true });
    const accountExists = existingDocs.rows.some(
      (doc) => doc.doc.email === account.email
    );

    if (accountExists) {
      return { success: false, message: "Account already exists." };
    }

    const accountId = uuidv4();

    const docId = `account_${account.email}_${accountId}`;

    let role = account.role || "user";

    if (account.email === "info@aythen.com") {
      role = "superadmin";
    }

    const hashedPassword = Buffer.from(account?.password || "123456").toString(
      "base64"
    );

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

    const response = await db.insert(newAccount);

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

const deleteAccount = async (id) => {
  try {
    const db = await connectDB("db_accounts");
    const doc = await db.find({ selector: { id: id } });

    await db.destroy(doc.docs[0]._id, doc.docs[0]._rev);

    return {
      id,
      success: true,
      message: "Account deleted successfully",
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
  try {
    const db = await connectDB("db_accounts");
    let updatedDoc;

    if (data.id) {
      const existingDoc = await db.get(data.id);

      if (!existingDoc) {
        console.log(`No user found with ID: ${data.id}`);
        return { success: false, message: "User not found." };
      }

      console.log("existingDoc", existingDoc);

      updatedDoc = {
        ...existingDoc,
        ...data,
        _rev: existingDoc._rev,
      };
    } else {
      const accountId = uuidv4();
      const docId = `account_${data.email}_${accountId}`;

      updatedDoc = {
        ...data,
        _id: docId,
        id: docId,
        role: data.email === "info@aythen.com" ? "superadmin" : "user",
        bucketCreated: false,
      };
    }

    const response = await db.insert(updatedDoc);

    const { _id, _rev, ...sanitizedDoc } = updatedDoc;
    return sanitizedDoc;
  } catch (error) {
    console.error("Error updating/creating account:", error);
    throw new Error("Failed to update/create account");
  }
};

const updateUserPassword = async ({ email, newPassword }) => {
  try {
    const db = await connectDB("db_accounts");
    // Fetch the user document by email
    const queryResponse = await db.find({
      selector: { email },
    });

    if (queryResponse.docs.length === 0) {
      console.log(`No user found with email: ${email}`);
      return { success: false, message: "User not found." };
    }

    const userDoc = queryResponse.docs[0];
    const hashedPassword = Buffer.from(newPassword).toString("base64");

    const updatedDoc = {
      ...userDoc,
      password: hashedPassword,
      _rev: userDoc._rev,
    };

    await db.insert(updatedDoc);

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

const getAllAccounts = async (search) => {
  const db = await connectDB("db_accounts");
  try {
    let selector = {};

    if (search) {
      selector = {
        email: {
          $regex: `(?i)${search}`, // (?i) hace la búsqueda case-insensitive
        },
      };
    }

    const result = await db.find({
      selector: selector,
    });

    const users = result.docs.map((doc) => {
      const { _id, _rev, ...rest } = doc;
      return rest;
    });

    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
};

const loginToManagerService = async ({ email, password, accessToken }) => {
  const dbName = "db_accounts";
  let db;

  try {
    const dbs = await nano.db.list();
    if (!dbs.includes(dbName)) {
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
      const tokenQuery = await db.find({
        selector: { token: accessToken },
      });

      if (tokenQuery.docs.length === 0) {
        return { success: false, message: "Invalid access token." };
      }
      account = tokenQuery.docs[0];
    } else {
      const queryResponse = await db.find({
        selector: { email },
      });

      if (queryResponse.docs.length === 0) {
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

      const token = jwt.sign(
        {
          userId: account._id,
          email: account.email,
          role: account.role,
        },
        "your-secret-key",
        { expiresIn: "24h" }
      );

      const updatedDoc = {
        ...account,
        token: token,
        _rev: account._rev,
      };

      await db.insert(updatedDoc);

      account = updatedDoc;
    }

    const { _id, _rev, ...rest } = account;
    if (!account.bucketCreated) {
      try {
        // await checkOrCreateUserBucket(rest.id);

        const updatedDoc = {
          ...account,
          bucketCreated: true,
          _rev: account._rev,
        };
        const updateResponse = await db.insert(updatedDoc);
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
  try {
    const mainDb = await connectDB("db_clients");
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
  const dbName = "db_clients";
  let db;

  try {
    const dbs = await nano.db.list();
    if (!dbs.includes(dbName)) {
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
  try {
    const db = await connectDB("db_clients");
    const clientDoc = await db.get(clientId);

    if (!clientDoc) {
      console.log(`No client found with ID: ${clientId}`);
      return { success: false, message: "Client not found." };
    }

    await db.destroy(clientDoc._id, clientDoc._rev);

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
  try {
    const db = await connectDB("db_otp");
    const otp = String(Math.floor(100000 + Math.random() * 900000));

    const expirationTime = Date.now() + 5 * 60 * 1000;
    const otpId = uuidv4();
    const docId = `otp_${email}_${otpId}`;

    const otpDocument = {
      _id: docId,
      email,
      otp,
      expirationTime,
      createdAt: new Date().toISOString(),
    };

    await db.insert(otpDocument);
    await sendOtpEmail(nombre, email, otp, language);

    return { success: true, message: "OTP generado y enviado exitosamente." };
  } catch (error) {
    console.error("Error generando o enviando OTP:", error);
    throw new Error("No se pudo generar o enviar el OTP.");
  }
};

const verifyOTPService = async ({ email, otp }) => {
  try {
    const db = await connectDB("db_otp");
    const queryResponse = await db.find({
      selector: { email, otp },
    });
    if (queryResponse.docs.length === 0) {
      return { success: false, message: "Invalid or expired OTP." };
    }

    const otpDoc = queryResponse.docs[0];
    const now = new Date();
    const expiresAt = new Date(otpDoc.expirationTime);

    if (now > expiresAt) {
      return { success: false, message: "OTP has expired." };
    }

    await db.destroy(otpDoc._id, otpDoc._rev);

    return { success: true, message: "OTP verified successfully." };
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw new Error("Failed to verify OTP");
  }
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "info@facturagpt.com",
    pass: "hosn ljvo ekvh qfdc",
  },
});

const newsletter = async ({
  name,
  email,
  message,
  work,
  phone,
  keepInformed,
  language = "es",
}) => {
  let mailToAythenContent, mailFromAythenContent;

  mailToAythenContent = `
  <div style="font-family: Arial, sans-serif; color: #1F184B; background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 8px; max-width: 600px; margin: 0 auto;">
    <h1 style="text-align: center; font-size: 24px;">
      <img src="cid:logo" style="max-width: 65%; height: auto;" />
    </h1>
    <p style="font-size: 16px; line-height: 1.5; color:#1F184B;">Hola, ${name}</p>
    <p style="font-size: 16px; line-height: 1.5; color:#1F184B;">Has recibido un nuevo mensaje de contacto.\n\nNombre: ${name}\nCorreo: ${email}\n\nMensaje:${message}\n\nTrabaja en:${work}\n\nTelefono:${phone}\n\nMantener Informando:${keepInformed}</p>
  </div>`;
  if (language === "es") {
    mailFromAythenContent = `
    <div style="font-family: Arial, sans-serif; color: #1F184B; background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 8px; max-width: 600px; margin: 0 auto;">
      <h1 style="text-align: center; font-size: 24px;">
        <img src="cid:logo" style="max-width: 65%; height: auto;" />
      </h1>
      <p style="font-size: 16px; line-height: 1.5; color:#1F184B;">Hola, ${name}</p>
      <p style="font-size: 16px; line-height: 1.5; color:#1F184B;">Gracias por querer estar en contacto con el equipo de FacturaGPT!</p>
    </div>`;
  } else {
    mailFromAythenContent = `
    <div style="font-family: Arial, sans-serif; color: #1F184B; background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 8px; max-width: 600px; margin: 0 auto;">
      <h1 style="text-align: center; font-size: 24px;">
        <img src="cid:logo" style="max-width: 65%; height: auto;" />
      </h1>
      <p style="font-size: 16px; line-height: 1.5; color:#1F184B;">Hello, ${name}</p>
      <p style="font-size: 16px; line-height: 1.5; color:#1F184B;">Thank you for wanting to be in contact with the FacturaGPT team!</p>
    </div>`;
  }

  const mailToAythen = {
    from: email,
    to: "info@facturagpt.com",
    subject: `Nuevo Mensaje de ${name}`,
    html: mailToAythenContent,
    attachments: [
      {
        filename: "GreenLogo.png",
        path: path.join(__dirname, "assets/GreenLogo.png"),
        cid: "logo",
      },
    ],
  };

  const mailFromAythen = {
    from: "info@facturagpt.com",
    to: email,
    subject:
      language === "es"
        ? `Confirmación de recepción de mensaje de ${name}`
        : `Message receipt confirmation from ${name}`,
    html: mailFromAythenContent,
    attachments: [
      {
        filename: "GreenLogo.png",
        path: path.join(__dirname, "assets/GreenLogo.png"),
        cid: "logo",
      },
    ],
  };

  try {
    const infoToAythen = await transporter.sendMail(mailToAythen);

    const infoFromAythen = await transporter.sendMail(mailFromAythen);

    return {
      success: true,
      message:
        language === "es"
          ? "Correos enviados correctamente"
          : "Emails sent correctly",
    };
  } catch (error) {
    console.error("Error sending mail:", error);
    throw new Error(
      language === "es" ? "Error al enviar el correo" : "Error sending mail"
    );
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
