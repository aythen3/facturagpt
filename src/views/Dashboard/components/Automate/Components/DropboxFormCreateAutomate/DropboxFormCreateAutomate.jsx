import React, { useState } from "react";
import TitleFormsComponent from "../../shared/TitleFormsComponent";
import styles from "../GmailAndOutlookFormCreateAutomate/gmailAndOutlook.module.css";
import { ReactComponent as DriveIcon } from "../../../../assets/drive.svg";
import SelectComponent from "../../../SelectComponent/SelectComponent";
import InputComponent from "../../../InputComponent/InputComponent";
import SearchSVG from "../../svgs/SearchSVG";
import CheckboxComponent from "../../shared/CheckboxComponent";
import OptionsSwitchComponent from "../../../OptionsSwichComponent/OptionsSwitchComponent";
import LabelSVG from "../../svgs/LabelSVG";
import TextSVG from "../../svgs/TextSVG";
import { ReactComponent as WhatsAppIcon } from "../../../../assets/whatsappIcon.svg";
import { ReactComponent as GmailIcon } from "../../../../assets/gmail.svg";
import { ReactComponent as DropboxIcon } from "../../../../assets/dropbox-icon.svg";
import HeaderFormsComponent from "../../../HeadersFormsComponent/HeaderFormsComponent";
import ModalAddConnectionDropbox from "./ModalAddConnectionDropbox";
import NotificationsConfirmComponent from "../../shared/NotificationsConfirmComponent";
import SelectLocation from "../../../SelectLocation/SelectLocation";
import CheckboxWithText from "../../../CheckboxWithText/CheckboxWithText";
import CustomDropdown from "../../../CustomDropdown/CustomDropdown";
import minusIcon from "../../../../assets/minusIcon.svg";

const DropboxFormCreateAutomate = ({
  type,
  configuration,
  setConfiguration,
}) => {
  const [showSelectLocation, setShowSelectLocation] = useState(false);
  const [showAddConnection, setShowAddConnection] = useState(false);

  const handleConfigurationChange = (key, value) => {
    setConfiguration((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const addConnection = (connection) => {
    console.log("adding connection", connection);
    const updatedConnections = [
      ...(configuration.dropboxConnectionData || []),
      connection,
    ];
    handleConfigurationChange("dropboxConnectionData", updatedConnections);
    if (!configuration.selectedDropboxConnection) {
      handleConfigurationChange(
        "selectedDropboxConnection",
        connection.clientId
      );
    }
  };

  return (
    <div>
      <HeaderFormsComponent
        placeholder="Añade una cuenta de Dropbox"
        selectedEmailConnection={configuration.selectedDropboxConnection}
        setSelectedEmailConnection={(value) =>
          handleConfigurationChange("selectedDropboxConnection", value)
        }
        emailConnections={(configuration.dropboxConnectionData || []).map(
          (connection) => connection.clientId
        )}
        action={() => setShowAddConnection(true)}
        icon={<DropboxIcon />}
      />
      <TitleFormsComponent title="Sube tus facturas de" type={type} />

      <div>
        <p>Ubicación</p>
        <InputComponent
          readOnly={true}
          value={configuration.folderLocation}
          setValue={(value) =>
            handleConfigurationChange("folderLocation", value)
          }
          textButton="Seleccionar Ubicación"
          placeholder="/Inicio"
          icon={<SearchSVG />}
          action={() => setShowSelectLocation(true)}
        />

        <div className={styles.content_input}>
          <p className={styles.title_content_input}>
            Título del archivo Contiene
          </p>

          <InputComponent
            value={configuration.filesKeyWords}
            setValue={(value) =>
              handleConfigurationChange("filesKeyWords", value)
            }
            placeholder="Palabras clave separadas por coma"
            typeInput="text"
          />
          <CheckboxWithText
            marginTop="10px"
            color="#10A37F"
            state={configuration.filesExactMatch || false}
            setState={(value) =>
              handleConfigurationChange("filesExactMatch", value)
            }
            text="Match exacto"
          />
        </div>

        <div className={styles.content_input}>
          <p className={styles.titleContentInput}>Tipos de Archivo</p>

          <CheckboxWithText
            marginTop="10px"
            color="#10A37F"
            state={configuration.allowAllFileTypes || false}
            setState={(value) =>
              handleConfigurationChange("allowAllFileTypes", value)
            }
            text="Incluir todos los tipos de archivos"
          />
          <div className={styles.cardTypesContainer}>
            {(configuration.selectedFileTypes || []).map((type) => (
              <div className={styles.singleTypeCard} key={type}>
                <span>{type}</span>
                <div
                  onClick={() =>
                    handleConfigurationChange(
                      "selectedFileTypes",
                      (configuration.selectedFileTypes || []).filter(
                        (option) => option !== type
                      )
                    )
                  }
                  className={styles.minusIcon}
                >
                  <img src={minusIcon} alt="minusIcon" />
                </div>
              </div>
            ))}
          </div>
          <CustomDropdown
            options={["PDF", "PNG", "JPG", "XML", "JSON", "HTML"]}
            selectedOption={configuration.selectedFileTypes || []}
            height="31px"
            textStyles={{
              fontWeight: 300,
              color: "#1E0045",
              fontSize: "13px",
              marginLeft: "6px",
              userSelect: "none",
            }}
            setSelectedOption={(selected) =>
              handleConfigurationChange(
                "selectedFileTypes",
                configuration.selectedFileTypes?.includes(selected)
                  ? configuration.selectedFileTypes.filter(
                      (option) => option !== selected
                    )
                  : [...(configuration.selectedFileTypes || []), selected]
              )
            }
          />
        </div>

        <div style={{ marginTop: "24px" }}>
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
              placeholder="[fecha]-[empresa]-[importe]-[etiqueta]"
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
        </div>
      </div>
      {showSelectLocation && (
        <SelectLocation
          onClose={() => setShowSelectLocation(false)}
          pickLocation={(location) => {
            console.log("location", location);
            handleConfigurationChange("folderLocation", location);
          }}
        />
      )}
      {showAddConnection && (
        <ModalAddConnectionDropbox
          close={() => setShowAddConnection(false)}
          addConnection={addConnection}
        />
      )}
    </div>
  );
};

export default DropboxFormCreateAutomate;
