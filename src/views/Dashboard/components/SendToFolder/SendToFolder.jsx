import React from "react";
import HeaderCard from "../HeaderCard/HeaderCard";
import styles from "./SendToFolder.module.css";
import searchGray from "../../assets/searchGray.svg";
const SendToFolder = () => {
  return (
    <div className={styles.sendToFolderContainer}>
      <HeaderCard title={"Descartar Cambios"} />
      <div className={styles.sendToFolderText}>
        <p>Ubicación</p>
        <div className={styles.iconIntoInput}>
          <img src={searchGray} />
          <input type="text" placeholder="/Nombredelacuenta" />
          <button>Seleccionar Ubicación</button>
        </div>
      </div>
      <div className={styles.sendToFolderBtnContainer}>
        <button>Cancelar</button>
        <button className={styles.sendToFolderBtn}>Mover</button>
      </div>
    </div>
  );
};

export default SendToFolder;
