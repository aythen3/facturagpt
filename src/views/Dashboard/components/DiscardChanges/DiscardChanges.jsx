import React from "react";
import HeaderCard from "../HeaderCard/HeaderCard";
import styles from "./DiscardChanges.module.css";
const DiscardChanges = () => {
  return (
    <div className={styles.discardChangesContainer}>
      <HeaderCard title={"Descartar Cambios"} />
      <div className={styles.discardChangesText}>
        <p>Perderás permanentemente cualquier cambio que hayas realizado.</p>
      </div>
      <div className={styles.discardChangesBtnContainer}>
        <button>Cancelar</button>
        <button className={styles.discardBtn}>Descartar cambios</button>
      </div>
    </div>
  );
};

export default DiscardChanges;
