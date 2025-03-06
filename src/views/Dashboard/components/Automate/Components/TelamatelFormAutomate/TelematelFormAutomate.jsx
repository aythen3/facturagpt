import React, { useState } from "react";
import styles from "./TelematelFormAutomate.module.css";
import SearchSVG from "../../svgs/SearchSVG";
import OptionsSwitchComponent from "../../../OptionsSwichComponent/OptionsSwitchComponent";
import InputComponent from "../../../InputComponent/InputComponent";
// import HeaderFormsComponent from "../../../HeadersFormsComponent/HeaderFormsComponent";
import { ReactComponent as FTPIcon } from "../../../../assets/telematelWithoutBg.svg";
import ModalAddConnectionTelematal from "./ModalAddConnectionTelematel";
import TitleFormsComponent from "../../shared/TitleFormsComponent";
import HeaderFormsComponent from "../../../HeadersFormsComponent/HeaderFormsComponent";
import ModalAddConnectionTelematel from "./ModalAddConnectionTelematel";
import NotificationsConfirmComponent from "../../shared/NotificationsConfirmComponent";
import SelectLocation from "../../../SelectLocation/SelectLocation";
import CheckboxWithText from "../../../CheckboxWithText/CheckboxWithText";
import CustomDropdown from "../../../CustomDropdown/CustomDropdown";


import CustomAutomationsWrapper from "../../../CustomAutomationsWrapper/CustomAutomationsWrapper";

import { ReactComponent as WhiteCheck } from "../../../../assets/whiteCheck.svg";
import { ReactComponent as WhiteText } from "../../../../assets/whiteText.svg";
import { ReactComponent as ArrowSquare } from "../../../../assets/whiteArrowSquareIn.svg";
import { ReactComponent as GrayChevron } from "../../../../assets/grayChevron.svg";
import { ReactComponent as WhiteBell } from "../../../../assets/whiteBell.svg";
import { ReactComponent as GmailIcon } from "../../../../assets/gmailwithoutbg.svg";
import { ReactComponent as WhatsAppIcon } from "../../../../assets/whatsappIcon.svg";
import { ReactComponent as TelematelIcon } from "../../../../assets/telematel.svg";

import EditableInput from "../FileInput/Input";
import FileInputNotification from "../FileInput/Notification";
import FileInputExport from "../FileInput/Export";
import FileInputImport from "../FileInput/Import";


import { ReactComponent as NewCategoryIcon } from "../../../../assets/NewCategoryIcon.svg";
import NewCategory from "../../../NewCategory/NewCategory";
import SelectInfoToProcess from "../FileInput/selectInfoToProcces/SelectInfoToProcess";

const TelematelFormAutomate = ({
  type,
  configuration,
  setConfiguration,
  setShowSelectCurrencyPopup,
  setSelectedCurrency,
  selectedCurrency,
}) => {
  const [showSelectLocation, setShowSelectLocation] = useState(false);
  // const [showAddConnection, setShowAddConnection] = useState(false);
  // const [showSelectOutputLocation, setShowSelectOutputLocation] =
  // useState(false);

  const [showAddConnection, setShowAddConnection] = useState(false);
  const [showSelectInputLocation, setShowSelectInputLocation] = useState(false);
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [showSelectOutputLocation, setShowSelectOutputLocation] =
    useState(false);

  const [conditions, setConditions] = useState([]);
  const [newCondition, setNewCondition] = useState("");

  const [conditionCurrency, setConditionCurrency] = useState("");
  const [conditionOperator, setConditionOperator] = useState("");
  const [conditionValue, setConditionValue] = useState("");

  const [andFilters, setAndFilters] = useState([
    {
      id: 1,
      conditionCurrency: "provider",
      conditionOperator: "=",
      conditionValue: "1000",
      type: "AND",
    },
  ]);

  const [orFilters, setOrFilters] = useState([
    {
      id: 1,
      conditionCurrency: "title",
      conditionOperator: "CONTAINS",
      conditionValue: "1000",
      type: "OR",
    },
  ]);

  const [labels, setLabels] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // const addConnection = (connection) => {
  //   console.log("adding FTP connection", connection);
  //   const updatedConnections = [
  //     ...(configuration.telematelConnectionData || []),
  //     connection,
  //   ];
  //   console.log("setting telematelConnectionData", updatedConnections);
  //   handleConfigurationChange("ftpConnectionData", updatedConnections);
  //   if (!configuration.selectedTelematelConnection) {
  //     handleConfigurationChange("selectedFTPConnection", connection.clientId);
  //   }
  // };

  // const handleConfigurationChange = (key, value) => {
  //   setConfiguration((prev) => ({
  //     ...prev,
  //     [key]: value,
  //   }));
  // };

  const [showContent, setShowContent] = useState({
    info1: false,
    info2: false,
    info3: false,
    info4: false,
    info5: false,
    info6: false,
    info7: false,
    info8: false,
    info9: false,
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

  const addCondition = () => {
    if (newCondition) {
      setConditions([...conditions, newCondition]);
      setNewCondition("");
    }
  };

  const addFilter = (type) => {
    if (type === "AND") {
      setAndFilters((prevFilters) => [
        ...prevFilters,
        {
          id: Date.now(),
          conditionCurrency: "provider",
          conditionOperator: "=",
          conditionValue: "",
          type: "AND",
        },
      ]);
    } else if (type === "OR") {
      setOrFilters((prevFilters) => [
        ...prevFilters,
        {
          id: Date.now(),
          conditionCurrency: "title",
          conditionOperator: "CONTAINS",
          conditionValue: "",
          type: "OR",
        },
      ]);
    }
  };

  const updateFilter = (id, key, value, type) => {
    if (type === "AND") {
      setAndFilters((prevFilters) =>
        prevFilters.map((filter) =>
          filter.id === id ? { ...filter, [key]: value } : filter
        )
      );
    } else if (type === "OR") {
      setOrFilters((prevFilters) =>
        prevFilters.map((filter) =>
          filter.id === id ? { ...filter, [key]: value } : filter
        )
      );
    }
  };

  const saveFilter = () => {
    const newLabel = "Nuevo Label";
    setLabels([...labels, newLabel]);
  };

  const deleteLabel = (index) => {
    setLabels(labels.filter((_, i) => i !== index));
  };

  const editLabel = (index) => {
    setEditIndex(index);
  };

  return (
    <div>
      <HeaderFormsComponent
        selectedEmailConnection={configuration?.selectedEmailConnection}
        setSelectedEmailConnection={(value) =>
          handleConfigurationChange("selectedEmailConnection", value)
        }
        emailConnections={(configuration?.emailConnectionData || []).map(
          (connection) => connection.email
        )}
        action={() => setShowAddConnection(true)}
        icon={<TelematelIcon />}
      />
      <TitleFormsComponent title="Automatiza tu Telematel" />
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
     
      <SelectInfoToProcess
        configuration={configuration}
        handleConfigurationChange={handleConfigurationChange}
      />

      <CustomAutomationsWrapper Icon={<ArrowSquare />}>
        <div
          className={styles.infoContainerWrapper}
          onClick={() =>
            setShowContent({ ...showContent, info7: !showContent.info7 })
          }
        >
          <div className={styles.infoContainer}>
            <div>Decide dónde guardar los documentos procesados</div>
            <span>
              Elige una ubicación en FacturaGPT para organizar tus archivos
              procesados
            </span>
          </div>
        </div>
        <div
          className={`${styles.contentContainer} ${showContent.info7 ? styles.active : styles.disabled}`}
        >
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
          <CustomAutomationsWrapper Icon={<ArrowSquare />}>
            <div
              className={`${styles.contentContainer} ${true ? styles.active : styles.disabled}`}
            >
           

              <div className={styles.contentInput}>
                <p className={styles.titleContentInput}>Formato del Archivo</p>

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
                    handleConfigurationChange(
                      "selectedStandardExport",
                      selected
                    )
                  }
                />
              </div>
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
                setValue={(value) =>
                  handleConfigurationChange("fileName", value)
                }
              />
            </div>
          </CustomAutomationsWrapper>

          <CustomAutomationsWrapper Icon={<ArrowSquare />}>
            <div
              className={styles.infoContainerWrapper}
              onClick={() =>
                setShowContent({ ...showContent, info8: !showContent.info8 })
              }
            >
              <GrayChevron />
              <div className={styles.infoContainer}>
                <div>Identifica los datos del documento a procesar</div>
                <span>Clasifica el documento que deseas automatizar</span>
              </div>
            </div>
            <div
              className={`${styles.contentContainer} ${showContent.info8 ? styles.active : styles.disabled}`}
            >
              <div className={styles.contentInput}>
                <p
                  className={`${styles.titleContentInput} ${styles.newCategory}`}
                >
                  <span>Concepto del documento</span>
                  <span onClick={() => setShowNewCategory(true)}>
                    <NewCategoryIcon /> Nueva Categoría
                  </span>
                </p>

                <div className={styles.columnCategory}>
                  {" "}
                  <CustomDropdown
                    options={["Factura", "Factura", "Factura"]}
                    height="31px"
                    textStyles={{
                      fontWeight: 300,
                      color: "#1E0045",
                      fontSize: "13px",
                      marginLeft: "6px",
                      userSelect: "none",
                    }}
                  />
                  <div className={styles.newCategoryRowDropdown}>
                    <CustomDropdown
                      options={["Factura", "Factura", "Factura"]}
                      height="31px"
                      textStyles={{
                        fontWeight: 300,
                        color: "#1E0045",
                        fontSize: "13px",
                        marginLeft: "6px",
                        userSelect: "none",
                      }}
                    />
                    <CustomDropdown
                      options={["Factura", "Factura", "Factura"]}
                      height="31px"
                      textStyles={{
                        fontWeight: 300,
                        color: "#1E0045",
                        fontSize: "13px",
                        marginLeft: "6px",
                        userSelect: "none",
                      }}
                    />
                  </div>
                  <div className={styles.stateCategoryRow}>
                    Estado:{" "}
                    <CustomDropdown
                      options={["Factura", "Factura", "Factura"]}
                      height="31px"
                      textStyles={{
                        fontWeight: 300,
                        color: "#1E0045",
                        fontSize: "13px",
                        marginLeft: "6px",
                        userSelect: "none",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CustomAutomationsWrapper>
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
      {showNewCategory && (
        <NewCategory setShowNewCategory={setShowNewCategory} />
      )}
      {showSelectInputLocation && (
        <>
          {" "}
          <SelectLocation
            onClose={() => setShowSelectInputLocation(false)}
            pickLocation={(location) => {
              console.log("location", location);
              handleConfigurationChange("filesSource", location);
            }}
          />
          <FileInputImport
            handleConfigurationChange={handleConfigurationChange}
            configuration={configuration}
          />
          <FileInputExport
            configuration={configuration}
            handleConfigurationChange={handleConfigurationChange}
          />
          <FileInputNotification
            type="Gmail"
            handleConfigurationChange={handleConfigurationChange}
            configuration={configuration}
          />
        </>
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
      {showAddConnection && (
        <ModalAddConnectionTelematel
          close={() => setShowAddConnection(false)}
          addConnection={addConnection}
        />
      )}
    </div>
  );
};

export default TelematelFormAutomate;
