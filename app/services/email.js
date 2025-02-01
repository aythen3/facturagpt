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
      {
        filename: "GreenLogo.png",
        path: "./assets/GreenLogo.png",
        cid: "unique@logo.cid",
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

async function sendOtpEmail(nombre, email, otp, language = "es") {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "info@aythen.com",
      pass: "azyx mpfz fveg bqlr",
    },
  });

  let htmlContent;

  if (language === "es") {
    htmlContent = `
    <div style="font-family: Arial, sans-serif; color: #1F184B; background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 8px; max-width: 600px; margin: 0 auto;">
      <h1 style="text-align: center; font-size: 24px;">
        <img src="cid:logo" style="max-width: 65%; height: auto;" />
      </h1>
      <p style="font-size: 16px; line-height: 1.5; color:#1F184B;">Hola, ${nombre}</p>
      <p style="font-size: 16px; line-height: 1.5; color:#1F184B;">Para completar el proceso de activación y validar tu cuenta, por favor introduce el siguiente código de 6 dígitos en nuestra plataforma:</p>
      <p style="font-size: 16px; line-height: 1.5; color:#1F184B; font-weight:bold;">Código de Verificación:</p>
      <div style="text-align: center; margin: 20px 0;">
        <h2 style="font-size: 16px; letter-spacing: 4px; color:#0D0D0D; padding: 10px; border-radius: 8px; display: inline-block;">${otp}</h2>
      </div>
      <p style="font-size: 16px; line-height: 1.5; color:#1F184B;">Este código es válido durante los próximos 10 minutos. Si el código ha expirado o necesitas uno nuevo, puedes solicitar otro fácilmente utilizando la opción "Reenviar Código" en la página de verificación.</p>
      <p style="font-size: 16px; line-height: 1.5; color:#1F184B;">
      ¿Qué sigue?
        <ol style="color:#1F184B;">
          <li>Ingresa el código: Copia y pega el código anterior en el campo correspondiente de nuestra página de activación.</li>
          <li>Completa la validación: Una vez ingresado el código, tu cuenta será activada y estarás listo para disfrutar de todos los beneficios de Linkeram.</li>
        </ol>
      </p>
    </div>
    `;
  } else {
    htmlContent = `
  <div style="font-family: Arial, sans-serif; color: #1F184B; background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 8px; max-width: 600px; margin: 0 auto;">
      <h1 style="text-align: center; font-size: 24px;">
        <img src="cid:logo" style="max-width: 65%; height: auto;" />
      </h1>
      <p style="font-size: 16px; line-height: 1.5; color:#1F184B;">Hello, ${nombre}</p>
      <p style="font-size: 16px; line-height: 1.5; color:#1F184B;">To complete the activation process and validate your account, please enter the following 6-digit code on our platform:</p>
      <p style="font-size: 16px; line-height: 1.5; color:#1F184B; font-weight:bold;">Verification Code:</p>
      <div style="text-align: center; margin: 20px 0;">
        <h2 style="font-size: 16px; letter-spacing: 4px; color:#0D0D0D; padding: 10px; border-radius: 8px; display: inline-block;">${otp}</h2>
      </div>
      <p style="font-size: 16px; line-height: 1.5; color:#1F184B;">This code is valid for the next 10 minutes. If the code has expired or you need a new one, you can easily request another one using the "Resend Code" option on the verification page.</p>
      <p style="font-size: 16px; line-height: 1.5; color:#1F184B;">
      What's next?
        <ol style="color:#1F184B;">
          <li>Enter the code: Copy and paste the code above into the appropriate field on our activation page.</li>
          <li>Complete the validation: Once the code has been entered, your account will be activated and you will be ready to enjoy all the benefits of Linkeram.</li>
        </ol>
      </p>
    </div>

  `;
  }

  const mailOptions = {
    from: "info@aythen.com",
    to: email,
    subject: language === "es" ? "Tu código OTP" : "Your OTP Code",
    html: htmlContent,
    attachments: [
      {
        filename: "GreenLogo.png",
        path: path.join(__dirname, "assets/GreenLogo.png"),
        cid: "logo",
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("OTP enviado exitosamente a:", email);
  } catch (error) {
    console.error("Error al enviar el OTP:", error);
    throw new Error("No se pudo enviar el OTP.");
  }
}

const sendRecoveryCode = async (email, recoveryCode, language = "es") => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "info@aythen.com",
      pass: "azyx mpfz fveg bqlr",
    },
  });

  let htmlContent;

  if (language === "es") {
    htmlContent = `
    <div style="font-family: Arial, sans-serif; color: #333; background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 8px; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #4CAF50; text-align: center; font-size: 24px;">Tu Código de Recuperación</h1>
      <p style="font-size: 16px; line-height: 1.5;">Hola,</p>
      <p style="font-size: 16px; line-height: 1.5;">Tu código de recuperación para restablecer tu contraseña es:</p>
      <div style="text-align: center; margin: 20px 0;">
        <h2 style="color: #4CAF50; font-size: 32px; letter-spacing: 4px; background-color: #e8f5e9; padding: 10px; border-radius: 8px; display: inline-block;">${recoveryCode}</h2>
      </div>
      <p style="font-size: 16px; line-height: 1.5; color: #555;">Este código expirará en <strong>5 minutos</strong>. Si no solicitaste restablecer tu contraseña, por favor ignora este mensaje.</p>
      <p style="font-size: 16px; line-height: 1.5;">Atentamente,<br><strong>El equipo de Aythen</strong></p>
    </div>
    `;
  } else {
    htmlContent = `
    <div style="font-family: Arial, sans-serif; color: #333; background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 8px; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #4CAF50; text-align: center; font-size: 24px;">Your Recovery Code</h1>
      <p style="font-size: 16px; line-height: 1.5;">Hello,</p>
      <p style="font-size: 16px; line-height: 1.5;">Your recovery code to reset your password is:</p>
      <div style="text-align: center; margin: 20px 0;">
        <h2 style="color: #4CAF50; font-size: 32px; letter-spacing: 4px; background-color: #e8f5e9; padding: 10px; border-radius: 8px; display: inline-block;">${recoveryCode}</h2>
      </div>
      <p style="font-size: 16px; line-height: 1.5; color: #555;">This code will expire in <strong>5 minutes</strong>. If you did not request to reset your password, please ignore this message.</p>
      <p style="font-size: 16px; line-height: 1.5;">Best regards,<br><strong>The Aythen Team</strong></p>
    </div>
    `;
  }

  const mailOptions = {
    from: "info@aythen.com",
    to: email,
    subject:
      language === "es" ? "Tu Código de Recuperación" : "Your Recovery Code",
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Código de recuperación enviado exitosamente a:", email);
  } catch (error) {
    console.error("Error al enviar el código de recuperación:", error);
    throw new Error("No se pudo enviar el código de recuperación.");
  }
};

module.exports = {
  getTemplate: getTemplate,
  getEmail: getEmail,
  sendGoEmail: sendGoEmail,
  sendEmail: sendEmail,
  sendInvitationEmail: sendInvitationEmail,
  sendOtpEmail: sendOtpEmail,
  sendRecoveryCode: sendRecoveryCode,
};
