import React, { useState, useRef, useEffect } from "react";
import styles from "./FileInput.module.css";
import { useTranslation } from "react-i18next";

const EditableInput = ({ configuration, handleConfigurationChange }) => {
  const { t } = useTranslation("accountSetting");
  const [sectionSelected, setSectionSelected] = useState(0);
  const [nameEditing, setNameEditing] = useState(false);

  const [editable, setEditable] = useState(false);
  const [newValue, setNewValue] = useState(configuration?.inputValue || "");
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
      handleConfigurationChange("inputValue", newValue);
    }
    setEditable(!editable);
  };

  const label = "Nombre de la Automatización";
  const placeholder = "Automatización 1";
  const options = true;
  const readOnly = false;
  const labelOptions = false;
  const info = "Nombre de la Automatización";
  const type = "text";
  const initialValue = configuration?.inputValue || "";
  const isTextarea = false;
  const typeclient = false;
  const verify = false;
  const name = "automatization";

  return (
    <div className={styles.editableInputContainer}>
      <div className={styles.editableInputHeader}>
        <p>
          {!labelOptions && <span>{label}</span>}{" "}
          {/* {info && <span className={styles.info}>{info}</span>} */}
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
        {/* {initialValue !== "" && <span>{initialValue}</span>} */}
        {isTextarea ? (
          <textarea
            ref={inputRef}
            placeholder={placeholder}
            name={name}
            value={newValue}
            onChange={(e) => {
              setNewValue(e.target.value);
              handleConfigurationChange("inputValue", e.target.value);
            }}
            readOnly={readOnly !== undefined ? readOnly : !editable}
            className={`${styles.textarea} ${styles.inputTypeClient}`} // Agrega estilos específicos si es necesario
          />
        ) : (
          <div style={{ display: "flex", gap: "20px" }}>
            {" "}
            <input
              ref={inputRef}
              type={type}
              placeholder={placeholder}
              name={name}
              value={configuration?.inputValue || newValue}
              onChange={(e) => {
                setNewValue(e.target.value);
                handleConfigurationChange("inputValue", e.target.value);
              }}
              readOnly={readOnly !== undefined ? readOnly : !editable}
              className={styles.inputTypeClient}
            />
            {typeclient && (
              <div
                className={`${styles.typeClient} ${readOnly ? styles.typeClientActivate : styles.typeClientDisabled}`}
              >
                <button
                  className={sectionSelected == 0 && styles.selected}
                  onClick={() => setSectionSelected(0)}
                  type="button"
                  disabled={readOnly}
                >
                  servicio
                </button>
                <button
                  className={sectionSelected == 1 && styles.selected}
                  onClick={() => setSectionSelected(1)}
                  type="button"
                  disabled={readOnly}
                >
                  producto
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
