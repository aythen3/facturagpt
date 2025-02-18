import React from "react";
import star from "../../assets/starPlus.svg";
import styles from "./GetPlusButton.module.css";
const GetPlusButton = () => {
  return (
    <button className={styles.GetPlusButton}>
      Obtener Plus <img src={star} alt="Icon" />
    </button>
  );
};

export default GetPlusButton;
