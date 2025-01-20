import React from "react";
import styles from "./ModalBlackBgTemplate.module.css";
const ModalBlackBgTemplate = ({ children, isAnimating, close }) => {
  return (
    <div className={styles.ModalBlackBgTemplate}>
      <div className={styles.bgModalBlackBgTemplate} onClick={close}></div>
      <div
        className={`${styles.modalBlackContent} ${isAnimating ? styles.scaleDown : styles.scaleUp}`}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalBlackBgTemplate;
