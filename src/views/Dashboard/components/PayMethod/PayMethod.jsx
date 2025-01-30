import React from 'react';
import styles from './PayMethod.module.css';
import { ReactComponent as ArrowUp } from '../../assets/arrowDownGray.svg';
import { ReactComponent as Minus } from '../../assets/minus.svg';
const PayMethod = () => {
  return (
    <div className={styles.payMethodContainer}>
      <div className={styles.squareContainer}>
        <div className={`${styles.square} ${styles.arrow}`}>
          <ArrowUp className={styles.icon} />
        </div>
        <div className={styles.square}>
          <span>BANCO</span>
          <p>BBVA</p>
        </div>
        <div className={`${styles.square} ${styles.accountNumber}`}>
          <span>Número de Cuenta</span>
          <p>BBVA</p>
        </div>
        <div className={styles.square}>
          <span>SWIFT/BIC</span>
          <p>BBVA</p>
        </div>
        <div className={styles.square}>
          <span>Routing Number</span>
          <p>BBVA</p>
        </div>
        <div className={styles.square}>
          <span>Moneda</span>
          <p>BBVA</p>
        </div>
      </div>
      <div className={styles.payInfo}>
        <div>
          <span>Banco</span>
          <select>
            <option>EE.UU</option>
            <option>EE.UU</option>
            <option>EE.UU</option>
            <option>EE.UU</option>
          </select>
        </div>
        <div>
          <span>Número de cuenta</span>
          <input type="text" />
        </div>
        <div>
          <span>SWIFT-BIC</span>
          <input type="text" />
        </div>
        <div>
          <span>Routing Number</span>
          <input type="text" />
        </div>
        <div>
          <span>Moneda</span>
          <input type="text" />
        </div>
      </div>
      <div className={styles.defaultBank}>
        <div>
          <input type="checkbox" />
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
