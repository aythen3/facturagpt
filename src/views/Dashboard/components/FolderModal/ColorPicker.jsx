import { useState } from "react";
import styles from "./ColorPicker.module.css";

const colors = [
  "#000000",
  "#6B46C1",
  "#D6BCFA",
  "#2B6CB0",
  "#90CDF4",
  "#E53E3E",
  "#ED8936",
  "#38A169",
  "#4FD1C5",
  "#ECC94B",
];

export function ColorPicker({ selectedColor, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <button
        className={styles.colorButton}
        style={{ backgroundColor: selectedColor }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select color"
      />

      {isOpen && (
        <>
          <div className={styles.colorPopup}>
            {colors.map((color) => (
              <button
                key={color}
                className={styles.colorOption}
                style={{ backgroundColor: color }}
                onClick={() => {
                  onChange(color);
                  setIsOpen(false);
                }}
                aria-label={`Select color ${color}`}
              />
            ))}
          </div>
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 99,
            }}
            onClick={() => setIsOpen(false)}
          />
        </>
      )}
    </div>
  );
}
