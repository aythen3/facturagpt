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
  maxLength,
  titleColor = "#676b5f",
  textStyles = {
    fontSize: "13px",
    fontWeight: 400,
    color: "#676b5f",
  },
  inputHeight = "44px",
}) => {
  const placeholderStyle = `
  input::placeholder {
      font-size: ${textStyles.fontSize};
      font-weight: ${textStyles.fontWeight};
      color: ${textStyles.color};
  }
`;
  return (
    <div style={{ width }} className={styles.inputWithTitleContainer}>
      {title && (
        <h2 style={{ color: titleColor }} className={styles.inputTitle}>
          {title}
        </h2>
      )}
      <div
        style={{ backgroundColor: bgColor, height: inputHeight }}
        className={styles.inputContainer}
      >
        <style>{placeholderStyle}</style>
        <input
          style={textStyles}
          type={type}
          placeholder={placeholder}
          value={value}
          maxLength={maxLength}
          onChange={onChange}
          className={styles.inputWithTitle}
        />
        {rightElement && rightElement}
      </div>
    </div>
  );
};

export default InputWithTitle;
