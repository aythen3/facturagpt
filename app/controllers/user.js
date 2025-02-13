const path = require("path");
// const fs = require("fs").promises;
const fs = require("fs");
// const nano = require('nano')('http://localhost:5984')
// DELETE
const nano = require("nano")("http://admin:1234@127.0.0.1:5984");

const multer = require("multer");

// Configuración de multer para guardar los archivos en "public/pdfs"
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const pdfPath = path.join(
      __dirname,
      "../../src/views/Dashboard/assets/pdfs"
    );
    // Crear la carpeta "pdfs" si no existe
    if (!fs.existsSync(pdfPath)) {
      fs.mkdirSync(pdfPath, { recursive: true });
    }
    cb(null, pdfPath); // Asegúrate de que esta carpeta exista
  },
  filename: (req, file, cb) => {
    const filePath = path.join(__dirname, "../../public", file.originalname);
    // Verificar si el archivo existe y eliminarlo
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const {
  createAccount,
  deleteAccount,
  updateAccount,
  getAllAccounts,

  loginToManagerService,
  getAllClientsService,
  addNewClientService,
  deleteClientService,
  generateAndSendOtp,
  verifyOTP,
  newsletter,
  updateUserPassword,
} = require("../services/user");

const { catchedAsync } = require("../utils/err");
const { updateClientService } = require("../services/stripe");
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

    const resp = await createAccount(clientData);

    return res.status(200).send(resp);
  } catch (err) {
    console.log("err", err);
    return res.status(500).send("Error on createAccountController");
  }
};

const updateAccountController = async (req, res) => {
  try {
    const { userData } = req.body;
    // console.log("User update data received:", { userId, toUpdate });

    const response = await updateAccount(userData);

    console.log("response", response);

    return res.status(200).send(response);
  } catch (err) {
    console.log("Error in updateAccountController:", err);
    return res.status(500).send("Error updating user");
  }
};

const deleteAccountController = async (req, res) => {
  try {
    const { id } = req.body;
    console.log("id", id);
    const response = await deleteAccount(id);
    console.log("response", response);
    return res.status(200).send(response);
  } catch (err) {
    console.log("Error in deleteAccountController:", err);
    return res.status(500).send("Error deleting user");
  }
};

const updateAccountPasswordController = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    console.log("User update data received:", { email, newPassword });

    const response = await updateUserPassword({ email, newPassword });

    return res.status(200).send(response);
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

    const response = await loginToManagerService({
      email,
      password,
      accessToken,
    });

    return res.status(200).send(response);
  } catch (err) {
    console.log("Error in loginToManagerController:", err);
    return res.status(500).send("Error during login process");
  }
};

const getAllClientsController = async (req, res) => {
  try {
    const clients = await getAllClientsService();
    return res.status(200).send(clients);
  } catch (err) {
    console.log("Error in getAllClientsController:", err);
    return res.status(500).send("Error fetching clients");
  }
};

const getAllAccountsController = async (req, res) => {
  try {
    const accounts = await getAllAccounts();
    return res.status(200).send(accounts);
  } catch (err) {
    console.log("Error in getAllAccountsController:", err);
    return res.status(500).send("Error fetching accounts");
  }
};

const addNewClientController = async (req, res) => {
  try {
    const { clientData } = req.body;
    console.log("Client data received:", clientData);

    const response = await addNewClientService({ clientData });
    return res.status(200).send(response);
  } catch (err) {
    console.log("Error in addNewClientController:", err);
    return res.status(500).send("Error adding new client");
  }
};

const deleteClientController = async (req, res) => {
  try {
    const { clientId } = req.body;
    console.log("Client ID received for deletion:", clientId);

    const response = await deleteClientService({ clientId });

    return res.status(200).send(response);
  } catch (err) {
    console.log("Error in deleteClientController:", err);
    return res.status(500).send("Error deleting client");
  }
};

const updateClientController = async (req, res) => {
  try {
    const { clientId, toUpdate } = req.body;
    console.log("Client update data received:", { clientId, toUpdate });

    const response = await updateClientService({ clientId, toUpdate });

    return res.status(200).send(response);
  } catch (err) {
    console.log("Error in updateClientController:", err);
    return res.status(500).send("Error updating client");
  }
};

const generateAndSendOtpController = async (req, res) => {
  try {
    const { nombre, email, language } = req.body;
    console.log("Generating OTP for email:", email);

    const response = await generateAndSendOtp({ nombre, email, language });

    return res.status(200).send(response);
  } catch (err) {
    console.log("Error in generateAndSendOtpController:", err);
    return res.status(500).send("Error generating OTP");
  }
};

const verifyOTPController = async (req, res) => {
  try {
    const { email, otp } = req.body;
    console.log("Verifying OTP for email:", email);

    const response = await verifyOTP({ email, otp });

    if (response.success) {
      return res.status(200).send(response);
    }
    return res.status(401).send(response);
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

// const getFile = async (req, res) => {
//   try {
//     // const { file } = req.body
//     // console.log('file', file)
//     const { name } = req.params;

//     const filePath = path.join(__dirname, "../../src/assets/email", name);

//     // Determinar el Content-Type basado en la extensión del archivo
//     const contentType = name.toLowerCase().endsWith(".svg")
//       ? "image/svg+xml"
//       : name.toLowerCase().endsWith(".png")
//         ? "image/png"
//         : "application/octet-stream";

//     // Leer como Buffer para archivos binarios, como UTF-8 para texto
//     const fileContent = await fs.readFile(
//       filePath,
//       contentType === "image/svg+xml" ? "utf8" : null
//     );

//     res.setHeader("Content-Type", contentType);
//     res.setHeader("Cache-Control", "public, max-age=86400"); // Optional: Cache for 24 hours

//     return res.status(200).send(fileContent);
//   } catch (err) {
//     console.log("Error in sendFile:", err);
//     return res.status(500).send("Error in sendFile");
//   }
// };

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

// ==============================================================================

///

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

  createAccountController: catchedAsync(createAccountController),
  getAllAccountsController: catchedAsync(getAllAccountsController),
  updateAccountController: catchedAsync(updateAccountController),
  deleteAccountController: catchedAsync(deleteAccountController),
  updateAccountPasswordController: catchedAsync(
    updateAccountPasswordController
  ),
  generateAndSendOtpController: catchedAsync(generateAndSendOtpController),
  verifyOTPController: catchedAsync(verifyOTPController),
  sendNewsletter: catchedAsync(sendNewsletter),

  loginToManagerController: catchedAsync(loginToManagerController),
  getAllClientsController: catchedAsync(getAllClientsController),
  addNewClientController: catchedAsync(addNewClientController),
  deleteClientController: catchedAsync(deleteClientController),
  updateClientController: catchedAsync(updateClientController),
  uploadPDF: catchedAsync(uploadPDF),
  upload: upload,
};
