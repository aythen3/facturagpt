import React from "react";
import styles from "./ModalBlackBgTemplate.module.css";
const ModalBlackBgTemplate = ({ children, isAnimating, close }) => {
  return (
    <div className={styles.ModalBlackBgTemplate}>
      <div
        className={styles.bgModalBlackBgTemplate}
        // onClick={handleCloseNewClient}
        onClick={close}
        // onClick={() => {
        //   console.log("a");
        // }}
      ></div>
      <div
        className={`${styles.modalBlackContent} ${isAnimating ? styles.scaleDown : styles.scaleUp}`}
        // onClick={() => {
        //   console.log("b");
        // }}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalBlackBgTemplate;
