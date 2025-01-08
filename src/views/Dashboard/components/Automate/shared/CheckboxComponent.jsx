import React from "react";
import styles from "../Components/GmailAndOutlookFormCreateAutomate/gmailAndOutlook.module.css";

const CheckboxComponent = () => {
  return (
    <div>
      <input className={styles.check} type="checkbox" />
      <input className={styles.check} type="checkbox" />
    </div>
  );
};

export default CheckboxComponent;
