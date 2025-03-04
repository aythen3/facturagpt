const path = require("path");
// const fs = require("fs").promises;
const fs = require("fs");
// const nano = require('nano')('http://localhost:5984')
// DELETE
const nano = require("nano")("http://admin:1234@127.0.0.1:5984");

const { sendOtpEmail } = require("../services/email");
const { v4: uuidv4 } = require("uuid");
// const multer = require("multer");

const { connectDB } = require("./utils");
const jwt = require("jsonwebtoken");


// Configuración de multer para guardar los archivos en "public/pdfs"
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const pdfPath = path.join(
//       __dirname,
//       "../../src/views/Dashboard/assets/pdfs"
//     );
//     // Crear la carpeta "pdfs" si no existe
//     if (!fs.existsSync(pdfPath)) {
//       fs.mkdirSync(pdfPath, { recursive: true });
//     }
//     cb(null, pdfPath); // Asegúrate de que esta carpeta exista
//   },
//   filename: (req, file, cb) => {
//     const filePath = path.join(__dirname, "../../public", file.originalname);
//     // Verificar si el archivo existe y eliminarlo
//     if (fs.existsSync(filePath)) {
//       fs.unlinkSync(filePath);
//     }
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage });

const {
  newsletter,

  // createAccount,
  // deleteAccount,
  // updateAccount,
  // getAllAccounts,

  // loginToManagerService,
  // generateAndSendOtp,
  // verifyOTP,
  // updateUserPassword,
  
  // getAllClientsService,
  // addNewClientService,
  // deleteClientService,
} = require("../services/user");


// const { updateClientService } = require("../services/stripe");

const { catchedAsync } = require("../utils/err");
const { sendEmail, getTemplate } = require("../services/email");

const createAccountController = async (req, res) => {
  try {
    const clientData = req.body;

    console.log("clientData", clientData);
    // console.log("data from createAccountController", {
    //   nombre,
    //   email,
    //   password,
    // });
    // const { nombre, email, password } = req.body;
    // console.log("data from createAccountController", {
    //   nombre,
    //   email,
    //   password,
    // });

    // const resp = await createAccount(clientData);


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
  
      return res.status(200).send({
        success: true,
        message: "Account created successfully.",
        account: { ...account },
      })
    } catch (error) {
      console.error("Error creating account:", error);
      throw new Error("Failed to create account");
    }



    // return res.status(200).send(resp);
  } catch (err) {
    console.log("err", err);
    return res.status(500).send("Error on createAccountController");
  }
};

const updateAccountController = async (req, res) => {
  try {
    const { userData: data } = req.body;
    // console.log("User update data received:", { userId, toUpdate });

    // const response = await updateAccount(userData);
    // console.log("response", response);
    // return res.status(200).send(response);

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
      // return sanitizedDoc;

      return res.status(200).send(sanitizedDoc)
    } catch (error) {
      console.error("Error updating/creating account:", error);
      throw new Error("Failed to update/create account");
    }


  } catch (err) {
    console.log("Error in updateAccountController:", err);
    return res.status(500).send("Error updating user");
  }
};

const deleteAccountController = async (req, res) => {
  try {
    const { id } = req.body;
    console.log("id", id);
    // console.log("response", response);
    // const response = await deleteAccount(id);
    // return res.status(200).send(response);

    try {
      const db = await connectDB("db_accounts");
      const doc = await db.find({ selector: { id: id } });
  
      await db.destroy(doc.docs[0]._id, doc.docs[0]._rev);
  
      return res.status(200).send({
        id,
        success: true,
        message: "Account deleted successfully",
      });
    } catch (error) {
      if (error.statusCode === 404) {
        console.error(`Account with ID ${account.id} not found.`);
        return { success: false, message: "Account not found." };
      }
      console.error("Error deleting account:", error);
      throw new Error("Failed to delete account");
    }


  } catch (err) {
    console.log("Error in deleteAccountController:", err);
    return res.status(500).send("Error deleting user");
  }
};

const updateAccountPasswordController = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    console.log("User update data received:", { email, newPassword });

    // const response = await updateUserPassword({ email, newPassword });
    // return res.status(200).send(response);

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
  
      return res.status(200).send({
        success: true,
        message: "Password updated successfully.",
      });
    } catch (error) {
      if (error.statusCode === 404) {
        console.error(`User with email ${email} not found.`);
        return { success: false, message: "User not found." };
      }
      console.error("Error updating password:", error);
      throw new Error("Failed to update password");
    }

  } catch (err) {
    console.log("Error in updateAccountPasswordController:", err);
    return res.status(500).send("Error updating user password");
  }
};

const loginToManagerController = async (req, res) => {
  try {
    const { email, password, accessToken } = req.body;
    console.log("Data from loginToManagerController:", {
      email,
      password,
      accessToken,
    });

    // const response = await loginToManagerService({
    //   email,
    //   password,
    //   accessToken,
    // });

    // return res.status(200).send(response);


    let db = await connectDB('db_accounts');


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

    // return return;
    return res.status(200).send(rest);
  } catch (error) {
    console.error("Error during login:", error);
    throw new Error("Login process failed");
  }

  } catch (err) {
    console.log("Error in loginToManagerController:", err);
    return res.status(500).send("Error during login process");
  }
};



const getAllAccountsController = async (req, res) => {
  try {
    // const accounts = await getAllAccounts();
    // return res.status(200).send(accounts);

    try {
      const db = await connectDB("db_accounts");
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
  
      const accounts = result.docs.map((doc) => {
        const { _id, _rev, ...rest } = doc;
        return rest;
      });
  
      // return users;

      return res.status(200).send(accounts)
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Failed to fetch users");
    }

  } catch (err) {
    console.log("Error in getAllAccountsController:", err);
    return res.status(500).send("Error fetching accounts");
  }
};





const generateAndSendOtpController = async (req, res) => {
  try {
    const { nombre, email, language } = req.body;
    console.log("Generating OTP for email:", email);

    // const response = await generateAndSendOtp({ nombre, email, language });
    // return res.status(200).send(response);

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
  
      return res.status(200).send({ success: true, message: "OTP generado y enviado exitosamente." });
    } catch (error) {
      console.error("Error generando o enviando OTP:", error);
      throw new Error("No se pudo generar o enviar el OTP.");
    }


  } catch (err) {
    console.log("Error in generateAndSendOtpController:", err);
    return res.status(500).send("Error generating OTP");
  }
};

const verifyOTPController = async (req, res) => {
  try {
    const { email, otp } = req.body;
    console.log("Verifying OTP for email:", email);

    // const response = await verifyOTP({ email, otp });



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
  
      // return { success: true, message: "OTP verified successfully." };

      return res.status(200).send({ success: true, message: "OTP verified successfully." });

    } catch (error) {
      console.error("Error verifying OTP:", error);
      // throw new Error("Failed to verify OTP");
      return res.status(401).send(response);
    }



    // if (response.success) {
    //   return res.status(200).send(response);
    // }
    // return res.status(401).send(response);
  } catch (err) {
    console.log("Error in verifyOTPController:", err);
    return res.status(500).send("Error verifying OTP");
  }
};

const sendNewsletter = async (req, res) => {
  try {
    const { name, email, message, work, phone, keepInformed, language } =
      req.body;
    console.log(language);
    const response = await newsletter({
      name,
      email,
      message,
      work,
      phone,
      keepInformed,
      language,
    });

    if (response.success) {
      return res.status(200).send(response);
    }
    return res.status(401).send(response);
  } catch (err) {
    console.log("Error in verifyOTPController:", err);
    return res.status(500).send("Error verifying OTP");
  }
};




const getFile = async (req, res) => {
  try {
    const { name } = req.params;

    const filePath = path.join(__dirname, "../../src/assets/email", name);

    // Determinar el Content-Type basado en la extensión del archivo
    const contentType = name.toLowerCase().endsWith(".svg")
      ? "image/svg+xml"
      : name.toLowerCase().endsWith(".png")
        ? "image/png"
        : "application/octet-stream";

    // Leer el archivo correctamente según el tipo de contenido
    let fileContent;
    if (contentType === "image/svg+xml") {
      fileContent = await fs.promises.readFile(filePath, "utf8"); // Leer como texto (UTF-8) para SVG
    } else {
      fileContent = await fs.promises.readFile(filePath); // Leer como binario para imágenes u otros archivos
    }

    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", "public, max-age=86400"); // Cache para 24 horas

    return res.status(200).send(fileContent);
  } catch (err) {
    console.log("Error in sendFile:", err);
    return res.status(500).send("Error in sendFile");
  }
};
const getEmail = async (req, res) => {
  try {
    const { html } = await getTemplate("promo-email");

    return res.status(200).send(html);
  } catch (err) {
    console.log("Error in getEmail:", err);
    return res.status(500).send("Error in getEmail");
  }
};

const senderEmail = async (req, res) => {
  try {
    const { user } = req;
    // const { id } = req.params;
    const { email } = req.body;

    console.log("SEND EMAIL ID USER", email, user);

    const resp = await sendEmail(email, "form-action", {});

    console.log("resp", resp);

    return res.status(200).send("200");
  } catch (error) {
    console.log("Error:", error);
  }
};

// Controlador para subir el archivo PDF
const uploadPDF = (req, res) => {
  res.json({ message: "Archivo PDF guardado correctamente" });
};




const deleteAllDB = async (req, res) => {
  try {
    const dbs = await nano.db.list();
    for (const db of dbs) {
      await nano.db.destroy(db);
    }
    return res.status(200).send("All databases deleted");
  } catch (err) {
    console.log("Error in deleteAllDB:", err);
    return res.status(500).send("Error deleting all databases");
  }
};

module.exports = {
  deleteAllDB: catchedAsync(deleteAllDB),

  getFile: catchedAsync(getFile),
  sendEmail: catchedAsync(senderEmail),
  getEmail: catchedAsync(getEmail),

  generateAndSendOtpController: catchedAsync(generateAndSendOtpController),
  verifyOTPController: catchedAsync(verifyOTPController),
  sendNewsletter: catchedAsync(sendNewsletter),
  
  createAccountController: catchedAsync(createAccountController),
  updateAccountController: catchedAsync(updateAccountController),
  getAllAccountsController: catchedAsync(getAllAccountsController),
  deleteAccountController: catchedAsync(deleteAccountController),
  updateAccountPasswordController: catchedAsync( updateAccountPasswordController ),

  loginToManagerController: catchedAsync(loginToManagerController),

  uploadPDF: catchedAsync(uploadPDF),
  // upload: upload,
};
