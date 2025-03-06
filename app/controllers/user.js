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
const { log } = require("console");






const getDB = async (req, res) => {
  try {
    const { type } = req.params

    if (type == 'delete-all') {
      const dbs = await nano.db.list();
      for (const db of dbs) {
        await nano.db.destroy(db);
      }
      return res.status(200).send("All databases deleted");
    } else if (type == 'resume') {
      const dbs = await nano.db.list();
      return res.status(200).send({
        total: dbs.length,
        message: `Total databases: ${dbs.length}`
      });
    } else if (type) {

      const dbs = await nano.db.list();
      const filteredDbs = dbs.filter(db => db.startsWith(`db_${type}`));

      const dbsWithLinks = filteredDbs.map(db => ({
        name: db,
        link: `http://127.0.0.1:5984/_utils/#database/${db}/_all_docs`,
        // También podrías usar una variable de entorno para la URL base
        // link: `${process.env.COUCHDB_URL}/_utils/#database/${db}/_all_docs`,
      }));

      return res.status(200).send({
        databases: dbsWithLinks,
        total: filteredDbs.length,
        message: `Found ${filteredDbs.length} databases with prefix db_${type}`
      });
    } else {
      return res.status(200).send({
        message: "¿Necesitas ayuda? Aquí tienes una guía de uso:",
        endpoints: {
          "/": "Muestra esta guía de ayuda",
          "/resume": "Muestra el número total de bases de datos",
          "/delete-all": "⚠️ CUIDADO: Elimina todas las bases de datos",
          "/{tipo}": "Muestra todas las bases de datos que empiezan con db_{tipo}",
        },
        ejemplos: {
          "GET /resume": "Ver total de bases de datos",
          "GET /accounts": "Ver todas las bases de datos que empiezan con db_accounts",
          "GET /notifications": "Ver todas las bases de datos que empiezan con db_notifications"
        },
        nota: "⚠️ Ten mucho cuidado con delete-all, esta acción no se puede deshacer"
      });
    }



  } catch (err) {
    return res.status(400).send('Not found')
  }
}





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

      const hashedPassword = Buffer.from(
        account?.password || "123456"
      ).toString("base64");

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
      console.log("response", response);

      return res.status(200).send({
        success: true,
        message: "Account created successfully.",
        account: { ...account },
      });
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

      return res.status(200).send(sanitizedDoc);
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

    let db = await connectDB("db_accounts");

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
          console.log("Bucket created for user:", updateResponse);
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

      return res.status(200).send(accounts);
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

      return res.status(200).send({
        success: true,
        message: "OTP generado y enviado exitosamente.",
      });
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

      return res
        .status(200)
        .send({ success: true, message: "OTP verified successfully." });
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


const addNotificationController = async (req, res) => {
  try {
    const { user } = req;
    const id = user._id.split('_').pop()

    const { notification } = req.body;
    console.log("Notification received:", notification);

    const dbNotifications = await connectDB(`db_${id}_notifications`)



    //     sales
    // expenses
    // benefits

    // month [0..11]

    // accounts
    // -exceptional
    // -current_lost
    // -social_security
    // -compensations
    // -salary
    // -services
    // -supplies
    // -publicity
    // -banking

    await dbNotifications.createIndex({
      index: {
        fields: ['createdAt']
      }
    });

    const notificationId = uuidv4()

    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()

    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = currentDate.toLocaleString('en-US', { month: 'short' });
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';

    const dataNotification = {
      title: "Titulo de la factura",
      email: "johndoe@email.com",
      icon: "https://aythen.com/logo.png",
      location: "Q1>Facturas",
    }

    dbNotifications.insert({
      // id: 1,
      id: notificationId,
      title: "Document Title",
      date: `${day} ${month} ${year}`,
      time: `${hours}:${minutes} ${period}`,
      month: `${currentMonth}-${currentYear}`,
      icon: "https://aythen.com/logo.png",
      notifications: [
        dataNotification,
        dataNotification,
        dataNotification
      ],
      options: ["Compartir"], // Solo 2 opciones
      category: ["excepcional", "current_lost", "social_security", "compensations", "salary", "services", "supplies", "publicity", "banking"],
      type: 'pay',
      value: 1000,
      currency: 'EUR',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })


    // dbNotifications.insert({
    //   accountId: user._id,
    //   user: 'info@aythen.com',
    //   type: 'automation',
    //   title: 'Titulo de la factura',
    //   message: 'Automating docs',
    //   path: 'automate/docs',
    //   status: 'pending',
    //   createdAt: new Date().toISOString(),
    //   updatedAt: new Date().toISOString(),
    // })

    return res.status(200).send({
      success: true,
      message: "Notification added successfully",
      notification: notification,
    });
  } catch (err) {
    console.log("Error in addNotificationController:", err);
    return res.status(500).send("Error adding notification");
  }
};

const getAllNotificationsController = async (req, res) => {
  try {
    const { notifications } = req.body;
    console.log("Notifications received:", notifications);
    const user = req.user
    const id = user._id.split('_').pop()

    const dbNotifications = await connectDB(`db_${id}_notifications`)

  

    console.log('log1')


    const notificationsDb = await dbNotifications.find({
      // selector: {},
      selector: {
        date: { "$exists": true }
      },
      limit: 1000,
      sort: [{ "createdAt": 'desc' }],
       use_index: "date-index"
    })

    const notificationsDocs = notificationsDb.docs.map((doc) => {
      const { _id, _rev, ...rest } = doc;
      return rest;
    })

    return res.status(200).send({
      success: true,
      message: "Notifications fetched successfully",
      notifications: notificationsDocs,
    });

  } catch (err) {
    console.log("Error in getAllNotificationsController:", err);
    return res.status(500).send("Error getting notifications");
  }
};

const deleteNotificationController = async (req, res) => {
  try {
    const { notification } = req.body;
    console.log("Notification received:", notification);

    const user = req.user
    const id = user._id.split('_').pop()

    const dbNotifications = await connectDB(`db_${id}_notifications`)

    await dbNotifications.destroy(notification._id, notification._rev);

    return res.status(200).send({
      success: true,
      message: "Notification deleted successfully",
      notification: notification,
    });
  } catch (err) {
    console.log("Error in deleteNotificationController:", err);
    return res.status(500).send("Error deleting notification");
  }
};


const getTruncatedTime = () => {
  const now = new Date();
  // Sumamos una hora
  now.setHours(now.getHours() + 1);
  
  const minutes = now.getMinutes();
  
  // Truncar a intervalos de 15 minutos
  const truncatedMinutes = Math.floor(minutes / 15) * 15;
  now.setMinutes(truncatedMinutes);
  now.setSeconds(0);
  now.setMilliseconds(0);
  
  // Formatear la hora en HH:MM
  const hours = now.getHours().toString().padStart(2, '0');
  const mins = truncatedMinutes.toString().padStart(2, '0');
  
  return `${hours}:${mins}`;
};


const getResumeAccount = async (req, res) => {
  try {
    console.log('get resume account')
    const user = req.user;
    const id = user._id.split('_').pop()

    const dbNotifications = await connectDB(`db_${id}_notifications`)

    const operationDate = getTruncatedTime()

    console.log('operationDate', operationDate)
    const notificationResume = await dbNotifications.find({
      selector: {
        type: 'resume',
        date: operationDate
      }
    })

    let resume = {}

    console.log('notificationresume', notificationResume)

    if(notificationResume.docs && notificationResume.docs.length == 0){
      const currentDate = new Date();
      const currentMonth = `${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;

      resume = {
        type: 'resume',
        date: operationDate,
        month: currentMonth,
        income: 0,
        expenses: 0,
        benefits: 0,
        exceptional: 0,
        current_lost: 0,
        social_security: 0,
        compensations: 0,
        salary: 0,
        services: 0,
        supplies: 0,
        publicity: 0,
        banking: 0
      }


      // const notifications = await dbNotifications.find({
      //   selector: {
      //     // type: 'resume'
      //   }
      // })

      const notifications = await dbNotifications.find({
        selector: {
          type: {
            "$ne": "resume"
          },
          createdAt: { "$exists": true },
          value: { "$exists": true }
        },
        sort: [{ "createdAt": "desc" }],
        limit: 1000,
        use_index: "date-index"
      });


       // Sumar todos los valores
       const totalIncome = notifications.docs.reduce((sum, notification) => {
        // Si el tipo es 'income' sumamos, si es 'expense' restamos
        if (notification.type === 'income') {
          return sum + (notification.value || 0);
        } else if (notification.type === 'expense') {
          return sum - (notification.value || 0);
        }
        return sum;
      }, 0);

      // Actualizar el resumen
      resume.income += totalIncome;
      resume.expenses = Math.abs(notifications.docs
        .filter(doc => doc.type === 'expense')
        .reduce((sum, doc) => sum + (doc.value || 0), 0));
      resume.benefits = resume.income - resume.expenses;

      console.log('resume', resume)
      // Actualizar el documento resumen en la base de datos
      await dbNotifications.insert(resume);
      // console.log('notifications dbdbdbd', notifications)
      // dbNotifications.insert(resume)
    } else {
      resume = notificationResume.docs[0]
    }


   
    return res.status(200).send({
      success: true,
      message: "Resume account fetched successfully",
      resume: resume,
    });

  } catch (err) {
    console.log("Error in getResumeAccount:", err);
    return res.status(500).send("Error getting resume account");
  }
}




module.exports = {
  getDB: catchedAsync(getDB),

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
  updateAccountPasswordController: catchedAsync(updateAccountPasswordController),


  addNotificationController: catchedAsync(addNotificationController),
  getAllNotificationsController: catchedAsync(getAllNotificationsController),
  deleteNotificationController: catchedAsync(deleteNotificationController),
  getResumeAccount: catchedAsync(getResumeAccount),

  loginToManagerController: catchedAsync(loginToManagerController),

  uploadPDF: catchedAsync(uploadPDF),
  // upload: upload,
};
