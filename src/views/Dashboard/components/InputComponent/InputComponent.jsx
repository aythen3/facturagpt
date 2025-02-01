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
  options = [],
}) => {
  return (
    <div className={styles.inputContainer}>
      <div className={styles.inputWrapper}>
        {icon && <div className={styles.iconContainer}>{icon}</div>}
        {typeInput === "select" ? (
          <select
            className={styles.inputField}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={readOnly}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            readOnly={readOnly}
            className={styles.inputField}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type={typeInput}
            placeholder={placeholder}
          />
        )}
      </div>
      {textButton && (
        <p onClick={action} className={styles.actionText}>
          {textButton}
        </p>
      )}
    </div>
  );
};

export default InputComponent;
