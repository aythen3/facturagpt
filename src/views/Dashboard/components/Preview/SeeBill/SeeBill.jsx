import React from "react";
import styles from "./SeeBill.module.css";
import HeaderCard from "../../HeaderCard/HeaderCard";
// import Factura from "../../../assets/facturaEjemplo.png";

const SeeBill = ({ document, setSeeBill }) => {
  return (
    <div className={styles.seeBillContainer}>
      <div className={styles.bg} onClick={() => setSeeBill(false)}></div>
      <div className={styles.seeBillContent}>
        <HeaderCard title={""} setState={setSeeBill} />
        <embed
          type="application/pdf"
          src="http://old.scielo.org/local/File/libro.pdf"
          width="900px"
          height="400px"
        />
      </div>
    </div>
  );
};

export default SeeBill;
