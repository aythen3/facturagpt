import React from "react";
import styles from "./Tags.module.css";
const Tags = () => {
  return (
    <div className={styles.tags}>
      <span className={styles.tag} style={{ backgroundColor: "#222222" }}>
        Etiqueta
      </span>
      <span className={styles.tag} style={{ backgroundColor: "#0B06FF" }}>
        Etiqueta
      </span>
      <span className={styles.tag} style={{ backgroundColor: "#FF0000" }}>
        Etiqueta
      </span>
      <span className={styles.tag} style={{ backgroundColor: "#12A27F" }}>
        Etiqueta
      </span>
      <span className={styles.tag} style={{ backgroundColor: "#7329A5" }}>
        Etiqueta
      </span>
      <span className={styles.tag} style={{ backgroundColor: "#7086FD" }}>
        Etiqueta
      </span>
      <span className={styles.tag} style={{ backgroundColor: "#FF8C00" }}>
        Etiqueta
      </span>
      <span className={styles.tag} style={{ backgroundColor: "#16C098" }}>
        Etiqueta
      </span>
      <span className={styles.tag} style={{ backgroundColor: "#C075EE" }}>
        Etiqueta
      </span>
      <span
        className={styles.tag}
        style={{ backgroundColor: "#EEFF00", color: "#333333" }}
      >
        Etiqueta
      </span>
    </div>
  );
};

export default Tags;
