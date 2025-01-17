import React from "react";
import styles from "./Button.module.css";
const Button = ({ children, type = "green" }) => {
  return (
    <button
      type="button"
      className={`${styles.buttonTemplate} ${type == "green" && styles.buttonTemplateGreen} ${type == "white" && styles.buttonTemplateWhite}`}
    >
      {children}
    </button>
  );
};

export default Button;
