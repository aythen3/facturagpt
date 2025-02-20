import React, { useState } from "react";
import styles from "./InfoClientBill.module.css";
import emptyImage from "../../../assets/ImageEmpty.svg";
import { ReactComponent as Lupa } from "../../../assets/searchGray.svg";
import { ReactComponent as PlusIconGray } from "../../../assets/plusIconGray.svg";
const InfoClientBill = ({
  name,
  address,
  urlImg,
  textareaPlaceHolder,
  textHeader = "De",
}) => {
  const [editing, setEditing] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  return (
    <div className={styles.columnInfoBill}>
      <div className={styles.headerInfoBill}>
        <p>{textHeader}</p>
        <div className={styles.search}>
          <div className={styles.searchContactContainer}>
            <Lupa className={styles.icon} />
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
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        {/* Ahora el div de contactos se muestra solo si hay texto y el input está enfocado */}
        {isFocused && inputValue.length > 0 && (
          <div className={styles.contacts}>
            <div className={styles.contact}>
              <img src={urlImg || emptyImage} width={30} alt="" />
              <div>
                <p>Nombre de la cuenta</p>
                <span>
                  Email adress, Dirección, Población, Provincia, Código Postal,
                  País
                </span>
              </div>
            </div>
            <div className={styles.contact}>
              <img src={urlImg || emptyImage} width={30} alt="" />
              <div>
                <p>Nombre de la cuenta</p>
                <span>
                  Email adress, Dirección, Población, Provincia, Código Postal,
                  País
                </span>
              </div>
            </div>
            <div className={styles.contact}>
              <img src={urlImg || emptyImage} width={30} alt="" />
              <div>
                <p>Nombre de la cuenta</p>
                <span>
                  Email adress, Dirección, Población, Provincia, Código Postal,
                  País
                </span>
              </div>
            </div>
            <div className={styles.newContactInfoClient}>
              <PlusIconGray /> Nuevo contacto
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoClientBill;
