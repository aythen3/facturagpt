import React from "react";
import styles from "./Button.module.css";
const Button = ({
  children,
  type = "green",
  action,
  headerStyle = {},
  disabledOption = false,
}) => {
  return (
    <button
      onClick={action}
      type="button"
      className={`${styles.buttonTemplate} ${type == "green" && styles.buttonTemplateGreen} ${type == "white" && styles.buttonTemplateWhite} ${type == "discard" && styles.buttonTemplateDiscard} `}
      style={headerStyle}
      disabled={disabledOption}
    >
      {children}
    </button>
  );
};

export default Button;
