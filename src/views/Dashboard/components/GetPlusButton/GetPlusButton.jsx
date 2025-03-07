import React from "react";
import star from "../../assets/starPlus.svg";
import styles from "./GetPlusButton.module.css";
const GetPlusButton = ({ action }) => {
  return (
    <button className={styles.GetPlusButton} onClick={action}>
      Obtener Plus <img src={star} alt="Icon" />
    </button>
  );
};

export default GetPlusButton;
