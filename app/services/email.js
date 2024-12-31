const fs = require("fs").promises;
const path = require("path");

const nodemailer = require("nodemailer");

const {
  generateUniqueToken,
  calculateExpirationDateForOneDay,
} = require("../helpers/tokenGenerator");

const token = generateUniqueToken();
const expiration = calculateExpirationDateForOneDay();

const { getData } = require("../middlewares/emails/templates");
const dataEventInvitation = require("../middlewares/emails/templates/event-invitation");
const {
  templateHtml,
} = require("../middlewares/emails/templates/templateHtml.js");

const getTemplate = async (name) => {
  try {
    const filePath = path.join(
      __dirname,
      "../middlewares/emails/templates/",
      name + ".html"
    );

    const html = await fs.readFile(filePath, "utf8");

    return { status: 200, html };
  } catch (error) {
    return { status: 404, error };
  }
};

const insertData = (htmlTemplate, data) => {
  try {
    const variableRegex = /\{{([^}]+)\}}/g;

    const replacedTemplate = htmlTemplate.replace(
      variableRegex,
      (match, variable) => {
        if (data.hasOwnProperty(variable)) {
          return data[variable];
        } else {
          return `not found ${variable}`;
        }
      }
    );

    return replacedTemplate;
  } catch (error) {
    throw new Error("Error during variable replacement");
  }
};

const setEmail = async (template, item) => {
  const resp = await getTemplate(template);
  if (resp.status == 404) {
    return false;
  }

  let data = getData(template, (lan = item?.lan || "es"));
  data = { backgroundColor: "red", ...data, ...item };

  data.footerHtml = templateHtml.footerHtml;

  const html = insertData(resp.html, data);
  return html;
};

async function sendEmail(email, template, data) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "info@aythen.com",
      pass: "azyx mpfz fveg bqlr",
    },
  });

  let mailOptions = {
    from: data.from || `info@aythen.com`,
    to: email,
    subject: data.subject || "Invitacion a mi workspace",
    text: `Hola, te invito a formar parte de mi espacio de trabajo`,
    html: await setEmail(template, data),
  };

  if (data.attachment) {
    mailOptions.attachments = [
      {
        filename: "attachment.pdf",
        content: data.attachment,
        encoding: "base64",
      },
    ];
  }

  try {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error al enviar el correo electrónico:", error);
      } else {
        console.log("Correo electrónico enviado exitosamente");
      }
    });
  } catch (error) {
    console.error("Error al enviar el correo electrónico:", error);
  }
}

const setCalendarEmail = async (template, data) => {
  const resp = await getTemplate(template);
  if (resp.status === 404) {
    return false;
  }

  // Handle participants list
  const participantsList = data.participants
    ? data.participants.map((participant) => `<li>${participant}</li>`).join("")
    : "";

  const translations = dataEventInvitation[data.lan || "es"]; // Default to 'es' if no language is provided

  const emailData = {
    ...translations,
    ...data,
    participantsList, // Add participants list to the data passed to the template
  };

  const html = insertData(resp.html, emailData);
  return html;
};

async function sendInvitationEmail({ email, data }) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "info@aythen.com",
      pass: "azyx mpfz fveg bqlr",
    },
  });

  const html = await setCalendarEmail("event-invitation", data);

  const translations = dataEventInvitation[data.lan || "es"]; // Get translations for the email subject
  const mailOptions = {
    from: data.from || "info@aythen.com",
    to: email,
    subject: data.subject || translations.title,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Invitation email sent successfully");
  } catch (error) {
    console.error("Error sending invitation email:", error);
  }
}

const sendGoEmail = async (req, res) => {
  const { id } = req.params;
  sendEmail("info@aythen.com", id, {
    from: `Descubre el potencial de Aythen <info@aythen.com>`,
    subject: `🚀 Inteligencia artificial al alcance de tu negocio`,
  });

  const html = await setEmail(id);
  return res.send(html);
};

const getEmail = async (req, res) => {
  const { id } = req.params;
  const html = await setEmail(id);

  return res.send(html);
};

const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "info@aythen.com",
      pass: "azyx mpfz fveg bqlr",
    },
  });

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h1>Tu código OTP</h1>
      <p>Hola,</p>
      <p>Tu código OTP para acceder al sistema es:</p>
      <h2 style="color: #4CAF50;">${otp}</h2>
      <p>Este código expirará en 5 minutos. Si no solicitaste este código, por favor ignora este mensaje.</p>
      <p>Atentamente,<br>El equipo de Aythen</p>
    </div>
  `;

  const mailOptions = {
    from: "info@aythen.com",
    to: email,
    subject: "Tu código OTP",
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("OTP enviado exitosamente a:", email);
  } catch (error) {
    console.error("Error al enviar el OTP:", error);
    throw new Error("No se pudo enviar el OTP.");
  }
};

module.exports = {
  getEmail: getEmail,
  sendGoEmail: sendGoEmail,
  sendEmail: sendEmail,
  sendInvitationEmail: sendInvitationEmail,
  sendOtpEmail: sendOtpEmail,
};
