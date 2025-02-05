import React from "react";
import styles from "./PaymentSuccess.module.css";

const PaymentSuccess = ({ onClose }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.iconContainer}>
        <div className={styles.icon}>
          <span className={styles.checkmark}>&#10003;</span>
        </div>
      </div>
      <h2 className={styles.title}>Pago Exitoso!</h2>
      <p className={styles.message}>
        Tu transaccion fue completada exitosamente.
      </p>
      <button className={styles.dashboardButton} onClick={onClose}>
        Aceptar
      </button>
    </div>
  );
};

export default PaymentSuccess;
