import { X } from "lucide-react";
import { useState } from "react";
import styles from "./TagModal.module.css";

export default function TagModal({
  isOpen,
  onClose,
  onSave,
  isEditing = false,
}) {
  const [selectedColor, setSelectedColor] = useState("#000000");

  if (!isOpen) return null;

  const colors = [
    "#000000",
    "#8B5CF6",
    "#D8B4FE",
    "#0000FF",
    "#93C5FD",
    "#FF0000",
    "#FF9900",
    "#10B981",
    "#14B8A6",
    "#FFFF00",
  ];

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Nueva Etiqueta</h2>
          <button onClick={onClose} className={styles.closeButton}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="tagName" className={styles.inputLabel}>
            Nombre de la Etiqueta
          </label>
          <input
            id="tagName"
            type="text"
            defaultValue="Pagado"
            className={styles.titleInput}
          />
        </div>

        <div className={styles.colorGrid}>
          {colors.map((color) => (
            <button
              key={color}
              className={`${styles.colorButton} ${
                selectedColor === color ? styles.selected : ""
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
              aria-label={`Select ${color} color`}
            />
          ))}
        </div>

        <div className={styles.actions}>
          <button onClick={onClose} className={styles.cancelButton}>
            Cancel
          </button>
          <button
            onClick={() => onSave(selectedColor)}
            className={styles.createButton}
          >
            Create
          </button>
          <button
            onClick={() => onSave(selectedColor)}
            className={styles.saveButton}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
