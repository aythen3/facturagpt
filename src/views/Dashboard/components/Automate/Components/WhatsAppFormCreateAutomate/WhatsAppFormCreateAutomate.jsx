import React, { useState } from "react";
import { ReactComponent as WhatsAppIcon } from "../../../../assets/whatsapp.svg";
import styles from "../GmailAndOutlookFormCreateAutomate/gmailAndOutlook.module.css";
import TitleFormsComponent from "../../shared/TitleFormsComponent";
import InputComponent from "../../shared/InputComponent";
import SearchSVG from "../../svgs/SearchSVG";
import CircleDeleteSVG from "../../svgs/CircleDeleteSVG";
import HeaderFormsComponent from "../../shared/HeaderFormsComponent";
import ModalAddConnectionWhatsApp from "./ModalAddConnectionWhatsApp";

const WhatsAppFormCreateAutomate = ({ type }) => {
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
      <TitleFormsComponent title="Recibe Facturas desde" type={type} />

      <div>
        <p>Ubicación</p>
        <InputComponent
          textButton="Seleccionar Ubicación"
          placeholder="/NombredelaCuenta"
          icon={<SearchSVG />}
        />

        <div className={styles.content_input}>
          <p className={styles.title_content_input}>Teléfono de WhatsApp</p>

          <InputComponent
            icon={<SearchSVG />}
            textButton="Añadir"
            placeholder="Número de teléfono o nombre del cliente"
          />
          <div className={styles.content_checkbox}></div>
        </div>

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
      </div>

      {isAddConnection && (
        <ModalAddConnectionWhatsApp close={closeAddConnection} />
      )}
    </div>
  );
};

export default WhatsAppFormCreateAutomate;
