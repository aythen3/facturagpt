import React, { useState } from "react";
import TitleFormsComponent from "../../shared/TitleFormsComponent";
import InputComponent from "../../../InputComponent/InputComponent";
import styles from "../GmailAndOutlookFormCreateAutomate/gmailAndOutlook.module.css";
import CheckboxComponent from "../../shared/CheckboxComponent";
import SearchSVG from "../../svgs/SearchSVG";
import SelectComponent from "../../../SelectComponent/SelectComponent";
import OptionsSwitchComponent from "../../../OptionsSwichComponent/OptionsSwitchComponent";
import { ReactComponent as GmailIcon } from "../../../../assets/gmail.svg";
import { ReactComponent as WhatsAppIcon } from "../../../../assets/whatsappIcon.svg";
import NotificationsSVG from "../../svgs/NotificationsSVG";
import NotificationsConfirmComponent from "../../shared/NotificationsConfirmComponent";
import CustomDropdown from "../../../CustomDropdown/CustomDropdown";
import SelectLocation from "../../../SelectLocation/SelectLocation";

const XmlFormAutomate = ({ type, configuration, setConfiguration }) => {
  const [showSelectInputLocation, setShowSelectInputLocation] = useState(false);
  const [showSelectOutputLocation, setShowSelectOutputLocation] =
    useState(false);
  const handleConfigurationChange = (key, value) => {
    setConfiguration((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  return (
    <div>
      <TitleFormsComponent title="Genera Archivos" type={type} />
      <div>
        <p>Nombre del archivo</p>
        <InputComponent
          value={configuration.fileName}
          setValue={(value) => handleConfigurationChange("fileName", value)}
          placeholder="[fecha]-[empresa]-[importe]-[etiqueta]"
        />
      </div>
      <div className={styles.content_input}>
        <p className={styles.title_content_input}>
          Fuente de Datos{" "}
          <span style={{ color: "#18181B", fontSize: "12px" }}>
            Conecta la fuente de facturas desde la cual se generarán los XML
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
      <div className={styles.content_input}>
        <p className={styles.title_content_input}>
          Ubicación{" "}
          <span style={{ color: "#18181B", fontSize: "12px" }}>
            Configura la ubicación de Factura GPT donde se guardarán los
            archivos subidos
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
          Formato del Archivo XML{" "}
          <span style={{ color: "#18181B", fontSize: "14px" }}>
            Selecciona estándar de exportación
          </span>{" "}
        </p>

        <CustomDropdown
          options={["FacturaE", "UBL", "PEPPOL"]}
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
          Validaciones Automáticas{" "}
          <span style={{ color: "#18181B", fontSize: "14px" }}>
            Verifica la integridad de los datos antes de la generación.
          </span>{" "}
        </p>

        <p className={styles.title_content_input}>
          Campos a incluidos{" "}
          <span style={{ color: "#18181B", fontSize: "14px" }}>
            Nº Factura, Fecha de emisión, Datos del cliente (nombre, NIF,
            dirección), Desglose de impuestos (IVA, retenciones, etc.), Total de
            la factura{" "}
          </span>{" "}
        </p>

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
    </div>
  );
};

export default XmlFormAutomate;
