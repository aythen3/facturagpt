import React, { useState } from "react";
import styles from "./SelectPlanModal.module.css";
import closeGray from "../../../assets/closeGray.svg";
import greenStar from "../../../assets/greenStar.svg";

const SelectPlanModal = ({ setSelectedPlan, onClose }) => {
  const plans = ["Plus", "Pro", "Enterprise"];
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
        onClick={(e) => e.stopPropagation()}
        className={`${styles.modalContent} ${isClosing ? styles.scaleDown : ""}`}
      >
        <div className={styles.upgradePlanHeader}>
          <div className={styles.headerLeft}>
            <img src={greenStar} alt="greenStar" />
            <h2>Elige tu plan</h2>
          </div>
          <div onClick={handleClose} className={styles.closeIcon}>
            <img src={closeGray} alt="closeGray" />
          </div>
        </div>
        {plans.map((plan, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedPlan(plan);
              handleClose();
            }}
            className={styles.upgradePlanButton}
          >
            <span>
              Plan
              <strong> {plan}</strong>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectPlanModal;
