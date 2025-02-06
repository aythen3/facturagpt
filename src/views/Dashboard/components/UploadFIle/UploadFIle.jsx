import React from "react";
import styles from "./UploadFIle.module.css";
const UploadFIle = ({ setShowUplaodFile }) => {
  return (
    <div>
      <div className={styles.bg} onClick={() => setShowUplaodFile(false)}></div>
      <div className={styles.UploadFIle}>subir archivo</div>
    </div>
  );
};

export default UploadFIle;
