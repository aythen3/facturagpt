import React, { useState } from "react";
import styles from "../GmailAndOutlookFormCreateAutomate/gmailAndOutlook.module.css";
import SelectComponent from "../../shared/SelectComponent";
import { ReactComponent as EsPublicoIcon } from "../../../../assets/espublicogestionaLogo.svg";
import TitleFormsComponent from "../../shared/TitleFormsComponent";
import OptionsSwitchComponent from "../../shared/OptionsSwitchComponent";
import TextSVG from "../../svgs/TextSVG";
import InputComponent from "../../shared/InputComponent";
import NotificationsSVG from "../../svgs/NotificationsSVG";
import CheckboxComponent from "../../shared/CheckboxComponent";
import { ReactComponent as GmailIcon } from "../../../../assets/gmail.svg";
import { ReactComponent as WhatsAppIcon } from "../../../../assets/whatsapp.svg";
import HeaderFormsComponent from "../../shared/HeaderFormsComponent";
import ModalAddConnectionEsPublico from "./ModalAddConnectionEsPublico";
import NotificationsConfirmComponent from "../../shared/NotificationsConfirmComponent";
const EsPublicoGestionaFormAutomate = ({ type }) => {
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
        icon={<EsPublicoIcon />}
      />

      <TitleFormsComponent title="Sincroniza con" type={type} />
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

      <NotificationsConfirmComponent
        placeholder1="[email],..."
        placeholder2="[00000000],..."
        type1="Gmail"
        type2="WhatsApp"
        title="Notificar en el caso de detectar un error en la validación"
        icons={[
          <GmailIcon style={{ width: 25 }} />,
          <WhatsAppIcon style={{ width: 25 }} />,
        ]}
      />

      {isAddConnection && (
        <ModalAddConnectionEsPublico close={closeAddConnection} />
      )}
    </div>
  );
};

export default EsPublicoGestionaFormAutomate;
