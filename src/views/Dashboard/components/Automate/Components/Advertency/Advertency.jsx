import React from "react";
import styles from "./Advertency.module.css";
import { ReactComponent as AdvertencyIcon } from "../../../../assets/AdvertencyIcon.svg";
const Advertency = ({ text }) => {
  return (
    <div className={styles.AdvertencyContainer}>
      <div className={styles.AdvertencyIconContainer}>
        <AdvertencyIcon className={styles.icon} />
      </div>
      {text}
    </div>
  );
};

export default Advertency;
