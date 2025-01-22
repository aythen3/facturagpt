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
  isActive,
  onCardClick,
  last,
  fromPanel,
  automationData,
}) => {
  return (
    <>
      <div
        onClick={onCardClick}
        className={`${styles.content} ${fromPanel && styles.content_panel} ${isActive ? styles.content_active : ""}`}
        style={{ borderBottom: !last && !fromPanel && "1px solid #e2f4f0" }}
      >
        <div
          onClick={() => typeContent(type, automationData)}
          className={styles.data_contain}
        >
          <div>
            <img className={styles.image} src={image} alt="logo" />
          </div>
          <div>
            <p
              style={{ marginBottom: !fromPanel && "4px" }}
              className={styles.automate_name}
            >
              {name}
            </p>
            {!fromPanel && fullContent && (
              <p className={styles.contact}>{contactType}</p>
            )}
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
