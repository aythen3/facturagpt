import React from "react";
import styles from "./TextareaComponent.module.css";

const TextareaComponent = ({ placeholder = "Mensaje", value, onChange }) => {
  return (
    <textarea
      className={styles.textarea}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default TextareaComponent;
