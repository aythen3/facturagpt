import React, { useState } from "react";
import styles from "./EditableRow.module.css";
import Button from "../../Button/Button";

const EditableRow = ({
  label,
  buttonLabel,
  hasPercentage,
  hasButton,
  action,
  oneRow = false,
  updateValue,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [percentageValue, setPercentageValue] = useState(hasPercentage || "");

  const handleChange = (e) => {
    const newValue = e.target.value;
    setPercentageValue(newValue);
    if (updateValue) {
      updateValue(newValue);
    }
  };

  return (
    <div
      className={`${styles.editableRow} ${oneRow && styles.editableRowFlex}`}
    >
      <p>{label}</p>{" "}
      {oneRow && (
        <div>
          <Button
            type="white"
            headerStyle={{
              padding: "2px 4px",
              fontSize: "13px",
            }}
            action={action}
            disabledOption={!isEditing}
          >
            {buttonLabel}
          </Button>
          <Button type="button" action={() => setIsEditing(!isEditing)}>
            {isEditing ? "Guardar" : "Editar"}
          </Button>
          <input
            type="text"
            placeholder="0,00 €"
            disabled={!isEditing}
            value={percentageValue}
            onChange={handleChange}
          />
        </div>
      )}
      {!oneRow && (
        <div>
          {hasButton && (
            <Button
              type="white"
              headerStyle={{
                padding: "2px 4px",
                fontSize: "13px",
              }}
              action={action}
              disabledOption={!isEditing}
            >
              {buttonLabel}
            </Button>
          )}

          <Button type="button" action={() => setIsEditing(!isEditing)}>
            {isEditing ? "Guardar" : "Editar"}
          </Button>
          <input
            type="text"
            placeholder="0,00 €"
            disabled={!isEditing}
            value={percentageValue}
            onChange={handleChange}
          />
          {!isEditing && "%"}
        </div>
      )}
    </div>
  );
};
export default EditableRow;
