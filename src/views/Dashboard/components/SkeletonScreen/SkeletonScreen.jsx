import React from "react";
import styles from "./SkeletonScreen.module.css";
const SkeletonScreen = ({
  handleDragOver,
  handleDrop,
  handleFileChange,
  placeholder = "Selecciona un archivo o arrastra",
  labelText = "Selecciona un archivo o arrastra y suelta",
  helperText = "Gestiona todos tus documentos fácilmente.",
  inputId = "CustomFileInput",
  showInput = true,
  enableLabelClick = true,
  onLabelClick,
}) => {
  return (
    <div
      className={styles.inputContainer}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {showInput && (
        <input
          type="file"
          onChange={handleFileChange}
          placeholder={placeholder}
          id={inputId}
        />
      )}
      <label
        onClick={() => {
          if (enableLabelClick) {
            document.querySelector(`#${inputId}`).click();
            onLabelClick();
          }
        }}
      >
        <p>{labelText}</p> <span>{helperText}</span>
      </label>
    </div>
  );
};

export default SkeletonScreen;
