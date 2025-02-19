import React from "react";
import styles from "./ModalTemplate.module.css";
import Button from "../Button/Button";
import { ReactComponent as ArrowDown } from "../../assets/ArrowLeftWhite.svg";
const ModalTemplate = ({
  children,
  onClick,
  actionSave,
  text,
  isAnimating,
}) => {
  return (
    <>
      <div className={styles.bg} onClick={() => onClick()}></div>

      <div
        className={`${styles.modalTemplate}  ${isAnimating ? styles.scaleDown : styles.scaleUp}`}
      >
        <div className={styles.modalTemplateHeader}>
          <div className={styles.modalTemplateInfo}>
            <div className={styles.iconContainer} onClick={() => onClick()}>
              <ArrowDown className={styles.icon} />
            </div>
            <h3>Nuevo {text}</h3>
          </div>
          <div className={styles.buttonContainer}>
            <Button type={"white"}>Ver Transacciones</Button>
            <Button>Nueva Factura</Button>
            <Button action={actionSave}>Guardar</Button>
          </div>
        </div>
        <div className={styles.contentContainer}>{children}</div>
      </div>
    </>
  );
};

export default ModalTemplate;
