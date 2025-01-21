import React, { useState, useRef, useEffect } from "react";
import styles from "./EditableInput.module.css";
import { useTranslation } from "react-i18next";

const EditableInput = ({
  label,
  initialValue = "",
  value,
  onSave,
  type = "text",
  verify = false,
  name,
  placeholder,
}) => {
  const { t } = useTranslation("accountSetting");

  const [editable, setEditable] = useState(false);
  const [newValue, setNewValue] = useState(value);

  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    if (editable) {
      inputRef.current?.focus();
    }
  }, [editable]);

  useEffect(() => {
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(newValue)) {
        setEmailError("El correo electrónico no es válido.");
      } else {
        setEmailError("");
      }
    }
  }, [newValue]);

  const handlePasswordVerify = () => {
    console.log("verifying password", newValue);
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+={}\-;:'",.<>?]{8,}$/;
    if (!passwordRegex.test(newValue)) {
      console.log("error..");
      setPasswordError(
        "At least 8 characters, containing a letter and a number"
      );
    } else {
      setPasswordError("");
    }
  };

  const handleEditClick = () => {
    if (editable) {
      onSave({ name, newValue });
      setEditable(false);
    } else {
      setEditable(true);
    }
  };

  return (
    <div className={styles.editableInputContainer}>
      <div className={styles.editableInputHeader}>
        <span>{label}</span>
        <div onClick={handleEditClick}>{editable ? "Guardar" : "Editar"}</div>
      </div>

      <div className={styles.editableInput}>
        {initialValue !== "" && <span>{initialValue}</span>}
        <input
          placeholder={placeholder}
          ref={inputRef}
          name={name}
          type={type}
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          readOnly={!editable}
        />
        {verify && (
          <span className={styles.verify} onClick={handlePasswordVerify}>
            {t("verify")}
          </span>
        )}
      </div>
      {emailError && <span className={styles.error}>{emailError}</span>}
      {passwordError && <span className={styles.error}>{passwordError}</span>}
    </div>
  );
};

export default EditableInput;
