import React from "react";
import styles from "./CheckboxWithText.module.css";

const CheckboxWithText = ({
  state,
  setState,
  text,
  color = "#0A5B48",
  marginTop = "0px",
}) => {
  return (
    <div style={{ marginTop }} className={styles.checkboxWithTextContainer}>
      {/* {state ? (
        <MdCheckBox
          style={{ cursor: "pointer" }}
          onClick={() => setState(false)}
          size={20}
          color={color}
        />
      ) : (
        <MdCheckBoxOutlineBlank
          style={{ cursor: "pointer" }}
          onClick={() => setState(true)}
          size={20}
          color="#b9b9b9"
        />
      )} */}
      <input
        type="checkbox"
        onClick={() => setState((prev) => !prev)}
        value={state}
      />
      <span className={styles.text}>{text}</span>
    </div>
  );
};

export default CheckboxWithText;
