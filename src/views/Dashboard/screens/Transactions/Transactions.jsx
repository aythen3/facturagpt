import React, { useEffect, useState } from "react";
import styles from "./Transactions.module.css";
import NavbarAdmin from "../../components/NavbarAdmin/NavbarAdmin";
import searchGray from "../../assets/searchGray.svg";
import optionDots from "../../assets/optionDots.svg";
import plusIcon from "../../assets/Plus Icon.png";
import filterSearch from "../../assets/Filters Search.png";
import creditCard from "../../assets/creditCardIcon.png";
import closeIcon from "../../assets/closeMenu.svg";
import pdf from "../../assets/pdfIcon.png";
import arrow from "../../assets/arrow.svg";
import { useDispatch, useSelector } from "react-redux";
import { getAllTransactionsByClient } from "../../../../actions/transactions";
import { updateClient } from "../../../../actions/user";
import { setTransaction } from "../../../../slices/transactionsSlices";
import { useNavigate } from "react-router-dom";

const Transactions = () => {
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
  const [isEditing, setIsEditing] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const dispatch = useDispatch();
  const { client } = useSelector((state) => state.clients);
  const { transactionsByClient } = useSelector((state) => state.transactions);
  const navigate = useNavigate();
  console.log("CLIET--------", client);
  console.log("TRANSACCIONESS--------", transactionsByClient);

  useEffect(() => {
    const getAll = async () => {
      const response = await dispatch(
        getAllTransactionsByClient({ idsEmails: client?.processedemails })
      );
      console.log("-------DATA REPONSE--------", response);
    };

    getAll();
  }, []);

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
    "ID Transacción",
    "Descripción y Categoria",
    "Etiquetas",
    "Total",
    "Fecha",
    "Vencimiento",
    "Método de Pago",
    "Estado",
    "Artículos",
  ];

  const tableData = [
    {
      id: "T001",
      desc: ["Gasto", "Gastos Operativos"],
      total: "00,00EUR",
      date: "25 Dec 2025",
      expire: "25 Dec 2025",
      PayMethod: "Mastercard ****5678",
      state: ["Pagada", "stripe"],
    },
    {
      id: "T001",
      desc: ["Gasto", "Gastos Operativos"],
      total: "00,00EUR",
      date: "25 Dec 2025",
      expire: "25 Dec 2025",
      PayMethod: "Mastercard ****5678",
      state: ["Pendiente"],
    },
    {
      id: "T001",
      desc: ["Gasto", "Gastos Operativos"],
      total: "00,00EUR",
      date: "25 Dec 2025",
      expire: "25 Dec 2025",
      PayMethod: "Mastercard ****5678",
      state: ["Incumplida"],
    },
    {
      id: "T001",
      desc: ["Gasto", "Gastos Operativos"],
      total: "00,00EUR",
      date: "25 Dec 2025",
      expire: "25 Dec 2025",
      PayMethod: "Mastercard ****5678",
      state: ["Vencida"],
    },
    {
      id: "T001",
      desc: ["Gasto", "Gastos Operativos"],
      total: "00,00EUR",
      date: "25 Dec 2025",
      expire: "25 Dec 2025",
      PayMethod: "Mastercard ****5678",
      state: ["Anulada"],
    },
  ];

  const formatCardNumber = (value) => {
    return value.replace(/\D/g, "").replace(/(\d{4})(?=\d)/g, "$1 ");
  };

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

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && showNewClient) {
        setIsAnimating(true);
        setTimeout(() => {
          setShowNewClient(false);
          setIsAnimating(false);
        }, 300);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showNewClient]);

  const handleCloseNewClient = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setShowNewClient(false);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div>
      <NavbarAdmin showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className={styles.container} onClick={() => setShowSidebar(false)}>
        <div className={styles.clientsHeader}>
          <div className={styles.infoClient}>
            <div className={styles.contactInfo}>
              <h3>{client?.clientData?.clientName}</h3>
              <span>{client?.email}</span>
              <span>
                {client?.clientData?.codeCountry}{" "}
                {client?.clientData?.numberPhone}
              </span>
            </div>
            <div className={styles.info}>
              <p>Número Fiscal</p>
              <span>{client?.clientData?.taxNumber}</span>
            </div>
            <div className={styles.info}>
              <p>ID Cliente</p>
              <span>{client?.id.slice(-21, -16)}</span>
            </div>
          </div>
          <div className={styles.searchContainer}>
            <button
              className={styles.infoBtn}
              onClick={() => setShowNewClient(true)}
            >
              <img src={plusIcon} alt="" />
              Nueva transacción
            </button>

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

        <div style={{ overflow: "auto" }}>
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
                  <th key={index} className={index == 8 ? styles.small : ""}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transactionsByClient.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td>
                    <input
                      type="checkbox"
                      name="clientSelected"
                      onClick={() => selectClient(rowIndex)}
                      checked={clientSelected.includes(rowIndex) ? true : false}
                    />
                  </td>
                  <td className={styles.idContainer}>
                    <img src={pdf} className={styles.pdfIcon} />
                    {row.id.slice(10, 15)}
                  </td>
                  {/* <td>
                    {Array.isArray(row.desc)
                      ? row.desc.map((item, itemIndex) => (
                          <p key={itemIndex}>{item}</p>
                        ))
                      : row.desc}
                  </td> */}
                  <td>
                    <p>
                      {row?.doc?.totalData?.description
                        ? row?.doc?.totalData?.description
                        : "Sin descripción"}
                    </p>
                  </td>
                  <td>
                    <div className={styles.tags}>
                      <span className={`${styles.tag} ${styles.tagBlack}`}>
                        Etiqueta
                      </span>
                      <span className={`${styles.tag} ${styles.tagBlue}`}>
                        Etiqueta
                      </span>
                      <span className={`${styles.tag} ${styles.tagRed}`}>
                        Etiqueta
                      </span>
                      <span className={`${styles.tag} ${styles.tagGreen}`}>
                        Etiqueta
                      </span>
                    </div>
                  </td>
                  <td>{row?.doc?.totalData?.totalAmount}</td>
                  <td>{row?.doc?.totalData?.invoiceIssueDate}</td>
                  <td>
                    {row?.doc?.totalData?.expirationDateYear}-
                    {row?.doc?.totalData?.expirationDateMonth}-
                    {row?.doc?.totalData?.expirationDateDay}
                  </td>
                  <td>
                    {row.doc?.totalData?.payMethod
                      ? row.doc?.totalData?.payMethod
                      : "Sin especificar"}
                  </td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      {/* <span className={getStateClass(row.state[0])}>
                        &bull;
                      </span> */}
                      <span>
                        {row?.doc?.totalData?.status
                          ? row?.doc?.totalData?.status
                          : "pendiente"}
                      </span>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column-reverse",
                        }}
                      >
                        {Array.isArray(row.state) ? (
                          row.state.map((item, itemIndex) => (
                            <p
                              key={itemIndex}
                              style={{
                                color: itemIndex === 1 ? "blue" : "",
                                fontWeight: itemIndex === 1 ? "600" : "inherit",
                                margin: "0",
                              }}
                              className={getStateClass(row.state[0])}
                            >
                              {item}
                            </p>
                          ))
                        ) : (
                          <p>{row.state}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className={styles.actions}>
                    <div className={styles.transacciones}>
                      <a
                        onClick={() => {
                          navigate("/allproducts");
                          dispatch(setTransaction(row));
                        }}
                        href="#"
                      >
                        Ver
                      </a>
                      <span>(2.345)</span>
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
      {showNewClient && (
        <>
          <div className={styles.bg} onClick={handleCloseNewClient}></div>
          <div
            className={`${styles.billContainer} ${isAnimating ? styles.scaleDown : styles.scaleUp}`}
          >
            <div className={styles.billHeader}>
              <h3>Nueva Factura</h3>
              <span onClick={handleCloseNewClient}>
                <img src="/static/media/closeMenu.3c187347ca475028b4f31ab3e491fb44.svg" />
              </span>
            </div>
            <div className={styles.billContent}>
              <div className={styles.name}>
                <div className={styles.column}>
                  <span>Título</span>
                  <input type="text" placeholder="Nueva Factura" />
                </div>
                <div className={styles.column}>
                  <span>Guardar en</span>
                  <div
                    className={`${styles.inputWrapper} ${styles.inputWrapperBill}`}
                  >
                    <img src={searchGray} className={styles.inputIconInside} />
                    <input type="text" placeholder="/Nombredelacuenta" />
                    <button className={styles.buttonInside}>
                      Seleccionar Ubicación
                    </button>
                  </div>
                </div>
              </div>
              <div className={styles.iva}>
                <div className={styles.column}>
                  <div className={styles.row}>
                    <span>Subtotal</span>
                    <span>0,00€</span>
                  </div>
                  <div className={styles.row}>
                    <span>Impuestos</span>
                    <div>
                      <input type="text" placeholder="%" />
                    </div>
                  </div>
                </div>
                <div className={styles.column}>
                  <div className={styles.row}>
                    <select className={styles.btnBill}>
                      <option value="eur">EUR</option>
                    </select>
                    <p className={styles.stateContainer}>
                      Estado:{" "}
                      <select className={styles.state}>
                        <option value="eur">Pendiente</option>
                      </select>
                    </p>
                  </div>
                  <div className={styles.row}>
                    <span>Total</span>
                    <span>0,00€</span>
                  </div>
                </div>
              </div>
              <div className={styles.billTo}>
                <div className={styles.column}>
                  <span>De</span>
                  <textarea placeholder="Su empresa o nombre, y dirección" />
                </div>
                <div
                  className={styles.column}
                  style={{ justifyContent: "start" }}
                >
                  <div className={styles.row}>
                    <span>Facturar a </span>
                    <img src={searchGray} alt="" />
                  </div>
                  <input
                    type="text"
                    placeholder="Dirección de facturación de su cliente"
                    style={{ height: "100%" }}
                  />
                  <div
                    className={`${styles.inputWrapper} ${styles.inputWrapperBill}`}
                  >
                    <img src={searchGray} className={styles.inputIconInside} />
                    <input type="text" placeholder="Buscar..." />
                  </div>
                </div>
              </div>
              <div className={styles.bill}>
                <div className={styles.column}>
                  <div className={styles.row}>
                    <div style={{ gap: "10px" }}>
                      <span># Factura</span>
                      <input type="text" placeholder="0001" />
                    </div>
                    <div style={{ gap: "10px" }}>
                      <span># Orden de compra</span>
                      <input type="text" placeholder="opcional" />
                    </div>
                  </div>
                  <div className={styles.row}>
                    <div>
                      <span>Fecha</span>
                      <select>
                        <option value="25dec25">25 Dec 2025</option>
                      </select>
                    </div>
                    <div>
                      <span>Fecha vencimiento</span>
                      <select>
                        <option value="25dec25">25 Dec 2025</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className={styles.column} style={{ gap: "10px" }}>
                  <span>Condiciones y formas de pago</span>
                  <textarea placeholder="ex. Payment is due within 15 days"></textarea>
                </div>
              </div>
              <div className={styles.signContainer}>
                <div className={styles.logoCorporativo}>
                  Logo
                  <div style={{ display: "flex" }}>
                    <div className={styles.containerLogo}>
                      <input type="radio" name="corporativeLogo1" />
                      <img
                        src="https://www.surforma.com/media/filer_public_thumbnails/filer_public/25/c7/25c793ae-4b50-40f3-a954-1fdc52c999fd/l4068.jpg__800x600_q95_crop_subsampling-2_upscale.jpg"
                        alt=""
                      />
                      <div className={styles.delete}>-</div>
                    </div>
                    <div className={styles.containerLogo}>
                      <input type="radio" name="corporativeLogo1" />
                      <img
                        src="https://www.surforma.com/media/filer_public_thumbnails/filer_public/25/c7/25c793ae-4b50-40f3-a954-1fdc52c999fd/l4068.jpg__800x600_q95_crop_subsampling-2_upscale.jpg"
                        alt=""
                      />
                      <div className={styles.delete}>-</div>
                    </div>
                  </div>
                  <button>Añade tu Logo</button>
                </div>
                <div className={styles.logoCorporativo}>
                  Firma
                  <div style={{ display: "flex" }}>
                    <div className={styles.containerLogo}>
                      <input type="radio" name="corporativeLogo2" />
                      <img
                        src="https://www.surforma.com/media/filer_public_thumbnails/filer_public/25/c7/25c793ae-4b50-40f3-a954-1fdc52c999fd/l4068.jpg__800x600_q95_crop_subsampling-2_upscale.jpg"
                        alt=""
                      />
                      <div className={styles.delete}>-</div>
                    </div>
                    <div className={styles.containerLogo}>
                      <input type="radio" name="corporativeLogo2" />
                      <img
                        src="https://www.surforma.com/media/filer_public_thumbnails/filer_public/25/c7/25c793ae-4b50-40f3-a954-1fdc52c999fd/l4068.jpg__800x600_q95_crop_subsampling-2_upscale.jpg"
                        alt=""
                      />
                      <div className={styles.delete}>-</div>
                    </div>
                  </div>
                  <button>Añade tu firma</button>
                </div>
              </div>
              <div className={styles.addArticle}>
                <button>Añadir artículo nuevo</button>
                <span>
                  <img src={arrow} alt="" />
                  Artículos (2)
                </span>
              </div>
              <div className={styles.articleBill}>
                <div className={styles.articleTitle}>
                  <span>Articulo 1</span>
                  <div className={styles.deleteContainer}>
                    <a href="#">Editar</a>
                    <div
                      className={`${styles.delete} ${styles.positionDelete}`}
                    >
                      -
                    </div>
                  </div>
                </div>
                <div className={styles.articleBody}>
                  <img
                    src="https://materialescomsa.com/wp-content/uploads/2019/07/22079.jpg"
                    alt=""
                  />
                  <div className={styles.info}>
                    <div>
                      <span className={styles.light}>Nombre o Descripción</span>
                      <span className={styles.light}>PVP (Recomendado):</span>
                    </div>
                    <div>
                      <span>Artículo 1</span>
                      <span className={styles.light}>00,00 EUR</span>
                    </div>
                  </div>
                </div>
                <div className={styles.articleTaxs}>
                  <div className={styles.column}>
                    <p>Cant.</p>
                    <input type="text" placeholder="1.0" />
                  </div>
                  <div className={styles.column}>
                    <p>Precio unit.</p>
                    <div className={styles.unitPrice}>
                      <input
                        type="text"
                        placeholder="Dejar vacío para rellenar con PVP"
                        disabled={!isEditing}
                      />
                      <button onClick={() => setIsEditing(!isEditing)}>
                        Editar
                      </button>
                    </div>
                  </div>
                  <div className={styles.column}>
                    <p>Importe</p>
                    <span className={styles.light}>0.0 €</span>
                  </div>
                  <div className={styles.column}>
                    <p>Impuesto</p>
                    <button className={styles.addTax}>Añadir Impuesto</button>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.btnContainerBills}>
              <button className={styles.btnCancel}>Cancel</button>
              <button className={styles.btnSave}>Guardar</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Transactions;
