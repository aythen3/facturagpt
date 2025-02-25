import React from "react";
import styles from "./OptionsPopup.module.css";

const OptionsPopup = ({ options }) => {
  return (
    <div className={styles.OptionsPopupContainer}>
      {options.map((option, index) => (
        <div key={index} onClick={option.onClick}>
          {option.label}
        </div>
      ))}
    </div>
  );
};

export default OptionsPopup;
