import React, { useState } from "react";
import TitleFormsComponent from "../../shared/TitleFormsComponent";
import InputComponent from "../../shared/InputComponent";
import styles from "../GmailAndOutlookFormCreateAutomate/gmailAndOutlook.module.css";
import SearchSVG from "../../svgs/SearchSVG";
import CircleDeleteSVG from "../../svgs/CircleDeleteSVG";
import CheckboxComponent from "../../shared/CheckboxComponent";
import ModalAddConnectionWhatsAppSendNotifications from "./ModalAddConnectionWhatsAppSendNotifications";
import HeaderFormsComponent from "../../shared/HeaderFormsComponent";
import { ReactComponent as WhatsAppIcon } from "../../../../assets/whatsapp.svg";

const WhatsAppSendNotificationsFormAutomate = () => {
  const [isAddConnection, setIsAddConnection] = useState(false);

  const openAddConnection = () => {
    setIsAddConnection(true);
  };

  const closeAddConnection = () => {
    setIsAddConnection(false);
  };

  const numbers = [
    { id: 1, number: "+00000000" },
    { id: 2, number: "+000000" },
  ];
  return (
    <div>
      <HeaderFormsComponent
        action={openAddConnection}
        icon={<WhatsAppIcon />}
      />

      <TitleFormsComponent title="Envia una Notificación por WhatsApp" />
      <div>
        <div className={styles.content_input}>
          <p className={styles.title_content_input}>Télefono de WhatsApp</p>

          <InputComponent
            textButton="Añadir"
            icon={<SearchSVG />}
            placeholder="Número de télefono o nombre del cliente"
          />

          {numbers.map((number) => (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              key={number.id}
            >
              <p style={{ color: "#71717A" }}>{number.number}</p>
              <CircleDeleteSVG />
            </div>
          ))}

          <p className={styles.title_content_input}>
            Quiero recibir notificaciónes de...
          </p>

          <InputComponent
            textButton="Seleccionar Ubicación"
            icon={<SearchSVG />}
            placeholder="/home"
          />

          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <CheckboxComponent />
            <p style={{ color: "#71717A" }}>
              Notificar cuando se añade una factura a una ubicación
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <CheckboxComponent />
            <p style={{ color: "#71717A" }}>
              Notificar cuando se actualiza una etiqueta de una factura en una
              ubicación concreta
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <CheckboxComponent />
            <p style={{ color: "#71717A" }}>
              Notificar días antes del vencimiento de las facturas para su pago
            </p>
          </div>
        </div>
      </div>
      {isAddConnection && (
        <ModalAddConnectionWhatsAppSendNotifications
          close={closeAddConnection}
        />
      )}
    </div>
  );
};

export default WhatsAppSendNotificationsFormAutomate;
