import React, { useEffect, useState } from "react";

import CustomAutomationsWrapper from "../../../CustomAutomationsWrapper/CustomAutomationsWrapper";

import styles from "./FileInput.module.css";

import { ReactComponent as ArrowSquare } from "../../../../assets/whiteArrowSquareIn.svg";
import { ReactComponent as GrayChevron } from "../../../../assets/grayChevron.svg";
import { ReactComponent as WhiteText } from "../../../../assets/whiteText.svg";
import { ReactComponent as WhiteClock } from "../../../../assets/whiteClock.svg";

import OptionsSwitchComponent from "../../../OptionsSwichComponent/OptionsSwitchComponent";

import AddEmailsInput from "../AddEmailsInput/AddEmailsInput";
import CheckboxWithText from "../../../CheckboxWithText/CheckboxWithText";
import InputComponent from "../../../InputComponent/InputComponent";
import CustomDropdown from "../../../CustomDropdown/CustomDropdown";

import Advertency from "../Advertency/Advertency";
import DeleteButton from "../../../DeleteButton/DeleteButton";

const Export = ({ handleConfigurationChange, configuration }) => {
  const [showContent, setShowContent] = useState({
    info2: false,
  });

  // const [configuration, setConfiguration] = useState({
  //     addedRemitents: [],
  // });
  const [subjectContains, setSubjectContains] = useState([]);
  const [messageContains, setMessageContains] = useState([]);
  useEffect(() => {
    if (configuration?.selectedTypes?.length == 6) {
      handleConfigurationChange("attachmentExactMatch", true);
    } else {
      handleConfigurationChange("attachmentExactMatch", false);
    }
  }, [configuration?.selectedTypes]);

  useEffect(() => {
    const compareValues =
      JSON.stringify(configuration.showContentImport) !==
      JSON.stringify(showContent);
    if (configuration.showContentExport && compareValues) {
      setShowContent(configuration.showContentExport);
    }
  }, [configuration.showContentExport]);

  return (
    <CustomAutomationsWrapper
      Icon={<ArrowSquare />}
      showContent={showContent.info2}
    >
      <div
        className={styles.infoContainerWrapper}
        onClick={() => {
          const updateShowContent = {
            ...showContent,
            info2: !showContent.info2,
          };
          setShowContent(updateShowContent);
          handleConfigurationChange("showContentExport", updateShowContent);
        }}
      >
        <GrayChevron />
        <div className={styles.infoContainer}>
          <div>Selecciona la información a extraer</div>
          <span>
            Aplica filtros avanzados para procesar solo los datos que realmente
            importan.
          </span>
        </div>
      </div>
      <div
        className={`${styles.contentContainer} ${showContent.info2 ? styles.active : styles.disabled}`}
      >
        <div className={styles.contentInput}>
          <p className={styles.titleContentInput}>Remitentes</p>
          {!configuration?.includeAllRemitents && (
            <AddEmailsInput
              addedEmails={configuration?.addedRemitents}
              setAddedEmails={(value) =>
                handleConfigurationChange("addedRemitents", value)
              }
              placeholder="ejemplo@email.com"
            />
          )}
          <CheckboxWithText
            color="#10A37F"
            marginTop="10px"
            state={configuration?.includeAllRemitents}
            setState={(value) =>
              handleConfigurationChange("includeAllRemitents", value)
            }
            text="Incluir todos los remitentes"
          />
        </div>

        <div className={styles.contentInput}>
          <p className={styles.titleContentInput}>Asunto Contiene</p>
          {!configuration.subjectExactMatch && (
            <>
              <div className={styles.keywordContainer}>
                {subjectContains.map((keyword, index) => (
                  <div className={styles.keyword} key={index}>
                    {keyword}
                    <DeleteButton
                      action={() => {
                        setSubjectContains((prevKeywords) =>
                          prevKeywords.filter((_, i) => i !== index)
                        );
                      }}
                    />
                  </div>
                ))}
              </div>
              <InputComponent
                value={configuration?.subjectKeyWords}
                setValue={(value) =>
                  handleConfigurationChange("subjectKeyWords", value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const keywords = e.target.value
                      .split(",")
                      .map((keyword) => keyword.trim())
                      .filter((keyword) => keyword !== "");
                    console.log(keywords);
                    setSubjectContains((prevKeywords) => [
                      ...prevKeywords,
                      ...keywords,
                    ]);
                    handleConfigurationChange("subjectKeyWords", "");
                  }
                }}
                placeholder="Palabras clave separadas por coma"
                typeInput="text"
              />
            </>
          )}
          {/* <InputComponent
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
                      console.log(keywords);
                      setFileKeywords((prevKeywords) => [
                        ...prevKeywords,
                        ...keywords,
                      ]);
                      handleConfigurationChange("filesKeyWords", "");
                    }
                  }}
                /> */}
          <CheckboxWithText
            marginTop="10px"
            color="#10A37F"
            state={configuration?.subjectExactMatch || false}
            setState={(value) =>
              handleConfigurationChange("subjectExactMatch", value)
            }
            text="Match exacto"
          />
        </div>

        <div className={styles.contentInput}>
          <p className={styles.titleContentInput}>Mensaje Contiene</p>
          <div className={styles.keywordContainer}>
            {messageContains.map((keyword, index) => (
              <div className={styles.keyword} key={index}>
                {keyword}
                <DeleteButton
                  action={() => {
                    setMessageContains((prevKeywords) =>
                      prevKeywords.filter((_, i) => i !== index)
                    );
                  }}
                />
              </div>
            ))}
          </div>
          <InputComponent
            value={configuration?.bodyKeyWords}
            setValue={(value) =>
              handleConfigurationChange("bodyKeyWords", value)
            }
            placeholder="Palabras clave separadas por coma"
            typeInput="text"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const keywords = e.target.value
                  .split(",")
                  .map((keyword) => keyword.trim())
                  .filter((keyword) => keyword !== "");
                console.log(keywords);
                setMessageContains((prevKeywords) => [
                  ...prevKeywords,
                  ...keywords,
                ]);
                handleConfigurationChange("bodyKeyWords", "");
              }
            }}
          />

          <CheckboxWithText
            color="#10A37F"
            marginTop="10px"
            state={configuration?.bodyExactMatch || false}
            setState={(value) =>
              handleConfigurationChange("bodyExactMatch", value)
            }
            text="Match exacto"
          />
        </div>

        <div className={styles.contentInput}>
          <p className={styles.titleContentInput}>Tipos de Archivo</p>

          <CheckboxWithText
            marginTop="10px"
            color="#10A37F"
            state={configuration?.attachmentExactMatch || false}
            // setState={(value) =>
            //   handleConfigurationChange("attachmentExactMatch", value)
            // }

            setState={(value) => {
              handleConfigurationChange("attachmentExactMatch", value);
              handleConfigurationChange(
                "selectedTypes",
                value ? ["PDF", "PNG", "JPG", "XML", "JSON", "HTML"] : []
              );
            }}
            text="Incluir todos los tipos de archivos"
          />
          {!configuration?.attachmentExactMatch && (
            <>
              <div className={styles.cardTypesContainer}>
                {(configuration?.selectedTypes || []).map((type) => (
                  <div className={styles.singleTypeCard} key={type}>
                    <span>{type}</span>
                    <div
                      onClick={() =>
                        handleConfigurationChange(
                          "selectedTypes",
                          (configuration?.selectedTypes || []).filter(
                            (option) => option !== type
                          )
                        )
                      }
                      className={styles.minusIcon}
                    >
                      <DeleteButton
                        action={() =>
                          handleConfigurationChange(
                            "selectedTypes",
                            (configuration?.selectedTypes || []).filter(
                              (option) => option !== type
                            )
                          )
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
              <CustomDropdown
                options={["PDF", "PNG", "JPG", "XML", "JSON", "HTML"]}
                selectedOption={configuration?.selectedTypes || []}
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
                    "selectedTypes",
                    configuration?.selectedTypes?.includes(selected)
                      ? configuration?.selectedTypes.filter(
                          (option) => option !== selected
                        )
                      : [...(configuration?.selectedTypes || []), selected]
                  )
                }
              />
            </>
          )}

          <Advertency
            text={
              "Si el correo no tiene archivos adjuntos no se guardará ninguna factura"
            }
          />
        </div>

        <CustomAutomationsWrapper
          Icon={<WhiteText />}
          showContent={configuration?.renameFiles}
        >
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
        </CustomAutomationsWrapper>

        <CustomAutomationsWrapper
          Icon={<WhiteClock />}
          showContent={configuration?.actionExtractionFrequency}
        >
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
              isChecked={configuration?.actionExtractionFrequency || false}
              setIsChecked={(value) =>
                handleConfigurationChange("actionExtractionFrequency", value)
              }
            />
          </div>
          <div
            className={`${styles.contentContainer} ${configuration?.actionExtractionFrequency ? styles.active : styles.disabled}`}
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
              selectedOption={
                configuration?.selectedActionExtractionFrequency || []
              }
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
                  "selectedActionExtractionFrequency",
                  selected
                )
              }
            />
          </div>
        </CustomAutomationsWrapper>
      </div>
    </CustomAutomationsWrapper>
  );
};

export default Export;
