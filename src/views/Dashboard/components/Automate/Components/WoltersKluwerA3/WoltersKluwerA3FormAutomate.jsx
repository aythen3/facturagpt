import React, { useState } from "react";
import TitleFormsComponent from "../../shared/TitleFormsComponent";
import InputComponent from "../../../InputComponent/InputComponent";
import styles from "../GmailAndOutlookFormCreateAutomate/gmailAndOutlook.module.css";
import SearchSVG from "../../svgs/SearchSVG";
import OptionsSwitchComponent from "../../../OptionsSwichComponent/OptionsSwitchComponent";
import { ReactComponent as GmailIcon } from "../../../../assets/gmail.svg";
import { ReactComponent as WoltersKluwerA3Icon } from "../../../../assets/wolters-icon.svg";
import { ReactComponent as WhatsAppIcon } from "../../../../assets/whatsappIcon.svg";
import NotificationsConfirmComponent from "../../shared/NotificationsConfirmComponent";
import CustomDropdown from "../../../CustomDropdown/CustomDropdown";
import SelectLocation from "../../../SelectLocation/SelectLocation";
import TextSVG from "../../svgs/TextSVG";
import HeaderFormsComponent from "../../../HeadersFormsComponent/HeaderFormsComponent";
import ModalAddConnectionWoltersKluwerA3 from "./ModalAddConnectionWoltersKluwerA3";

const WoltersKluwerA3FormAutomate = ({
  type,
  configuration,
  setConfiguration,
}) => {
  const [showAddConnection, setShowAddConnection] = useState(false);
  const [showSelectInputLocation, setShowSelectInputLocation] = useState(false);
  const [showSelectOutputLocation, setShowSelectOutputLocation] =
    useState(false);
  const handleConfigurationChange = (key, value) => {
    setConfiguration((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const addConnection = (connection) => {
    console.log("adding Wolters connection", connection);
    const updatedConnections = [
      ...(configuration.woltersConnectionData || []),
      connection,
    ];
    console.log("setting woltersConnectionData", updatedConnections);
    handleConfigurationChange("woltersConnectionData", updatedConnections);
    if (!configuration.selectedWoltersConnection) {
      handleConfigurationChange(
        "selectedWoltersConnection",
        connection.clientId
      );
    }
  };

  return (
    <div>
      <HeaderFormsComponent
        placeholder="Añade una cuenta de Wolters Kluwer A3"
        selectedEmailConnection={configuration.selectedWoltersConnection}
        setSelectedEmailConnection={(value) =>
          handleConfigurationChange("selectedWoltersConnection", value)
        }
        emailConnections={(configuration.woltersConnectionData || []).map(
          (connection) => connection.clientId
        )}
        action={() => setShowAddConnection(true)}
        icon={<WoltersKluwerA3Icon />}
      />
      <TitleFormsComponent title="Exporta Facturas a Wolters Kluwer A3" />
      <TitleFormsComponent title="Input" />
      <div style={{ marginTop: "-10px" }} className={styles.content_input}>
        <p className={styles.title_content_input}>
          Ubicación{" "}
          <span style={{ color: "#18181B", fontSize: "12px" }}>
            Configura la ubicación donde Wolters Kluwer guardará los documentos
          </span>{" "}
        </p>

        <InputComponent
          readOnly={true}
          value={configuration.filesSource}
          setValue={(value) => handleConfigurationChange("filesSource", value)}
          textButton="Seleccionar Ubicación"
          placeholder="/Inicio"
          icon={<SearchSVG />}
          action={() => setShowSelectInputLocation(true)}
        />
      </div>
      <TitleFormsComponent title="Output" />
      <div style={{ marginTop: "-10px" }} className={styles.content_input}>
        <p className={styles.title_content_input}>
          Ubicación{" "}
          <span style={{ color: "#18181B", fontSize: "12px" }}>
            Configura la ubicación de Factura GPT para exportar los documentos a
            Wolters Kluwer
          </span>{" "}
        </p>

        <InputComponent
          readOnly={true}
          value={configuration.folderLocation}
          setValue={(value) =>
            handleConfigurationChange("folderLocation", value)
          }
          textButton="Seleccionar Ubicación"
          placeholder="/Inicio"
          icon={<SearchSVG />}
          action={() => setShowSelectOutputLocation(true)}
        />
      </div>

      <div className={styles.content_input}>
        <p className={styles.title_content_input}>
          Formato del Archivo{" "}
          <span style={{ color: "#18181B", fontSize: "12px" }}>
            Selecciona estándar de exportación
          </span>{" "}
        </p>

        <CustomDropdown
          options={["XML", "FacturaE", "UBL", "PEPPOL"]}
          selectedOption={configuration.formatType || []}
          height="31px"
          textStyles={{
            fontWeight: 300,
            color: "#1E0045",
            fontSize: "13px",
            marginLeft: "6px",
            userSelect: "none",
          }}
          setSelectedOption={(selected) =>
            handleConfigurationChange("formatType", selected)
          }
        />
        <p className={styles.title_content_input}>
          Campos a incluidos{" "}
          <span style={{ color: "#18181B", fontSize: "12px" }}>
            Nº Factura, Fecha de emisión, Datos del cliente (nombre, NIF,
            dirección), Desglose de impuestos (IVA, retenciones, etc.), Total de
            la factura{" "}
          </span>{" "}
        </p>

        <div style={{ display: "grid", gap: "10px" }}>
          <OptionsSwitchComponent
            isChecked={configuration.changeFileName || false}
            setIsChecked={(value) =>
              handleConfigurationChange("changeFileName", value)
            }
            icon={<TextSVG />}
            text="Cambiar nombre del archivo"
          />
          <InputComponent
            placeholder="Escribe [id], [title], [date], [totalamount], [contactid], [category] para personalizar los documentos subidos"
            typeInput="text"
            value={configuration.fileName || ""}
            setValue={(value) => handleConfigurationChange("fileName", value)}
          />
        </div>

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
          setGmailBody={(value) =>
            handleConfigurationChange("gmailBody", value)
          }
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
          setGmailTo={(value) =>
            handleConfigurationChange("errorGmailTo", value)
          }
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
      </div>
      {showSelectInputLocation && (
        <SelectLocation
          onClose={() => setShowSelectInputLocation(false)}
          pickLocation={(location) => {
            console.log("location", location);
            handleConfigurationChange("filesSource", location);
          }}
        />
      )}
      {showSelectOutputLocation && (
        <SelectLocation
          onClose={() => setShowSelectOutputLocation(false)}
          pickLocation={(location) => {
            console.log("location", location);
            handleConfigurationChange("folderLocation", location);
          }}
        />
      )}
      {showAddConnection && (
        <ModalAddConnectionWoltersKluwerA3
          close={() => setShowAddConnection(false)}
          addConnection={(connection) => {
            addConnection(connection);
            setShowAddConnection(false);
          }}
        />
      )}
    </div>
  );
};

export default WoltersKluwerA3FormAutomate;
