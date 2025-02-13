import mail from "../../../assets/gmail.svg";
import outlook from "../../../assets/outlook.svg";
import drive from "../../../assets/drive.svg";
import telematel from "../../../assets/telematel.svg";
import dropbox from "../../../assets/droopbox.svg";
import whatsApp from "../../../assets/whatsappIcon.svg";
import esPublico from "../../../assets/espublico-icon.svg";
import googleSheets from "../../../assets/excel.svg";
import stripe from "../../../assets/stripe.svg";
import xml from "../../../assets/xml.svg";
import odoo from "../../../assets/odoo.svg";
import wolters from "../../../assets/wolters-icon.svg";
import holded from "../../../assets/holded.svg";
import agencyTribut from "../../../assets/agencia.svg";
import acrobat from "../../../assets/acrobat.svg";
import ftp from "../../../assets/ftp.svg";

export const data = [
  {
    id: 1,
    automateName: "Sube tus Facturas de Gmail",
    image: mail,
    contactType: "example@gmail.com",
    type: "Gmail",
    role: "input",
    available: true
  },
  {
    id: 2,
    automateName: "Sube tus Facturas de Outlook",
    image: outlook,
    contactType: "example@gmail.com",
    type: "Outlook",
    role: "input",
    available: true
  },
  {
    id: 3,
    automateName: "Sube tus Facturas de Google Drive",
    image: drive,
    contactType: "example@gmail.com",
    type: "Google Drive",
    role: "input",
    available: false
  },
  {
    id: 4,
    automateName: "Sube tus Facturas de Dropbox",
    image: dropbox,
    contactType: "example@gmail.com",
    type: "Dropbox",
    role: "input",
    available: false
  },
  {
    id: 5,
    automateName: "Recibe Facturas desde WhatsApp",
    image: whatsApp,
    contactType: "+00000000",
    type: "WhatsApp",
    role: "input",
    available: false
  },
  {
    id: 6,
    automateName: "Sincroniza con esPúblico Gestiona",
    image: esPublico,
    contactType: "example@gmail.com",
    type: "esPúblico Gestiona",
    role: "input",
    available: false
  },
  {
    id: 18,
    automateName: "Actualiza tu Telematel",
    image: telematel,
    contactType: "Directo a Telematel",
    type: "Telematel",
    role: "output",
    available: true
  },
  {
    id: 7,
    automateName: "Actualiza tu Google Sheets",
    image: googleSheets,
    contactType: "Título de la hoja.xls",
    type: "Google Sheets",
    role: "output",
    available: false
  },
  {
    id: 16,
    automateName: "Exporta a tu Servidor FTP",
    image: ftp,
    contactType: "682",
    type: "FTP",
    role: "output",
    available: false
  },
  {
    id: 8,
    automateName: "Genera Archivos XML",
    image: xml,
    contactType: "example@gmail.com",
    type: "XML",
    role: "output",
    available: false
  },
  {
    id: 11,
    automateName:
      "Envía a tu portal de la Agencia Tributaria",
    image: agencyTribut,
    contactType: "example@gmail.com ",
    type: "Agencia Tributaria",
    role: "output",
    available: false
  },
  {
    id: 9,
    automateName: "Sincroniza Facturas con Odoo",
    image: odoo,
    contactType: "example@gmail.com ",
    type: "Odoo",
    role: "output",
    available: false
  },
  {
    id: 10,
    automateName: "Exporta Facturas a Wolters Kluwer A3",
    image: wolters,
    contactType: "example@gmail.com ",
    type: "Wolters",
    role: "output",
    available: false
  },
  
  {
    id: 12,
    automateName: "Envía Notificaciónes por WhatApp",
    image: whatsApp,
    contactType: "+00000000",
    type: "whatsApp notifications",
    role: "output",
    available: false
  },
  {
    id: 13,
    automateName: "Procesa Pagos con Stripe",
    image: stripe,
    contactType: "+00000000",
    type: "Stripe",
    role: "output",
    available: false
  },
  {
    id: 14,
    automateName: "Conecta Facturas con Holded",
    image: holded,
    contactType: "+00000000",
    type: "Holded",
    role: "output",
    available: false
  },
  {
    id: 15,
    automateName: "Genera y Envía Informes PDF",
    image: acrobat,
    contactType: "+00000000",
    type: "Acrobat",
    role: "output",
    available: false
  },
  
];
