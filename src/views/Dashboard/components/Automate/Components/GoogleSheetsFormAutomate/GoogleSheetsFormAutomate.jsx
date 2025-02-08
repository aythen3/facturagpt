import React, { useEffect, useState } from "react";
import HeaderFormsComponent from "../../../HeadersFormsComponent/HeaderFormsComponent";
import { ReactComponent as GoogleSheetsIcon } from "../../../../assets/excel.svg";
import TitleFormsComponent from "../../shared/TitleFormsComponent";
import InputComponent from "../../../InputComponent/InputComponent";
import styles from "../GmailAndOutlookFormCreateAutomate/gmailAndOutlook.module.css";
import CheckboxComponent from "../../shared/CheckboxComponent";
import OptionsSwitchComponent from "../../../OptionsSwichComponent/OptionsSwitchComponent";
import NotificationsSVG from "../../svgs/NotificationsSVG";
import { ReactComponent as GmailIcon } from "../../../../assets/gmail.svg";
import { ReactComponent as WhatsAppIcon } from "../../../../assets/whatsappIcon.svg";
import ModalAddConnectionGoogleSheets from "./ModalAddConnectionGoogleSheets";
import NotificationsConfirmComponent from "../../shared/NotificationsConfirmComponent";
import {
  facturas,
  cliente,
  productosServicios,
  documentos,
  trabajadores,
  proveedores,
} from "./constants";
import CustomAutomationsWrapper from "../../../CustomAutomationsWrapper/CustomAutomationsWrapper";
import { ReactComponent as WhiteFolder } from "../../../../assets/whiteFolder.svg";
import { ReactComponent as GrayChevron } from "../../../../assets/grayChevron.svg";
import { ReactComponent as FrecuencyIcon } from "../../../../assets/frecuencyIcon.svg";
import { ReactComponent as ModifyState } from "../../../../assets/modifyState.svg";
import { ReactComponent as RenameFile } from "../../../../assets/renameFile.svg";
import { ReactComponent as CustomNotifications } from "../../../../assets/customNotifications.svg";
import { ReactComponent as NotifyWhenUpdate } from "../../../../assets/notifyWhenUpdate.svg";
import { ReactComponent as SelectDestination } from "../../../../assets/selectDestination.svg";

import SearchSVG from "../../svgs/SearchSVG";
import FiltersIconAutomate from "./FiltersIconAutomate";
import CustomDropdown from "../../../CustomDropdown/CustomDropdown";
import SelectLocation from "../../../SelectLocation/SelectLocation";
const GoogleSheetsFormAutomate = ({
  type,
  configuration,
  setConfiguration,
}) => {
  const [showAddConnection, setShowAddConnection] = useState(false);
  const [showSelectOutputLocation, setShowSelectOutputLocation] =
    useState(false);
  const [checkboxStates, setCheckboxStates] = useState(() => {
    if (
      configuration.generalConfiguration &&
      Object.keys(configuration.generalConfiguration).length > 0
    ) {
      return configuration.generalConfiguration;
    }
    return {
      facturas: facturas.reduce((acc, item) => ({ ...acc, [item]: false }), {}),
      cliente: cliente.reduce((acc, item) => ({ ...acc, [item]: false }), {}),
      documentos: documentos.reduce(
        (acc, item) => ({ ...acc, [item]: false }),
        {}
      ),
      trabajadores: trabajadores.reduce(
        (acc, item) => ({ ...acc, [item]: false }),
        {}
      ),
      proveedores: proveedores.reduce(
        (acc, item) => ({ ...acc, [item]: false }),
        {}
      ),
      productosServicios: productosServicios.reduce(
        (acc, item) => ({ ...acc, [item]: false }),
        {}
      ),
    };
  });
  const [showContent, setShowContent] = useState({
    info1: false,
    info2: false,
    info3: false,
    info4: false,
    info5: false,
    info6: false,
    info7: false,
  });
  const handleCheckboxChange = (category, key, value) => {
    setCheckboxStates((prevState) => ({
      ...prevState,
      [category]: {
        ...prevState[category],
        [key]: value,
      },
    }));
  };

  useEffect(() => {
    setConfiguration((prev) => ({
      ...prev,
      generalConfiguration: checkboxStates,
    }));
  }, [checkboxStates]);

  const handleConfigurationChange = (key, value) => {
    setConfiguration((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const addConnection = (connection) => {
    console.log("adding connection", connection);
    const updatedConnections = [
      ...(configuration.googleSheetsConnectionData || []),
      connection,
    ];
    handleConfigurationChange("googleSheetsConnectionData", updatedConnections);
    if (!configuration.selectedGoogleSheetsConnection) {
      handleConfigurationChange(
        "selectedGoogleSheetsConnection",
        connection.clientId
      );
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <HeaderFormsComponent
        placeholder="Añade una cuenta de Google Sheets"
        selectedEmailConnection={configuration.selectedGoogleSheetsConnection}
        setSelectedEmailConnection={(value) =>
          handleConfigurationChange("selectedGoogleSheetsConnection", value)
        }
        emailConnections={(configuration.googleSheetsConnectionData || []).map(
          (connection) => connection.clientId
        )}
        action={() => setShowAddConnection(true)}
        icon={<GoogleSheetsIcon />}
      />
      <TitleFormsComponent title="Actualiza tu" type={type} />
      <div>
        <p>Nombre de la automatización</p>
        <input type="text" placeholder="Automatización 1" />
      </div>
      <CustomAutomationsWrapper Icon={<FiltersIconAutomate />}>
        <div
          className={styles.infoContainerWrapper}
          onClick={() =>
            setShowContent({ ...showContent, info1: !showContent.info1 })
          }
        >
          <GrayChevron />
          <div className={styles.infoContainer}>
            <div>Selecciona la información a actualizar</div>
            <span>
              Aplica filtros avanzados para procesar solo los datos que
              realmente importan.
            </span>
          </div>
        </div>
        <div
          className={`${styles.contentContainer} ${showContent.info1 ? styles.active : styles.disabled}`}
        >
          <div style={{ display: "grid", gap: "10px" }}>
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
            <div>
              <p>Documentos</p>
              {documentos.map((documento) => (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                  key={documento}
                >
                  <CheckboxComponent
                    color="#27A768"
                    state={checkboxStates.documentos[documento]}
                    setState={(value) =>
                      handleCheckboxChange("documentos", documento, value)
                    }
                    label={documento}
                  />
                  <p>{documento}</p>
                </div>
              ))}
            </div>
            {/* <div>
              <p>Facturas</p>
              {facturas.map((factura) => (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                  key={factura}
                >
                  <CheckboxComponent
                    color="#27A768"
                    state={checkboxStates.facturas[factura]}
                    setState={(value) =>
                      handleCheckboxChange("facturas", factura, value)
                    }
                    label={factura}
                  />
                  <p>{factura}</p>
                </div>
              ))}
            </div> */}

            <div>
              <p>Clientes</p>
              {cliente.map((client) => (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                  key={client}
                >
                  <CheckboxComponent
                    color="#27A768"
                    state={checkboxStates.cliente[client]}
                    setState={(value) =>
                      handleCheckboxChange("cliente", client, value)
                    }
                    label={client}
                  />
                  <p>{client}</p>
                </div>
              ))}
            </div>

            <div>
              <p>Proveedores</p>
              {proveedores.map((proveedore) => (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                  key={proveedore}
                >
                  <CheckboxComponent
                    color="#27A768"
                    state={checkboxStates.proveedores[proveedore]}
                    setState={(value) =>
                      handleCheckboxChange("proveedores", proveedore, value)
                    }
                    label={proveedore}
                  />
                  <p>{proveedore}</p>
                </div>
              ))}
            </div>
            <div>
              <p>Trabajadores</p>
              {trabajadores.map((trabajadore) => (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                  key={trabajadore}
                >
                  <CheckboxComponent
                    color="#27A768"
                    state={checkboxStates.trabajadores[trabajadore]}
                    setState={(value) =>
                      handleCheckboxChange("trabajadores", trabajadore, value)
                    }
                    label={trabajadore}
                  />
                  <p>{trabajadore}</p>
                </div>
              ))}
            </div>

            <div>
              <p>Productos y Servicios</p>
              {productosServicios.map((product) => (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                  key={product}
                >
                  <CheckboxComponent
                    color="#27A768"
                    state={checkboxStates.productosServicios[product]}
                    setState={(value) =>
                      handleCheckboxChange("productosServicios", product, value)
                    }
                    label={product}
                  />
                  <p>{product}</p>
                </div>
              ))}
            </div>
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

      <CustomAutomationsWrapper Icon={<FrecuencyIcon />}>
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
      {/* 
      <CustomAutomationsWrapper Icon={<ModifyState />}>
        <div style={{ display: "grid", gap: "10px" }}>
          <OptionsSwitchComponent
            isChecked={configuration.modifyState || false}
            setIsChecked={(value) =>
              handleConfigurationChange("modifyState", value)
            }
            // icon={<TextSVG />}
            text="Modifica el Estado a los Documentos Procesados"
          />
          <InputComponent
            typeInput="select"
            value={configuration.fileName || ""}
            setValue={(value) => handleConfigurationChange("fileName", value)}
            options={[
              { value: "Pendiente", label: "Pendiente" },
              { value: "entregado", label: "Entregado" },
            ]}
          />
        </div>
      </CustomAutomationsWrapper> */}
      <CustomAutomationsWrapper Icon={<ModifyState />}>
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

      {/* <CustomAutomationsWrapper Icon={<RenameFile />}>
        <div style={{ display: "grid", gap: "10px" }}>
          <OptionsSwitchComponent
            isChecked={configuration.renameFile || false}
            setIsChecked={(value) =>
              handleConfigurationChange("renameFile", value)
            }
            // icon={<TextSVG />}
            text="Renombra automáticamente tus archivos"
            subtitle="Configura nombres claros y personalizados para mantener todo organizado."
          />
          <InputComponent
            placeholder="Escribe [id], [title], [date], [totalamount], [contactid], [category] para personalizar los documentos subidos"
            typeInput="text"
            value={configuration.fileName || ""}
            setValue={(value) => handleConfigurationChange("fileName", value)}
          />
        </div>
      </CustomAutomationsWrapper> */}
      <CustomAutomationsWrapper Icon={<RenameFile />}>
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
      {/* <CustomAutomationsWrapper Icon={<CustomNotifications />}>
        <div style={{ display: "grid", gap: "10px" }}>
          <OptionsSwitchComponent
            isChecked={configuration.customNotification || false}
            setIsChecked={(value) =>
              handleConfigurationChange("customNotification", value)
            }
            // icon={<TextSVG />}
            text="Configura tus notificaciones personalizadas"
            subtitle="Recibe alertas en tiempo real para mantenerte informado sobre cada proceso."
          />
          <CustomAutomationsWrapper Icon={<NotifyWhenUpdate />}>
            <div style={{ display: "grid", gap: "10px" }}>
              <OptionsSwitchComponent
                isChecked={configuration.notifyWhenUpdate || false}
                setIsChecked={(value) =>
                  handleConfigurationChange("notifyWhenUpdate", value)
                }
                // icon={<TextSVG />}
                text="Notificar cuando se actualize la hoja de cálculo"
                subtitle="Configura donde quieres recibir la notificación"
              />
              <NotificationsConfirmComponent
                mainState={configuration.notificateAfterCreatingRow || false}
                setMainState={(value) =>
                  handleConfigurationChange("notificateAfterCreatingRow", value)
                }
                title="Notificar al crear una fila"
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
                icons={[
                  <GmailIcon style={{ width: 25 }} />,
                  <WhatsAppIcon style={{ width: 25 }} />,
                ]}
              />
            </div>
          </CustomAutomationsWrapper>
          <CustomAutomationsWrapper Icon={<CustomNotifications />}>
            <div style={{ display: "grid", gap: "10px" }}>
              <OptionsSwitchComponent
                isChecked={configuration.activateValidations || false}
                setIsChecked={(value) =>
                  handleConfigurationChange("activateValidations", value)
                }
                // icon={<TextSVG />}
                text="Activa validaciones avanzadas para notificar posibles errores"
                subtitle="Asegura la precisión de tus datos con alertas en caso de inconsistencias."
              />
            </div>
          </CustomAutomationsWrapper>
        </div>
      </CustomAutomationsWrapper> */}
      <CustomAutomationsWrapper Icon={<CustomNotifications />}>
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
          className={`${styles.contentContainer} ${configuration.enableNotifications ? styles.active : styles.disabled}`}
        >
          <CustomAutomationsWrapper Icon={<NotifyWhenUpdate />}>
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
            <CustomAutomationsWrapper Icon={<CustomNotifications />}>
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

      <CustomAutomationsWrapper Icon={<SelectDestination />}>
        <div
          style={{ marginBottom: "20px" }}
          className={styles.infoContainerWrapper}
        >
          <div
            className={styles.infoContainer}
            onClick={() =>
              setShowContent({ ...showContent, info7: !showContent.info7 })
            }
          >
            <div>Selecciona el destino de exportación</div>
            <span>Decide qué hacer con los datos procesados</span>
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
          <div className={styles.content_input}>
            <p className={styles.title_content_input}>
              ID de la hoja de cálculo
            </p>

            <InputComponent
              value={configuration.sheetId}
              setValue={(value) => handleConfigurationChange("sheetId", value)}
              icon={<GoogleSheetsIcon style={{ width: 20, height: 20 }} />}
              placeholder="ID de la hoja"
              textButton="Seleccionar"
            />
          </div>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              userSelect: "none",
              backgroundColor: "#6F6F81",
              border: "none",
              width: "118px",
              height: "32px",
              whiteSpace: "nowrap",
              borderRadius: "3px",
              color: "white",
              fontSize: "12px",
              fontWeight: "semibold",
              marginTop: "24px",
            }}
          >
            Crear Nueva Hoja
          </button>

          <div className={styles.content_input}>
            <p className={styles.title_content_input}>
              Título de la hoja de cálculo
            </p>

            <InputComponent
              value={configuration.sheetTitle}
              setValue={(value) =>
                handleConfigurationChange("sheetTitle", value)
              }
              placeholder="Título de la hoja de cálculo"
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <GoogleSheetsIcon
                style={{ width: 20, height: 20, marginBottom: "3px" }}
              />
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "#27A768",
                }}
              >
                Título de la hoja.xls
              </p>
            </div>
            <p
              style={{
                cursor: "pointer",
                fontSize: "12px",
                whiteSpace: "nowrap",
                fontWeight: "bold",
              }}
            >
              Abrir hoja de cálculo
            </p>
          </div>
        </div>
      </CustomAutomationsWrapper>
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
        <ModalAddConnectionGoogleSheets
          addConnection={addConnection}
          close={() => setShowAddConnection(false)}
        />
      )}
    </div>
  );
};

export default GoogleSheetsFormAutomate;
