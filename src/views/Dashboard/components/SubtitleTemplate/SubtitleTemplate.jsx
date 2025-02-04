import React from "react";
import styles from "./SubtitleTemplate.module.css";
const SubtitleTemplate = ({ text, stylesProp }) => {
  return (
    <h4 style={stylesProp} className={styles.SubtitleTemplate}>
      {text}
    </h4>
  );
};

export default SubtitleTemplate;
