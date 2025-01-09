import React from "react";
import TitleFormsComponent from "../../shared/TitleFormsComponent";
import styles from "../GmailAndOutlookFormCreateAutomate/gmailAndOutlook.module.css";
import { ReactComponent as DriveIcon } from "../../../../assets/drive.svg";
import SelectComponent from "../../shared/SelectComponent";
import InputComponent from "../../shared/InputComponent";
import SearchSVG from "../../svgs/SearchSVG";
import CheckboxComponent from "../../shared/CheckboxComponent";
import OptionsSwitchComponent from "../../shared/OptionsSwitchComponent";
import NotificationsSVG from "../../svgs/NotificationsSVG";
import LabelSVG from "../../svgs/LabelSVG";
import TextSVG from "../../svgs/TextSVG";
import { ReactComponent as GmailIcon } from "../../../../assets/gmail.svg";
import { ReactComponent as WhatsAppIcon } from "../../../../assets/whatsapp.svg";

const GoogleDriveFormCreateAutomate = ({ type }) => {
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
            <DriveIcon />
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
      <TitleFormsComponent title="Sube tus facturas de" type={type} />

      <div>
        <p>Ubicación</p>
        <InputComponent
          textButton="Seleccionar Ubicación"
          placeholder="/NombredelaCuenta"
          icon={<SearchSVG />}
        />

        <div className={styles.content_input}>
          <p className={styles.title_content_input}>
            Título del archivo Contine
          </p>

          <InputComponent placeholder="Plabras clave separadas por coma" />
          <div className={styles.content_checkbox}>
            <CheckboxComponent />
            <p className={styles.text_checkbox}>Exact match</p>
          </div>
        </div>

        <div className={styles.content_input}>
          <p className={styles.title_content_input}>Tipo de Archivo</p>
          <div className={styles.content_checkbox}>
            <CheckboxComponent />
            <p className={styles.text_checkbox}>Permitir todos los tipos</p>
          </div>

          <SelectComponent options={["PDF/PNG/JPG", "Otro", "Otro2"]} />
        </div>

        <div style={{ marginTop: "24px" }}>
          <div style={{ display: "grid", gap: "10px" }}>
            <OptionsSwitchComponent
              icon={<TextSVG />}
              text="Cambiar nombre del archivo"
            />
            <InputComponent
              placeholder="[fecha]-[empresa]-[importe]-[etiqueta]"
              typeInput="text"
            />
          </div>
          <div style={{ display: "grid", gap: "10px" }}>
            <OptionsSwitchComponent
              icon={<LabelSVG />}
              text="Añadir etiqueta"
            />
            <InputComponent
              placeholder="Buscar etiqueta"
              typeInput="text"
              textButton="Crear"
            />
          </div>
          <div style={{ marginTop: "10px" }}>
            <OptionsSwitchComponent
              icon={<NotificationsSVG />}
              text="Notificar tras la exportacion"
            />
          </div>
        </div>

        <div
          style={{
            marginTop: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 46,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <CheckboxComponent />
            <GmailIcon style={{ width: 35 }} />
            <p>{type}</p>
          </div>
          <InputComponent placeholder="[email],..." typeInput="text" />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 46,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <CheckboxComponent />
            <WhatsAppIcon style={{ width: 35 }} />
            <p>{type}</p>
          </div>
          <InputComponent placeholder="[00000000],..." typeInput="text" />
        </div>
      </div>
    </div>
  );
};

export default GoogleDriveFormCreateAutomate;
