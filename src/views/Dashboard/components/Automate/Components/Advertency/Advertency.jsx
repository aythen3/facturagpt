import React from "react";
import styles from "./Advertency.module.css";
import { ReactComponent as AdvertencyIcon } from "../../../../assets/AdvertencyIcon.svg";
const Advertency = ({ text, type }) => {
  return (
    <div
      className={`${styles.AdvertencyContainer} ${type == "error" && styles.AdvertencyContainerError}`}
    >
      <div className={styles.AdvertencyIconContainer}>
        <AdvertencyIcon className={styles.icon} />
      </div>
      {text}
    </div>
  );
};

export default Advertency;
