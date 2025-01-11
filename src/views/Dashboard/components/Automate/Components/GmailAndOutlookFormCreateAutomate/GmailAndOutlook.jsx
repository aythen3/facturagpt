import React, { useState } from "react";
import styles from "./gmailAndOutlook.module.css";
import SearchSVG from "../../svgs/SearchSVG";
import WarningSVG from "../../svgs/WarningSVG";
import { ReactComponent as GmailIcon } from "../../../../assets/gmail.svg";
import { ReactComponent as OutlookIcon } from "../../../../assets/outlook.svg";
import { ReactComponent as WhatsAppIcon } from "../../../../assets/whatsapp.svg";
import SelectComponent from "../../shared/SelectComponent";
import CheckboxComponent from "../../shared/CheckboxComponent";
import OptionsSwitchComponent from "../../shared/OptionsSwitchComponent";
import TextSVG from "../../svgs/TextSVG";
import LabelSVG from "../../svgs/LabelSVG";
import NotificationsSVG from "../../svgs/NotificationsSVG";
import InputComponent from "../../shared/InputComponent";
import TitleFormsComponent from "../../shared/TitleFormsComponent";
import HeaderFormsComponent from "../../shared/HeaderFormsComponent";
import AddConnectionModal from "../AddConenctionModal/AddConnectionModal";
import LabelInputComponent from "../AddConenctionModal/components/LabelInputComponent";
import ModalAddConnectionGmailAndOutlook from "./ModalAddConnectionGmailAndOutlook";
import NotificationsConfirmComponent from "../../shared/NotificationsConfirmComponent";

const GmailAndOutlook = ({ type }) => {
  const [isAddConnection, setIsAddConnection] = useState(false);

  const openAddConnection = () => {
    setIsAddConnection(true);
  };

  const closeAddConnection = () => {
    setIsAddConnection(false);
  };
  return (
    <div>
      <HeaderFormsComponent
        action={openAddConnection}
        icon={type === "Outlook" ? <OutlookIcon /> : <GmailIcon />}
      />
      <TitleFormsComponent type={type} title="Sube tus facturas de" />

      <div>
        <p>
          Ubicación{" "}
          <span>Configura la ubicación donde Gmail guardará los datos</span>
        </p>
        <InputComponent
          textButton="Seleccionar Ubicación"
          placeholder="/NombredelaCuenta"
          icon={<SearchSVG />}
        />

        <div className={styles.content_input}>
          <p className={styles.title_content_input}>Remitentes</p>

          <InputComponent labelTag="johndoe@gmail.com" />
          <div className={styles.content_checkbox}>
            <CheckboxComponent />
            <p className={styles.text_checkbox}>Incluir todos los remitentes</p>
          </div>
        </div>

        <div className={styles.content_input}>
          <p className={styles.title_content_input}>Asunto Contine</p>

          <InputComponent
            placeholder="Palabras clave separadas por coma"
            typeInput="text"
          />

          <div className={styles.content_checkbox}>
            <CheckboxComponent />

            <p className={styles.text_checkbox}>Exact match</p>
          </div>
        </div>

        <div className={styles.content_input}>
          <p className={styles.title_content_input}>Body Contine</p>
          <InputComponent
            placeholder="Palabras clave separadas por coma"
            typeInput="text"
          />

          <div className={styles.content_checkbox}>
            <CheckboxComponent />

            <p className={styles.text_checkbox}>Exact match</p>
          </div>
        </div>

        <div className={styles.content_input}>
          <p className={styles.title_content_input}>Attachment Type</p>

          <div className={styles.content_checkbox}>
            <CheckboxComponent />

            <p className={styles.text_checkbox}>Exact match</p>
          </div>

          <SelectComponent options={["PDF/PNG/JPG", "Otro", "Otro2"]} />
          <div className={styles.advertency}>
            <WarningSVG />
            <p>
              Si el correo no tiene archivos adjuntos no se guardará ninguna
              factura
            </p>
          </div>
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
            title="Notificar tras la exportación"
            icons={[
              <GmailIcon style={{ width: 25 }} />,
              <WhatsAppIcon style={{ width: 25 }} />,
            ]}
          />
        </div>
      </div>
      {isAddConnection && (
        <ModalAddConnectionGmailAndOutlook close={closeAddConnection} />
      )}
    </div>
  );
};

export default GmailAndOutlook;
