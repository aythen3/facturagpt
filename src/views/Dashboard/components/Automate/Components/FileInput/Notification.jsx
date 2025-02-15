import React, { useState } from "react";

import CustomAutomationsWrapper from "../../../CustomAutomationsWrapper/CustomAutomationsWrapper";

import styles from "./FileInput.module.css";


import AddEmailsInput from "../AddEmailsInput/AddEmailsInput";
import CheckboxWithText from "../../../CheckboxWithText/CheckboxWithText";
import InputComponent from "../../../InputComponent/InputComponent";
import CustomDropdown from "../../../CustomDropdown/CustomDropdown";

import OptionsSwitchComponent from "../../../OptionsSwichComponent/OptionsSwitchComponent";

import { ReactComponent as WhiteBolt } from "../../../../assets/whiteBolt.svg";
import { ReactComponent as WhiteBell } from "../../../../assets/whiteBell.svg";
import { ReactComponent as WhiteCheck } from "../../../../assets/whiteCheck.svg";
import NotificationsConfirmComponent from "../../shared/NotificationsConfirmComponent";

import { ReactComponent as GmailIcon } from "../../../../assets/gmailwithoutbg.svg";
import { ReactComponent as OutlookIcon } from "../../../../assets/outlook.svg";

import { ReactComponent as WhatsAppIcon } from "../../../../assets/whatsappIcon.svg";

const Notification = ({
    handleConfigurationChange,
    configuration,
    type
}) => {

    const [showContent, setShowContent] = useState({
        info4: false,
    });

    return (
        
      <CustomAutomationsWrapper Icon={<WhiteBell />}>
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
          isChecked={configuration.enableNotifications || false}
          setIsChecked={(value) =>
            handleConfigurationChange("enableNotifications", value)
          }
        />
      </div>
      <div
        className={`${styles.contentContainer} ${configuration.enableNotifications ? styles.active : styles.disabled}`}
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
              isChecked={configuration.notificateAfterExport || false}
              setIsChecked={(value) =>
                handleConfigurationChange("notificateAfterExport", value)
              }
            />
          </div>
          <div
            className={`${styles.contentContainer} ${configuration.notificateAfterExport ? styles.active : styles.disabled}`}
          >
            <NotificationsConfirmComponent
              configuration={configuration}
              icon={type === "Outlook" ? <OutlookIcon /> : <GmailIcon />}
              disableSwitch={true}
              mainState={configuration.notificateAfterExport || false}
              setMainState={(value) =>
                handleConfigurationChange("notificateAfterExport", value)
              }
              placeholder1="[email],..."
              placeholder2="Número de telefóno o nombre del contacto"
              type1="Gmail"
              type2="WhatsApp"
              gmailTo={configuration.gmailTo || ""}
              setGmailTo={(value) =>
                handleConfigurationChange("gmailTo", value)
              }
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
       
    )
}

export default Notification