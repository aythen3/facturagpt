import React from "react";
import Header from "./components/Header";
import styles from "./addConnection.module.css";

const AddConnectionModal = ({ children, type, icon, close }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Header type={type} icon={icon} close={close} />
        <div className={styles.children_content}>{children}</div>
      </div>
    </div>
  );
};

export default AddConnectionModal;
