import React, { useState } from "react";
import styles from "./NewTag.module.css";
import HeaderCard from "../HeaderCard/HeaderCard";

const NewTag = () => {
  const [selectedColor, setSelectedColor] = useState("");

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  return (
    <div className={styles.newTagContainer}>
      <HeaderCard title={"Nueva etiqueta"} />
      <div className={styles.newTagBody}>
        <span>Nombre de la etiqueta</span>
        <input type="text" placeholder="Marketing, Operaciones, Suministros" />
        <div className={styles.circleContainer}>
          {[
            "circleBlack",
            "circleViolet",
            "circleLilac",
            "circleBlue",
            "circleLightBlue",
            "circleRed",
            "circleOrange",
            "circleGreen",
            "circleLightGreen",
            "circleYellow",
            "circlePickColor",
          ].map((color) => (
            <div
              key={color}
              className={`${styles.circle} ${styles[color]} ${selectedColor === color ? styles.selected : styles.special}`}
              onClick={() => handleColorSelect(color)}
            ></div>
          ))}
        </div>
      </div>
      <div className={styles.newTagBtnContainer}>
        <button>Cancelar</button>
        <button>Crear etiqueta</button>
        <button>Guardar</button>
      </div>
    </div>
  );
};

export default NewTag;
