import React from "react";
import styles from "./Button.module.css";

const Button = ({
  children,
  type = "green",
  action,
  headerStyle = {},
  disabledOption = false,
}) => {
  const typeClasses = {
    green: styles.buttonTemplateGreen,
    white: styles.buttonTemplateWhite,
    gray: styles.buttonTemplateGray,
    discard: styles.buttonTemplateDiscard,
    button: styles.buttonTemplateButton,
  };

  return (
    <button
      onClick={action}
      type="button"
      className={`${styles.buttonTemplate} ${typeClasses[type] || ""}`}
      style={headerStyle}
      disabled={disabledOption}
    >
      {children}
    </button>
  );
};

export default Button;
