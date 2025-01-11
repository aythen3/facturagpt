import React from "react";
import styles from "./InputWithTitle.module.css";

const InputWithTitle = ({
  bgColor = "#f5f5f5",
  title,
  placeholder,
  value,
  onChange,
  width = "100%",
  type = "text",
  rightElement = null,
}) => {
  return (
    <div style={{ width }} className={styles.inputWithTitleContainer}>
      {title && <h2 className={styles.inputTitle}>{title}</h2>}
      <div
        style={{ backgroundColor: bgColor }}
        className={styles.inputContainer}
      >
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={styles.inputWithTitle}
        />
        {rightElement && rightElement}
      </div>
    </div>
  );
};

export default InputWithTitle;
