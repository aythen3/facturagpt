import React, { useState } from "react";
import TitleFormsComponent from "../../shared/TitleFormsComponent";
import InputComponent from "../../../InputComponent/InputComponent";
import styles from "../GmailAndOutlookFormCreateAutomate/gmailAndOutlook.module.css";
import SearchSVG from "../../svgs/SearchSVG";
import { ReactComponent as GmailIcon } from "../../../../assets/gmail.svg";
import { ReactComponent as WhatsAppIcon } from "../../../../assets/whatsappIcon.svg";
import NotificationsConfirmComponent from "../../shared/NotificationsConfirmComponent";
import CustomDropdown from "../../../CustomDropdown/CustomDropdown";
import SelectLocation from "../../../SelectLocation/SelectLocation";
import { ReactComponent as GrayChevron } from "../../../../assets/grayChevron.svg";
import { ReactComponent as WhiteFolder } from "../../../../assets/whiteFolder.svg";
import { ReactComponent as WhiteBolt } from "../../../../assets/whiteBolt.svg";
import { ReactComponent as WhiteClock } from "../../../../assets/whiteClock.svg";
import { ReactComponent as WhiteText } from "../../../../assets/whiteText.svg";
import { ReactComponent as WhiteCheck } from "../../../../assets/whiteCheck.svg";
import { ReactComponent as ArrowSquare } from "../../../../assets/whiteArrowSquareIn.svg";
import { ReactComponent as WhiteBell } from "../../../../assets/whiteBell.svg";
import CustomAutomationsWrapper from "../../../CustomAutomationsWrapper/CustomAutomationsWrapper";
import OptionsSwitchComponent from "../../../OptionsSwichComponent/OptionsSwitchComponent";

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

      <CustomAutomationsWrapper Icon={<WhiteFolder />}>
        <div
          className={styles.infoContainerWrapper}
          onClick={() => setShowContent({ ...showContent, info2: !showContent.info2 })}
        >
          <GrayChevron />
          <div className={styles.infoContainer}>
            <div>
              Selecciona la información a extraer
            </div>
            <span>
              Aplica filtros avanzados para procesar solo los datos que realmente importan.
            </span>
          </div>
        </div>

        <p className={styles.title_content_input}>
          Campos a incluidos{" "}
          <span style={{ color: "#18181B", fontSize: "14px" }}>
            Nº Factura, Fecha de emisión, Datos del cliente (nombre, NIF,
            dirección), Desglose de impuestos (IVA, retenciones, etc.), Total de
            la factura{" "}
          </span>{" "}
        </p>
      </CustomAutomationsWrapper >


      <CustomAutomationsWrapper Icon={<WhiteFolder />}>
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
      </CustomAutomationsWrapper>
      <CustomAutomationsWrapper Icon={<WhiteFolder />}>
        <div className={styles.content_input}>
          <p className={styles.title_content_input}>
            Formato del Archivo XML{" "}
            <span style={{ color: "#18181B", fontSize: "14px" }}>
              Selecciona estándar de exportación
            </span>{" "}
          </p>
        </div>

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
      </CustomAutomationsWrapper>




      <CustomAutomationsWrapper Icon={<WhiteBell />}>
        <div
          style={{ marginBottom: "20px" }}
          className={styles.infoContainerWrapper}
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
          />
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
      </CustomAutomationsWrapper>
      <div style={{ marginTop: "20px" }}>
        <CustomAutomationsWrapper Icon={<ArrowSquare />}>
          <div className={styles.infoContainerWrapper}>
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
        </CustomAutomationsWrapper>
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
