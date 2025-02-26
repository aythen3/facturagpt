import React from "react";
import styles from "./FiltersLabelOptionsTemplate.module.css";
import CustomDropdown from "../../../CustomDropdown/CustomDropdown";

const FiltersLabelOptionsTemplate = ({
  conditionCurrency,
  setConditionCurrency,
  conditionOperator,
  setConditionOperator,
  conditionValue,
  setConditionValue,
  text,
  optionsFirst,
  optionsSecond,
}) => {
  const customDropdownStyles = {
    colorHeader: "#FFFFFF",
    borderRadius: "8px",
    background: "#4F5660",
    display: "flex",
    padding: "3px 8px",
    alignItems: "center",
    gap: "8px",
  };

  return (
    <div className={styles.FiltersLabelOptionsTemplate}>
      <p>{text}</p>
      <CustomDropdown
        editable={true}
        editing={true}
        options={optionsFirst}
        selectedOption={conditionCurrency}
        setSelectedOption={setConditionCurrency}
        textStyles={{ ...customDropdownStyles }}
        customStyles={styles.transparentBG}
      />
      <CustomDropdown
        editable={true}
        editing={true}
        options={optionsSecond}
        selectedOption={conditionOperator}
        setSelectedOption={setConditionOperator}
        customStyles={styles.transparentBG}
      />
      <input
        type="text"
        placeholder="1000"
        value={conditionValue}
        onChange={(e) => setConditionValue(e.target.value)}
      />
    </div>
  );
};

export default FiltersLabelOptionsTemplate;
