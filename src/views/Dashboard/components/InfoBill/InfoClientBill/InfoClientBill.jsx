import React from "react";
import styles from "./InfoClientBill.module.css";
import emptyImage from "../../../assets/ImageEmpty.svg";
import { ReactComponent as Lupa } from "../../../assets/searchGray.svg";
const InfoClientBill = ({ name, address, urlImg, textareaPlaceHolder }) => {
  return (
    <div className={styles.columnInfoBill}>
      <div className={styles.headerInfoBill}>
        <p>De</p>
        <div className={styles.search}>
          <Lupa />
          <div className={styles.button}>Editar</div>
        </div>
      </div>
      <div className={styles.info}>
        <img src={urlImg || emptyImage} alt="Profile picture" />
        <div className={styles.profile}>
          <p>{name}</p>
          <span>{address}</span>
        </div>
      </div>
      <textarea placeholder={textareaPlaceHolder}></textarea>
      <div className={styles.inputContainer}>
        <Lupa />
        <input type="text" placeholder="Buscar contacto..." />
      </div>
    </div>
  );
};

export default InfoClientBill;
