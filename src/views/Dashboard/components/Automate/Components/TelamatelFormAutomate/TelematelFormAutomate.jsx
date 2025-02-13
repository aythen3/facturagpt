import React, { useState } from "react";
import HeaderFormsComponent from "../../../HeadersFormsComponent/HeaderFormsComponent";
import { ReactComponent as FTPIcon } from "../../../../assets/ftp.svg";
import ModalAddConnectionTelematal from "./ModalAddConnectionTelematel";
import TitleFormsComponent from "../../shared/TitleFormsComponent";
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
import styles from "./TelematelFormAutomate.module.css";
import InputComponent from "../../../InputComponent/InputComponent";
import SearchSVG from "../../svgs/SearchSVG";
import SelectLocation from "../../../SelectLocation/SelectLocation";
import CheckboxWithText from "../../../CheckboxWithText/CheckboxWithText";
import CustomDropdown from "../../../CustomDropdown/CustomDropdown";
import minusIcon from "../../../../assets/minusIcon.svg";
import OptionsSwitchComponent from "../../../OptionsSwichComponent/OptionsSwitchComponent";
import NotificationsConfirmComponent from "../../shared/NotificationsConfirmComponent";
import { ReactComponent as FrecuencyIcon } from "../../../../assets/frecuencyIcon.svg";
import EditableInput from "../../../AccountSettings/EditableInput/EditableInput";

const FTPFormAutomate = ({ type, configuration, setConfiguration }) => {
  const [showAddConnection, setShowAddConnection] = useState(false);
  const [showSelectInputLocation, setShowSelectInputLocation] = useState(false);
  const [showSelectOutputLocation, setShowSelectOutputLocation] =
    useState(false);

  const addConnection = (connection) => {
    console.log("adding FTP connection", connection);
    const updatedConnections = [
      ...(configuration.telematelConnectionData || []),
      connection,
    ];
    console.log("setting telematelConnectionData", updatedConnections);
    handleConfigurationChange("ftpConnectionData", updatedConnections);
    if (!configuration.selectedTelematelConnection) {
      handleConfigurationChange("selectedFTPConnection", connection.clientId);
    }
  };

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
    <div className={styles.sectionWrapper}>
      <HeaderFormsComponent
        placeholder="Añade conexión Telematel"
        selectedEmailConnection={configuration.selectedTelematelConnection}
        setSelectedEmailConnection={(value) =>
          handleConfigurationChange("selectedTelematelConnection", value)
        }
        emailConnections={(configuration.telematelConnectionData || []).map(
          (connection) => connection.clientId
        )}
        action={() => setShowAddConnection(true)}
        icon={<FTPIcon />}
      />
      <TitleFormsComponent title="Exporta a tu Servidor FTP" />
      {showAddConnection && (
        <ModalAddConnectionFTP
          close={() => setShowAddConnection(false)}
          addConnection={addConnection}
        />
      )}
      <EditableInput
        label={"Nombre de la Automatización"}
        // value={userData?.nombre}
        name="automatization"
        // onSave={handleChange}
        placeholder="Automatización 1"
        options={true}
        readOnly={false}
      />
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

          <div className={styles.contentInput}>
            <p className={styles.titleContentInput}>
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

          <div className={styles.contentInput}>
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
          <p className={styles.titleContentInput}>Campos incluidos</p>
          <span className={styles.subtitleContentInput}>
            ID, Fechas, Datos de contacto (nombre, NIF, dirección), Desglose de
            impuestos (IVA, retenciones, etc.), Total, y más parámetros...
          </span>
        </div>
      </CustomAutomationsWrapper>
      <CustomAutomationsWrapper Icon={<WhiteFolder />}>
        <div
          className={styles.infoContainerWrapper}
          onClick={() =>
            setShowContent({ ...showContent, info2: !showContent.info2 })
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
          className={`${styles.contentContainer} ${showContent.info2 ? styles.active : styles.disabled}`}
        >
          <div className={styles.contentInput}>
            <p className={styles.titleContentInput}>Ubicación</p>

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
        </div>
      </CustomAutomationsWrapper>
      {/* <CustomAutomationsWrapper Icon={<FrecuencyIcon />}>
        <div style={{ display: "grid", gap: "10px" }}>
          <OptionsSwitchComponent
            isChecked={configuration.frequency || false}
            setIsChecked={(value) =>
              handleConfigurationChange("frequency", value)
            }
            // icon={<TextSVG />}
            text="Selecciona la frecuencia del tiempo que se ejecutará la acción"
            subtitle="Si no se marca esta opción se ejecutara siempre y de forma inmediata"
          />
          <InputComponent
            typeInput="select"
            value={configuration.fileName || ""}
            setValue={(value) => handleConfigurationChange("fileName", value)}
            options={[
              { value: "Inmediatamente", label: "Inmediatamente" },
              { value: "1hr", label: "Cada 1hr" },
              { value: "5hr", label: "Cada 5hr" },
            ]}
          />
        </div>
      </CustomAutomationsWrapper> */}

      <CustomAutomationsWrapper Icon={<WhiteClock />}>
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
            isChecked={configuration.actionFrequency || false}
            setIsChecked={(value) =>
              handleConfigurationChange("actionFrequency", value)
            }
          />
        </div>
        <div
          className={`${styles.contentContainer} ${configuration.actionFrequency ? styles.active : styles.disabled}`}
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
          className={`${styles.contentContainer} ${configuration.documentStatus ? styles.active : styles.disabled}`}
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
            isChecked={configuration.renameFiles || false}
            setIsChecked={(value) =>
              handleConfigurationChange("renameFiles", value)
            }
          />
        </div>
        <div
          className={`${styles.contentContainer} ${configuration.renameFiles ? styles.active : styles.disabled}`}
        >
          <InputComponent
            placeholder="Escribe [id], [title], [date], [totalamount], [contactid], [category] para personalizar los documentos subidos"
            typeInput="text"
            value={configuration.fileName || ""}
            setValue={(value) => handleConfigurationChange("fileName", value)}
          />
        </div>
      </CustomAutomationsWrapper>
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
          className={`${styles.contentContainer} ${configuration.selectStandardExport ? styles.active : styles.disabled}`}
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

export default FTPFormAutomate;
