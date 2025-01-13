import React, { useEffect, useState } from "react";
import styles from "./Clients.module.css";
import NavbarAdmin from "../../components/NavbarAdmin/NavbarAdmin";
import searchGray from "../../assets/searchGray.png";
import searchWhite from "../../assets/searchWhite.png";
import newClientIcon from "../../assets/newClientIcon.svg";
import clock from "../../assets/clock.png";
import edit from "../../assets/edit.png";
import plusIcon from "../../assets/Plus Icon.png";
import optionDots from "../../assets/optionDots.svg";
import creditCard from "../../assets/creditCardIcon.png";
import closeIcon from "../../assets/closeMenu.svg";
import filterSearch from "../../assets/Filters Search.png";
import { useTranslation } from "react-i18next";
import SeeHistory from "../../components/SeeHistory/SeeHistory";
import SendEmailModal from "../../components/SendEmailModal/SendEmailModal";
import { useDispatch, useSelector } from "react-redux";
import {
  createClient,
  deleteClients,
  getAllUserClients,
  updateClient,
} from "../../../../actions/clients";
import { clearClient, setClient } from "../../../../slices/clientsSlices";

const Clients = () => {
  const { t } = useTranslation("clients");
  const [showSidebar, setShowSidebar] = useState(false);
  const [search, setSearch] = useState("");
  const [clientSelected, setClientSelected] = useState([]);
  const [showNewClient, setShowNewClient] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [selectedClientIds, setSelectedClientIds] = useState([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const dispatch = useDispatch();
  const userStorage = localStorage.getItem("emailManagerAccount");
  const dataUser = JSON.parse(userStorage);

  const { clients, loading, client } = useSelector((state) => state.clients);

  const [clientData, setClientData] = useState({
    fullName: "",
    email: "",
    numberPhone: "",
    codeCountry: "",
    webSite: "",
    billingEmail: "",
    zipCode: "",
    country: "",
    taxNumber: "",
    preferredCurrency: "",
    cardNumber: "",
  });

  useEffect(() => {
    if (client?.clientData) {
      setClientData({
        fullName: client.clientData.fullName || "",
        email: client.clientData.email || "",
        numberPhone: client.clientData.numberPhone || "",
        codeCountry: client.clientData.codeCountry || "",
        webSite: client.clientData.webSite || "",
        billingEmail: client.clientData.billingEmail || "",
        zipCode: client.clientData.zipCode || "",
        country: client.clientData.country || "",
        taxNumber: client.clientData.taxNumber || "",
        preferredCurrency: client.clientData.preferredCurrency || "",
        cardNumber: client.clientData.cardNumber || "",
      });
    } else {
      setClientData({
        fullName: "",
        email: "",
        numberPhone: "",
        codeCountry: "",
        webSite: "",
        billingEmail: "",
        zipCode: "",
        country: "",
        taxNumber: "",
        preferredCurrency: "",
        cardNumber: "",
      });
    }
  }, [client]);

  useEffect(() => {
    dispatch(getAllUserClients({ userId: dataUser?.id }));
  }, [loading]);

  const handleClientData = (field, value) => {
    const formattedValue =
      field === "cardNumber" ? formatCardNumber(value) : value;

    setClientData((prev) => ({
      ...prev,
      [field]: formattedValue,
    }));
  };

  const [clientId, setClientId] = useState();

  const selectClient = (rowIndex, client) => {
    setClientId(client?.id);
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

  const formatCardNumber = (value) => {
    return value.replace(/\D/g, "").replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const formatPhoneNumber = (phoneNumber) => {
    return phoneNumber.replace(/(\+\d{2})(\d{3})(\d{3})(\d{3})/, "$1 $2 $3 $4");
  };

  const handleCreateClient = (e) => {
    e.preventDefault();
    const userId = dataUser?.id;
    const email = dataUser?.email;

    if (client && client.clientData) {
      alert("UPDATEd");

      dispatch(
        updateClient({
          clientId: client?.id,
          toUpdate: clientData,
          userId: userId,
        })
      )
        .then((result) => {
          if (result.meta.requestStatus === "fulfilled") {
            setShowNewClient(false);
          } else {
            console.error("Error creating client:", result.error);
          }
        })
        .catch((error) => {
          console.error("Unexpected error:", error);
        });
    } else {
      dispatch(createClient({ userId, email, clientData }))
        .then((result) => {
          if (result.meta.requestStatus === "fulfilled") {
            setShowNewClient(false);
          } else {
            console.error("Error creating client:", result.error);
          }
        })
        .catch((error) => {
          console.error("Unexpected error:", error);
        });
    }
  };

  const toggleClientSelection = (clientId) => {
    setSelectedClientIds((prev) =>
      prev.includes(clientId)
        ? prev.filter((id) => id !== clientId)
        : [...prev, clientId]
    );
  };

  const handleDeleteClient = (e, clientID) => {
    e.preventDefault();

    dispatch(
      deleteClients({
        clientIds: clientID ? [clientID] : selectedClientIds,
        userId: dataUser?.id,
      })
    )
      .then((result) => {
        if (result.meta.requestStatus === "fulfilled") {
          console.log("Clients deleted successfully");
          setSelectedClientIds([]);
        } else {
          console.error("Error deleting clients:", result.error);
        }
      })
      .catch((error) => {
        console.error("Unexpected error:", error);
      });
  };

  const handleActions = (rowIndex, client) => {
    dispatch(setClient(client));
    setSelectedRowIndex(selectedRowIndex === rowIndex ? null : rowIndex); // Alterna el estado
  };

  const handleEditClient = () => {
    setShowNewClient(true);
  };
  console.log("CLIENT REDUX", client);
  console.log("DATAAAAAAA", clientData);

  return (
    <div>
      <NavbarAdmin showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className={styles.container} onClick={() => setShowSidebar(false)}>
        <div className={styles.clientsHeader}>
          {/* <SeeHistory /> */}
          {/* <SendEmailModal /> */}

          <h2>{t("title")}</h2>
          <div className={styles.searchContainer}>
            <button
              className={`${styles.addButton} ${styles.btnNewClient}`}
              onClick={() => setShowNewClient(true)}
            >
              <img src={plusIcon} alt="Nuevo cliente" />
              {t("buttonNewClient")}
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
            <button className={styles.addButton}>
              <img src={plusIcon} />
            </button>
          </div>
        </div>
        {selectedClientIds.length > 0 && (
          <button onClick={(e) => handleDeleteClient(e)}>Borrar</button>
        )}
        <div className={styles.clientsTable} style={{ overflow: "auto" }}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.small}>
                  <input
                    type="checkbox"
                    name="clientSelected"
                    checked={
                      selectedClientIds.length == tableData.length
                        ? true
                        : false
                    }
                    onClick={selectAllClients}
                  />
                </th>
                {tableHeaders.map((header, index) => (
                  <th key={index} className={index == 7 ? styles.hola : ""}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {clients &&
                clients.map((client, rowIndex) => (
                  <tr key={rowIndex}>
                    <td>
                      <input
                        type="checkbox"
                        name="clientSelected"
                        // onClick={() => selectClient(rowIndex, row)}
                        onChange={() => toggleClientSelection(client?.id)}
                        // checked={
                        //   clientSelected.includes(rowIndex) ? true : false
                        // }
                      />
                    </td>
                    <td className={styles.name}>
                      {client.clientData.fullName}
                    </td>
                    <td>{client.clientData.email}</td>

                    {/* <td>
                    {Array.isArray(row.email)
                      ? row.email.map((item, itemIndex) => (
                          <p key={itemIndex}>{item}</p>
                        ))
                      : row.email}
                  </td> */}
                    <td>{formatPhoneNumber(client.clientData.numberPhone)}</td>
                    <td>
                      {client.clientData.country}/agregar a modal de crear
                    </td>
                    <td>{client.clientData.taxNumber}</td>
                    <td>{client.clientData.cardNumber}</td>
                    {/* <td>
                    {Array.isArray(row.metodosPago)
                      ? row.metodosPago.map((item, itemIndex) => (
                          <p key={itemIndex}>{item}</p>
                        ))
                      : row.metodosPago}
                  </td> */}
                    <td>{client.clientData.preferredCurrency}</td>
                    <td className={styles.actions}>
                      <div className={styles.transacciones}>
                        <a href="#">Ver</a>
                        <span>(2.345)</span>
                      </div>
                      <div onClick={() => handleActions(rowIndex, client)}>
                        <img src={optionDots} />
                      </div>
                      {selectedRowIndex === rowIndex && (
                        <ul className={styles.content_menu_actions}>
                          <li
                            onClick={() => {
                              handleEditClient();
                              setSelectedRowIndex(null);
                            }}
                            className={styles.item_menu_actions}
                          >
                            Editar
                          </li>
                          <li
                            onClick={(e) => {
                              handleDeleteClient(e, client?.id);
                              setSelectedRowIndex(null);
                            }}
                            className={styles.item_menu_actions}
                          >
                            Eliminar
                          </li>
                        </ul>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {showNewClient && (
        <>
          <div
            className={styles.bg}
            onClick={() => {
              dispatch(clearClient());
              setShowNewClient(false);
            }}
          ></div>
          <div className={styles.newClientContainer}>
            <div className={styles.containerHeader}>
              <h3>John Doe</h3>
              <span
                onClick={() => {
                  dispatch(clearClient());

                  setShowNewClient(false);
                }}
              >
                <img src={closeIcon} />
              </span>
            </div>

            <form className={styles.newClientForm}>
              <label>
                <div className={styles.row}>
                  <p>Nombre completo</p>
                  <button type="button">Editar</button>
                </div>
                John Doe
                <input
                  type="text"
                  placeholder="John Doe"
                  value={clientData.fullName}
                  // onChange={(e) => setFullName(e.target.value)}
                  onChange={(e) => handleClientData("fullName", e.target.value)}
                />
              </label>

              <label>
                <div className={styles.row}>
                  <p>Email</p>
                  <button type="button">Editar</button>
                </div>
                j***e@gmail.com
                <input
                  type="email"
                  placeholder="john.doe@gmail.com"
                  value={clientData.email}
                  onChange={(e) => handleClientData("email", e.target.value)}
                />
                {emailError && (
                  <span className={styles.error}>{emailError}</span>
                )}
              </label>

              <label className={styles.label}>
                <div className={styles.row}>
                  <p>Teléfono</p>
                  <button type="button">Editar</button>
                </div>
                +34 000 000 000
                <div className={styles.phoneInputs}>
                  <select
                    className={styles.countrySelect}
                    value={clientData.codeCountry}
                    // onChange={(e) => setCountryCode(e.target.value)}
                    onChange={(e) =>
                      handleClientData("codeCountry", e.target.value)
                    }
                  >
                    <option value="+34">España (+34)</option>
                    <option value="+1">Estados Unidos (+1)</option>
                    <option value="+44">Reino Unido (+44)</option>
                    <option value="+52">México (+52)</option>
                    <option value="+91">India (+91)</option>
                    {/* Agrega más países según sea necesario */}
                  </select>
                  <input
                    type="text"
                    placeholder="000 000 000"
                    className={styles.numberInput}
                    // value={formatPhoneNumber(phone)}
                    value={clientData.numberPhone}
                    // onChange={(e) => setPhone(e.target.value)}
                    onChange={(e) =>
                      handleClientData("numberPhone", e.target.value)
                    }
                  />
                </div>
              </label>

              <label>
                <div className={styles.row}>
                  <p>Web o dominio corporativo</p>
                  <button type="button">Editar</button>
                </div>
                www.web.com
                <input
                  type="text"
                  placeholder="www.web.com"
                  value={clientData.webSite}
                  // onChange={(e) => setWeb(e.target.value)}
                  onChange={(e) => handleClientData("webSite", e.target.value)}
                />
              </label>

              <label>
                <div className={styles.row}>
                  <p>Detalles de Facturación</p>
                  <button type="button">Añadir</button>
                </div>
                <div className={styles.details}>
                  <input
                    type="text"
                    placeholder="Email address"
                    value={clientData.billingEmail}
                    onChange={(e) =>
                      handleClientData("billingEmail", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    placeholder="Zip code / Postcode"
                    value={clientData.zipCode}
                    onChange={(e) =>
                      handleClientData("zipCode", e.target.value)
                    }
                  />
                </div>
                Country of residence
                <input
                  type="text"
                  placeholder="Spain"
                  value={clientData.country}
                  onChange={(e) => handleClientData("country", e.target.value)}
                />
                Email adress, Zip code / Postcode, Country of residence
                <div>
                  <button type="button">Editar</button>
                </div>
                Email adress, Zip code / Postcode, Country of residence
                <div>
                  <button type="button">Editar</button>
                </div>
              </label>

              <label>
                <div className={styles.row}>
                  <p>Número Fiscal</p>
                  <button type="button">Editar</button>
                </div>
                Desconocido
                <input
                  type="text"
                  placeholder="000 000 000"
                  value={clientData.taxNumber}
                  onChange={(e) =>
                    handleClientData("taxNumber", e.target.value)
                  }
                />
              </label>

              <label>
                <div className={styles.row}>
                  <p>Moneda Preferida</p>
                  <button type="button">Editar</button>
                </div>
                EUR
                <input
                  type="text"
                  placeholder="EUR"
                  value={clientData.preferredCurrency}
                  onChange={(e) =>
                    handleClientData("preferredCurrency", e.target.value)
                  }
                />
              </label>

              <label>
                <div className={styles.row}>
                  <p>Métodos de Pago</p>
                  <button type="button">Añadir</button>
                </div>
                <div className={styles.row}>Card number</div>
                <div className={styles.inputContainer}>
                  <input
                    type="text"
                    placeholder="1234 1234 1234 1234"
                    className={styles.input}
                    value={clientData.cardNumber}
                    onChange={(e) =>
                      handleClientData("cardNumber", e.target.value)
                    }
                  />
                  <img
                    src={creditCard}
                    alt="Credit Card Icon"
                    className={styles.icon}
                  />
                </div>
              </label>
              <div className={styles.btnOptionsContainer}>
                <button className={styles.view}>Ver Transacciones</button>
                <button
                  onClick={(e) => handleCreateClient(e)}
                  className={styles.new}
                >
                  {client && client.clientData
                    ? "Editar Cliente"
                    : "Crear Cliente"}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Clients;
