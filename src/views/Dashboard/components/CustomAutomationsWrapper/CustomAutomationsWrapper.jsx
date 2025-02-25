import React from "react";
import styles from "./CustomAutomationsWrapper.module.css";

const CustomAutomationsWrapper = ({ 
  color = "#233F39", 
  Icon, 
  children,
  showContent,
 }) => {
  return (
    <div className={`${styles.wrapper} ${showContent ? styles.open : ''}`}>
      <div style={{ backgroundColor: color }} className={styles.leftContainer}>
        {Icon}
      </div>
      <div className={styles.rightContainer}>{children}</div>
    </div>
  );
};

export default CustomAutomationsWrapper;
