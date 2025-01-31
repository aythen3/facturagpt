import React, { useState } from "react";
import styles from "./EditableRow.module.css";
import Button from "../../Button/Button";

const EditableRow = ({
  label,
  buttonLabel,
  hasPercentage,
  hasButton,
  action,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className={styles.editableRow}>
      <p>{label}</p>
      <div>
        {hasButton && (
          <Button
            type="white"
            headerStyle={{ padding: "8px 4px", fontSize: "13px" }}
            action={action}
          >
            {buttonLabel}
          </Button>
        )}
        <div className={styles.button} onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Guardar" : "Editar"}
        </div>
        {hasPercentage && <span>{hasPercentage}</span>}
        <input type="text" placeholder="0,00 €" disabled={!isEditing} />
      </div>
    </div>
  );
};
export default EditableRow;
