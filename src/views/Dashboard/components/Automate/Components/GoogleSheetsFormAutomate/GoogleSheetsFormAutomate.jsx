import React, { useState } from "react";
import HeaderFormsComponent from "../../shared/HeaderFormsComponent";
import { ReactComponent as GoogleSheetsIcon } from "../../../../assets/excel.svg";
import TitleFormsComponent from "../../shared/TitleFormsComponent";
import InputComponent from "../../shared/InputComponent";
import styles from "../GmailAndOutlookFormCreateAutomate/gmailAndOutlook.module.css";
import CheckboxComponent from "../../shared/CheckboxComponent";
import OptionsSwitchComponent from "../../shared/OptionsSwitchComponent";
import NotificationsSVG from "../../svgs/NotificationsSVG";
import { ReactComponent as GmailIcon } from "../../../../assets/gmail.svg";
import { ReactComponent as WhatsAppIcon } from "../../../../assets/whatsapp.svg";
import ModalAddConnectionGoogleSheets from "./ModalAddConnectionGoogleSheets";
import NotificationsConfirmComponent from "../../shared/NotificationsConfirmComponent";
const GoogleSheetsFormAutomate = ({ type }) => {
  const [isAddConnection, setIsAddConnection] = useState(false);

  const openAddConnection = () => {
    setIsAddConnection(true);
  };

  const closeAddConnection = () => {
    setIsAddConnection(false);
  };

  const facturas = [
    "Id Factura/ Nº Factura",
    "Fecha",
    "Cliente",
    "Dirección",
    "Subtotal",
    "Nº de Artículo",
    "IVA",
    "Total",
    "Etiqueta",
  ];

  const clienteProveedores = [
    "id Cliente",
    "Nombre",
    "Email",
    "Télefono",
    "Dirección",
    "Número Fiscal",
    "Método de Pago",
    "Moneda Preferida",
    "Última Transacción",
  ];

  const productosServicios = [
    "id Artículo",
    "Nombre o Descripción",
    "PVP",
    "Precio Máximo",
    "Precio Mínimo",
    "Precio Medio",
  ];

  return (
    <div>
      <HeaderFormsComponent
        action={openAddConnection}
        icon={<GoogleSheetsIcon />}
      />
      <TitleFormsComponent title="Actualiza tu" type={type} />

      <div className={styles.content_input}>
        <p className={styles.title_content_input}>ID de la hoja de cálculo</p>

        <InputComponent
          icon={<GoogleSheetsIcon style={{ width: 20, height: 20 }} />}
          placeholder="Título de la hoja.xls"
          textButton="Seleccionar"
        />
      </div>
      <button
        style={{
          backgroundColor: "#11A380",
          opacity: 0.5,
          border: "none",
          width: "auto",
          padding: "16px",
          whiteSpace: "nowrap",
          borderRadius: "8px",
          color: "white",
          marginTop: "24px",
        }}
      >
        Crear Nueva Hoja
      </button>

      <div className={styles.content_input}>
        <p className={styles.title_content_input}>
          Título de la hoja de cálculo
        </p>

        <InputComponent placeholder="[nombre de la carpeta]" />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <GoogleSheetsIcon style={{ width: 20, height: 20 }} />
          <p> Título de la hoja.xls</p>
        </div>
        <p
          style={{
            cursor: "pointer",
            fontSize: "12px",
            whiteSpace: "nowrap",
          }}
        >
          Abrir hoja de cálculo
        </p>
      </div>
      <div style={{ display: "grid", gap: "10px" }}>
        <div>
          <p>Facturas</p>
          {facturas.map((factura) => (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
              key={factura}
            >
              <CheckboxComponent />
              <p>{factura}</p>
            </div>
          ))}
        </div>

        <div>
          <p>Clientes y Proveedores</p>
          {clienteProveedores.map((client) => (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
              key={client}
            >
              <CheckboxComponent />
              <p>{client}</p>
            </div>
          ))}
        </div>

        <div>
          <p>Productos y Servicios</p>
          {productosServicios.map((product) => (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
              key={product}
            >
              <CheckboxComponent />
              <p>{product}</p>
            </div>
          ))}
        </div>
      </div>
      <NotificationsConfirmComponent
        placeholder1="[email],..."
        placeholder2="[00000000],..."
        type1="Gmail"
        type2="WhatsApp"
        title="Notificar al actualizar una fila"
        icons={[
          <GmailIcon style={{ width: 25 }} />,
          <WhatsAppIcon style={{ width: 25 }} />,
        ]}
      />

      <NotificationsConfirmComponent
        placeholder1="[email],..."
        placeholder2="[00000000],..."
        type1="Gmail"
        type2="WhatsApp"
        title="Notificar al crear una fila"
        icons={[
          <GmailIcon style={{ width: 25 }} />,
          <WhatsAppIcon style={{ width: 25 }} />,
        ]}
      />

      {isAddConnection && (
        <ModalAddConnectionGoogleSheets close={closeAddConnection} />
      )}
    </div>
  );
};

export default GoogleSheetsFormAutomate;
