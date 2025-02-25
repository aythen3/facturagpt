import { useState } from "react";
import styles from "./PlanUpdatedModal.module.css";
import closeGray from "../../assets/closeGray.svg";
import greenTick from "../../assets/greenTick.svg";
import HeaderCard from "../HeaderCard/HeaderCard";
import Button from "../Button/Button";
const PlanUpdatedModal = ({ onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        handleClose();
      }}
      className={`${styles.modalOverlay} ${isClosing ? styles.fadeOut : ""}`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`${styles.modalContent} ${isClosing ? styles.scaleDown : ""}`}
      >
        {/* <div className={styles.headerLeft}>
            <h2>¡Plan actualizado con éxito!</h2>
          </div>
          <div onClick={handleClose} className={styles.closeIcon}>
            <img src={closeGray} alt="closeGray" />
          </div> */}
        <HeaderCard title="¡Plan actualizado con éxito!" setState={handleClose}>
          <Button type="white">Ver Historial</Button>
          <Button>Aceptar</Button>
        </HeaderCard>
        <div className={styles.upgradePlanContent}>
          <div className={styles.checkCircle}>
            <img src={greenTick} alt="greenTick" />
          </div>
          <span className={styles.upgradePlanText}>
            La facturación se realizará el primer día de cada mes, teniendo en
            cuenta los documentos reconocidos durante el mes anterior.
          </span>
          <span className={styles.upgradePlanText}>
            Si superas los límites de tu plan actual, solicitaremos tu
            autorización antes de realizar cualquier cargo adicional.
          </span>
        </div>
        {/* <div className={styles.upgradePlanFooter}>
          <button onClick={handleClose} className={styles.seeHistoryButton}>
            Ver historial
          </button>
          <button onClick={handleClose} className={styles.acceptButton}>
            Aceptar
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default PlanUpdatedModal;
