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
import CheckboxWithText from "../../../CheckboxWithText/CheckboxWithText";

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

  const [showContent, setShowContent] = useState({
    info1: false,
    info2: false,
    info3: false,
    info4: false,
    info5: false,
    info6: false,
    info7: false,
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <TitleFormsComponent title="Genera Archivos" type={type} />
      {/* <div>
        <p>Nombre del archivo</p>
        <InputComponent
          value={configuration.fileName}
          setValue={(value) => handleConfigurationChange("fileName", value)}
          placeholder="[fecha]-[empresa]-[importe]-[etiqueta]"
        />
      </div> */}

      {/* <CustomAutomationsWrapper Icon={<WhiteFolder />}>
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
      </div> */}
      <div>
        <p style={{ margin: "0" }}>Nombre de la automatización</p>
        <input type="text" placeholder="Automatización 1" />
      </div>
      <CustomAutomationsWrapper Icon={<ArrowSquare />}>
        <div
          className={styles.infoContainerWrapper}
          onClick={() =>
            setShowContent({ ...showContent, info1: !showContent.info1 })
          }
        >
          <GrayChevron />
          <div className={styles.infoContainer}>
            <div>Selecciona la información a procesar</div>
            <span>
              Conecta la fuente de facturas de FTP desde la cual se subirán a
              FacturaGPT.
            </span>
          </div>
        </div>
        <div
          className={`${styles.contentContainer} ${showContent.info1 ? styles.active : styles.disabled}`}
        >
          <div className={styles.contentInput}>
            <p className={styles.titleContentInput}>Fuente de Datos</p>

            <InputComponent
              readOnly={true}
              value={configuration.filesSource}
              setValue={(value) =>
                handleConfigurationChange("filesSource", value)
              }
              textButton="Seleccionar Ubicación"
              placeholder="/FTP"
              icon={<SearchSVG />}
              action={() => setShowSelectInputLocation(true)}
            />
          </div>

          <p className={styles.titleContentInput}>Campos incluidos</p>
          <span className={styles.subtitleContentInput}>
            ID, Fechas, Datos de contacto (nombre, NIF, dirección), Desglose de
            impuestos (IVA, retenciones, etc.), Total, y más parámetros...
          </span>
        </div>
      </CustomAutomationsWrapper>
      <CustomAutomationsWrapper Icon={<WhiteClock />}>
        <div
          style={{ marginBottom: "20px" }}
          className={styles.infoContainerWrapper}
        >
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
            isChecked={configuration.actionFrequency || false}
            setIsChecked={(value) =>
              handleConfigurationChange("actionFrequency", value)
            }
          />
        </div>
        <div
          className={`${styles.contentContainer} ${showContent.info3 ? styles.active : styles.disabled}`}
        >
          <CustomDropdown
            options={["Imediatamente", "5 Minutos", "10 Minutos"]}
            selectedOption={configuration.selectedActionFrequency || []}
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
      </CustomAutomationsWrapper>
      <CustomAutomationsWrapper Icon={<WhiteBolt />}>
        <div
          style={{ marginBottom: "20px" }}
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
            isChecked={configuration.documentStatus || false}
            setIsChecked={(value) =>
              handleConfigurationChange("documentStatus", value)
            }
          />
        </div>
        <div
          className={`${styles.contentContainer} ${showContent.info4 ? styles.active : styles.disabled}`}
        >
          <CustomDropdown
            options={["Pendiente", "Finalizado", "Anulado"]}
            selectedOption={configuration.selectedDocumentStatus || []}
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
      </CustomAutomationsWrapper>
      <CustomAutomationsWrapper Icon={<WhiteText />}>
        <div
          style={{ marginBottom: "20px" }}
          className={styles.infoContainerWrapper}
        >
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
            isChecked={configuration.renameFiles || false}
            setIsChecked={(value) =>
              handleConfigurationChange("renameFiles", value)
            }
          />
        </div>
        <div
          className={`${styles.contentContainer} ${showContent.info5 ? styles.active : styles.disabled}`}
        >
          <InputComponent
            placeholder="Escribe [id], [title], [date], [totalamount], [contactid], [category] para personalizar los documentos subidos"
            typeInput="text"
            value={configuration.fileName || ""}
            setValue={(value) => handleConfigurationChange("fileName", value)}
          />
        </div>
      </CustomAutomationsWrapper>
      <CustomAutomationsWrapper Icon={<ArrowSquare />}>
        <div
          className={styles.infoContainerWrapper}
          onClick={() =>
            setShowContent({ ...showContent, info1: !showContent.info1 })
          }
        >
          <GrayChevron />
          <div className={styles.infoContainer}>
            <div>Selecciona la información a procesar</div>
            <span>
              Conecta la fuente de facturas de FTP desde la cual se subirán a
              FacturaGPT.
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
              value={configuration.filesSource}
              setValue={(value) =>
                handleConfigurationChange("filesSource", value)
              }
              textButton="Seleccionar Ubicación"
              placeholder="/FTP"
              icon={<SearchSVG />}
              action={() => setShowSelectInputLocation(true)}
            />
          </div>
        </div>
      </CustomAutomationsWrapper>
      <CustomAutomationsWrapper Icon={<WhiteBell />}>
        <div
          style={{ marginBottom: "20px" }}
          className={styles.infoContainerWrapper}
          onClick={() =>
            setShowContent({ ...showContent, info6: !showContent.info6 })
          }
        >
          <div className={styles.infoContainer}>
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
          className={`${styles.contentContainer} ${showContent.info6 ? styles.active : styles.disabled}`}
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
        </div>
      </CustomAutomationsWrapper>
      <CustomAutomationsWrapper Icon={<ArrowSquare />}>
        <div
          className={styles.infoContainerWrapper}
          onClick={() =>
            setShowContent({ ...showContent, info7: !showContent.info7 })
          }
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
          className={`${styles.contentContainer} ${showContent.info7 ? styles.active : styles.disabled}`}
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
