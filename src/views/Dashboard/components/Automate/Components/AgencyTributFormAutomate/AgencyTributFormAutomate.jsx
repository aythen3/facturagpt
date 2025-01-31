import React, { useState } from "react";
import TitleFormsComponent from "../../shared/TitleFormsComponent";
import NotificationsConfirmComponent from "../../shared/NotificationsConfirmComponent";
import HeaderFormsComponent from "../../../HeadersFormsComponent/HeaderFormsComponent";
import ModalAddConnectionAgencyTribut from "./ModalAddConnectionAgencyTribut";

import CustomAutomationsWrapper from "../../../CustomAutomationsWrapper/CustomAutomationsWrapper";

import { ReactComponent as ArrowSquare } from "../../../../assets/whiteArrowSquareIn.svg";
import { ReactComponent as GrayChevron } from "../../../../assets/grayChevron.svg";
import { ReactComponent as WhiteFolder } from "../../../../assets/whiteFolder.svg";
import { ReactComponent as WhiteBolt } from "../../../../assets/whiteBolt.svg";
import { ReactComponent as WhiteClock } from "../../../../assets/whiteClock.svg";
import { ReactComponent as WhiteText } from "../../../../assets/whiteText.svg";
import { ReactComponent as WhiteCheck } from "../../../../assets/whiteCheck.svg";
import { ReactComponent as WhiteBell } from "../../../../assets/whiteBell.svg";
import { ReactComponent as GmailIcon } from "../../../../assets/gmail.svg";
import { ReactComponent as WhatsAppIcon } from "../../../../assets/whatsappIcon.svg";
import { ReactComponent as AgencyTributIcon } from "../../../../assets/agencia.svg";

import OptionsSwitchComponent from "../../../OptionsSwichComponent/OptionsSwitchComponent";

import CustomDropdown from "../../../CustomDropdown/CustomDropdown";


import styles from "./AgencyTributFormAutomate.module.css";


const AgencyTributFormAutomate = ({
  type,
  configuration,
  setConfiguration,
}) => {
  const [isAddConnection, setIsAddConnection] = useState(false);

  

  const [showContent, setShowContent] = useState({
    info1: false,
    info2: false,
    info3: false,
    info4: false,
    info5: false,
    info6: false,
    info7: false,
  })


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

      {/* <NotificationsConfirmComponent
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
      /> */}

<CustomAutomationsWrapper Icon={<WhiteBell />}>
        <div
          style={{ marginBottom: "20px" }}
          className={styles.infoContainerWrapper}
          onClick={() => setShowContent({ ...showContent, info6: !showContent.info6 })}
        >
          <div
            className={styles.infoContainer}
          >
            <div>Configura tus notificaciones personalizadas</div>
            <span>
              Recibe alertas en tiempo real para mantenerte informado sobre cada
              proceso.
            </span>
          </div>
          <OptionsSwitchComponent
            border={"none"}
            marginLeft={"auto"}
            isChecked={configuration.enableNotifications || false}
            setIsChecked={(value) =>
              handleConfigurationChange("enableNotifications", value)
            }
          />
        </div>
        <div
          className={`${styles.contentContainer} ${(showContent.info6) ? styles.active : styles.disabled}`}
        >
          <CustomAutomationsWrapper Icon={<WhiteCheck />}>
            <div
              style={{ marginBottom: "20px" }}
              className={styles.infoContainerWrapper}
            >
              <div className={styles.infoContainer}>
                <div>Notificar tras la exportación</div>
                <span>Configura donde quieres recibir la notificación</span>
              </div>
              <OptionsSwitchComponent
                border={"none"}
                marginLeft={"auto"}
                isChecked={configuration.notificateAfterExport || false}
                setIsChecked={(value) =>
                  handleConfigurationChange("notificateAfterExport", value)
                }
              />
            </div>
            <NotificationsConfirmComponent
              disableSwitch={true}
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
          </CustomAutomationsWrapper>
          <div style={{ marginTop: "20px" }}>
            <CustomAutomationsWrapper Icon={<WhiteBell />}>
              <div className={styles.infoContainerWrapper}>
                <div className={styles.infoContainer}>
                  <div>
                    Activa validaciones avanzadas para notificar posibles errores
                  </div>
                  <span>
                    Asegura la precisión de tus datos con alertas en caso de
                    inconsistencias.
                  </span>
                </div>
                <OptionsSwitchComponent
                  border={"none"}
                  marginLeft={"auto"}
                  isChecked={configuration.notificateErrors || false}
                  setIsChecked={(value) =>
                    handleConfigurationChange("notificateErrors", value)
                  }
                />
              </div>
            </CustomAutomationsWrapper>
          </div>
        </div>
      </CustomAutomationsWrapper>
      <CustomAutomationsWrapper Icon={<ArrowSquare />}>
        <div
          className={styles.infoContainerWrapper}
          onClick={() => setShowContent({ ...showContent, info7: !showContent.info7 })}
        >
          <div className={styles.infoContainer}>
            <div>Selecciona el destino de exportación</div>
            <span>Seleccionar estándar de exportación</span>
          </div>
          <OptionsSwitchComponent
            border={"none"}
            marginLeft={"auto"}
            isChecked={configuration.selectStandardExport || false}
            setIsChecked={(value) =>
              handleConfigurationChange("selectStandardExport", value)
            }
          />
        </div>
        <div
          className={`${styles.contentContainer} ${(showContent.info7) ? styles.active : styles.disabled}`}
        >
          <p
            style={{ marginBottom: "10px" }}
            className={styles.titleContentInput}
          >
            Formato del Archivo
          </p>
          <CustomDropdown
            options={["XML", "FacturaE", "UBL", "PEPPOL"]}
            selectedOption={configuration.selectedStandardExport || []}
            height="31px"
            textStyles={{
              fontWeight: 300,
              color: "#1E0045",
              fontSize: "13px",
              marginLeft: "6px",
              userSelect: "none",
            }}
            setSelectedOption={(selected) =>
              handleConfigurationChange("selectedStandardExport", selected)
            }
          />
        </div>
      </CustomAutomationsWrapper>
    


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
