import React from "react";
import closeMenu from "../../assets/closeMenu.svg";
import styles from "./HeaderCard.module.css";

const HeaderCard = ({ title, setShowNewTagModal }) => {
  return (
    <header className={styles.newTagHeader}>
      <h3>{title}</h3>
      <img
        src={closeMenu}
        alt="Cerrar menú"
        onClick={() => setShowNewTagModal(false)}
      />
    </header>
  );
};

export default HeaderCard;
