import React from "react";
import styles from "./LabelInputComponent.module.css";

const LabelInputComponent = ({
  label,
  placeholder,
  inputType = "text",
  isSelect,
  options,
  value,
  setValue,
  maxLength,
}) => {
  return (
    <div className={styles.labelInputContainer}>
      <label className={styles.label} htmlFor="">
        {label}
      </label>
      {!isSelect ? (
        <input
          className={styles.input}
          value={value}
          maxLength={maxLength}
          onChange={(e) => {
            const value = e.target.value;
            if (!maxLength) {
              setValue(value);
              return;
            }
            if (value.length <= maxLength) {
              setValue(value);
            }
          }}
          type={inputType}
          placeholder={placeholder}
        />
      ) : (
        <select className={styles.select}>
          {options.map((option) => (
            <option key={option} value="">
              {option}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default LabelInputComponent;
