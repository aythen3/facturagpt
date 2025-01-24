import React, { useState } from "react";
import styles from "./ConfirmationPopup.module.css";
import closeGray from "../../assets/closeGray.svg";

const ConfirmationPopup = ({ onClose, title, message, handleAccept }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const onAccept = async () => {
    setLoading(true);
    handleAccept()
      .then(() => {})
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
        handleClose();
      });
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
        {/* Header */}
        <div className={styles.headerContainer}>
          <div className={styles.headerLeft}>
            <h2>{title}</h2>
          </div>
          <div onClick={handleClose} className={styles.closeIcon}>
            <img src={closeGray} alt="closeGray" />
          </div>
        </div>
        {/* Content */}
        <div className={styles.contentContainer}>
          <p className={styles.messageText}>{message}</p>
        </div>
        {/* Buttons */}
        <div className={styles.footerContainer}>
          <div onClick={handleClose} className={styles.newFolderButton}>
            Cancelar
          </div>
          <div onClick={onAccept} className={styles.selectButton}>
            {loading ? "Procesando..." : "Aceptar"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
