import React from "react";
import styles from "./ModalTemplate.module.css";
import Button from "../Button/Button";
import { ReactComponent as ArrowDown } from "../../assets/ArrowLeftWhite.svg";
const ModalTemplate = ({ children, onClick }) => {
  return (
    <>
      <div className={styles.bg} onClick={() => onClick()}></div>

      <div className={styles.modalTemplate}>
        <div className={styles.modalTemplateHeader}>
          <div className={styles.modalTemplateInfo}>
            <div className={styles.iconContainer} onClick={() => onClick()}>
              <ArrowDown className={styles.icon} />
            </div>
            <h3>Nuevo contacto</h3>
          </div>
          <div className={styles.buttonContainer}>
            <Button type={"white"}>Ver Transacciones</Button>
            <Button>Nueva Factura</Button>
            <Button>Guardar</Button>
          </div>
        </div>
        <div className={styles.contentContainer}>{children}</div>
      </div>
    </>
  );
};

export default ModalTemplate;
