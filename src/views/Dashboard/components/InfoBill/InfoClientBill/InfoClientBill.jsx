import React, { useState } from "react";
import styles from "./InfoClientBill.module.css";
import emptyImage from "../../../assets/ImageEmpty.svg";
import { ReactComponent as Lupa } from "../../../assets/searchGray.svg";
const InfoClientBill = ({ name, address, urlImg, textareaPlaceHolder }) => {
  const [editing, setEditing] = useState(false);
  const [searchContact, setSearchContact] = useState(false);
  return (
    <div className={styles.columnInfoBill}>
      <div className={styles.headerInfoBill}>
        <p>De</p>
        <div className={styles.search}>
          <div className={styles.searchContactContainer}>
            <Lupa
              className={styles.icon}
              onClick={() => setSearchContact((prev) => !prev)}
            />
            {searchContact && <div className={styles.contact}>contactos</div>}
          </div>
          <div
            className={styles.button}
            onClick={() => setEditing((prev) => !prev)}
          >
            {editing ? "Guardar" : "Editar"}
          </div>
        </div>
      </div>
      <div className={styles.info}>
        <img src={urlImg || emptyImage} alt="Profile picture" />
        <div className={styles.profile}>
          <p>{name}</p>
          <span>{address}</span>
        </div>
      </div>
      <textarea
        placeholder={textareaPlaceHolder}
        disabled={!editing}
      ></textarea>
      <div
        className={styles.inputContainer}
        style={{ background: !editing && "transparent" }}
      >
        <Lupa />
        <input
          type="text"
          placeholder="Buscar contacto..."
          disabled={!editing}
        />
      </div>
    </div>
  );
};

export default InfoClientBill;
