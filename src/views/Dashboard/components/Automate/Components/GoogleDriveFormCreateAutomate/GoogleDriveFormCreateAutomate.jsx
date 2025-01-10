import React, { useState } from "react";
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
import HeaderFormsComponent from "../../shared/HeaderFormsComponent";
import ModalAddConnectionGoogleDrive from "./ModalAddConnectionGoogleDrive";
import NotificationsConfirmComponent from "../../shared/NotificationsConfirmComponent";

const GoogleDriveFormCreateAutomate = ({ type }) => {
  const [isAddConnection, setIsAddConnection] = useState(false);

  const openAddConnection = () => {
    setIsAddConnection(true);
  };

  const closeAddConnection = () => {
    setIsAddConnection(false);
  };
  return (
    <div>
      <HeaderFormsComponent action={openAddConnection} icon={<DriveIcon />} />
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
          <NotificationsConfirmComponent
            placeholder1="[email],..."
            placeholder2="[00000000],..."
            type1="Gmail"
            type2="WhatsApp"
            title="Notificar tras la exportacion"
            icons={[
              <GmailIcon style={{ width: 25 }} />,
              <WhatsAppIcon style={{ width: 25 }} />,
            ]}
          />
        </div>
      </div>
      {isAddConnection && (
        <ModalAddConnectionGoogleDrive close={closeAddConnection} />
      )}
    </div>
  );
};

export default GoogleDriveFormCreateAutomate;
