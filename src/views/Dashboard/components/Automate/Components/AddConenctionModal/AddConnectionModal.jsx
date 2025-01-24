import React from "react";
import Header from "./components/Header";
import styles from "./addConnection.module.css";

const AddConnectionModal = ({ children, type, icon, close, headerColor }) => {
  return (
    <div onClick={close} className={styles.container}>
      <div onClick={(e) => e.stopPropagation()} className={styles.content}>
        <Header
          headerColor={headerColor}
          type={type}
          icon={icon}
          close={close}
        />
        <div className={styles.children_content}>{children}</div>
      </div>
    </div>
  );
};

export default AddConnectionModal;
