import React, { useState } from "react";
import styles from "./TelematelFormAutomate.module.css";
import SearchSVG from "../../svgs/SearchSVG";
import WarningSVG from "../../svgs/WarningSVG";
import SelectComponent from "../../../SelectComponent/SelectComponent";
import CheckboxComponent from "../../shared/CheckboxComponent";
import OptionsSwitchComponent from "../../../OptionsSwichComponent/OptionsSwitchComponent";
import TextSVG from "../../svgs/TextSVG";
import LabelSVG from "../../svgs/LabelSVG";
import NotificationsSVG from "../../svgs/NotificationsSVG";
import InputComponent from "../../../InputComponent/InputComponent";
// import HeaderFormsComponent from "../../../HeadersFormsComponent/HeaderFormsComponent";
import { ReactComponent as FTPIcon } from "../../../../assets/telematelWithoutBg.svg";
import ModalAddConnectionTelematal from "./ModalAddConnectionTelematel";
import TitleFormsComponent from "../../shared/TitleFormsComponent";
import HeaderFormsComponent from "../../../HeadersFormsComponent/HeaderFormsComponent";
import AddConnectionModal from "../AddConenctionModal/AddConnectionModal";
import LabelInputComponent from "../../../LabelInputComponent/LabelInputComponent";
import ModalAddConnectionTelematel from "./ModalAddConnectionTelematel";
import NotificationsConfirmComponent from "../../shared/NotificationsConfirmComponent";
import SelectLocation from "../../../SelectLocation/SelectLocation";
import CheckboxWithText from "../../../CheckboxWithText/CheckboxWithText";
import CustomDropdown from "../../../CustomDropdown/CustomDropdown";
import minusIcon from "../../../../assets/minusIcon.svg";
import AddEmailsInput from "../AddEmailsInput/AddEmailsInput";

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
import { ReactComponent as TelematelIcon } from "../../../../assets/telematel.svg";

import EditableInput from "../FileInput/Input";
import FileInputNotification from "../FileInput/Notification";
import FileInputGPT from "../FileInput/GPT";
import FileInputExport from "../FileInput/Export";
import FileInputImport from "../FileInput/Import";

// import styles from "./TelematelFormAutomate.module.css";
// import InputComponent from "../../../InputComponent/InputComponent";
// import SearchSVG from "../../svgs/SearchSVG";
// import SelectLocation from "../../../SelectLocation/SelectLocation";
// import CheckboxWithText from "../../../CheckboxWithText/CheckboxWithText";
// import CustomDropdown from "../../../CustomDropdown/CustomDropdown";
// import minusIcon from "../../../../assets/minusIcon.svg";
// import OptionsSwitchComponent from "../../../OptionsSwichComponent/OptionsSwitchComponent";
// import NotificationsConfirmComponent from "../../shared/NotificationsConfirmComponent";
import { ReactComponent as FrecuencyIcon } from "../../../../assets/frecuencyIcon.svg";
// import EditableInput from "../../../AccountSettings/EditableInput/EditableInput";
import SelectCurrencyPopup from "../../../SelectCurrencyPopup/SelectCurrencyPopup";
import { ReactComponent as GrayArrow } from "../../../../assets/arrowDownBold.svg";
import Button from "../../../Button/Button";
import DeleteButton from "../../../DeleteButton/DeleteButton";
import FiltersLabelOptionsTemplate from "../FiltersLabelOptionsTemplate/FiltersLabelOptionsTemplate";
// import LabelInputComponent from "../../../LabelInputComponent/LabelInputComponent";
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
      {/* <CustomAutomationsWrapper Icon={<ArrowSquare />}>
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
              Conecta la fuente de datos de Telematel que FacuraGPT procesará.
            </span>
          </div>
        </div>
        <div
          className={`${styles.contentContainer} ${showContent.info1 ? styles.active : styles.disabled}`}
        >
          <CustomAutomationsWrapper Icon={<ArrowSquare />}>
            <div
              className={styles.infoContainerWrapper}
              onClick={() =>
                setShowContent({ ...showContent, info8: !showContent.info8 })
              }
            >
              <GrayChevron />
              <div className={styles.infoContainer}>
                <div>Configura la identificación de datos clave</div>
                <span>
                  Configura los filtros para extraer información clave.
                </span>
              </div>
            </div>
            <div
              className={`${styles.contentContainer} ${showContent.info8 ? styles.active : styles.disabled}`}
            >
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
              <p className={styles.titleContentInput}>
                Filtro de Importe Total
                <div className={styles.currencyContainer}>
                  <div
                    className={styles.currencyDropdownButton}
                    onClick={() => setShowSelectCurrencyPopup(true)}
                  >
                    <span style={{ textTransform: "uppercase" }}>
                      EN
                    </span>
                    <GrayArrow
                      className={styles.chevronIcon}
                      color="#71717A"
                      size={12}
                    />
                  </div>
                </div>
              </p>
              <span className={styles.quantityContainer}>
                <div className={styles.quantityContent}>
                  <span>Min</span>
                  <input type="text" placeholder="-" />
                </div>
                <p>-</p>
                <div className={styles.quantityContent}>
                  <span>Max</span>
                  <input type="text" placeholder="-" />
                </div>
              </span>

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
                    handleConfigurationChange(
                      "selectedActionFrequency",
                      selected
                    )
                  }
                />
              </div>
            </div>
          </CustomAutomationsWrapper>
          <CustomAutomationsWrapper Icon={<WhiteFolder />}>
            <div
              className={styles.infoContainerWrapper}
              onClick={() =>
                setShowContent({ ...showContent, info9: !showContent.info9 })
              }
            >
              <GrayChevron />
              <div className={styles.infoContainer}>
                <div>Reglas y filtros avanzados</div>
                <span>
                  Configura los criterios para extraer información clave
                </span>
              </div>
            </div>
            <div
              className={`${styles.contentContainer} ${showContent.info9 ? styles.active : styles.disabled}`}
            >
              <div className={styles.contentInput}>
                <div className={styles.contentInput}>
                  {labels.map((label, index) => (
                    <div key={index}>
                      <div key={index} className={styles.titleContentInput}>
                        <span>{label}</span>
                        <div className={styles.optionsContentInput}>
                          <Button
                            type="button"
                            action={() => {
                              if (editIndex == index) {
                                editLabel(null);
                              } else {
                                editLabel(index);
                              }
                            }}
                          >
                            {editIndex === index ? "Guardar" : "Editar"}
                          </Button>
                          <DeleteButton action={() => deleteLabel(index)} />
                        </div>
                      </div>
                      {editIndex === index && (
                        <div className={styles.labelOptions}>
                          <div className={styles.conditionsContainer}>
                            <div className={styles.conditions}>
                              {conditions.map((condition, index) => (
                                <div className={styles.condition} key={index}>
                                  {condition}
                                </div>
                              ))}
                            </div>
                            <input
                              type="text"
                              placeholder="Escribe el prompt para identificar variables"
                              value={newCondition}
                              onChange={(e) => setNewCondition(e.target.value)}
                            />
                            <Button
                              action={addCondition}
                              headerStyle={{
                                height: "40px",
                                padding: "13px 11px",
                              }}
                            >
                              Generar
                            </Button>
                          </div>
                          <div className={styles.labelName}>
                            <input type="text" placeholder="Label Name" />
                          </div>
                          <div className={styles.filtersLabelOptions}>
                            <FiltersLabelOptionsTemplate
                              conditionCurrency={conditionCurrency}
                              setConditionCurrency={setConditionCurrency}
                              conditionOperator={conditionOperator}
                              setConditionOperator={setConditionOperator}
                              conditionValue={conditionValue}
                              setConditionValue={setConditionValue}
                              optionsFirst={["total_amount", "min_amount"]}
                              optionsSecond={["<", ">", "=", "+"]}
                              text={"Condition"}
                            />
                            {andFilters.map((filter, index) => (
                              <FiltersLabelOptionsTemplate
                                key={index}
                                conditionCurrency={filter.conditionCurrency}
                                setConditionCurrency={(value) =>
                                  updateFilter(
                                    filter.id,
                                    "conditionCurrency",
                                    value,
                                    "AND"
                                  )
                                }
                                conditionOperator={filter.conditionOperator}
                                setConditionOperator={(value) =>
                                  updateFilter(
                                    filter.id,
                                    "conditionOperator",
                                    value,
                                    "AND"
                                  )
                                }
                                conditionValue={filter.conditionValue}
                                setConditionValue={(value) =>
                                  updateFilter(
                                    filter.id,
                                    "conditionValue",
                                    value,
                                    "AND"
                                  )
                                }
                                text={filter.type}
                                optionsFirst={[
                                  "provider",
                                  "country",
                                  "item_count",
                                  "title",
                                ]}
                                optionsSecond={["=", "!=", ">", "<"]}
                              />
                            ))}
                            <button
                              onClick={() => addFilter("AND")}
                              className={styles.buttonAddFilter}
                            >
                              Add AND Condition
                            </button>
                          </div>

                          <div
                            className={styles.filtersLabelOptions}
                            style={{ marginTop: "40px" }}
                          >
                            {orFilters.map((filter, index) => (
                              <FiltersLabelOptionsTemplate
                                key={index}
                                conditionCurrency={filter.conditionCurrency}
                                setConditionCurrency={(value) =>
                                  updateFilter(
                                    filter.id,
                                    "conditionCurrency",
                                    value,
                                    "OR"
                                  )
                                }
                                conditionOperator={filter.conditionOperator}
                                setConditionOperator={(value) =>
                                  updateFilter(
                                    filter.id,
                                    "conditionOperator",
                                    value,
                                    "OR"
                                  )
                                }
                                conditionValue={filter.conditionValue}
                                setConditionValue={(value) =>
                                  updateFilter(
                                    filter.id,
                                    "conditionValue",
                                    value,
                                    "OR"
                                  )
                                }
                                text={filter.type}
                                optionsFirst={[
                                  "title",
                                  "title",
                                  "title",
                                  "title",
                                ]}
                                optionsSecond={[
                                  "CONTAINS",
                                  "CONTAINS",
                                  "CONTAINS",
                                  "CONTAINS",
                                ]}
                              />
                            ))}
                            <button
                              onClick={() => addFilter("OR")}
                              className={styles.buttonAddFilter}
                            >
                              Add OR Condition
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <Button
                headerStyle={{
                  height: "40px",
                  padding: "13px 11px",
                  marginTop: "15px",
                }}
                action={() => {
                  if (editIndex != null) {
                    editLabel(null);
                  } else {
                    saveFilter();
                  }
                }}
              >
                {editIndex != null ? "Guardar Filtro" : "Crear Filtro"}
              </Button>
            </div>
          </CustomAutomationsWrapper>

          <CustomAutomationsWrapper Icon={<WhiteClock />}>
            <div className={styles.infoContainerWrapper}>
              <div className={styles.infoContainer}>
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
        </div>
      </CustomAutomationsWrapper> */}
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
          {/* <OptionsSwitchComponent
            border={"none"}
            marginLeft={"auto"}
            isChecked={configuration.selectStandardExport || false}
            setIsChecked={(value) =>
              handleConfigurationChange("selectStandardExport", value)
            }
          /> */}
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
              {/* <div className={styles.contentInput}>
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
              </div> */}

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
                    // selectedOption={configuration.selectedStandardExport || []}
                    height="31px"
                    textStyles={{
                      fontWeight: 300,
                      color: "#1E0045",
                      fontSize: "13px",
                      marginLeft: "6px",
                      userSelect: "none",
                    }}
                    // setSelectedOption={(selected) =>
                    //   handleConfigurationChange(
                    //     "selectedStandardExport",
                    //     selected
                    //   )
                    // }
                  />
                  <div className={styles.newCategoryRowDropdown}>
                    <CustomDropdown
                      options={["Factura", "Factura", "Factura"]}
                      // selectedOption={configuration.selectedStandardExport || []}
                      height="31px"
                      textStyles={{
                        fontWeight: 300,
                        color: "#1E0045",
                        fontSize: "13px",
                        marginLeft: "6px",
                        userSelect: "none",
                      }}
                      // setSelectedOption={(selected) =>
                      //   handleConfigurationChange(
                      //     "selectedStandardExport",
                      //     selected
                      //   )
                      // }
                    />
                    <CustomDropdown
                      options={["Factura", "Factura", "Factura"]}
                      // selectedOption={configuration.selectedStandardExport || []}
                      height="31px"
                      textStyles={{
                        fontWeight: 300,
                        color: "#1E0045",
                        fontSize: "13px",
                        marginLeft: "6px",
                        userSelect: "none",
                      }}
                      // setSelectedOption={(selected) =>
                      //   handleConfigurationChange(
                      //     "selectedStandardExport",
                      //     selected
                      //   )
                      // }
                    />
                  </div>
                  <div className={styles.stateCategoryRow}>
                    Estado:{" "}
                    <CustomDropdown
                      options={["Factura", "Factura", "Factura"]}
                      // selectedOption={configuration.selectedStandardExport || []}
                      height="31px"
                      textStyles={{
                        fontWeight: 300,
                        color: "#1E0045",
                        fontSize: "13px",
                        marginLeft: "6px",
                        userSelect: "none",
                      }}
                      // setSelectedOption={(selected) =>
                      //   handleConfigurationChange(
                      //     "selectedStandardExport",
                      //     selected
                      //   )
                      // }
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
      {/* </div> */}

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
