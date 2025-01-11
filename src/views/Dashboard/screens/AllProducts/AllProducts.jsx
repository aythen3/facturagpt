import React, { useState } from "react";
import styles from "./AllProducts.module.css";
import NavbarAdmin from "../../components/NavbarAdmin/NavbarAdmin";
import searchGray from "../../assets/searchGray.svg";
import searchWhite from "../../assets/searchWhite.png";
import newClientIcon from "../../assets/newClientIcon.svg";
import clock from "../../assets/clock.png";
import edit from "../../assets/edit.png";
import plusIcon from "../../assets/Plus Icon.png";
import optionDots from "../../assets/optionDots.svg";
import filterSearch from "../../assets/Filters Search.png";
import { useTranslation } from "react-i18next";
import LastTransactions from "../../components/LastTransactions/LastTransactions";

const AllProducts = () => {
  const { t } = useTranslation("clients");
  const [showSidebar, setShowSidebar] = useState(false);
  const [search, setSearch] = useState("");
  const [clientSelected, setClientSelected] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const selectClient = (rowIndex) => {
    setClientSelected((prevItem) => {
      if (prevItem.includes(rowIndex)) {
        return prevItem.filter((i) => i !== rowIndex);
      } else {
        return [...prevItem, rowIndex];
      }
    });
  };

  const selectAllClients = () => {
    if (clientSelected.length > 0) {
      // Si ya hay clientes seleccionados, limpiar la selección
      setClientSelected([]);
    } else {
      // Si no hay clientes seleccionados, agregar todos los índices
      const allClientIndexes = tableData.map((_, index) => index); // Crear un arreglo con los índices
      setClientSelected(allClientIndexes);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const tableHeaders = [
    "Nombre o Descripción",
    ["Precio unitario", "(PVP)"],
    ["Qty", "(Último mes)"],
    "Precio máximo",
    "Precio mínimo",
    "Precio medio",
    "Transacciones",
    "Editar",
  ];

  const tableData = [
    {
      url: "https://img.freepik.com/foto-gratis/fondo-abstracto-textura_1258-30553.jpg?semt=ais_hybrid",
      name: "Articulo 1",
      price: "00,00 EUR",
      quantity: "1.0 Qty",
      maxPrice: "00,00 EUR",
      minPrice: "00,00 EUR",
      priceEn: "00,00 EUR",
    },
    {
      url: "https://img.freepik.com/foto-gratis/fondo-abstracto-textura_1258-30553.jpg?semt=ais_hybrid",
      name: "Articulo 1",
      price: "00,00 EUR",
      quantity: "1.0 Qty",
      maxPrice: "00,00 EUR",
      minPrice: "00,00 EUR",
      priceEn: "00,00 EUR",
    },
    {
      url: "https://img.freepik.com/foto-gratis/fondo-abstracto-textura_1258-30553.jpg?semt=ais_hybrid",
      name: "Articulo 1",
      price: "00,00 EUR",
      quantity: "1.0 Qty",
      maxPrice: "00,00 EUR",
      minPrice: "00,00 EUR",
      priceEn: "00,00 EUR",
    },
  ];

  const formatCardNumber = (value) => {
    return value.replace(/\D/g, "").replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const formatPhoneNumber = (phoneNumber) => {
    return phoneNumber.replace(/(\+\d{2})(\d{3})(\d{3})(\d{3})/, "$1 $2 $3 $4");
  };

  return (
    <div>
      <NavbarAdmin showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className={styles.container} onClick={() => setShowSidebar(false)}>
        <div className={styles.clientsHeader}>
          <h2>Articulos</h2>
          <div className={styles.searchContainer}>
            <button
              className={styles.addButton}
              onClick={() => setShowModal(true)}
            >
              Clientes y Proveedores
            </button>
            <button className={styles.infoBtn}>Analíticas</button>

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
            <button className={styles.moreBtn}>
              <img src={plusIcon} />
            </button>
          </div>
        </div>

        <div className={styles.clientsTable} style={{ overflow: "auto" }}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.small}>
                  <input
                    type="checkbox"
                    name="clientSelected"
                    checked={
                      clientSelected.length == tableData.length ? true : false
                    }
                    onClick={selectAllClients}
                  />
                </th>
                {tableHeaders.map((header, index) => (
                  <th
                    key={index}
                    className={
                      index == 7
                        ? styles.small
                        : "" || index == 6
                          ? styles.small
                          : "" || index == 0
                            ? styles.big
                            : "" || index == 1
                              ? styles.big
                              : ""
                    }
                  >
                    {Array.isArray(header) ? (
                      <div className={styles.headerStack}>
                        <span>{header[0]}</span>
                        <span className={styles.subHeader}>{header[1]}</span>
                      </div>
                    ) : (
                      header
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td>
                    <input
                      type="checkbox"
                      name="clientSelected"
                      onClick={() => selectClient(rowIndex)}
                      checked={clientSelected.includes(rowIndex) ? true : false}
                    />
                  </td>
                  <td className={styles.name}>
                    <img src={row.url} alt="" />
                    {row.name}
                  </td>
                  <td>{row.price}</td>
                  <td>{row.quantity}</td>
                  <td>{row.maxPrice}</td>
                  <td>{row.minPrice}</td>
                  <td>{row.priceEn}</td>
                  <td className={styles.actions}>
                    <div className={styles.transacciones}>
                      <a href="#">Ver</a>
                    </div>
                  </td>
                  <td>
                    <div className={styles.edit}>
                      <a href="#">Editar</a>
                      <div>
                        <img src={optionDots} alt="options" />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showModal && <LastTransactions setShowModal={setShowModal} />}
      </div>
    </div>
  );
};

export default AllProducts;
