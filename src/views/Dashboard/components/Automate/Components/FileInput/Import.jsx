

import React, { useState } from "react";

import CustomAutomationsWrapper from "../../../CustomAutomationsWrapper/CustomAutomationsWrapper";

import { ReactComponent as WhiteFolder } from "../../../../assets/whiteFolder.svg";
import { ReactComponent as GrayChevron } from "../../../../assets/grayChevron.svg";
import { ReactComponent as ArrowSquare } from "../../../../assets/whiteArrowSquareIn.svg";

import styles from "./FileInput.module.css";


import AddEmailsInput from "../AddEmailsInput/AddEmailsInput";
import CheckboxWithText from "../../../CheckboxWithText/CheckboxWithText";
import InputComponent from "../../../InputComponent/InputComponent";
import CustomDropdown from "../../../CustomDropdown/CustomDropdown";

import OptionsSwitchComponent from "../../../OptionsSwichComponent/OptionsSwitchComponent";


import SearchSVG from "../../svgs/SearchSVG";

const Import = ({
    setShowSelectOutputLocation,
    handleConfigurationChange,
    configuration
}) => {

    const [showContent, setShowContent] = useState({
        info1: false,
    });

    return (
        <CustomAutomationsWrapper 
        Icon={<WhiteFolder />}
        showContent={showContent.info1}
        >
            <div
                className={`${styles.infoContainerWrapper}`}
                onClick={() =>
                    setShowContent({ ...showContent, info1: !showContent.info1 })
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
                className={`${styles.contentContainer} ${showContent.info1 ? styles.active : styles.disabled}`}
            >
                <div className={styles.contentInput}>
                    <p className={styles.titleContentInput}>Ubicación</p>

                    <InputComponent
                        readOnly={true}
                        value={configuration?.folderLocation}
                        setValue={(value) =>
                            handleConfigurationChange("folderLocation", value)
                        }
                        textButton="Seleccionar Ubicación"
                        placeholder="/Inicio"
                        icon={<SearchSVG />}
                        action={() => setShowSelectOutputLocation(true)}
                    />
                </div>

                <CustomAutomationsWrapper Icon={<ArrowSquare />} showContent={configuration?.selectStandardExport}>
                    <div
                        className={styles.infoContainerWrapper}
                        // onClick={() =>
                        //     setShowContent({ ...showContent, info7: !showContent.info7 })
                        // }
                    >
                        <div className={styles.infoContainer}>
                            <div>Selecciona el destino de exportación</div>
                            <span>Seleccionar estándar de exportación</span>
                        </div>
                        <OptionsSwitchComponent
                            border={"none"}
                            marginLeft={"auto"}
                            isChecked={configuration?.selectStandardExport || false}
                            setIsChecked={(value) =>
                                handleConfigurationChange("selectStandardExport", value)
                            }
                        />
                    </div>
                    <div
                        className={`${styles.contentContainer} ${configuration?.selectStandardExport ? styles.active : styles.disabled}`}
                    >
                        <p
                            style={{ marginBottom: "10px" }}
                            className={styles.titleContentInput}
                        >
                            Formato del Archivo
                        </p>
                        <CustomDropdown
                            options={["XML", "FacturaE", "UBL", "PEPPOL"]}
                            selectedOption={configuration?.selectedStandardExport || []}
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
            </div>
        </CustomAutomationsWrapper>
    )
}

export default Import