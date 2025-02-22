import React from "react";
import styles from "./DynamicTable.module.css"; // Archivo de estilos

const DynamicTable = ({
  columns,
  data,
  renderRow,
  selectedIds,
  onSelectAll,
  onSelect,
  hideCheckbox = false,
}) => {
  return (
    <div className={styles.clientsTable}>
      <table className={styles.table}>
        <thead>
          <tr>
            {!hideCheckbox && (
              <th style={{ minWidth: "40px" }}>
                <input
                  type="checkbox"
                  checked={selectedIds.length === data.length}
                  onChange={onSelectAll}
                />
              </th>
            )}
            {columns.map((header, index) => {
              if (Array.isArray(header)) {
                // Si header es un arreglo, unimos los subHeaders en un solo <th>
                return (
                  <th key={index} className={styles.columnTh}>
                    {header.map((subHeader, subIndex) => (
                      <span
                        key={subIndex}
                        className={subIndex >= 1 && styles.smallColumn}
                      >
                        {subHeader}
                      </span> // Puedes cambiar el <span> por otro elemento según tu necesidad
                    ))}
                  </th>
                );
              }

              // Si header no es un arreglo, simplemente lo renderizamos de forma normal
              return <th key={index}>{header}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => renderRow(item, index, onSelect))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
