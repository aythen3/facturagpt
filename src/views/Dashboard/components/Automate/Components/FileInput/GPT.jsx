import React, { useState } from "react";

import CustomAutomationsWrapper from "../../../CustomAutomationsWrapper/CustomAutomationsWrapper";

import styles from "./FileInput.module.css";


import AddEmailsInput from "../AddEmailsInput/AddEmailsInput";
import CheckboxWithText from "../../../CheckboxWithText/CheckboxWithText";
import InputComponent from "../../../InputComponent/InputComponent";
import CustomDropdown from "../../../CustomDropdown/CustomDropdown";

import OptionsSwitchComponent from "../../../OptionsSwichComponent/OptionsSwitchComponent";

import { ReactComponent as WhiteBolt } from "../../../../assets/whiteBolt.svg";



const GPT = ({
    handleConfigurationChange,
    configuration
}) => {

    const [showContent, setShowContent] = useState({
        info4: false,
    });

    return (
        
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
              isChecked={configuration?.documentStatus || false}
              setIsChecked={(value) =>
                handleConfigurationChange("documentStatus", value)
              }
            />
          </div>
          <div
            className={`${styles.contentContainer} ${configuration?.documentStatus ? styles.active : styles.disabled}`}
          >
            <CustomDropdown
              options={["Pendiente", "Finalizado", "Anulado"]}
              selectedOption={configuration?.selectedDocumentStatus || []}
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
    )
}

export default GPT