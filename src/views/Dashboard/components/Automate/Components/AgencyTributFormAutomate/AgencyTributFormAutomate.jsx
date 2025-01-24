import React, { useState } from "react";
import TitleFormsComponent from "../../shared/TitleFormsComponent";
import NotificationsConfirmComponent from "../../shared/NotificationsConfirmComponent";
import { ReactComponent as GmailIcon } from "../../../../assets/gmail.svg";
import { ReactComponent as WhatsAppIcon } from "../../../../assets/whatsappIcon.svg";
import { ReactComponent as AgencyTributIcon } from "../../../../assets/agencia.svg";
import HeaderFormsComponent from "../../../HeadersFormsComponent/HeaderFormsComponent";
import ModalAddConnectionAgencyTribut from "./ModalAddConnectionAgencyTribut";

const AgencyTributFormAutomate = ({
  type,
  configuration,
  setConfiguration,
}) => {
  const [isAddConnection, setIsAddConnection] = useState(false);

  const openAddConnection = () => {
    setIsAddConnection(true);
  };

  const closeAddConnection = () => {
    setIsAddConnection(false);
  };
  const handleConfigurationChange = (key, value) => {
    setConfiguration((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const addConnection = (connection) => {
    console.log("adding connection", connection);
    const updatedConnections = [
      ...(configuration.agenciaConnectionData || []),
      connection,
    ];
    console.log("setting agenciaConnectionData", updatedConnections);
    handleConfigurationChange("agenciaConnectionData", updatedConnections);
    if (!configuration.selectedAgenciaConnection) {
      handleConfigurationChange(
        "selectedAgenciaConnection",
        connection.clientId
      );
    }
  };
  return (
    <div>
      <HeaderFormsComponent
        selectedEmailConnection={configuration.selectedAgencyConnection}
        setSelectedEmailConnection={(value) =>
          handleConfigurationChange("selectedAgencyConnection", value)
        }
        emailConnections={(configuration.agenciaConnectionData || []).map(
          (connection) => connection.clientId
        )}
        action={openAddConnection}
        icon={<AgencyTributIcon />}
      />

      <TitleFormsComponent title="Envía Facturas automáticamente a tu portal de la Agencia Tributaria" />

      <NotificationsConfirmComponent
        mainState={configuration.notificateAfterExport || false}
        setMainState={(value) =>
          handleConfigurationChange("notificateAfterExport", value)
        }
        placeholder1="[email],..."
        placeholder2="[00000000],..."
        type1="Gmail"
        type2="WhatsApp"
        gmailTo={configuration.gmailTo || ""}
        setGmailTo={(value) => handleConfigurationChange("gmailTo", value)}
        gmailSubject={configuration.gmailSubject || ""}
        setGmailSubject={(value) =>
          handleConfigurationChange("gmailSubject", value)
        }
        gmailBody={configuration.gmailBody || ""}
        setGmailBody={(value) => handleConfigurationChange("gmailBody", value)}
        state1={configuration.notificateGmail || false}
        state1Value={configuration.gmailToNotificate || ""}
        setState1={(value) =>
          handleConfigurationChange("notificateGmail", value)
        }
        setState1Value={(value) =>
          handleConfigurationChange("gmailToNotificate", value)
        }
        state2={configuration.notificateWhatsApp || false}
        state2Value={configuration.whatsAppToNotificate || ""}
        setState2={(value) =>
          handleConfigurationChange("notificateWhatsApp", value)
        }
        setState2Value={(value) =>
          handleConfigurationChange("whatsAppToNotificate", value)
        }
        whatsAppMessage={configuration.whatsAppMessage || ""}
        setWhatsAppMessage={(value) =>
          handleConfigurationChange("whatsAppMessage", value)
        }
        title="Notificar tras la exportación"
        icons={[
          <GmailIcon style={{ width: 25 }} />,
          <WhatsAppIcon style={{ width: 25 }} />,
        ]}
      />

      <NotificationsConfirmComponent
        mainState={configuration.notificateAfterError || false}
        setMainState={(value) =>
          handleConfigurationChange("notificateAfterError", value)
        }
        placeholder1="[email],..."
        placeholder2="[00000000],..."
        type1="Gmail"
        type2="WhatsApp"
        gmailTo={configuration.errorGmailTo || ""}
        setGmailTo={(value) => handleConfigurationChange("errorGmailTo", value)}
        gmailSubject={configuration.errorGmailSubject || ""}
        setGmailSubject={(value) =>
          handleConfigurationChange("errorGmailSubject", value)
        }
        gmailBody={configuration.errorGmailBody || ""}
        setGmailBody={(value) =>
          handleConfigurationChange("errorGmailBody", value)
        }
        state1={configuration.notificateErrorGmail || false}
        state1Value={configuration.errorGmailToNotificate || ""}
        setState1={(value) =>
          handleConfigurationChange("notificateErrorGmail", value)
        }
        setState1Value={(value) =>
          handleConfigurationChange("errorGmailToNotificate", value)
        }
        state2={configuration.notificateErrorWhatsApp || false}
        state2Value={configuration.errorWhatsAppToNotificate || ""}
        setState2={(value) =>
          handleConfigurationChange("notificateErrorWhatsApp", value)
        }
        setState2Value={(value) =>
          handleConfigurationChange("errorWhatsAppToNotificate", value)
        }
        title="Notificar en el caso de detectar un error en la validación"
        whatsAppMessage={configuration.errorWhatsAppMessage || ""}
        setWhatsAppMessage={(value) =>
          handleConfigurationChange("errorWhatsAppMessage", value)
        }
        icons={[
          <GmailIcon style={{ width: 25 }} />,
          <WhatsAppIcon style={{ width: 25 }} />,
        ]}
      />

      {isAddConnection && (
        <ModalAddConnectionAgencyTribut
          close={closeAddConnection}
          addConnection={(connection) => {
            addConnection(connection);
            closeAddConnection();
          }}
        />
      )}
    </div>
  );
};

export default AgencyTributFormAutomate;
