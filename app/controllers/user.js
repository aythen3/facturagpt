const {
  createAccount,
  loginToManagerService,
  getAllClientsService,
  addNewClientService,
  deleteClientService,
  getAllUsers,
  updateAccount,
  generateAndSendOtp,
  verifyOTP,
  newsletter,
  updateUserPassword,
} = require("../services/user");
const { catchedAsync } = require("../utils/err");
const { updateClientService } = require("../services/stripe");

const createAccountController = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    console.log("data from createAccountController", {
      nombre,
      email,
      password,
    });

    const resp = await createAccount({ nombre, email, password });

    return res.status(200).send(resp);
  } catch (err) {
    console.log("err", err);
    return res.status(500).send("Error on createAccountController");
  }
};

const updateAccountController = async (req, res) => {
  try {
    const { userId, toUpdate } = req.body;
    console.log("User update data received:", { userId, toUpdate });

    const response = await updateAccount({ userId, toUpdate });

    return res.status(200).send(response);
  } catch (err) {
    console.log("Error in updateAccountController:", err);
    return res.status(500).send("Error updating user");
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

const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsers();
    return res.status(200).send(users);
  } catch (err) {
    console.log("Error in getAllUsersController:", err);
    return res.status(500).send("Error fetching clients");
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
    const { name, email, message, work, phone, keepInformed } = req.body;

    const response = await newsletter({
      name,
      email,
      message,
      work,
      phone,
      keepInformed,
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

const multer = require("multer");
const path = require("path");
const fs = require("fs");

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

// Controlador para subir el archivo PDF
const uploadPDF = (req, res) => {
  res.json({ message: "Archivo PDF guardado correctamente" });
};

// ==============================================================================

module.exports = {
  createAccountController: catchedAsync(createAccountController),
  loginToManagerController: catchedAsync(loginToManagerController),
  getAllClientsController: catchedAsync(getAllClientsController),
  addNewClientController: catchedAsync(addNewClientController),
  deleteClientController: catchedAsync(deleteClientController),
  updateClientController: catchedAsync(updateClientController),
  getAllUsersController: catchedAsync(getAllUsersController),
  updateAccountController: catchedAsync(updateAccountController),
  generateAndSendOtpController: catchedAsync(generateAndSendOtpController),
  verifyOTPController: catchedAsync(verifyOTPController),
  sendNewsletter: catchedAsync(sendNewsletter),
  uploadPDF: catchedAsync(uploadPDF),
  upload,
  updateAccountPasswordController: catchedAsync(
    updateAccountPasswordController
  ),
};
