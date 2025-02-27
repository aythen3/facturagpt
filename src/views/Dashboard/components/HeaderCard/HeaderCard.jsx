import React from "react";
import closeMenu from "../../assets/closeMenu.svg";
import styles from "./HeaderCard.module.css";
import { ReactComponent as Arrow } from "../../assets/ArrowLeftWhite.svg";
const HeaderCard = ({ title, children, setState, headerStyle = {} }) => {
  return (
    <header className={styles.newTagHeader} style={headerStyle}>
      <div className={styles.leftSide}>
        <button
          type="button"
          className={styles.iconContainer}
          onClick={(e) => {
            e.stopPropagation();
            setState(false);
          }}
        >
          <Arrow />
        </button>
        <h3>{title}</h3>
      </div>
      <div className={styles.rightSide}>{children}</div>
    </header>
  );
};

export default HeaderCard;
