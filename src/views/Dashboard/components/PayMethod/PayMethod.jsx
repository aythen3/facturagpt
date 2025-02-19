import React, { useState } from "react";
import styles from "./PayMethod.module.css";
import { ReactComponent as Minus } from "../../assets/minus.svg";

const PayMethod = ({ method, onChange }) => {
  const handleInputChange = (key, value) => {
    onChange(key, value); // Asegúrate de pasar correctamente el key y el value
  };
  console.log("methooooood", method);
  return (
    <div className={styles.payMethodContainer}>
      <div className={styles.payInfo}>
        <div>
          <span>Banco</span>
          <select
            value={method?.bank || ""}
            onChange={(e) => handleInputChange("bank", e.target.value)}
          >
            <option value="BBVA">BBVA</option>
            <option value="Santander">Santander</option>
            <option value="Citibank">Citibank</option>
            <option value="Chase">Chase</option>
          </select>
        </div>
        <div>
          <span>Número de cuenta</span>
          <input
            type="text"
            value={method?.accountNumber || ""}
            onChange={(e) => handleInputChange("accountNumber", e.target.value)}
          />
        </div>
        <div>
          <span>SWIFT-BIC</span>
          <input
            type="text"
            value={method?.swift || ""}
            onChange={(e) => handleInputChange("swift", e.target.value)}
          />
        </div>
        <div>
          <span>Routing Number</span>
          <input
            type="text"
            value={method?.routingNumber || ""}
            onChange={(e) => handleInputChange("routingNumber", e.target.value)}
          />
        </div>
        <div>
          <span>Moneda</span>
          <input
            type="text"
            value={method?.currency || ""}
            onChange={(e) => handleInputChange("currency", e.target.value)}
          />
        </div>
      </div>
      <div className={styles.defaultBank}>
        <div>
          <input
            type="checkbox"
            checked={method?.default || false}
            onChange={(e) => handleInputChange("default", e.target.checked)}
          />
          <p>Banco predeterminado</p>
        </div>
        <div className={styles.delete}>
          <Minus className={styles.icon} />
        </div>
      </div>
    </div>
  );
};

export default PayMethod;
