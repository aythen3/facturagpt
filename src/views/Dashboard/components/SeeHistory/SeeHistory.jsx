import React from 'react';
import styles from './SeeHistory.module.css';
import arrow from '../../assets/arrow.svg';
import pdfIcon from '../../assets/pdfmask.svg';
import optionDots from '../../assets/optionDots.svg';

const historyData = [
  {
    planType: 'Plus',
    invoice: {
      number: '20-2.000',
      paymentDate: '1 ene 2025',
      paymentMethod: 'Google Pay, Visa terminada en 2069',
    },
    breakdown: {
      basePlan: '320,10',
      discount: {
        percentage: '10',
        amount: '32,01',
      },
      subtotal: '288,09',
      vat: {
        percentage: '21',
        amount: '60,4989',
      },
      total: '348,5089',
    },
  },
  {
    planType: 'Pro',
    invoice: {
      number: '2.000-20.000',
      paymentDate: '1 ene 2025',
      paymentMethod: 'Apple Pay, Visa terminada en 2069',
    },
    breakdown: {
      basePlan: '2.400,20',
      discount: {
        percentage: '10',
        amount: '240,02',
      },
      subtotal: '2.160,18',
      vat: {
        percentage: '21',
        amount: '453,6378',
      },
      total: '2.613,8178',
    },
  },
  {
    planType: 'Enterprise',
    invoice: {
      number: '20.000-50.000',
      paymentDate: '1 ene 2025',
      paymentMethod: 'Mastercard, Visa terminada en 2069',
    },
    breakdown: {
      basePlan: '2.400,20',
      discount: {
        percentage: '10',
        amount: '240,02',
      },
      subtotal: '2.160,18',
      vat: {
        percentage: '21',
        amount: '453,6378',
      },
      total: '2.613,8178',
    },
  },
];

const SeeHistory = () => {
  return (
    <div className={styles.historyContainer}>
      <header className={styles.headerHistory}>
        <img src={arrow} alt='' />
        <p>
          Historial Guardado en /<strong>NombredelaCuenta</strong>
        </p>
        <button>Editar Ubicacion</button>
      </header>
      <div className={styles.contentHistory}>
        {historyData.map((item, index) => (
          <div key={index} className={styles.content}>
            <div className={styles.plan}>
              <p className={styles.planType}>
                Plan <strong>{item.planType}</strong>
              </p>
              <div className={styles.btns}>
                <button>
                  <img src={pdfIcon} alt='' />
                  Ver PDF
                </button>
                <img src={optionDots} alt='' />
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.row}>
                <p className={styles.docs}>{item.invoice.number} documentos</p>
                <p className={styles.payAt}>
                  Pagado el {item.invoice.paymentDate}
                </p>
              </div>
              <div className={`${styles.row} ${styles.title}`}>
                Forma de pago
              </div>
              <div className={styles.row}>{item.invoice.paymentMethod}</div>
            </div>

            <div className={styles.section}>
              <div className={styles.row}>
                <p className={styles.title}>Plan {item.planType} (IVA excl.)</p>
                <p className={styles.price}>{item.breakdown.basePlan} $</p>
              </div>
              <div className={styles.row}>
                <p>
                  Descuento{' '}
                  <span className={styles.txtTransparent}>
                    {item.breakdown.discount.percentage} %
                  </span>
                </p>
                <p className={styles.txtTransparent}>
                  -{item.breakdown.discount.amount}$
                </p>
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.row}>
                <p className={styles.title}>Subtotal</p>
                <p className={styles.price}>{item.breakdown.subtotal}$</p>
              </div>
              <div className={styles.row}>
                <p>
                  IVA<sup>*</sup>
                  <span className={styles.txtTransparent}>
                    {item.breakdown.vat.percentage} %
                  </span>
                </p>
                <p>{item.breakdown.vat.amount}$</p>
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.row}>
                <p className={styles.totalIVA}>Total (IVA incl.)</p>
                <p className={styles.priceTotal}>{item.breakdown.total}$</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeeHistory;
