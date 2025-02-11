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
  labelOptions = false,
  options = false,
  readOnly,
  isTextarea = false, // Nueva prop para determinar si es textarea
  typeclient = false,
  info,
}) => {
  const { t } = useTranslation("accountSetting");
  const [sectionSelected, setSectionSelected] = useState(0);
  const [nameEditing, setNameEditing] = useState(false);

  const [editable, setEditable] = useState(false);
  const [newValue, setNewValue] = useState(value);
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    if (editable) {
      inputRef.current?.focus();
      if (isTextarea) {
        inputRef.current.style.height = "auto"; // Reset para recalcular
        inputRef.current.style.height = inputRef.current.scrollHeight + "px";
      }
    }
  }, [editable, newValue]);

  useEffect(() => {
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailError(
        emailRegex.test(newValue) ? "" : "El correo electrónico no es válido."
      );
    }
  }, [newValue]);

  const handlePasswordVerify = () => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+={}\-;:'",.<>?]{8,}$/;
    setPasswordError(
      passwordRegex.test(newValue)
        ? ""
        : "At least 8 characters, containing a letter and a number"
    );
  };

  const handleEditClick = () => {
    if (editable) {
      onSave({ name, newValue });
    }
    setEditable(!editable);
  };

  return (
    <div className={styles.editableInputContainer}>
      <div className={styles.editableInputHeader}>
        <p>
          {" "}
          {!labelOptions && <span>{label}</span>}{" "}
          {info && <span className={styles.info}>{info}</span>}
        </p>
        {!options && (
          <div
            onClick={handleEditClick}
            style={{ cursor: readOnly ? "not-allowed" : "pointer" }}
          >
            {editable ? "Guardar" : "Editar"}
          </div>
        )}
      </div>

      <div className={styles.editableInput}>
        {initialValue !== "" && <span>{initialValue}</span>}
        {isTextarea ? (
          <textarea
            ref={inputRef}
            placeholder={placeholder}
            name={name}
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            readOnly={readOnly !== undefined ? readOnly : !editable}
            className={styles.textarea} // Agrega estilos específicos si es necesario
          />
        ) : (
          <div className={styles.typeclient}>
            {" "}
            <input
              ref={inputRef}
              type={type}
              placeholder={placeholder}
              name={name}
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              readOnly={readOnly !== undefined ? readOnly : !editable}
            />
            {typeclient && (
              <div className={styles.btnSectionsSelector}>
                <button
                  type="button"
                  className={`${sectionSelected === 0 ? styles.sectionSelect : ""}`}
                  onClick={() => setSectionSelected(0)}
                  disabled={readOnly !== undefined ? readOnly : !editable}
                >
                  Servicio
                </button>
                <button
                  type="button"
                  className={`${sectionSelected === 1 ? styles.sectionSelect : ""}`}
                  onClick={() => setSectionSelected(1)}
                  disabled={readOnly !== undefined ? readOnly : !editable}
                >
                  Producto
                </button>
              </div>
            )}
          </div>
        )}

        {verify && editable && (
          <span
            className={styles.verify}
            onClick={handlePasswordVerify}
            style={{ cursor: "pointer" }}
          >
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
