import React, { useState } from "react";
import HeaderCard from "../HeaderCard/HeaderCard";
import styles from "./AddTax.module.css";

const AddTax = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedImpuesto, setSelectedImpuesto] = useState(null);

  const handleCheckboxChange = (index) => {
    setSelectedRow(index);
  };

  const handleImpuestoChange = (index) => {
    setSelectedImpuesto(index === selectedImpuesto ? null : index);
  };

  return (
    <div className={styles.addTaxContainer}>
      <HeaderCard title={"Añadir Impuesto"} />
      <div className={styles.addTaxContent}>
        <div className={styles.taxes}>
          <div className={styles.column}>
            <p>Nombre del Impuesto</p>
            <input type="text" placeholder="[taxname]" />
          </div>
          <div className={styles.column}>
            <p>Tasa de impuesto</p>
            <input type="text" placeholder="%" />
          </div>
          <div className={styles.column}>
            <input
              type="checkbox"
              name="impuesto"
              checked={selectedImpuesto === 0}
              onChange={() => handleImpuestoChange(0)}
            />
            <input
              type="checkbox"
              name="impuesto"
              checked={selectedImpuesto === 1}
              onChange={() => handleImpuestoChange(1)}
            />
            <span>Impuesto compuesto</span>
          </div>
        </div>
        <div className={styles.tableTaxes}>
          <button>Añadir Impuesto</button>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Nombre del Impuesto</th>
                <th>Tasa de Impuesto</th>
                <th>Impuesto Compuesto</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "[taxname]", rate: "21.00%", compound: "No" },
                { name: "[taxname]", rate: "10.00%", compound: "Si" },
              ].map((tax, index) => (
                <tr
                  key={index}
                  className={selectedRow === index ? styles.selectedRow : ""}
                >
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRow === index}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </td>
                  <td>{tax.name}</td>
                  <td>{tax.rate}</td>
                  <td>{tax.compound}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.taxesBtnContainer}>
          <button>Cancel</button>
          <button className={styles.btnSelect}>Seleccionar</button>
        </div>
      </div>
    </div>
  );
};

export default AddTax;
