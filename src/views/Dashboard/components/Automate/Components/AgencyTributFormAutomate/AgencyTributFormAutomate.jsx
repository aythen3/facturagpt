import React, { useState } from "react";
import TitleFormsComponent from "../../shared/TitleFormsComponent";
import NotificationsConfirmComponent from "../../shared/NotificationsConfirmComponent";
import { ReactComponent as GmailIcon } from "../../../../assets/gmail.svg";
import { ReactComponent as WhatsAppIcon } from "../../../../assets/whatsapp.svg";
import { ReactComponent as AgencyTributIcon } from "../../../../assets/agenciatributariaLogo.svg";
import HeaderFormsComponent from "../../shared/HeaderFormsComponent";
import ModalAddConnectionAgencyTribut from "./ModalAddConnectionAgencyTribut";

const AgencyTributFormAutomate = ({ type }) => {
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
        icon={<AgencyTributIcon />}
      />

      <TitleFormsComponent title="Envia" type={type} />

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
        <ModalAddConnectionAgencyTribut close={closeAddConnection} />
      )}
    </div>
  );
};

export default AgencyTributFormAutomate;
