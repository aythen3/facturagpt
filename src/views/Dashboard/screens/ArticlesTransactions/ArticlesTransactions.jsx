import React, { useState } from "react";
import styles from "./ArticlesTransactions.module.css";
import NavbarAdmin from "../../components/NavbarAdmin/NavbarAdmin";
import searchGray from "../../assets/searchGray.png";
import optionDots from "../../assets/optionDots.svg";
import plusIcon from "../../assets/Plus Icon.png";
import filterSearch from "../../assets/Filters Search.png";
import creditCard from "../../assets/creditCardIcon.png";
import closeIcon from "../../assets/closeMenu.svg";
import pdf from "../../assets/pdfIcon.png";

const ArticlesTransactions = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [search, setSearch] = useState("");
  const [clientSelected, setClientSelected] = useState([]);
  const [showNewClient, setShowNewClient] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [web, setWeb] = useState("");
  const [countryCode, setCountryCode] = useState("+34");
  const [emailAddress, setEmailAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [residence, setResidence] = useState("");
  const [fiscalNumber, setFiscalNumber] = useState("");
  const [preferredCurrency, setPreferredCurrency] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

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

  const getStateClass = (state) => {
    switch (state.toLowerCase()) {
      case "pagada":
        return styles.pagada;
      case "pendiente":
        return styles.pendiente;
      case "incumplida":
        return styles.incumplida;
      case "vencida":
        return styles.vencida;
      case "anulada":
        return styles.anulada;
      default:
        return "";
    }
  };

  const tableHeaders = [
    "Nombre o Descripción",
    "Fecha",
    "Cantidad",
    "Precio Unit",
    "Subtotal",
    "Impuesto",
    "Pagado",
    "Método de Pago",
  ];

  const tableData = [
    {
      img: "https://imgs.search.brave.com/TTIONeS9OVFFleLDeni9dc0f0MzX35GFM6HhjHhlDoI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bXlwZXJmZWN0Y29s/b3IuY29tL3JlcG9z/aXRvcmllcy9pbWFn/ZXMvY29sb3JzL3No/ZXJ3aW4td2lsbGlh/bXMtc3cyMTE0LWdy/aXMtcGFpbnQtY29s/b3ItbWF0Y2gtMi5q/cGc",
      name: "Nombre o Descripcion",
      date: "25 Dec 2025",
      quantity: 1,
      priceUnit: "00,00EUR",
      tax: ["No", "Sí,21%"],
      state: "Pagado",
      payMethod: "Mastercard ****5678",
    },
    {
      img: "https://imgs.search.brave.com/TTIONeS9OVFFleLDeni9dc0f0MzX35GFM6HhjHhlDoI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bXlwZXJmZWN0Y29s/b3IuY29tL3JlcG9z/aXRvcmllcy9pbWFn/ZXMvY29sb3JzL3No/ZXJ3aW4td2lsbGlh/bXMtc3cyMTE0LWdy/aXMtcGFpbnQtY29s/b3ItbWF0Y2gtMi5q/cGc",
      name: "Nombre o Descripcion",
      date: "25 Dec 2025",
      quantity: 1,
      priceUnit: "00,00EUR",
      tax: ["No", "Sí,21%"],
      state: ["stripe", "rembolsado"],
      payMethod: "Mastercard ****5678",
    },
    {
      img: "https://imgs.search.brave.com/TTIONeS9OVFFleLDeni9dc0f0MzX35GFM6HhjHhlDoI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bXlwZXJmZWN0Y29s/b3IuY29tL3JlcG9z/aXRvcmllcy9pbWFn/ZXMvY29sb3JzL3No/ZXJ3aW4td2lsbGlh/bXMtc3cyMTE0LWdy/aXMtcGFpbnQtY29s/b3ItbWF0Y2gtMi5q/cGc",
      name: "Nombre o Descripcion",
      date: "25 Dec 2025",
      quantity: 1,
      priceUnit: "00,00EUR",
      tax: ["No", "Sí,21%"],
      state: "Pagado",
      payMethod: "Mastercard ****5678",
    },
  ];

  //   const formatCardNumber = (value) => {
  //     return value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
  //   };

  const formatPhoneNumber = (phoneNumber) => {
    return phoneNumber.replace(/(\+\d{2})(\d{3})(\d{3})(\d{3})/, "$1 $2 $3 $4");
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(emailValue)) {
    //   setEmailError('El correo electrónico no es válido.');
    // } else {
    //   setEmailError('');
    // }
  };

  return (
    <div>
      <NavbarAdmin showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className={styles.container} onClick={() => setShowSidebar(false)}>
        <div className={styles.clientsHeader}>
          <div className={styles.infoClient}>
            <div className={styles.contactInfo}>
              <h3>Aythen</h3>
              <span>info@aythen.com</span>
              <span>+34 600 789 012</span>
            </div>

            <div className={styles.info}>
              <img src={pdf} />
              <span>T001</span>
              <span>Titulo del documento</span>
            </div>
          </div>
          <div className={styles.searchContainer}>
            <div className={styles.inputWrapper}>
              <img src={searchGray} className={styles.inputIconInside} />
              <input
                type="text"
                placeholder="Search..."
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
                  <th key={index} className={index == 2 ? styles.small : ""}>
                    {header}
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
                  <td className={styles.imgContainer}>
                    <img src={row.img} alt="" />
                    <p>{row.name}</p>
                  </td>

                  <td>{row.date}</td>
                  <td>{row.quantity}</td>
                  <td>{row.priceUnit}</td>
                  <td>{row.priceUnit}</td>
                  <td>
                    {Array.isArray(row.tax)
                      ? row.tax.map((item, itemIndex) => (
                          <p key={itemIndex}>{item}</p>
                        ))
                      : row.tax}
                  </td>

                  <td className={styles.rowState}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span>&bull;</span>
                      <div>
                        {Array.isArray(row.state)
                          ? row.state.map((item, itemIndex) => (
                              <p
                                key={itemIndex}
                                style={{
                                  color: itemIndex === 0 ? "blue" : "inherit",
                                  fontWeight:
                                    itemIndex === 0 ? "600" : "inherit",
                                }}
                              >
                                {item}
                              </p>
                            ))
                          : row.state}
                      </div>
                    </div>
                  </td>
                  <td>{row.payMethod}</td>
                  <td className={styles.actions}>
                    <div className={styles.transacciones}>
                      <a href="#">stripe</a>
                      <span>Refund</span>
                    </div>
                    <div>
                      <img src={optionDots} />
                    </div>
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

export default ArticlesTransactions;
