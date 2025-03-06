import React, { useEffect, useState } from "react";
import styles from "./selectInfoToProcces.module.css";
import OptionsSwitchComponent from "../../../../OptionsSwichComponent/OptionsSwitchComponent";
import InputComponent from "../../../../InputComponent/InputComponent";
import CheckboxWithText from "../../../../CheckboxWithText/CheckboxWithText";
import CustomDropdown from "../../../../CustomDropdown/CustomDropdown";
import CustomAutomationsWrapper from "../../../../CustomAutomationsWrapper/CustomAutomationsWrapper";
import { ReactComponent as ArrowSquare } from "../../../../../assets/whiteArrowSquareIn.svg";
import { ReactComponent as GrayChevron } from "../../../../../assets/grayChevron.svg";
import { ReactComponent as WhiteFolder } from "../../../../../assets/whiteFolder.svg";
import { ReactComponent as WhiteClock } from "../../../../../assets/whiteClock.svg";
import { ReactComponent as GrayArrow } from "../../../../../assets/arrowDownBold.svg";
import { ReactComponent as SearchWhite } from "../../../../../assets/searchWhite.svg";
import { ReactComponent as CircuitryIcon } from "../../../../../assets/CircuitryIcon.svg";
import Button from "../../../../Button/Button";
import DeleteButton from "../../../../DeleteButton/DeleteButton";
import FiltersLabelOptionsTemplate from "../../FiltersLabelOptionsTemplate/FiltersLabelOptionsTemplate";
import { filter } from "jszip";
import SelectCurrencyPopup from "../../../../SelectCurrencyPopup/SelectCurrencyPopup";
import { ifft } from "@tensorflow/tfjs";

import { Currency } from "lucide-react";

const SelectInfoToProcess = ({ configuration, handleConfigurationChange }) => {
  const [count, setCount] = useState(0);
  const [fileKeywords, setFileKeywords] = useState([]);
  const [labels, setLabels] = useState([]); // Ahora labels contiene toda la información necesaria
  const [editIndex, setEditIndex] = useState(null);
  const [editConditionIndex, setEditConditionIndex] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [showSelectCurrencyPopup, setShowSelectCurrencyPopup] = useState(false);
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
  const [totalAmount, setTotalAmount] = useState({
    min: 0,
    max: 0,
  });

  const addCondition = (index) => {
    if (labels[index].newCondition) {
      const updatedLabels = [...labels];
      updatedLabels[index].conditions.push(updatedLabels[index].newCondition);
      updatedLabels[index].newCondition = "";
      updatedLabels[index].conditionCurrency = labels[index].conditions[0];
      setLabels(updatedLabels);
    }
  };

  const addFilter = (index, type) => {
    const updatedLabels = [...labels];
    updatedLabels[index].filters.push({
      id: Date.now(),
      // conditionCurrency: type === "AND" ? "provider" : "title",
      // conditionOperator: type === "AND" ? "=" : "CONTAINS",
      conditionCurrency: "",
      conditionOperator: "",
      conditionValue: "",
      type,
    });
    setLabels(updatedLabels);
  };

  const updateFilter = (labelIndex, filterId, key, value) => {
    const updatedLabels = [...labels];
    updatedLabels[labelIndex].filters = updatedLabels[labelIndex].filters.map(
      (filter) =>
        filter.id === filterId ? { ...filter, [key]: value } : filter
    );
    setLabels(updatedLabels);
  };

  const saveFilter = () => {
    const updatedLabels = [
      ...labels,
      {
        name: "",
        conditions: [],
        newCondition: "",
        filters: [
          {
            id: Date.now(),
            // conditionCurrency: type === "AND" ? "provider" : "title",
            // conditionOperator: type === "AND" ? "=" : "CONTAINS",
            conditionCurrency: "",
            conditionOperator: "CONTAINS",
            conditionValue: "",
            type: "Condition",
          },
        ],
      },
    ];
    setLabels(updatedLabels);
    handleConfigurationChange("labels", updatedLabels);
  };

  const deleteLabel = (index) => {
    setLabels(labels.filter((_, i) => i !== index));
    setEditIndex(null);
  };

  const editLabel = (index) => {
    setEditIndex(index);
  };

  useEffect(() => {
    if (configuration?.selectedFileTypes?.length == 6) {
      handleConfigurationChange("allowAllFileTypes", true);
    } else {
      handleConfigurationChange("allowAllFileTypes", false);
    }
  }, [configuration?.selectedFileTypes]);

  useEffect(() => {
    if (configuration?.totalAmount?.selectedCurrency) {
      setSelectedCurrency(configuration?.totalAmount?.selectedCurrency);
    }
  }, [configuration?.totalAmount?.selectedCurrency]);

  useEffect(() => {
    if (count < 2) {
      setLabels(configuration.labels);
      console.log(`El efecto se ha ejecutado ${count + 1} vez/veces.`);
      setCount((prevCount) => prevCount + 1); // Incrementar el contador después de cada ejecución
    }
  }, [configuration.labels]);

  // useEffect(() => {
  //   handleConfigurationChange("labels", labels)
  // }, [labels]);

  console.log("configuration ==>", configuration);

  const handleTotalAmountFilter = (e, minMax) => {
    const minMaxAmount = {
      ...configuration.totalAmount,
      [minMax]: e.target.value,
    };
    handleConfigurationChange("totalAmount", minMaxAmount);
  };

  return (
    <div>
      {" "}
      <CustomAutomationsWrapper
        Icon={<ArrowSquare />}
        showContent={showContent.info1}
      >
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
          <CustomAutomationsWrapper
            Icon={<SearchWhite />}
            showContent={showContent.info8}
          >
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
                <div className={styles.keywordContainer}>
                  {fileKeywords.map((keyword, index) => (
                    <div className={styles.keyword} key={index}>
                      {keyword}
                      <DeleteButton
                        action={() => {
                          setFileKeywords((prevKeywords) =>
                            prevKeywords.filter((_, i) => i !== index)
                          );
                        }}
                      />
                    </div>
                  ))}
                </div>
                <InputComponent
                  value={configuration?.filesKeyWords}
                  setValue={(value) =>
                    handleConfigurationChange("filesKeyWords", value)
                  }
                  placeholder="Palabras clave separadas por coma"
                  typeInput="text"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const keywords = e.target.value
                        .split(",")
                        .map((keyword) => keyword.trim())
                        .filter((keyword) => keyword !== "");
                      setFileKeywords((prevKeywords) => [
                        ...prevKeywords,
                        ...keywords,
                      ]);
                      handleConfigurationChange("filesKeyWords", "");
                    }
                  }}
                />
                <CheckboxWithText
                  marginTop="10px"
                  color="#10A37F"
                  state={configuration?.filesExactMatch || false}
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
                  state={configuration?.allowAllFileTypes || false}
                  setState={(value) => {
                    handleConfigurationChange("allowAllFileTypes", value);
                    handleConfigurationChange(
                      "selectedFileTypes",

                      value ? ["PDF", "PNG", "JPG", "XML", "JSON", "HTML"] : []
                    );
                  }}
                  text="Incluir todos los tipos de archivos"

                  //     configuration?.selectedFileTypes?.includes(selected)
                  //       ? configuration?.selectedFileTypes?.filter(
                  //           (option) => option !== selected
                  //         )
                  //       : [
                  //           ...(configuration?.selectedFileTypes || []),
                  //           selected,
                  //         ]
                  //   )
                  // }
                />
                {!configuration?.allowAllFileTypes && (
                  <>
                    <div className={styles.cardTypesContainer}>
                      {(configuration?.selectedFileTypes || []).map((type) => (
                        <div className={styles.singleTypeCard} key={type}>
                          <span>{type}</span>
                          <DeleteButton
                            action={() =>
                              handleConfigurationChange(
                                "selectedFileTypes",
                                (configuration?.selectedFileTypes || []).filter(
                                  (option) => option !== type
                                )
                              )
                            }
                          ></DeleteButton>
                        </div>
                      ))}
                    </div>
                    <CustomDropdown
                      options={["PDF", "PNG", "JPG", "XML", "JSON", "HTML"]}
                      selectedOption={configuration?.selectedFileTypes || []}
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
                          configuration?.selectedFileTypes?.includes(selected)
                            ? configuration?.selectedFileTypes?.filter(
                                (option) => option !== selected
                              )
                            : [
                                ...(configuration?.selectedFileTypes || []),
                                selected,
                              ]
                        )
                      }
                    />
                  </>
                )}
              </div>
              <p className={styles.titleContentInput}>
                Filtro de Importe Total
                <div className={styles.currencyContainer}>
                  <div
                    className={styles.currencyDropdownButton}
                    onClick={() => setShowSelectCurrencyPopup(true)}
                  >
                    <span style={{ textTransform: "uppercase" }}>
                      {selectedCurrency}
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
                  <input
                    type="number"
                    placeholder="-"
                    onChange={(e) => handleTotalAmountFilter(e, "min")}
                    value={configuration?.totalAmount?.min}
                  />
                </div>
                <p>-</p>
                <div className={styles.quantityContent}>
                  <span>Max</span>
                  <input
                    type="number"
                    placeholder="-"
                    onChange={(e) => handleTotalAmountFilter(e, "max")}
                    value={configuration?.totalAmount?.max}
                  />
                </div>
              </span>
            </div>
          </CustomAutomationsWrapper>
          <CustomAutomationsWrapper
            Icon={<CircuitryIcon />}
            showContent={showContent.info9}
          >
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
              className={`${styles.contentContainer} ${
                showContent.info9 ? styles.active : styles.disabled
              }`}
            >
              <div className={styles.contentInput}>
                {labels?.map((label, index) => (
                  <div key={index}>
                    <div className={styles.titleContentInput}>
                      <div className={styles.labelName}>
                        <input
                          type="text"
                          placeholder="Nombre del Filtro"
                          value={label.name}
                          onChange={(e) => {
                            const updatedLabels = [...labels];
                            updatedLabels[index].name = e.target.value;
                            setLabels(updatedLabels);
                          }}
                          disabled={editIndex !== index}
                        />
                      </div>
                      {/* <span>{label.name || "Nombre del Filtro"}</span> */}
                      <div className={styles.optionsContentInput}>
                        <Button
                          type="button"
                          action={() => {
                            if (editIndex === index) {
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
                            {label.conditions.map((condition, i) => {
                              if (
                                condition === "" &&
                                editConditionIndex === null
                              ) {
                                const updatedLabels = [...labels];
                                updatedLabels[index].conditions.splice(i, 1); // Eliminar la condición vacía
                                setLabels(updatedLabels);
                                return null; // No renderizar nada para esta condición
                              }
                              return (
                                <div key={i} className={styles.condition}>
                                  {editIndex === index &&
                                  editConditionIndex === i ? (
                                    <textarea
                                      className={styles.conditionInput}
                                      type="text"
                                      value={condition}
                                      onChange={(e) => {
                                        const updatedLabels = [...labels];
                                        updatedLabels[index].conditions[i] =
                                          e.target.value;
                                        setLabels(updatedLabels);
                                      }}
                                      onBlur={() => setEditConditionIndex(null)}
                                      onKeyDown={(e) => {
                                        if (
                                          e.key === "Enter" ||
                                          e.key === "Escape"
                                        ) {
                                          setEditConditionIndex(null);
                                        }
                                      }}
                                    />
                                  ) : (
                                    <>
                                      <span
                                        onClick={() => {
                                          setEditConditionIndex(i);
                                        }}
                                      >
                                        {condition}
                                      </span>
                                      <DeleteButton
                                        action={() => {
                                          const updatedLabels = [...labels];
                                          updatedLabels[
                                            index
                                          ].conditions.splice(i, 1);
                                          setLabels(updatedLabels);
                                        }}
                                      />
                                    </>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                          <input
                            type="text"
                            placeholder="Escribe el prompt para identificar variables"
                            value={label.newCondition}
                            onChange={(e) => {
                              const updatedLabels = [...labels];
                              updatedLabels[index].newCondition =
                                e.target.value;
                              setLabels(updatedLabels);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                addCondition(index);
                                setEditConditionIndex(null);
                              }
                            }}
                          />

                          <Button
                            action={() => {
                              addCondition(index);
                              setEditConditionIndex(null);
                            }}
                            headerStyle={{
                              height: "40px",
                              padding: "13px 11px",
                            }}
                          >
                            {editConditionIndex == null ? "Generar" : "Guardar"}
                          </Button>
                        </div>

                        <div className={styles.filtersLabelOptions}>
                          {label.filters.map((filter) => (
                            <>
                              {" "}
                              {filter.type !== "Condition" ? (
                                <div
                                  className={styles.changeTypeContainerButton}
                                >
                                  <button
                                    className={`${styles.buttonAddFilter} ${filter.type == "AND" && styles.typeFilterBtn}`}
                                    onClick={() => {
                                      const updatedLabels = [...labels];
                                      const updatedFilters = updatedLabels[
                                        index
                                      ].filters.map((f) => {
                                        if (f.id === filter.id) {
                                          return {
                                            ...f,
                                            type: "AND",
                                          };
                                        }
                                        return f;
                                      });
                                      updatedLabels[index].filters =
                                        updatedFilters;
                                      setLabels(updatedLabels);
                                    }}
                                  >
                                    AND
                                  </button>{" "}
                                  <button
                                    className={`${styles.buttonAddFilter} ${filter.type == "OR" && styles.typeFilterBtn}`}
                                    onClick={() => {
                                      const updatedLabels = [...labels];
                                      const updatedFilters = updatedLabels[
                                        index
                                      ].filters.map((f) => {
                                        if (f.id === filter.id) {
                                          return {
                                            ...f,
                                            type: "OR",
                                          };
                                        }
                                        return f;
                                      });
                                      updatedLabels[index].filters =
                                        updatedFilters;
                                      setLabels(updatedLabels);
                                    }}
                                  >
                                    OR
                                  </button>
                                </div>
                              ) : (
                                <p>Condition</p>
                              )}
                              <FiltersLabelOptionsTemplate
                                key={filter.id}
                                conditionCurrency={filter.conditionCurrency}
                                setConditionCurrency={(value) =>
                                  updateFilter(
                                    index,
                                    filter.id,
                                    "conditionCurrency",
                                    value
                                  )
                                }
                                conditionOperator={filter.conditionOperator}
                                setConditionOperator={(value) =>
                                  updateFilter(
                                    index,
                                    filter.id,
                                    "conditionOperator",
                                    value
                                  )
                                }
                                conditionValue={filter.conditionValue}
                                setConditionValue={(value) =>
                                  updateFilter(
                                    index,
                                    filter.id,
                                    "conditionValue",
                                    value
                                  )
                                }
                                text={filter.type}
                                optionsFirst={
                                  label.conditions.length > 0
                                    ? label.conditions
                                    : ["No hay opciones disponibles"]
                                }
                                optionsSecond={
                                  // filter.type === "AND"
                                  //   ? [
                                  //       "=",
                                  //       "!=",
                                  //       ">",
                                  //       "<",
                                  //       ">=",
                                  //       "<=",
                                  //       "between",
                                  //       "not between",
                                  //       "in",
                                  //       "not in",
                                  //     ]
                                  //   : [
                                  //       "CONTAINS",
                                  //       "not contains",
                                  //       "starts with",
                                  //       "ends with",
                                  //       "matches regex",
                                  //       "before",
                                  //       "after",
                                  //       "on",
                                  //       "between dates",
                                  //       "day of week",
                                  //       "is null",
                                  //       "is not null",
                                  //     ]
                                  [
                                    "=",
                                    "!=",
                                    ">",
                                    "<",
                                    ">=",
                                    "<=",
                                    "between",
                                    "not between",
                                    "in",
                                    "not in",
                                    "contains",
                                    "not contains",
                                    "starts with",
                                    "ends with",
                                    "matches regex",
                                    "before",
                                    "after",
                                    "on",
                                    "between dates",
                                    "day of week",
                                    "is null",
                                    "is not null",
                                  ]
                                }
                              />
                            </>
                          ))}
                          <button
                            onClick={() => addFilter(editIndex, "AND")}
                            className={styles.buttonAddFilter}
                          >
                            Añadir Condición
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className={styles.buttonsTypeCondition}>
                <Button
                  headerStyle={{
                    height: "40px",
                    padding: "13px 11px",
                  }}
                  action={() => {
                    if (editIndex != null) {
                      editLabel(null);
                    } else if (labels?.length === 0) {
                      saveFilter();
                    } else {
                      saveFilter();
                    }
                  }}
                >
                  {editIndex != null
                    ? "Guardar Filtro"
                    : labels?.length === 0
                      ? "Crear Filtro"
                      : "Crear Filtro"}
                </Button>
              </div>
            </div>
          </CustomAutomationsWrapper>

          <CustomAutomationsWrapper
            Icon={<WhiteClock />}
            showContent={configuration?.actionFrequency}
          >
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
          </CustomAutomationsWrapper>
        </div>
      </CustomAutomationsWrapper>
      {showSelectCurrencyPopup && (
        <SelectCurrencyPopup
          setShowSelectCurrencyPopup={setShowSelectCurrencyPopup}
          setSelectedCurrency={setSelectedCurrency}
          selectedCurrency={selectedCurrency}
        />
      )}
    </div>
  );
};

export default SelectInfoToProcess;
