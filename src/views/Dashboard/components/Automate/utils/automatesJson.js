import mail from "../../../assets/gmail.svg";
import outlook from "../../../assets/outlook.svg";
import drive from "../../../assets/drive.svg";
import dropbox from "../../../assets/droopbox.svg";
import whatsApp from "../../../assets/whatsapp.svg";
import esPublico from "../../../assets/espublicogestionaLogo.svg";
import googleSheets from "../../../assets/excel.svg";
import xml from "../../../assets/xmlIcon.svg";
import odoo from "../../../assets/odoo.svg";
import wolters from "../../../assets/wolters-icon.svg";

export const data = [
  {
    id: 1,
    automateName: "Sube tus Facturas de Gmail",
    image: mail,
    contactType: "example@gmail.com",
    type: "Gmail",
    role: "input",
  },
  {
    id: 2,
    automateName: "Sube tus Facturas de Outlook",
    image: outlook,
    contactType: "example@gmail.com",
    type: "Outlook",
    role: "input",
  },
  {
    id: 3,
    automateName: "Sube tus Facturas de Google Drive",
    image: drive,
    contactType: "example@gmail.com",
    type: "Google Drive",
    role: "input",
  },
  {
    id: 4,
    automateName: "Sube tus Facturas de Dropbox",
    image: dropbox,
    contactType: "example@gmail.com",
    type: "dropbox",
    role: "input",
  },
  {
    id: 5,
    automateName: "Recibe Facturas desde WhatsApp",
    image: whatsApp,
    contactType: "+00000000",
    type: "WhatsApp",
    role: "input",
  },
  {
    id: 6,
    automateName: "Sincroniza con esPúblico Gestiona",
    image: esPublico,
    contactType: "example@gmail.com",
    type: "esPúblico Gestiona",
    role: "input",
  },
  {
    id: 7,
    automateName: "Actualiza tu Google Sheets",
    image: googleSheets,
    contactType: "Título de la hoja.xls",
    type: "Google Sheets",
    role: "output",
  },

  {
    id: 8,
    automateName: "Genera Archivos XML para Declaraciones Físcales",
    image: xml,
    contactType: "example@gmail.com ",
    type: "XML para Declaciones Físcales",
    role: "output",
  },

  {
    id: 9,
    automateName: "Sincroniza Facturas con Odoo  ",
    image: odoo,
    contactType: "example@gmail.com ",
    type: "Odoo",
    role: "output",
  },

  {
    id: 10,
    automateName: "Exporta Facturas a Wolters Kluwer A3",
    image: wolters,
    contactType: "example@gmail.com ",
    type: "Wolters Kluwer A3",
    role: "output",
  },
];
