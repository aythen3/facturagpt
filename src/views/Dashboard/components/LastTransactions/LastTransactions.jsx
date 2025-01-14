import React, { useEffect, useState } from "react";
import styles from "./LastTransactions.module.css";
import searchGray from "../../assets/searchGray.svg";
import filterSearch from "../../assets/Filters Search.png";
import pdf from "../../assets/pdf-ico.svg";
import closeMenu from "../../assets/close-menu.svg";
import { useDispatch, useSelector } from "react-redux";
import { clearClient, setClient } from "../../../../slices/clientsSlices";
const transactionsData = [
  {
    id: 1,
    companyName: "Nombre de la empresa",
    contactInfo: "Email adress, Zip code / Postcode, Country of residence",
    documentTitle: "Titulo del documento",
    status: "Pendiente",
    date: "25 Dec 2025",
    transactionId: "T001",
    quantities: {
      amount: "1.0",
      unitPrice: "1.0",
      total: "1.0",
      tax: "1.0",
    },
  },
  {
    id: 2,
    companyName: "Empresa ABC",
    contactInfo: "info@abc.com, 28001, España",
    documentTitle: "Factura Mensual",
    status: "Pendiente",
    date: "26 Dec 2025",
    transactionId: "T002",
    quantities: {
      amount: "2.0",
      unitPrice: "2.0",
      total: "4.0",
      tax: "0.8",
    },
  },
  {
    id: 3,
    companyName: "Corporación XYZ",
    contactInfo: "contact@xyz.com, 08001, España",
    documentTitle: "Presupuesto Anual",
    status: "Pendiente",
    date: "27 Dec 2025",
    transactionId: "T003",
    quantities: {
      amount: "3.0",
      unitPrice: "1.5",
      total: "4.5",
      tax: "0.9",
    },
  },
];

const LastTransactions = ({ setShowModal, showModal }) => {
  const dispatch = useDispatch();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleCloseNewClient = () => {
    setIsAnimating(true);
    setTimeout(() => {
      dispatch(clearClient());
      setShowModal(false);
      setIsAnimating(false);
    }, 300);
  };
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && showModal) {
        setIsAnimating(true);
        setTimeout(() => {
          dispatch(clearClient());
          setShowModal(false);
          setIsAnimating(false);
        }, 300);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showModal]);

  return (
    <>
      <div className={styles.overlay} onClick={handleCloseNewClient}></div>
      <div
        className={`${styles.LastTransactionsContainer} ${isAnimating ? styles.scaleDown : styles.scaleUp}`}
      >
        <div className={styles.header}>
          <div className={styles.name}>
            <img
              src="https://img.freepik.com/foto-gratis/fondo-abstracto-textura_1258-30553.jpg?semt=ais_hybrid"
              alt=""
            />
            <h2>Articulo 1</h2>
          </div>
          <span>
            <img
              src={closeMenu}
              className={styles.closeMenu}
              onClick={handleCloseNewClient}
            />
          </span>
        </div>

        <div className={styles.container}>
          <div className={styles.search}>
            <h3>Últimas Transacciones</h3>

            <div className={styles.inputWrapper}>
              <img src={searchGray} className={styles.inputIconInside} />
              <input
                type="text"
                placeholder={"Search..."}
                className={styles.searchInput}
              />
              <div className={styles.inputIconOutsideContainer}>
                <img src={filterSearch} className={styles.inputIconOutside} />
              </div>
            </div>
          </div>

          <div className={styles.content}>
            {transactionsData.map((transaction) => (
              <div key={transaction.id} className={styles.transaction}>
                <div>
                  <p className={styles.name}>{transaction.companyName}</p>
                  <span>{transaction.contactInfo}</span>
                  <span className={styles.status}>
                    <p>
                      <img src={pdf} alt="pdf icon" />
                      {transaction.documentTitle}
                    </p>
                    <div>
                      <span className={styles.statusText}>
                        <span>&bull;</span>
                        {transaction.status}
                      </span>
                      <a href="#">Ver documento</a>
                    </div>
                  </span>
                  <p>
                    {transaction.date} <span>{transaction.transactionId}</span>
                  </p>
                </div>
                <div className={styles.prices}>
                  <div>
                    <span>Cant.</span>
                    <span>{transaction.quantities.amount}</span>
                  </div>
                  <div>
                    <span>Precio unit.</span>
                    <span>{transaction.quantities.unitPrice}</span>
                  </div>
                  <div>
                    <span>Importe</span>
                    <span>{transaction.quantities.total}</span>
                  </div>
                  <div>
                    <span>Impuesto</span>
                    <span>{transaction.quantities.tax}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LastTransactions;
