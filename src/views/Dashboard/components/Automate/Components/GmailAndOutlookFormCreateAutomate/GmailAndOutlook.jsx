import React, { useState } from "react";
import styles from "./gmailAndOutlook.module.css";
import SearchSVG from "../../svgs/SearchSVG";
import WarningSVG from "../../svgs/WarningSVG";
import { ReactComponent as GmailIcon } from "../../../../assets/gmail.svg";
import { ReactComponent as OutlookIcon } from "../../../../assets/outlook.svg";
import { ReactComponent as WhatsAppIcon } from "../../../../assets/whatsappIcon.svg";
import SelectComponent from "../../../SelectComponent/SelectComponent";
import CheckboxComponent from "../../shared/CheckboxComponent";
import OptionsSwitchComponent from "../../../OptionsSwichComponent/OptionsSwitchComponent";
import TextSVG from "../../svgs/TextSVG";
import LabelSVG from "../../svgs/LabelSVG";
import NotificationsSVG from "../../svgs/NotificationsSVG";
import InputComponent from "../../../InputComponent/InputComponent";
import TitleFormsComponent from "../../shared/TitleFormsComponent";
import HeaderFormsComponent from "../../../HeadersFormsComponent/HeaderFormsComponent";
import AddConnectionModal from "../AddConenctionModal/AddConnectionModal";
import LabelInputComponent from "../../../LabelInputComponent/LabelInputComponent";
import ModalAddConnectionGmailAndOutlook from "./ModalAddConnectionGmailAndOutlook";
import NotificationsConfirmComponent from "../../shared/NotificationsConfirmComponent";
import SelectLocation from "../../../SelectLocation/SelectLocation";
import CheckboxWithText from "../../../CheckboxWithText/CheckboxWithText";
import CustomDropdown from "../../../CustomDropdown/CustomDropdown";
import minusIcon from "../../../../assets/minusIcon.svg";
import AddEmailsInput from "../AddEmailsInput/AddEmailsInput";

const GmailAndOutlook = ({ type, configuration, setConfiguration }) => {
  const [showSelectLocation, setShowSelectLocation] = useState(false);
  const [showAddConnection, setShowAddConnection] = useState(false);

  const handleConfigurationChange = (key, value) => {
    setConfiguration((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const addConnection = (connection) => {
    const updatedConnections = [
      ...(configuration.emailConnectionData || []),
      connection,
    ];
    handleConfigurationChange("emailConnectionData", updatedConnections);
    if (!configuration.selectedEmailConnection) {
      handleConfigurationChange("selectedEmailConnection", connection.email);
    }
  };

  return (
    <div>
      <HeaderFormsComponent
        selectedEmailConnection={configuration.selectedEmailConnection}
        setSelectedEmailConnection={(value) =>
          handleConfigurationChange("selectedEmailConnection", value)
        }
        emailConnections={(configuration.emailConnectionData || []).map(
          (connection) => connection.email
        )}
        action={() => setShowAddConnection(true)}
        icon={type === "Outlook" ? <OutlookIcon /> : <GmailIcon />}
      />
      <TitleFormsComponent type={type} title="Sube tus facturas de" />

      <div>
        <p>
          Ubicación{" "}
          <span>Configura la ubicación donde Gmail guardará los datos</span>
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
          action={() => setShowSelectLocation(true)}
        />

        <div className={styles.contentInput}>
          <p className={styles.titleContentInput}>Remitentes</p>

          <AddEmailsInput
            addedEmails={configuration.addedRemitents || []}
            setAddedEmails={(value) =>
              handleConfigurationChange("addedRemitents", value)
            }
            placeholder="ejemplo@email.com"
          />
          <CheckboxWithText
            color="#10A37F"
            marginTop="10px"
            state={configuration.includeAllRemitents || false}
            setState={(value) =>
              handleConfigurationChange("includeAllRemitents", value)
            }
            text="Incluir todos los remitentes"
          />
        </div>

        <div className={styles.contentInput}>
          <p className={styles.titleContentInput}>Asunto Contine</p>

          <InputComponent
            value={configuration.subjectKeyWords}
            setValue={(value) =>
              handleConfigurationChange("subjectKeyWords", value)
            }
            placeholder="Palabras clave separadas por coma"
            typeInput="text"
          />

          <CheckboxWithText
            marginTop="10px"
            color="#10A37F"
            state={configuration.subjectExactMatch || false}
            setState={(value) =>
              handleConfigurationChange("subjectExactMatch", value)
            }
            text="Match exacto"
          />
        </div>

        <div className={styles.contentInput}>
          <p className={styles.titleContentInput}>Mensaje Contine</p>
          <InputComponent
            value={configuration.bodyKeyWords}
            setValue={(value) =>
              handleConfigurationChange("bodyKeyWords", value)
            }
            placeholder="Palabras clave separadas por coma"
            typeInput="text"
          />

          <CheckboxWithText
            color="#10A37F"
            marginTop="10px"
            state={configuration.bodyExactMatch || false}
            setState={(value) =>
              handleConfigurationChange("bodyExactMatch", value)
            }
            text="Match exacto"
          />
        </div>

        <div className={styles.contentInput}>
          <p className={styles.titleContentInput}>Attachment Type</p>

          <CheckboxWithText
            marginTop="10px"
            color="#10A37F"
            state={configuration.attachmentExactMatch || false}
            setState={(value) =>
              handleConfigurationChange("attachmentExactMatch", value)
            }
            text="Incluir todos los tipos de archivos"
          />
          <div className={styles.cardTypesContainer}>
            {(configuration.selectedTypes || []).map((type) => (
              <div className={styles.singleTypeCard} key={type}>
                <span>{type}</span>
                <div
                  onClick={() =>
                    handleConfigurationChange(
                      "selectedTypes",
                      (configuration.selectedTypes || []).filter(
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
            selectedOption={configuration.selectedTypes || []}
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
                "selectedTypes",
                configuration.selectedTypes?.includes(selected)
                  ? configuration.selectedTypes.filter(
                      (option) => option !== selected
                    )
                  : [...(configuration.selectedTypes || []), selected]
              )
            }
          />
          <div className={styles.advertency}>
            <WarningSVG />
            <p>
              Si el correo no tiene archivos adjuntos no se guardará ninguna
              factura
            </p>
          </div>
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
          <div style={{ display: "grid", gap: "10px", marginTop: "10px" }}>
            <OptionsSwitchComponent
              isChecked={configuration.addTags || false}
              setIsChecked={(value) =>
                handleConfigurationChange("addTags", value)
              }
              icon={<LabelSVG />}
              text="Añadir etiqueta"
            />
            <InputComponent
              placeholder="Buscar etiqueta"
              typeInput="text"
              textButton="Crear"
              value={configuration.tags || ""}
              setValue={(value) => handleConfigurationChange("tags", value)}
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
        <ModalAddConnectionGmailAndOutlook
          close={() => setShowAddConnection(false)}
          addConnection={addConnection}
        />
      )}
    </div>
  );
};

export default GmailAndOutlook;
