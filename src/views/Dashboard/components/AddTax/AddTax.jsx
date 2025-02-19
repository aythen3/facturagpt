import React, { useEffect, useState } from "react";
import HeaderCard from "../HeaderCard/HeaderCard";
import styles from "./AddTax.module.css";
import DeleteButton from "../DeleteButton/DeleteButton";
import Button from "../Button/Button";
import DiscardChange from "../DiscardChange/DiscardChange";
const AddTax = ({
  showTaxModal,
  setShowTaxModal,
  isAnimating,
  setTaxQuantity,
  setIsAnimating,
}) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [taxes, setTaxes] = useState([]);
  const [taxName, setTaxName] = useState("");
  const [taxRate, setTaxRate] = useState("");
  const [isCompound, setIsCompound] = useState(false);
  const [selectedTax, setSelectedTax] = useState(0);
  const handleRowClick = (index) => {
    setSelectedRow(index === selectedRow ? null : index);
  };

  const handleAddTax = () => {
    if (taxName.trim() === "" || taxRate.trim() === "") return;

    const newTax = {
      name: taxName,
      rate: `${taxRate}`,
      compound: isCompound ? "Si" : "No",
    };

    setTaxes([...taxes, newTax]);
    setTaxName("");
    setTaxRate("");
    setIsCompound(false);
  };

  const handleDeleteTax = (index) => {
    setTaxes(taxes.filter((_, i) => i !== index));
    setSelectedRow(null);
  };
  const [showDiscardChange, setShowDiscardChange] = useState(false);
  const handleCloseNewClient = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setShowTaxModal(false);
      setIsAnimating(false);
    }, 300);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && showTaxModal) {
        setIsAnimating(true);
        setTimeout(() => {
          setShowTaxModal(false);
          setIsAnimating(false);
        }, 300);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showTaxModal]);

  return (
    <div className={styles.overlay}>
      <div className={styles.bg} onClick={() => handleCloseNewClient()}></div>
      {showDiscardChange && (
        <DiscardChange
          actionSave={() => handleCloseNewClient()}
          actionDiscard={() => {
            setShowDiscardChange(false);
            handleCloseNewClient();
          }}
        />
      )}
      <div
        className={`${styles.addTaxContainer}  ${isAnimating ? styles.scaleDown : styles.scaleUp}`}
      >
        <HeaderCard title={"Seleccionar Impuesto"} setState={setShowTaxModal}>
          <Button type="white" action={() => handleCloseNewClient()}>
            Cancel
          </Button>
          <Button
            action={() => {
              setTaxQuantity(selectedTax);
              handleCloseNewClient();
            }}
          >
            Seleccionar
          </Button>
        </HeaderCard>
        <div className={styles.addTaxContent}>
          <div className={styles.taxes}>
            <div className={styles.column}>
              <p>Nombre del Impuesto</p>
              <input
                type="text"
                placeholder="[taxname]"
                value={taxName}
                onChange={(e) => setTaxName(e.target.value)}
              />
            </div>
            <div className={styles.column}>
              <p>Tasa de impuesto</p>
              <input
                type="number"
                placeholder="%"
                value={taxRate}
                onChange={(e) => {
                  if (e.target.value <= 100 && e.target.value >= 0)
                    setTaxRate(e.target.value);
                }}
                min={0}
                max={100}
              />
            </div>
            <div className={styles.compuesto}>
              <input
                type="checkbox"
                checked={isCompound}
                onChange={() => setIsCompound(!isCompound)}
              />
              <span>Impuesto compuesto</span>
            </div>
          </div>
          <div className={styles.tableTaxes}>
            <button onClick={handleAddTax}>Añadir Impuesto</button>
            <table>
              <thead>
                <tr>
                  <th className={styles.small}></th>
                  <th>Nombre del Impuesto</th>
                  <th>Tasa de Impuesto</th>
                  <th>Impuesto Compuesto</th>
                  <th className={styles.small}></th>
                </tr>
              </thead>
              <tbody>
                {taxes.map((tax, index) => (
                  <tr
                    key={index}
                    className={selectedRow === index ? styles.selectedRow : ""}
                    onClick={() => {
                      selectedRow !== index
                        ? setSelectedTax(tax.rate)
                        : setSelectedTax(0);
                      handleRowClick(index);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <td className={styles.small}>
                      <input
                        type="checkbox"
                        checked={selectedRow === index}
                        readOnly
                      />
                    </td>
                    <td>{tax.name}</td>
                    <td>{tax.rate}%</td>
                    <td>{tax.compound}</td>
                    <td className={styles.small}>
                      <DeleteButton
                        action={(e) => {
                          e.stopPropagation();
                          handleDeleteTax(index);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTax;
