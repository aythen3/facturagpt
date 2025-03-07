import React from "react";
import styles from "./CheckboxWithText.module.css";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

const CheckboxWithText = ({
  state,
  setState,
  text,
  color = "#0A5B48",
  marginTop = "0px",
}) => {
  return (
    <div style={{ marginTop }} className={styles.checkboxWithTextContainer}>
    
     <input
        type="checkbox"
        onChange={(e) => setState(e.target.checked)}
        value={state}
        checked={state}
      />

      <span className={styles.text}>{text}</span>
    </div>
  );
};

export default CheckboxWithText;
