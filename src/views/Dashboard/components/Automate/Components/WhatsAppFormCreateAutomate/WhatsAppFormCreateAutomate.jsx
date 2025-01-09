import React from "react";
import SelectComponent from "../../shared/SelectComponent";
import { ReactComponent as WhatsAppIcon } from "../../../../assets/whatsapp.svg";
import styles from "../GmailAndOutlookFormCreateAutomate/gmailAndOutlook.module.css";
import TitleFormsComponent from "../../shared/TitleFormsComponent";
import InputComponent from "../../shared/InputComponent";
import SearchSVG from "../../svgs/SearchSVG";
import CircleDeleteSVG from "../../svgs/CircleDeleteSVG";

const WhatsAppFormCreateAutomate = ({ type }) => {
  const numbers = [
    { id: 1, number: "+00000000" },
    { id: 2, number: "+000000" },
  ];

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.header_mail}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #D9D9D9",
              borderTopLeftRadius: "8px",
              borderBottomLeftRadius: "8px",
              height: 30,
              width: 30,
            }}
          >
            <WhatsAppIcon />
          </div>

          <SelectComponent
            options={[
              "example1@gmail.com",
              "example2@gmail.com",
              "example3@gmail.com",
            ]}
            name="mail"
            id="mail"
            isEmail={true}
          />
        </div>
        <p style={{ color: "#159B7C" }}>Añadir conexion</p>
      </div>

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
            <p>{number.number}</p>
            <CircleDeleteSVG />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatsAppFormCreateAutomate;
