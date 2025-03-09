import React, { useState } from "react";
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
  const [isAscending, setIsAscending] = useState(true);

  // Función para alternar entre ascendente y descendente
  const toggleSortOrder = () => {
    setIsAscending((prev) => !prev);
  };

  // Ordenar los datos según el estado actual
  const sortedData = [...data].sort((a, b) => {
    return isAscending
      ? a.id.localeCompare(b.id) // Compara las cadenas en orden ascendente
      : b.id.localeCompare(a.id); // Compara las cadenas en orden descendente
  });

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
                return (
                  <th key={index} className={styles.columnTh}>
                    {header.map((subHeader, subIndex) => (
                      <span
                        key={subIndex}
                        className={subIndex >= 1 && styles.smallColumn}
                      >
                        {subHeader}
                      </span>
                    ))}
                  </th>
                );
              }
              return <th key={index}>{header}</th>;
            })}
            <th onClick={toggleSortOrder} style={{ cursor: "pointer" }}>
              {isAscending ? "Ascend" : "Descend"}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => renderRow(item, index, onSelect))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
