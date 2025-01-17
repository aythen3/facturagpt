import React, { useState } from "react";
import styles from "./EditableInput.module.css";
import { ReactComponent as Minus } from "../../../assets/minus.svg";
const PhoneNumberInput = ({ isEditing, onDelete }) => {
  return (
    <div className={styles.phoneContainer}>
      <select disabled={!isEditing}>
        <option value="34">España, (+34)</option>
        <option value="1">Estados Unidos, (+1)</option>
        <option value="52">México, (+52)</option>
        <option value="54">Argentina, (+54)</option>
        <option value="55">Brasil, (+55)</option>
        <option value="44">Reino Unido, (+44)</option>
        <option value="33">Francia, (+33)</option>
        <option value="49">Alemania, (+49)</option>
      </select>
      <input type="text" placeholder="000 000 000" disabled={!isEditing} />
      <div
        className={styles.delete}
        onClick={onDelete}
        style={{ background: !isEditing && "#dd7a84" }}
      >
        <Minus className={styles.icon} />
      </div>
    </div>
  );
};

const EditableInput = ({
  label,
  nameInput,
  placeholderInput,
  children,
  type = "text",
  onClick,
  isEditing,
  value,
  onChange,
  options = true,
  phone = false,
}) => {
  const [phoneInputs, setPhoneInputs] = useState([]);

  const toggleEditing = () => {
    onClick();
  };

  const addPhoneNumberInput = () => {
    setPhoneInputs((prevInputs) => [
      ...prevInputs,
      <PhoneNumberInput
        key={prevInputs.length}
        isEditing={isEditing}
        onDelete={() => removePhoneNumberInput(prevInputs.length)}
      />,
    ]);
  };

  const removePhoneNumberInput = (index) => {
    if (isEditing)
      setPhoneInputs((prevInputs) => prevInputs.filter((_, i) => i !== index));
  };

  return (
    <label className={styles.labelEditableInput}>
      <div className={styles.row}>
        <p>{label}</p>
        <div style={{ display: "flex", gap: "10px" }}>
          {options && (
            <div className={styles.button} onClick={toggleEditing}>
              {isEditing ? "Guardar" : "Editar"}
            </div>
          )}
          {phone && (
            <div className={styles.button} onClick={addPhoneNumberInput}>
              Añadir Nuevo
            </div>
          )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexDirection: phone && "column",
        }}
      >
        {phone === true ? (
          <>
            {phoneInputs.map((input, index) => (
              <PhoneNumberInput
                key={index}
                isEditing={isEditing}
                onDelete={() => removePhoneNumberInput(index)}
              />
            ))}
            <PhoneNumberInput
              isEditing={isEditing}
              onDelete={() => removePhoneNumberInput(phoneInputs.length)}
            />
          </>
        ) : type == "textarea" ? (
          <textarea
            type={type}
            placeholder={placeholderInput}
            value={value}
            disabled={!isEditing}
            name={nameInput}
            onChange={onChange}
          ></textarea>
        ) : (
          <input
            type={type}
            placeholder={placeholderInput}
            value={value}
            disabled={!isEditing}
            name={nameInput}
            onChange={onChange}
          />
        )}
        {children}
      </div>
    </label>
  );
};

export default EditableInput;
