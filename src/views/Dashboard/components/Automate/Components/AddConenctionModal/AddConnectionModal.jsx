import React from "react";
import Header from "./components/Header";
import styles from "./addConnection.module.css";
import HeaderCard from "../../../HeaderCard/HeaderCard";
const AddConnectionModal = ({
  children,
  type,
  icon,
  close,
  headerColor,
  iconHeader: IconHeader,
}) => {
  return (
    <div onClick={close} className={styles.container}>
      <div onClick={(e) => e.stopPropagation()} className={styles.content}>
        {/* <Header
          headerColor={headerColor}
          type={type}
          icon={icon}
          close={close}
        /> */}
        <HeaderCard
          title={
            <>
              <IconHeader /> Añadir conexión con {type}
            </>
          }
          setState={close}
        />
        <div className={styles.children_content}>{children}</div>
      </div>
    </div>
  );
};

export default AddConnectionModal;
