import React from "react";
import styles from "./InputComponent.module.css";

const InputComponent = ({
  icon,
  placeholder,
  textButton,
  typeInput,
  value,
  setValue,
  readOnly,
  action,
}) => {
  return (
    <div className={styles.inputContainer}>
      <div className={styles.inputWrapper}>
        {icon && <div className={styles.iconContainer}>{icon}</div>}
        <input
          readOnly={readOnly}
          className={styles.inputField}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type={typeInput}
          placeholder={placeholder}
        />
      </div>
      <p onClick={action} className={styles.actionText}>
        {textButton}
      </p>
    </div>
  );
};

export default InputComponent;
