import React from "react";
import styles from "./cardAutomate.module.css";
import CircleDeleteSVG from "../../svgs/CircleDeleteSVG";

const CardAutomate = ({
  name,
  image,
  contactType,
  typeContent,
  type,
  fullContent,
  isBorders,
}) => {
  return (
    <>
      <div
        style={{ borderBottom: isBorders ? "3px solid #e2f4f0" : "" }}
        className={styles.content}
      >
        <div onClick={() => typeContent(type)} className={styles.data_contain}>
          <div>
            <img className={styles.image} src={image} alt="logo" />
          </div>
          <div>
            <p className={styles.automate_name}>{name}</p>
            {fullContent && <p className={styles.contact}>{contactType}</p>}
          </div>
        </div>
        {fullContent && (
          <div className={styles.buttons_contains}>
            <button className={styles.button_edit}>Editar</button>
            <CircleDeleteSVG />
          </div>
        )}
      </div>
    </>
  );
};

export default CardAutomate;
