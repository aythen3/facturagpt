import React, { useState } from "react";
import HeaderCard from "../HeaderCard/HeaderCard";
import styles from "./NewFolder.module.css";
import searchGray from "../../assets/searchGray.svg";
import colaborators from "../../assets/peopleIcon.svg";
import minus from "../../assets/minus.svg";
const NewFolder = () => {
  const [selectedColor, setSelectedColor] = useState("");

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };
  return (
    <div className={styles.newFolderContainer}>
      <HeaderCard title={"Nueva Carpeta"} />
      <div className={styles.newFolderContent}>
        <div className={styles.folderInfo}>
          <span>Nombre de la carpeta</span>
          <input type="text" placeholder="New Folder" />
        </div>
        <div className={styles.folderInfo}>
          <span>Ubicación</span>
          <div className={styles.iconOnInput}>
            <img src={searchGray} />
            <input type="text" placeholder="/NombredelaCuenta" />
            <button>Seleccionar Ubicación</button>
          </div>
        </div>

        <div className={styles.addColaborator}>
          <div className={styles.addColaboratorText}>
            <div className={styles.colaboratorsIcon}>
              <img src={colaborators} alt="" />
            </div>
            <p>Añadir colaboradores</p>
          </div>
          <label className={styles.switch}>
            <input type="checkbox" />
            <span className={styles.slider}></span>
          </label>
        </div>
        <div className={styles.addColaboratorInput}>
          <input type="text" />
          <button>Invitar</button>
        </div>
        <div className={styles.colaboratorsInfo}>
          <div className={styles.colaborator}>
            <div className={styles.info}>
              <div>A</div>
              <span>info@aythen.com</span>
            </div>
            <div className={styles.delete}>
              <img src={minus} />
            </div>
          </div>
          <div className={styles.colaborator}>
            <div className={styles.info}>
              <div>A</div>
              <span>info@aythen.com</span>
            </div>
            <div className={styles.delete}>
              <img src={minus} />
            </div>
          </div>
        </div>
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

      <div className={styles.newFolderBtnContainer}>
        <button>Cancel</button>
        <button className={styles.btnSave}>Guardar</button>
      </div>
    </div>
  );
};

export default NewFolder;
