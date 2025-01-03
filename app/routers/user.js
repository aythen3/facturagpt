const { Router } = require('express');
const userManagerRouter = Router();
const nodemailer = require('nodemailer');
const {
  createAccountController,
  loginToManagerController,
  addNewClientController,
  getAllClientsController,
  deleteClientController,
  updateClientController,
  getAllUsersController,
  updateAccountController,
  generateAndSendOtpController,
  verifyOTPController,
} = require('../controllers/user');
// Configuración de Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'yyeremi15@gmail.com',
    pass: 'mosb cdlz wgqz ntdr',
  },
});

// -------------------------------
userManagerRouter
  .post('/createAccount', createAccountController)
  .post('/loginToManager', loginToManagerController)
  .post('/addNewClient', addNewClientController)
  .get('/getAllClients', getAllClientsController)
  .get('/getAllUsers', getAllUsersController)
  .delete('/deleteClient', deleteClientController)
  .put('/updateClient', updateClientController)
  .put('/updateUser', updateAccountController)
  .post('/send-otp', generateAndSendOtpController)
  .post('/verify-otp', verifyOTPController)
  .post('/newsletter', async (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
      from: email, // El correo del usuario que llenó el formulario
      to: 'yyeremi15@gmail.com', // Tu correo donde recibirás los mensajes
      subject: `Nuevo mensaje de ${name}`,
      text: `Has recibido un nuevo mensaje de contacto.\n\nNombre: ${name}\nCorreo: ${email}\n\nMensaje:\n${message}`,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Correo enviado:', info.response);
      res.status(200).json({ message: 'Correo enviado exitosamente' });
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      res.status(500).json({ error: 'Error al enviar el correo' });
    }
  });

module.exports = userManagerRouter;
