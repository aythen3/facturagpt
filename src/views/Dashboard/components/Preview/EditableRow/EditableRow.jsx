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
}) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div
      className={`${styles.editableRow} ${oneRow && styles.editableRowFlex}`}
    >
      <p>{label}</p>{" "}
      {oneRow && (
        <div>
          <Button type="button" action={() => setIsEditing(!isEditing)}>
            {isEditing ? "Guardar" : "Editar"}
          </Button>
          <input type="text" placeholder="0,00 €" disabled={!isEditing} />
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
          {hasPercentage && <span>{hasPercentage}</span>}
          <input type="text" placeholder="0,00 €" disabled={!isEditing} />
        </div>
      )}
    </div>
  );
};
export default EditableRow;
