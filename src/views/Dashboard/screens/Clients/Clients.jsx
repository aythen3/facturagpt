import React, { useState } from "react";
import styles from "./Clients.module.css";
import NavbarAdmin from "../../components/NavbarAdmin/NavbarAdmin";
import searchGray from "../../assets/searchGray.png";
import searchWhite from "../../assets/searchWhite.png";
import newClientIcon from "../../assets/newClientIcon.svg";
import clock from "../../assets/clock.png";
import edit from "../../assets/edit.png";
import plusIcon from "../../assets/Plus Icon.png";
import filterSearch from "../../assets/Filters Search.png";
import { useTranslation } from "react-i18next";
const Clients = () => {
  const { t } = useTranslation("clients");
  const [showSidebar, setShowSidebar] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const tableHeaders = [
    t("tableCol1"),
    t("tableCol2"),
    t("tableCol3"),
    t("tableCol4"),
    t("tableCol5"),
    t("tableCol6"),
    t("tableCol7"),
    t("tableCol8"),
  ];

  const tableData = [
    {
      nombre: "Aythen",
      email: ["info@aythen.com", "support@aythen.com"],
      telefono: "+34600789012",
      direccion: "Calle A, Barcelona",
      numeroFiscal: "ES123456789",
      metodosPago: ["Visa ****1234", "Paypal: juan@gmail.com"],
      moneda: "EUR",
    },
    {
      nombre: "Aythen",
      email: "info@aythen.com",
      telefono: "+584243356112",
      direccion: "Calle A, Barcelona",
      numeroFiscal: "ES123456789",
      metodosPago: ["Visa ****1234", "Paypal: juan@gmail.com"],
      moneda: "EUR",
    },
  ];

  const formatPhoneNumber = (phoneNumber) => {
    return phoneNumber.replace(/(\+\d{2})(\d{3})(\d{3})(\d{3})/, "$1 $2 $3 $4");
  };

  return (
    <div>
      <NavbarAdmin showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className={styles.container} onClick={() => setShowSidebar(false)}>
        <div className={styles.clientsHeader}>
          <h2>{t("title")}</h2>
          <div className={styles.searchContainer}>
            <button className={styles.addButton}>
              <img src={plusIcon} alt="Nuevo cliente" />
              {t("buttonNewClient")}
            </button>

            <div className={styles.inputWrapper}>
              <img src={searchGray} className={styles.inputIconInside} />
              <input
                type="text"
                placeholder={t("placeholderSearch")}
                value={search}
                onChange={handleSearchChange}
                className={styles.searchInput}
              />
              <div className={styles.inputIconOutsideContainer}>
                <img src={filterSearch} className={styles.inputIconOutside} />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.clientsTable}>
          <table className={styles.table}>
            <thead>
              <tr>
                {tableHeaders.map((header, index) => (
                  <th key={index} className={index == 7 ? styles.hola : ""}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td>{row.nombre}</td>
                  <td>
                    {Array.isArray(row.email)
                      ? row.email.map((item, itemIndex) => (
                          <p key={itemIndex}>{item}</p>
                        ))
                      : row.email}
                  </td>
                  <td>{formatPhoneNumber(row.telefono)}</td>
                  <td>{row.direccion}</td>
                  <td>{row.numeroFiscal}</td>
                  <td>
                    {Array.isArray(row.metodosPago)
                      ? row.metodosPago.map((item, itemIndex) => (
                          <p key={itemIndex}>{item}</p>
                        ))
                      : row.metodosPago}
                  </td>
                  <td>{row.moneda}</td>
                  <td className={styles.actions}>
                    <img src={clock} />
                    <img src={edit} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Clients;
