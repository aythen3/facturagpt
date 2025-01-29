import React, { forwardRef } from "react";
import styles from "./FacturaTemplate.module.css";
import { ReactComponent as Logo } from "../../assets/logo.svg";
const FacturaTemplate = forwardRef((props, ref) => {
  return (
    <div ref={ref} className={styles.billContainer}>
      <div className={styles.headerBill}>
        <div className={styles.column}>
          <Logo />
          <h2>FacturaGPT</h2>
        </div>
        <div className={styles.column}>
          <span>Business address</span>
          <span>City, State, IN - 000 000</span>
          <span>TAX ID 00XXXXX1234X0XX</span>
        </div>
      </div>

      <div className={styles.billedTo}>
        <div className={styles.billedToLeft}>
          <span>Billed to</span>
          <h3>Company Name</h3>
          <span>Company address</span>
          <span>City, Country - 00000</span>
          <span>+0 (000) 123-4567</span>
        </div>
        <div className={styles.billedToRight}>
          <div className={styles.billedToDate}>
            <div>
              <span>Due date</span>
              <p>15 Aug, 2023</p>
            </div>
            <div>
              <span>Invoice date</span>
              <p>1 Aug, 2023</p>
            </div>
          </div>
          <div className={styles.billedToReference}>
            <div>
              <span>Due date</span>
              <p>15 Aug, 2023</p>
            </div>
            <div>
              <span>Invoice date</span>
              <p>1 Aug, 2023</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.tableBill}>
        <table>
          <thead>
            <tr>
              <th>Item Description</th>
              <th>Qty</th>
              <th>Precio Base</th>
              <th>Impuestos</th>
              <th>Descuento</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Item Name</td>
              <td>01</td>
              <td>$3,000</td>
              <td>
                <span>10%</span>
                <div>$3,000</div>
              </td>
              <td>
                <span>10%</span>
                <div>$3,000</div>
              </td>
              <td>$3,000</td>
            </tr>
          </tbody>
        </table>
        <div className={styles.taxes}>
          <div className={styles.taxesContent}>
            <div className={styles.taxesBody}>
              <div className={styles.row}>
                <p>Subtotal</p>
                <p>$4,500.00</p>
              </div>
              <div className={styles.row}>
                <p>Descuento (10%)</p>
                <p>$450.00</p>
              </div>
              <div className={styles.row}>
                <p>Tax (21%)</p>
                <p>$450.00</p>
              </div>
            </div>
            <div className={styles.total}>
              <div className={styles.row}>
                <p>Total</p>
                <p>$4,950.00</p>
              </div>
              <div className={styles.totalBtn}>
                <p>Total</p>
                <p>US$4,950.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default FacturaTemplate;
