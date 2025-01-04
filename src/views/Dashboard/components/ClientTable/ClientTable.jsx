import React from 'react';
import styles from './ClientTable.module.css';

const ClientTable = ({ tableHeaders, tableData }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {tableHeaders.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, rowIndex) => (
          <tr key={rowIndex}>
            <td>
              {row.cliente.map((item, itemIndex) => (
                <p
                  key={itemIndex}
                  className={itemIndex === 0 ? styles.firstItem : ''}
                >
                  {item}
                </p>
              ))}
            </td>
            <td>{row.direccion}</td>
            <td>
              {row.metodosPago.map((item, itemIndex) => (
                <p key={itemIndex}>{item}</p>
              ))}
            </td>
            <td>{row.moneda}</td>
            <td>{row.numeroFiscal}</td>
            <td>{row.historial}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ClientTable;
