import React, { useState } from "react";
import styles from "./Outlook.module.css";
import SearchSVG from "../../svgs/SearchSVG";
import WarningSVG from "../../svgs/WarningSVG";
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
import ModalAddConnectionOutlook from "./ModalAddConnectionOutlook";
import NotificationsConfirmComponent from "../../shared/NotificationsConfirmComponent";
import SelectLocation from "../../../SelectLocation/SelectLocation";
import CheckboxWithText from "../../../CheckboxWithText/CheckboxWithText";
import CustomDropdown from "../../../CustomDropdown/CustomDropdown";
import minusIcon from "../../../../assets/minusIcon.svg";
import AddEmailsInput from "../AddEmailsInput/AddEmailsInput";
import FileInputExport from "../FileInput/Export";
import FileInputImport from "../FileInput/Import";
import FileInputNotification from "../FileInput/Notification";

import CustomAutomationsWrapper from "../../../CustomAutomationsWrapper/CustomAutomationsWrapper";

import { ReactComponent as ArrowSquare } from "../../../../assets/whiteArrowSquareIn.svg";
import { ReactComponent as GrayChevron } from "../../../../assets/grayChevron.svg";
import { ReactComponent as WhiteFolder } from "../../../../assets/whiteFolder.svg";
import { ReactComponent as WhiteBolt } from "../../../../assets/whiteBolt.svg";
import { ReactComponent as WhiteClock } from "../../../../assets/whiteClock.svg";
import { ReactComponent as WhiteText } from "../../../../assets/whiteText.svg";
import { ReactComponent as WhiteCheck } from "../../../../assets/whiteCheck.svg";
import { ReactComponent as WhiteBell } from "../../../../assets/whiteBell.svg";
import { ReactComponent as GmailIcon } from "../../../../assets/gmailwithoutbg.svg";
import { ReactComponent as OutlookIcon } from "../../../../assets/outlook.svg";
import { ReactComponent as WhatsAppIcon } from "../../../../assets/whatsappIcon.svg";
import Advertency from "../Advertency/Advertency";
// import EditableInput from "../../../AccountSettings/EditableInput/EditableInput";
import SelectInfoToProcess from "../FileInput/selectInfoToProcces/SelectInfoToProcess";
import EditableInput from "../FileInput/Input";

const Outlook = ({
  type,
  configuration,
  setConfiguration,
  setShowSelectCurrencyPopup,
  setSelectedCurrency,
  selectedCurrency,
}) => {
  const [showSelectLocation, setShowSelectLocation] = useState(false);
  const [showAddConnection, setShowAddConnection] = useState(false);
  const [showSelectOutputLocation, setShowSelectOutputLocation] =
    useState(false);
  const [showContent, setShowContent] = useState({
    info1: false,
    info2: false,
    info3: false,
    info4: false,
    info5: false,
    info6: false,
    info7: false,
  });

  const handleConfigurationChange = (key, value) => {
    setConfiguration((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const addConnection = (connection) => {
    const updatedConnections = [
      ...(configuration?.emailConnectionData || []),
      connection,
    ];
    handleConfigurationChange("emailConnectionData", updatedConnections);
    if (!configuration?.selectedEmailConnection) {
      handleConfigurationChange("selectedEmailConnection", connection.email);
    }
  };

  return (
    <div>
      <HeaderFormsComponent
        selectedEmailConnection={configuration?.selectedEmailConnection}
        setSelectedEmailConnection={(value) =>
          handleConfigurationChange("selectedEmailConnection", value)
        }
        // emailConnections={(configuration?.emailConnectionData || []).map(
        //   (connection) => connection.email
        // )}
        action={() => setShowAddConnection(true)}
        icon={type === "Outlook" ? <OutlookIcon /> : <GmailIcon />}
      />
      <TitleFormsComponent type={type} title="Sube tus facturas de" />
      <div className={styles.gmailoutlookContainer}>
        <EditableInput
          label={"Nombre de la Automatización"}
          // value={userData?.nombre}
          name="automatization"
          // onSave={handleChange}
          placeholder="Automatización 1"
          options={true}
          readOnly={false}
          configuration={configuration}
          handleConfigurationChange={handleConfigurationChange}
        />
        <SelectInfoToProcess
          setShowSelectCurrencyPopup={setShowSelectCurrencyPopup}
          setSelectedCurrency={setSelectedCurrency}
          selectedCurrency={selectedCurrency}
          configuration={configuration}
          setConfiguration={setConfiguration}
          handleConfigurationChange={handleConfigurationChange}
        />
        {/* <CustomAutomationsWrapper Icon={<WhiteClock />}>
          <div className={styles.infoContainerWrapper}>
            <div
              className={styles.infoContainer}
              onClick={() =>
                setShowContent({ ...showContent, info3: !showContent.info3 })
              }
            >
              <div>
                Selecciona la frecuencia del tiempo que se ejecutará la acción
              </div>
              <span>
                Si no se marca esta opción se ejecutara siempre y de forma
                inmediata
              </span>
            </div>

            <OptionsSwitchComponent
              border={"none"}
              marginLeft={"auto"}
              isChecked={configuration?.actionFrequency || false}
              setIsChecked={(value) =>
                handleConfigurationChange("actionFrequency", value)
              }
            />
          </div>
          <div
            className={`${styles.contentContainer} ${configuration?.actionFrequency ? styles.active : styles.disabled}`}
          >
            <CustomDropdown
              options={[
                "Inmediatamente",
                "5 Minutos",
                "10 Minutos",
                "30 Minutos",
                "1 Hora",
                "3 Horas",
                "6  Horas",
                "12 Horas",
                "1 Día",
              ]}
              selectedOption={configuration?.selectedActionFrequency || []}
              height="31px"
              textStyles={{
                fontWeight: 300,
                color: "#1E0045",
                fontSize: "13px",
                marginLeft: "6px",
                userSelect: "none",
              }}
              setSelectedOption={(selected) =>
                handleConfigurationChange("selectedActionFrequency", selected)
              }
            />
          </div>
        </CustomAutomationsWrapper> */}
        <FileInputImport
          handleConfigurationChange={handleConfigurationChange}
          configuration={configuration}
          setShowSelectOutputLocation={setShowSelectOutputLocation}
        />
        <FileInputExport
          configuration={configuration}
          handleConfigurationChange={handleConfigurationChange}
        />
        {/* <CustomAutomationsWrapper Icon={<WhiteBolt />}>
          <div
            className={styles.infoContainerWrapper}
            onClick={() =>
              setShowContent({ ...showContent, info4: !showContent.info4 })
            }
          >
            <div className={styles.infoContainer}>
              <div>Modifica el Estado a los Documentos Procesados</div>
            </div>
            <OptionsSwitchComponent
              border={"none"}
              marginLeft={"auto"}
              isChecked={configuration?.documentStatus || false}
              setIsChecked={(value) =>
                handleConfigurationChange("documentStatus", value)
              }
            />
          </div>
          <div
            className={`${styles.contentContainer} ${configuration?.documentStatus ? styles.active : styles.disabled}`}
          >
            <CustomDropdown
              options={["Pendiente", "Finalizado", "Anulado"]}
              selectedOption={configuration?.selectedDocumentStatus || []}
              height="31px"
              textStyles={{
                fontWeight: 300,
                color: "#1E0045",
                fontSize: "13px",
                marginLeft: "6px",
                userSelect: "none",
              }}
              setSelectedOption={(selected) =>
                handleConfigurationChange("selectedDocumentStatus", selected)
              }
            />
          </div>
        </CustomAutomationsWrapper> */}
        {/* <CustomAutomationsWrapper Icon={<WhiteFolder />}>
        <div style={{ display: "grid", gap: "10px" }}>
          <OptionsSwitchComponent
            isChecked={configuration?.changeFileName || false}
            setIsChecked={(value) =>
              handleConfigurationChange("changeFileName", value)
            }
            // icon={<TextSVG />}
            text="Cambiar nombre del archivo"
          />
          <InputComponent
            placeholder="[fecha]-[empresa]-[importe]-[etiqueta]"
            typeInput="text"
            value={configuration?.fileName || ""}
            setValue={(value) => handleConfigurationChange("fileName", value)}
          />
        </div>
      </CustomAutomationsWrapper> */}
        {/* <CustomAutomationsWrapper Icon={<WhiteText />}>
          <div className={styles.infoContainerWrapper}>
            <div
              className={styles.infoContainer}
              onClick={() =>
                setShowContent({ ...showContent, info5: !showContent.info5 })
              }
            >
              <div>Renombra automáticamente tus archivos</div>
              <span>
                Configura nombres claros y personalizados para mantener todo
                organizado.
              </span>
            </div>
            <OptionsSwitchComponent
              border={"none"}
              marginLeft={"auto"}
              isChecked={configuration?.renameFiles || false}
              setIsChecked={(value) =>
                handleConfigurationChange("renameFiles", value)
              }
            />
          </div>
          <div
            className={`${styles.contentContainer} ${configuration?.renameFiles ? styles.active : styles.disabled}`}
          >
            <InputComponent
              placeholder="Escribe [id], [title], [date], [totalamount], [contactid], [category] para personalizar los documentos subidos"
              typeInput="text"
              value={configuration?.fileName || ""}
              setValue={(value) => handleConfigurationChange("fileName", value)}
            />
          </div>
        </CustomAutomationsWrapper> */}
        {/* <CustomAutomationsWrapper Icon={<WhiteFolder />}>
          <div
            className={styles.infoContainerWrapper}
            onClick={() =>
              setShowContent({ ...showContent, info1: !showContent.info1 })
            }
          >
            <GrayChevron />
            <div className={styles.infoContainer}>
              <div>Decide dónde guardar los documentos procesados</div>
              <span>
                Elige una ubicación en FacturaGPT para organizar tus archivos
                procesados
              </span>
            </div>
          </div>
          <div
            className={`${styles.contentContainer} ${showContent.info1 ? styles.active : styles.disabled}`}
          >
            <div className={styles.contentInput}>
              <p className={styles.titleContentInput}>Ubicación</p>

              <InputComponent
                readOnly={true}
                value={configuration?.folderLocation}
                setValue={(value) =>
                  handleConfigurationChange("folderLocation", value)
                }
                textButton="Seleccionar Ubicación"
                placeholder="/Inicio"
                icon={<SearchSVG />}
                action={() => setShowSelectOutputLocation(true)}
              />
            </div>
          </div>
        </CustomAutomationsWrapper> */}
        {/* <CustomAutomationsWrapper Icon={<WhiteBell />}>
          <div
            className={styles.infoContainerWrapper}
            onClick={() =>
              setShowContent({ ...showContent, info6: !showContent.info6 })
            }
          >
            <div className={styles.infoContainer}>
              <div>Configura tus notificaciones personalizadas</div>
              <span>
                Recibe alertas en tiempo real para mantenerte informado sobre
                cada proceso.
              </span>
            </div>
            <OptionsSwitchComponent
              border={"none"}
              marginLeft={"auto"}
              isChecked={configuration?.enableNotifications || false}
              setIsChecked={(value) =>
                handleConfigurationChange("enableNotifications", value)
              }
            />
          </div>
          <div
            className={`${styles.contentContainer} ${configuration?.enableNotifications ? styles.active : styles.disabled}`}
          >
            <CustomAutomationsWrapper Icon={<WhiteCheck />}>
              <div className={styles.infoContainerWrapper}>
                <div className={styles.infoContainer}>
                  <div>Notificar tras la exportación</div>
                  <span>Configura donde quieres recibir la notificación</span>
                </div>
                <OptionsSwitchComponent
                  border={"none"}
                  marginLeft={"auto"}
                  isChecked={configuration?.notificateAfterExport || false}
                  setIsChecked={(value) =>
                    handleConfigurationChange("notificateAfterExport", value)
                  }
                />
              </div>
              <div
                className={`${styles.contentContainer} ${configuration?.notificateAfterExport ? styles.active : styles.disabled}`}
              >
                <NotificationsConfirmComponent
                  configuration={configuration}
                  icon={type === "Outlook" ? <OutlookIcon /> : <GmailIcon />}
                  disableSwitch={true}
                  mainState={configuration?.notificateAfterExport || false}
                  setMainState={(value) =>
                    handleConfigurationChange("notificateAfterExport", value)
                  }
                  placeholder1="[email],..."
                  placeholder2="Número de telefóno o nombre del contacto"
                  type1="Gmail"
                  type2="WhatsApp"
                  gmailTo={configuration?.gmailTo || ""}
                  setGmailTo={(value) =>
                    handleConfigurationChange("gmailTo", value)
                  }
                  gmailSubject={configuration?.gmailSubject || ""}
                  setGmailSubject={(value) =>
                    handleConfigurationChange("gmailSubject", value)
                  }
                  gmailBody={configuration?.gmailBody || ""}
                  setGmailBody={(value) =>
                    handleConfigurationChange("gmailBody", value)
                  }
                  state1={configuration?.notificateGmail || false}
                  state1Value={configuration?.gmailToNotificate || ""}
                  setState1={(value) =>
                    handleConfigurationChange("notificateGmail", value)
                  }
                  setState1Value={(value) =>
                    handleConfigurationChange("gmailToNotificate", value)
                  }
                  state2={configuration?.notificateWhatsApp || false}
                  state2Value={configuration?.whatsAppToNotificate || ""}
                  setState2={(value) =>
                    handleConfigurationChange("notificateWhatsApp", value)
                  }
                  setState2Value={(value) =>
                    handleConfigurationChange("whatsAppToNotificate", value)
                  }
                  whatsAppMessage={configuration?.whatsAppMessage || ""}
                  setWhatsAppMessage={(value) =>
                    handleConfigurationChange("whatsAppMessage", value)
                  }
                  title="Notificar tras la exportación"
                  icons={[
                    <GmailIcon style={{ width: 25 }} />,
                    <WhatsAppIcon style={{ width: 25 }} />,
                  ]}
                />{" "}
              </div>
            </CustomAutomationsWrapper>
            <div style={{ marginTop: "20px" }}>
              <CustomAutomationsWrapper Icon={<WhiteBell />}>
                <div className={styles.infoContainerWrapper}>
                  <div className={styles.infoContainer}>
                    <div>
                      Activa validaciones avanzadas para notificar posibles
                      errores
                    </div>
                    <span>
                      Asegura la precisión de tus datos con alertas en caso de
                      inconsistencias.
                    </span>
                  </div>
                  <OptionsSwitchComponent
                    border={"none"}
                    marginLeft={"auto"}
                    isChecked={configuration?.notificateErrors || false}
                    setIsChecked={(value) =>
                      handleConfigurationChange("notificateErrors", value)
                    }
                  />
                </div>
              </CustomAutomationsWrapper>
            </div>
          </div>
        </CustomAutomationsWrapper> */}
        <FileInputNotification
          type="Gmail"
          handleConfigurationChange={handleConfigurationChange}
          configuration={configuration}
        />
      </div>

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
        <ModalAddConnectionOutlook
          close={() => setShowAddConnection(false)}
          addConnection={addConnection}
        />
      )}
    </div>
  );
};

export default Outlook;
