import React from "react";
import styles from "./FreeTrialButton.module.css";
import diagonalArrow from "../../assets/diagonalArrow.svg";

const FreeTrialButton = () => {
  return (
    <a href="/freetrial" className={styles.startButton}>
      Probar Gratis <img src={diagonalArrow} />
    </a>
  );
};

export default FreeTrialButton;
