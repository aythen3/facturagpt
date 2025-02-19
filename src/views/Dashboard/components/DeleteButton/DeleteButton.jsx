import React from "react";
import minus from "../../assets/minus.svg";
import styles from "./DeleteButton.module.css";
const DeleteButton = ({ action }) => {
  return (
    <img src={minus} alt="Icon" className={styles.delete} onClick={action} />
  );
};

export default DeleteButton;
