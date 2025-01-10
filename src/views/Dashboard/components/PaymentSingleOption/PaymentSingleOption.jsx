import React, { useState } from "react";
import styles from "./PaymentSingleOption.module.css";
import checkedCircle from "../../assets/checkedCircle.svg";
import uncheckedCircle from "../../assets/uncheckedCircle.svg";

const PaymentSingleOption = ({
  icons,
  name,
  paymentMethod,
  setPaymentMethod,
  title,
  description,
  cvc = false,
}) => {
  const [cvcNumber, setCvcNumber] = useState("");
  return (
    <div className={styles.paymentSingleOptionContainer}>
      {paymentMethod === name ? (
        <img
          style={{ cursor: "pointer" }}
          src={checkedCircle}
          alt="checkedCircle"
        />
      ) : (
        <img
          style={{ cursor: "pointer" }}
          onClick={() => setPaymentMethod(name)}
          src={uncheckedCircle}
          alt="uncheckedCircle"
        />
      )}
      <div className={styles.paymentSingleOptionIcons}>
        {icons.map((icon, index) => (
          <div className={styles.iconWrapper}>
            <img key={index} src={icon} alt="icon" />
          </div>
        ))}
      </div>
      {title && (
        <div className={styles.paymentSingleOptionText}>
          <div>{title}</div>
          <span>{description}</span>
        </div>
      )}
      {cvc && (
        <input
          className={styles.cvcInput}
          value={cvcNumber}
          type="number"
          placeholder="CVC"
          onChange={(e) => {
            const value = e.target.value;
            if (value.length <= 3) {
              setCvcNumber(value);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "e" || e.key === "+" || e.key === "-") {
              e.preventDefault();
            }
          }}
        />
      )}
    </div>
  );
};

export default PaymentSingleOption;
