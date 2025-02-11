import React from "react";
import styles from "./PayMethod.module.css";
import { ReactComponent as Minus } from "../../assets/minus.svg";

const PayMethod = ({ method, onChange }) => {
  return (
    <div className={styles.payMethodContainer}>
      <div className={styles.payInfo}>
        <div>
          <span>Banco</span>
          <select
            value={method?.bank || ""}
            onChange={(e) => onChange("bank", e.target.value)}
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
            onChange={(e) => onChange("accountNumber", e.target.value)}
          />
        </div>
        <div>
          <span>SWIFT-BIC</span>
          <input
            type="text"
            value={method?.swift || ""}
            onChange={(e) => onChange("swift", e.target.value)}
          />
        </div>
        <div>
          <span>Routing Number</span>
          <input
            type="text"
            value={method?.routingNumber || ""}
            onChange={(e) => onChange("routingNumber", e.target.value)}
          />
        </div>
        <div>
          <span>Moneda</span>
          <input
            type="text"
            value={method?.currency || ""}
            onChange={(e) => onChange("currency", e.target.value)}
          />
        </div>
      </div>
      <div className={styles.defaultBank}>
        <div>
          <input
            type="checkbox"
            checked={method?.default || false}
            onChange={(e) => onChange("default", e.target.checked)}
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
