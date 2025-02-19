import React, { useEffect, useState } from "react";
import HeaderCard from "../HeaderCard/HeaderCard";
import styles from "./AddDiscount.module.css";
import DeleteButton from "../DeleteButton/DeleteButton";
import Button from "../Button/Button";
import DiscardChange from "../DiscardChange/DiscardChange";

const AddDiscount = ({
  showDiscountModal,
  setShowDiscountModal,
  isAnimating,
  setIsAnimating,
}) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [discounts, setDiscounts] = useState([]);
  const [discountName, setDiscountName] = useState("");
  const [discountRate, setDiscountRate] = useState("");

  const handleRowClick = (index) => {
    setSelectedRow(index === selectedRow ? null : index);
  };

  const handleAddDiscount = () => {
    if (discountName.trim() === "" || discountRate.trim() === "") return;

    const newDiscount = {
      name: discountName,
      rate: `${discountRate}%`,
    };

    setDiscounts([...discounts, newDiscount]);
    setDiscountName("");
    setDiscountRate("");
  };

  const handleDeleteDiscount = (index) => {
    setDiscounts(discounts.filter((_, i) => i !== index));
    setSelectedRow(null);
  };
  const [showDiscardChange, setShowDiscardChange] = useState(false);

  const handleCloseNewClient = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setShowDiscountModal(false);
      setIsAnimating(false);
    }, 300);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && showDiscountModal) {
        setIsAnimating(true);
        setTimeout(() => {
          setShowDiscountModal(false);
          setIsAnimating(false);
        }, 300);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showDiscountModal]);
  return (
    <div className={styles.overlay}>
      <div className={styles.bg} onClick={() => handleCloseNewClient()}></div>
      {showDiscardChange && (
        <DiscardChange
          actionSave={() => handleCloseNewClient()}
          actionDiscard={() => {
            setShowDiscardChange(false);
            setShowDiscountModal(false);
          }}
        />
      )}
      <div
        className={`${styles.addTaxContainer} ${isAnimating ? styles.scaleDown : styles.scaleUp}`}
      >
        <HeaderCard
          title={"Seleccionar Descuento"}
          setState={setShowDiscountModal}
        >
          <Button type="white" action={() => setShowDiscardChange(true)}>
            Cancel
          </Button>
          <Button>Seleccionar</Button>
        </HeaderCard>
        <div className={styles.addTaxContent}>
          <div className={styles.taxes}>
            <div className={styles.columnLeft}>
              <p>Nombre o descripción del descuento</p>
              <input
                type="text"
                placeholder="[discount name]"
                value={discountName}
                onChange={(e) => setDiscountName(e.target.value)}
              />
            </div>
            <div className={styles.column}>
              <p>Descuento Aplicado</p>
              <input
                type="number"
                placeholder="%"
                value={discountRate}
                onChange={(e) => setDiscountRate(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.tableTaxes}>
            <button onClick={handleAddDiscount}>Añadir Descuento</button>
            <table>
              <thead>
                <tr>
                  <th className={styles.small}></th>
                  <th>Nombre del Impuesto</th>
                  <th>Descuento Aplicado</th>
                  <th className={styles.small}></th>
                </tr>
              </thead>
              <tbody>
                {discounts.map((discount, index) => (
                  <tr
                    key={index}
                    className={selectedRow === index ? styles.selectedRow : ""}
                    onClick={() => handleRowClick(index)}
                    style={{ cursor: "pointer" }}
                  >
                    <td className={styles.small}>
                      <input
                        type="checkbox"
                        checked={selectedRow === index}
                        readOnly
                      />
                    </td>
                    <td>{discount.name}</td>
                    <td>{discount.rate}</td>
                    <td className={styles.small}>
                      <DeleteButton
                        action={(e) => {
                          e.stopPropagation();
                          handleDeleteDiscount(index);
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

export default AddDiscount;
