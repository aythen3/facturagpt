import React from "react";
import styles from "./NewBIll.module.css";
const NewBIll = ({ setShowNewBill }) => {
  return (
    <div>
      <div className={styles.bg} onClick={() => setShowNewBill(false)}></div>
      <div className={styles.newBillContainer}>nueva factura</div>
    </div>
  );
};

export default NewBIll;
