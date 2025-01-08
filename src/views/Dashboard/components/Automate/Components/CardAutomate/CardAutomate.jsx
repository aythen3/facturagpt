import React from "react";
import styles from "./cardAutomate.module.css";
import CircleDeleteSVG from "../../svgs/CircleDeleteSVG";

const CardAutomate = ({ name, image, contactType }) => {
  return (
    <>
      <div className={styles.content}>
        <div className={styles.data_contain}>
          <div>
            <img className={styles.image} src={image} alt="logo" />
          </div>
          <div>
            <p className={styles.automate_name}>{name}</p>
            <p className={styles.contact}>{contactType}</p>
          </div>
        </div>
        <div className={styles.buttons_contains}>
          <button className={styles.button_edit}>Editar</button>
          <CircleDeleteSVG />
        </div>
      </div>
    </>
  );
};

export default CardAutomate;
