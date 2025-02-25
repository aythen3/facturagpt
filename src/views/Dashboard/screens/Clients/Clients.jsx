import React, { useEffect, useRef, useState } from "react";
import styles from "./Clients.module.css";
import NavbarAdmin from "../../components/NavbarAdmin/NavbarAdmin";
import searchGray from "../../assets/searchGray.png";
import { ReactComponent as ArrowUp } from "../../assets/arrowDownGray.svg";
import plusIcon from "../../assets/Plus Icon.svg";
import optionDots from "../../assets/optionDots.svg";
import closeIcon from "../../assets/closeMenu.svg";
import filterSearch from "../../assets/Filters Search.png";
import { useTranslation } from "react-i18next";
import { ReactComponent as Minus } from "../../assets/minus.svg";
import emptyImage from "../../assets/ImageEmpty.svg";
import l from "../../assets/lIcon.svg";

import { useDispatch, useSelector } from "react-redux";
import {
  createClient,
  deleteClients,
  getAllClients,
  getOneClient,
  updateClient,
} from "../../../../actions/clients";
import { clearClient, setClient } from "../../../../slices/clientsSlices";
import { useNavigate } from "react-router-dom";
import EditableInput from "./EditableInput/EditableInput";
import ModalTemplate from "../../components/ModalTemplate/ModalTemplate";
import ProfileModalTemplate from "../../components/ProfileModalTemplate/ProfileModalTemplate";
import { ParametersLabel } from "../../components/ParametersLabel/ParametersLabel";
import { clearTransaction } from "../../../../slices/transactionsSlices";
import FileExplorer from "../../components/FileExplorer/FileExplorer";
// import { getEmailsByQuery } from '../../../../actions/user';
import PanelTemplate from "../../components/PanelTemplate/PanelTemplate";
import PayMethod from "../../components/PayMethod/PayMethod";
import { ReactComponent as DownloadIcon } from "../../assets/downloadIcon.svg";
import KIcon from "../../assets/KIcon.svg";
import winIcon from "../../assets/winIcon.svg";
import Button from "../../components/Button/Button";
import SearchIconWithIcon from "../../components/SearchIconWithIcon/SearchIconWithIcon";
import ImportContactsAndProducts from "../../components/ImportContactsAndProducts/ImportContactsAndProducts";
import DeleteButton from "../../components/DeleteButton/DeleteButton";
import useFocusShortcut from "../../../../utils/useFocusShortcut";
import DynamicTable from "../../components/DynamicTable/DynamicTable";
import SkeletonScreen from "../../components/SkeletonScreen/SkeletonScreen";
import ClientsHeader from "../../components/ClientsHeader/ClientsHeader";
const Clients = () => {
  const { t } = useTranslation("clients");
  const [showSidebar, setShowSidebar] = useState(false);
  const [search, setSearch] = useState("");
  const [clientSelected, setClientSelected] = useState([]);
  const [showNewClient, setShowNewClient] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [selectedClientIds, setSelectedClientIds] = useState([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [selectTypeClient, setSelectTypeClient] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showImportContacts, setShowImportContacts] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  // const { allClients, allUsers } = useSelector((state) => state.user);
  const { allClients } = useSelector((state) => state.user);

  const { clients, loading, client } = useSelector((state) => state.clients);

  const [clientData, setClientData] = useState({
    clientName: "",
    companyEmail: "",
    companyPhoneNumber: [],
    codeCountry: "",
    webSite: "",
    billingEmail: "",
    clientZip: "",
    country: "",
    clientCif: "",
    preferredCurrency: "",
    cardNumber: "",
    companyAddress: "",
    companyCity: "",
    companyProvince: "",
    companyCountry: "",
    infoBill: [],
    paymethod: [],
  });

  useEffect(() => {
    dispatch(getAllClients({ userId: user?.id }));
  }, [loading, user]);

  useEffect(() => {
    if (client?.clientData) {
      setClientData({
        clientName: client.clientData.clientName || "",
        companyEmail: client.clientData.companyEmail || "",
        companyPhoneNumber: client.clientData.companyPhoneNumber || "",
        codeCountry: client.clientData.codeCountry || "",
        webSite: client.clientData.webSite || "",
        billingEmail: client.email || "",
        clientZip: client.clientData.clientZip || "",
        country: client.clientData.country || "",
        clientCif: client.clientData.clientCif || "",
        preferredCurrency: client.clientData.preferredCurrency || "",
        cardNumber: client.clientData.cardNumber || "",
        companyAddress: client.clientData.companyAddress || "",
        companyCity: client.clientData.companyCity || "",
        companyProvince: client.clientData.companyProvince || "",
        companyCountry: client.clientData.companyCountry || "",
        infoBill: client.clientData.infoBill || [],
        paymethod: client.clientData.paymethod || [],
      });
    } else {
      setClientData({
        clientName: "",
        companyEmail: "",
        companyPhoneNumber: [],
        codeCountry: "",
        webSite: "",
        billingEmail: "",
        clientZip: "",
        country: "",
        clientCif: "",
        preferredCurrency: "",
        cardNumber: "",
        companyAddress: "",
        companyCity: "",
        companyProvince: "",
        companyCountry: "",
        infoBill: [],
        paymethod: [],
      });
    }
  }, [client]);

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
    return phoneNumber?.replace(
      /(\+\d{2})(\d{3})(\d{3})(\d{3})/,
      "$1 $2 $3 $4"
    );
  };

  const handleCreateClient = (e) => {
    e.preventDefault();
    const userId = user?.id;
    const email = user?.email;

    console.log("CLIENTESSSSSSSSSS", clientData);
    if (client && client.clientData) {
      dispatch(
        updateClient({
          userId: userId,
          id: client?.id,
          clientData: clientData,
          // toUpdate: clientData,
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
      dispatch(
        createClient({
          userId,
          email,
          clientData,
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
    }
  };

  const toggleClientSelection = async (clientId) => {
    setSelectedClientIds((prev) =>
      prev.includes(clientId)
        ? prev.filter((id) => id !== clientId)
        : [...prev, clientId]
    );
    console.log("users", allUsers);
    console.log("toggling clientId", clientId);
    console.log("allClients", allClients);
    let singleUser = allClients[0];
    // const response = await dispatch(
    //   getEmailsByQuery({
    //     userId: singleUser?.id || 'randomId',
    //     email: singleUser.tokenEmail,
    //     password: singleUser.tokenPassword,
    //     query: singleUser.emailQueries,
    //     tokenGpt: singleUser.tokenGPT,
    //     logs: [],
    //     ftpData: {
    //       host: singleUser.host,
    //       port: singleUser.port,
    //       user: singleUser.tokenUser,
    //       password: singleUser.tokenUserPassword,
    //     },
    //   })
    // );
    // console.log('RESPONSE==', response);
  };

  const handleDeleteClient = (e, clientID) => {
    e.preventDefault();

    dispatch(
      deleteClients({
        clientIds: clientID ? [clientID] : selectedClientIds,
        userId: user?.id,
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
    setSelectedRowIndex(selectedRowIndex === rowIndex ? null : rowIndex);
  };

  const handleEditClient = () => {
    setShowNewClient(true);
    handleEditAll(false);
  };

  const handleGetOneClient = async (clientId) => {
    console.log("CLIENTIDDD", clientId);

    try {
      const response = await dispatch(
        getOneClient({ userId: user?.id, clientId })
      ).unwrap();
      console.log("Cliente obtenido:", response);
      navigate(`/admin/clients/${clientId}`);
    } catch (error) {
      console.error("Error al obtener el cliente:", error);
    }
  };

  const handleCloseNewClient = () => {
    setIsAnimating(true);
    setTimeout(() => {
      dispatch(clearClient());
      setShowNewClient(false);
      setShowImportContacts(false);
      setIsAnimating(false);
    }, 300);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && showNewClient) {
        setIsAnimating(true);
        setTimeout(() => {
          dispatch(clearClient());
          setShowNewClient(false);
          setShowImportContacts(false);

          setIsAnimating(false);
        }, 300);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showNewClient]);

  console.log("CLIENTSSSS", clients);

  const [clientDataInputs, setClientDataInputs] = useState({
    name: "",
    email: "",
    phone: "",
    web: "",
    info: [],
    parameters: [],
  });
  const [inputsEditing, setInputsEditing] = useState({
    name: false,
    email: false,
    phone: false,
    web: false,
    info: false,
    billingDetails: [],
  });

  const addParameter = () => {
    setClientDataInputs((prev) => ({
      ...prev,
      parameters: [...prev.parameters, { name: "", value: "" }],
    }));
  };

  const deleteParameter = (index) => {
    setClientDataInputs((prev) => ({
      ...prev,
      parameters: prev.parameters.filter((_, i) => i !== index),
    }));
  };

  const [editingIndices, setEditingIndices] = useState([]);
  console.log("DATAAAAA--------", clientData);
  const handleAddBillingDetail = () => {
    setClientData((prevData) => ({
      ...prevData,
      infoBill: [
        ...prevData.infoBill,
        {
          direccion: "",
          Población: "",
          Provincia: "",
          codigoPostal: "",
          pais: "",
        },
      ],
    }));
  };
  const [selectedBillIndex, setSelectedBillIndex] = useState(null); // Índice del detalle que se está editando
  const [currentBill, setCurrentBill] = useState({
    direccion: "",
    Población: "",
    Provincia: "",
    codigoPostal: "",
    pais: "",
  });

  const handleDeleteBillingDetail = (index) => {
    setClientData((prev) => {
      const updatedInfoBill = prev.infoBill.filter((_, i) => i !== index); // Elimina el índice seleccionado
      return { ...prev, infoBill: updatedInfoBill };
    });

    // Si se está editando el mismo detalle que se eliminó, restablece la edición
    if (selectedBillIndex === index) {
      setSelectedBillIndex(null);
      setInputsEditing((prev) => ({ ...prev, info: false }));
    }
  };

  const handleEditBillingDetail = (index) => {
    setSelectedBillIndex(index); // Establece el índice del detalle seleccionado
    setCurrentBill({ ...clientData.infoBill[index] }); // Carga los datos en los inputs
    setInputsEditing((prev) => ({ ...prev, info: true })); // Habilita la edición
  };

  const handleBillingDetailChange = (field, value) => {
    setCurrentBill((prev) => ({ ...prev, [field]: value })); // Actualiza el detalle seleccionado
  };

  const handleSaveBillingDetail = () => {
    if (selectedBillIndex !== null) {
      setClientData((prev) => {
        const updatedInfoBill = [...prev.infoBill];
        updatedInfoBill[selectedBillIndex] = { ...currentBill }; // Guarda cambios en el detalle seleccionado

        return { ...prev, infoBill: updatedInfoBill };
      });

      setInputsEditing((prev) => ({ ...prev, info: false })); // Deshabilita edición
      setSelectedBillIndex(null); // Reinicia selección
    }
  };
  const [newContact, setNewContact] = useState(false);

  const handleEditAll = (value) => {
    setNewContact(value);
    setInputsEditing((prevState) => {
      const updatedState = {};
      Object.keys(prevState).forEach((key) => {
        if (Array.isArray(prevState[key])) {
          updatedState[key] = prevState[key]; // Mantiene los arrays intactos
        } else {
          updatedState[key] = value;
        }
      });
      console.log("Nuevo estado:", updatedState); // Verifica el nuevo estado aquí
      return updatedState;
    });
  };

  const handleChangePhoneNumbers = (index, field, value) => {
    const updatedNumbers = [...clientData.companyPhoneNumber];
    updatedNumbers[index][field] = value;
    handleClientData("companyPhoneNumber", updatedNumbers);
  };

  const addPhoneNumber = () => {
    handleClientData("companyPhoneNumber", [
      ...clientData.companyPhoneNumber,
      { countryCode: "+34", number: "" }, // Por defecto con España, ajusta según tus necesidades
    ]);
  };

  const removePhoneNumber = (index) => {
    const updatedNumbers = clientData.companyPhoneNumber.filter(
      (_, i) => i !== index
    );
    handleClientData("companyPhoneNumber", updatedNumbers);
  };
  const [currentPayMethod, setCurrentPayMethod] = useState({
    bank: "",
    accountNumber: "",
    swift: "",
    routingNumber: "",
    currency: "",
    default: false,
  });
  const [editingIndexPayMethod, setEditingIndexPayMethod] = useState(null);

  // Añadir un nuevo método de pago vacío
  const addPayMethod = () => {
    setClientData((prevData) => ({
      ...prevData,
      paymethod: [...prevData.paymethod, { ...currentPayMethod }],
    }));
    setCurrentPayMethod({
      bank: "",
      accountNumber: "",
      swift: "",
      routingNumber: "",
      currency: "",
      default: false,
    });
    {
      console.log(editingIndexPayMethod);
    }
  };
  // Manejar cambios en el método de pago que se está editando
  const handlePayMethodChange = (field, value) => {
    setCurrentPayMethod((prev) => {
      const updatedPayMethod = { ...prev, [field]: value };

      // Si estamos marcando un banco como predeterminado, desmarcamos los demás
      if (field === "default" && value) {
        // Desmarcar todos los métodos de pago, excepto el actual
        setClientData((prevData) => ({
          ...prevData,
          paymethod: prevData.paymethod.map((method) =>
            method === updatedPayMethod
              ? { ...method, default: true }
              : { ...method, default: false }
          ),
        }));
      }

      return updatedPayMethod;
    });
  };

  // Guardar el método de pago actualizado
  const savePayMethod = (index) => {
    setClientData((prevData) => {
      const updatedMethods = [...prevData.paymethod];
      updatedMethods[index] = currentPayMethod;
      return {
        ...prevData,
        paymethod: updatedMethods,
      };
    });
    setCurrentPayMethod({
      bank: "",
      accountNumber: "",
      swift: "",
      routingNumber: "",
      currency: "",
      default: false,
    });
  };

  const searchInputRef = useRef(null);

  // Llama a la función y pasa la referencia
  useFocusShortcut(searchInputRef, "k");

  const [selectedIds, setSelectedIds] = useState([]);

  const toggleSelection = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedIds(
      selectedIds.length === tableData.length
        ? []
        : tableData.map((_, index) => index)
    );
  };

  const renderRow = (row, index, onSelect) => (
    <tr key={index}>
      <td>
        <input
          type="checkbox"
          name="clientSelected"
          // onClick={() => selectClient(rowIndex, row)}
          onChange={() => toggleClientSelection(row?.id)}
          // checked={
          //   clientSelected.includes(rowIndex) ? true : false
          // }
        />
      </td>
      <td className={styles.name}>
        <img src={row?.img || emptyImage} alt="" />
        <div>
          <span>{row?.clientName}</span>
          <span>{row?.clientName}</span>
        </div>
      </td>
      <td>{row?.companyEmail || row?.email}</td>

      {/* <td>
  {Array.isArray(row.email)
    ? row.email.map((item, itemIndex) => (
        <p key={itemIndex}>{item}</p>
      ))
    : row.email}
</td> */}
      <td>
        {row?.countryCode}
        {row?.number}
      </td>
      <td>
        {row?.companyAddress} {row?.clientProvice}
      </td>
      <td>{row?.taxNumber}</td>
      <td>{row?.cardNumber}</td>
      {/* <td>
  {Array.isArray(row.metodosPago)
    ? row.metodosPago.map((item, itemIndex) => (
        <p key={itemIndex}>{item}</p>
      ))
    : row.metodosPago}
</td> */}
      <td>{row?.preferredCurrency}</td>
      <td className={styles.actions}>
        <div className={styles.transacciones}>
          <a
            onClick={() => {
              dispatch(clearTransaction());
              handleGetOneClient(row?.id);
            }}
            href="#"
          >
            Ver
          </a>
          <span>(2.345)</span>
        </div>
        <div onClick={() => handleActions(index, row)}>
          <img src={optionDots} />
        </div>
        {selectedRowIndex === index && (
          <ul className={styles.content_menu_actions}>
            <li
              onClick={() => {
                handleEditClient();
                setSelectedRowIndex(null);
                setSelectedContact(row?.id);
              }}
              className={styles.item_menu_actions}
            >
              Editar
            </li>
            <li
              onClick={(e) => {
                handleDeleteClient(e, row?.id);
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
  );
  console.log(
    "clientssssssssssssssssssssssssssssssssssssssss11111111" + clients
  );
  return (
    <PanelTemplate>
      <div className={styles.container} onClick={() => setShowSidebar(false)}>
        <ClientsHeader
          title="Gestión de Contactos"
          buttons={[
            {
              label: (
                <>
                  <img src={plusIcon} alt="Nuevo cliente" />
                  {t("buttonNewClient")}
                </>
              ),
              onClick: () => {
                handleEditAll(true);
                setShowNewClient(true);
              },
            },
            {
              label: <DownloadIcon />,
              headerStyle: { padding: "6px 10px" },
              type: "white",
              onClick: () => setShowImportContacts(true),
            },
          ]}
          searchProps={{
            ref: searchInputRef,
            // searchTerm: searchTerm,
            // setSearchTerm: setSearchTerm,
            // iconRight: pencilSquareIcon,
            // classNameIconRight: styles.searchContainerL,
            // onClickIconRight: () => setIsFilterOpen(true)
          }}
          searchChildren={
            <>
              {/* <div
                style={{ marginLeft: "5px" }}
                className={styles.searchIconsWrappers}
              >
                <img src={winIcon} alt="kIcon" />
              </div> */}
              <div
                style={{ marginLeft: "5px" }}
                className={styles.searchIconsWrappers}
              >
                <img src={KIcon} alt="kIcon" />
              </div>
            </>
          }
        />
        {/* <div className={styles.clientsHeader}>
          <h2>{t("title")}</h2>
          <div className={styles.searchContainer}>
            <button
              className={`${styles.addButton} ${styles.btnNewClient}`}
              onClick={() => {
                handleEditAll(true);
                setShowNewClient(true);
              }}
            >
              <img src={plusIcon} alt="Nuevo cliente" />
              {t("buttonNewClient")}
            </button>
            <Button
              type="white"
              headerStyle={{ padding: "6px 10px" }}
              action={() => setShowImportContacts(true)}
            >
              <DownloadIcon />
            </Button>
            <SearchIconWithIcon ref={searchInputRef}>
              <>
                <div
                  style={{ marginLeft: "5px" }}
                  className={styles.searchIconsWrappers}
                >
                  <img src={winIcon} alt="kIcon" />
                </div>
                <div
                  style={{ marginLeft: "5px" }}
                  className={styles.searchIconsWrappers}
                >
                  <img src={KIcon} alt="kIcon" />
                </div>
              </>
            </SearchIconWithIcon>
          
          </div>
        </div> */}
        {showImportContacts && (
          <ImportContactsAndProducts
            text="contactos"
            state={handleCloseNewClient}
            isAnimating={isAnimating}
          />
        )}
        {clients.length == 0 ? (
          <SkeletonScreen
            labelText="No se han encontrado documentos con este contacto"
            helperText="Todas las transacciones con este cliente o proveedor estarán listadas aquí."
            showInput={true}
            enableLabelClick={false}
          />
        ) : (
          <DynamicTable
            columns={tableHeaders}
            data={clients}
            renderRow={renderRow}
            selectedIds={selectedIds}
            onSelectAll={selectAll}
            onSelect={toggleSelection}
          />
        )}
      </div>
      {showNewClient && (
        <>
          <ModalTemplate
            actionSave={handleCreateClient}
            onClick={handleCloseNewClient}
            text="contacto"
            isAnimating={isAnimating}
            className={`${styles.newClientContainer} `}
            newContact={newContact}
            selectedContact={selectedContact}
            handleGetOneClient={handleGetOneClient}
          >
            <div className={styles.containerNewClientForm}>
              {/* <div className={styles.containerHeader}>
                <h3>John Doe</h3>
                <span onClick={handleCloseNewClient}>
                  <img src={closeIcon} />
                </span>
              </div> */}

              <form
                className={styles.newClientForm}
                onSubmit={handleCreateClient}
              >
                <EditableInput
                  label={"Nombre completo"}
                  nameInput={"nombre"}
                  placeholderInput={clientData.clientName || "yeremi"}
                  isEditing={inputsEditing.name}
                  value={clientData.clientName || clientDataInputs.name}
                  onChange={(e) => {
                    setClientDataInputs({
                      ...clientDataInputs,
                      name: e.target.value,
                    });
                    handleClientData("clientName", e.target.value);
                  }}
                  onClick={() =>
                    setInputsEditing((prev) => ({
                      ...prev,
                      name: !prev.name,
                    }))
                  }
                >
                  <div
                    className={`
                    ${styles.typeClient}
                    ${
                      inputsEditing.name
                        ? styles.typeClientActivate
                        : styles.typeClientDisabled
                    }
                      `}
                  >
                    <button
                      className={selectTypeClient == 0 && styles.selected}
                      onClick={() => setSelectTypeClient(0)}
                      type="button"
                      disabled={!inputsEditing.name}
                    >
                      Proveedor
                    </button>
                    <button
                      className={selectTypeClient == 1 && styles.selected}
                      onClick={() => setSelectTypeClient(1)}
                      type="button"
                      disabled={!inputsEditing.name}
                    >
                      Cliente
                    </button>
                  </div>
                </EditableInput>
                <EditableInput
                  label={"Email"}
                  nameInput={"email"}
                  placeholderInput={"johndoe@gmail.com"}
                  isEditing={inputsEditing.email}
                  value={clientData.companyEmail || clientDataInputs.email}
                  onChange={(e) => {
                    setClientDataInputs({
                      ...clientDataInputs,
                      email: e.target.value,
                    });
                    handleClientData("companyEmail", e.target.value);
                  }}
                  onClick={() =>
                    setInputsEditing((prev) => ({
                      ...prev,
                      email: !prev.email,
                    }))
                  }
                />
                {/* <EditableInput
                  label={"Teléfono"}
                  nameInput={"phone"}
                  placeholderInput={"phone"}
                  isEditing={inputsEditing.phone}
                  value={
                    clientData.companyPhoneNumber || clientDataInputs.phone
                  }
                  phone={true}
                  onChange={(e) => {
                    setClientDataInputs({
                      ...clientDataInputs,
                      phone: e.target.value,
                    });
                    handleClientData("companyPhoneNumber", e.target.value);
                  }}
                  onClick={() =>
                    setInputsEditing((prev) => ({
                      ...prev,
                      phone: !prev.phone,
                    }))
                  }
                /> */}

                <label className={styles.phoneNumber}>
                  <div className={styles.headerPhoneNumer}>
                    {" "}
                    <p>Teléfono</p>
                    <div className={styles.buttonPhoneContainer}>
                      <div
                        className={styles.button}
                        onClick={() =>
                          setInputsEditing((prev) => ({
                            ...prev,
                            phone: !prev.phone,
                          }))
                        }
                      >
                        {inputsEditing.phone ? "Guardar" : "Editar"}
                      </div>
                      <div className={styles.button} onClick={addPhoneNumber}>
                        Añadir número
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      clientData.companyPhoneNumber.length >= 1
                        ? styles.phoneContainer
                        : styles.phoneContainerUnknown
                    }
                  >
                    {clientData.companyPhoneNumber.length >= 1 ? (
                      clientData.companyPhoneNumber.map((phone, index) => (
                        <div key={index} className={styles.phoneRow}>
                          <select
                            value={phone.countryCode}
                            onChange={(e) =>
                              handleChangePhoneNumbers(
                                index,
                                "countryCode",
                                e.target.value
                              )
                            }
                            className={styles.select}
                            disabled={!inputsEditing.phone}
                          >
                            <option value="+1">+1 (EE.UU.)</option>
                            <option value="+44">+44 (Reino Unido)</option>
                            <option value="+34">+34 (España)</option>
                            <option value="+52">+52 (México)</option>
                            <option value="+57">+57 (Colombia)</option>
                          </select>
                          <input
                            type="text"
                            disabled={!inputsEditing.phone}
                            placeholder="Número de teléfono"
                            className={styles.inputEdit}
                            value={phone.number}
                            onChange={(e) =>
                              handleChangePhoneNumbers(
                                index,
                                "number",
                                e.target.value
                              )
                            }
                          />
                          <DeleteButton
                            action={() => removePhoneNumber(index)}
                          />
                        </div>
                      ))
                    ) : (
                      <div className={styles.unknown}>Desconocido</div>
                    )}
                  </div>
                </label>

                <EditableInput
                  label={"Web o dominio corporativo"}
                  nameInput={"web"}
                  placeholderInput={"www.web.com"}
                  isEditing={inputsEditing.web}
                  value={clientData.webSite || clientDataInputs.web}
                  onChange={(e) => {
                    handleClientData("webSite", e.target.value);
                    setClientDataInputs({
                      ...clientDataInputs,
                      web: e.target.value,
                    });
                  }}
                  onClick={() =>
                    setInputsEditing((prev) => ({ ...prev, web: !prev.web }))
                  }
                />
                <label>
                  <div>
                    <div className={styles.detailsBill}>
                      <p>Detalles de Facturación</p>
                      <div className={styles.optionsDetailsBill}>
                        <div
                          className={styles.button}
                          onClick={handleAddBillingDetail}
                        >
                          Añadir Detalles de Facturación
                        </div>

                        <div
                          className={styles.button}
                          onClick={handleSaveBillingDetail}
                        >
                          Guardar Detalles de Facturación
                        </div>
                      </div>
                    </div>
                    <div className={styles.infoBill}>
                      {clientData.infoBill?.length > 0 ? (
                        clientData.infoBill.map((bill, index) => (
                          <div style={{ width: "100%" }}>
                            {" "}
                            <div
                              key={index}
                              className={styles.infoBillContainer}
                              style={{ flexDirection: "row" }}
                            >
                              <div className={styles.info}>
                                <p>
                                  {" "}
                                  <span> {bill.direccion || "Dirección"},</span>
                                  <span> {bill.Población || "Población"},</span>
                                  <span> {bill.Provincia || "Provincia"},</span>
                                  <span>
                                    {bill.codigoPostal || "Código Postal"},
                                  </span>
                                  <span> {bill.pais || "País"}</span>
                                </p>

                                <button
                                  type="button"
                                  onClick={() => {
                                    selectedBillIndex === index
                                      ? handleSaveBillingDetail()
                                      : handleEditBillingDetail(index);
                                  }}
                                  className={styles.button}
                                >
                                  {selectedBillIndex === index
                                    ? "Guardar"
                                    : "Editar"}
                                </button>
                              </div>
                              <DeleteButton
                                action={() => handleDeleteBillingDetail(index)}
                              />
                            </div>
                            {selectedBillIndex === index && (
                              <div className={styles.billInfoInputs}>
                                <div className={styles.info}>
                                  <span>Dirección</span>
                                  <input
                                    type="text"
                                    disabled={!inputsEditing.info}
                                    placeholder="Dirección"
                                    value={currentBill.direccion}
                                    onChange={(e) =>
                                      handleBillingDetailChange(
                                        "direccion",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div>
                                  {" "}
                                  <div className={styles.info}>
                                    <span>Población</span>
                                    <input
                                      type="text"
                                      disabled={!inputsEditing.info}
                                      placeholder="Población"
                                      value={currentBill.Población}
                                      onChange={(e) =>
                                        handleBillingDetailChange(
                                          "Población",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                  <div className={styles.info}>
                                    <span>Provincia</span>
                                    <input
                                      type="text"
                                      disabled={!inputsEditing.info}
                                      placeholder="Provincia"
                                      value={currentBill.Provincia}
                                      onChange={(e) =>
                                        handleBillingDetailChange(
                                          "Provincia",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                                <div>
                                  <div className={styles.info}>
                                    <span>Código Postal</span>
                                    <input
                                      type="text"
                                      disabled={!inputsEditing.info}
                                      placeholder="Código Postal"
                                      value={currentBill.codigoPostal}
                                      onChange={(e) =>
                                        handleBillingDetailChange(
                                          "codigoPostal",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                  <div className={styles.info}>
                                    <span>País</span>
                                    <input
                                      type="text"
                                      disabled={!inputsEditing.info}
                                      placeholder="País"
                                      value={currentBill.pais}
                                      onChange={(e) =>
                                        handleBillingDetailChange(
                                          "pais",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <span>No hay detalles de facturación disponibles.</span>
                      )}
                    </div>
                  </div>
                </label>
                <label>
                  <div style={{ marginBottom: "30px" }}>
                    <div className={styles.detailsBill}>
                      <p>Métodos de Pago</p>
                      <div className={styles.optionsDetailsBill}>
                        <div className={styles.button} onClick={addPayMethod}>
                          Añadir Método de Pago
                        </div>
                        <div
                          onClick={() => {
                            setClientData((prev) => {
                              const updatedPayMethods = [...prev.paymethod];
                              if (editingIndexPayMethod !== null) {
                                // Actualiza el método de pago en el índice correspondiente
                                updatedPayMethods[editingIndexPayMethod] =
                                  currentPayMethod;
                              }
                              return {
                                ...prev,
                                paymethod: updatedPayMethods,
                              };
                            });
                            setEditingIndexPayMethod(null); // Reset al índice después de guardar
                            setCurrentPayMethod({
                              bank: "",
                              accountNumber: "",
                              swift: "",
                              routingNumber: "",
                              currency: "",
                              default: false,
                            });
                          }}
                          className={styles.button}
                        >
                          Guardar Método de Pago
                        </div>
                      </div>
                    </div>

                    {Array.isArray(clientData.paymethod) &&
                      clientData.paymethod.map((method, index) => (
                        <div key={index} className={styles.infoBillContainer}>
                          <div className={styles.info}>
                            <p>
                              <span>{method.bank || "Banco"}, </span>
                              <span>
                                {method.accountNumber || "Número de Cuenta"},{" "}
                              </span>
                              <span> {method.swift || "SWIFT/BIC"}, </span>
                              <span>
                                {method.routingNumber || "Routing Number"},{" "}
                              </span>
                              <span> {method.currency || "Moneda"}</span>
                            </p>
                            <DeleteButton />
                          </div>
                          <div
                            className={styles.button}
                            onClick={() => {
                              if (editingIndexPayMethod === index) {
                                // Si ya estamos editando este índice, guarda los cambios
                                setClientData((prev) => {
                                  const updatedPayMethods = [...prev.paymethod];
                                  updatedPayMethods[editingIndexPayMethod] =
                                    currentPayMethod;
                                  return {
                                    ...prev,
                                    paymethod: updatedPayMethods,
                                  };
                                });

                                setEditingIndexPayMethod(null); // Reset al índice después de guardar
                                setCurrentPayMethod({
                                  bank: "",
                                  accountNumber: "",
                                  swift: "",
                                  routingNumber: "",
                                  currency: "",
                                  default: false,
                                });
                              } else {
                                // Si no estamos editando este índice, entonces pasamos a modo edición
                                setCurrentPayMethod(method);
                                setEditingIndexPayMethod(index);
                              }
                            }}
                          >
                            {editingIndexPayMethod == index
                              ? "Guardar"
                              : "Editar"}
                          </div>
                          {editingIndexPayMethod == index && (
                            <PayMethod
                              method={currentPayMethod}
                              onChange={handlePayMethodChange}
                            />
                          )}
                        </div>
                      ))}
                  </div>
                </label>

                <ParametersLabel
                  parameters={clientDataInputs.parameters}
                  setClientDataInputs={setClientDataInputs}
                  editingIndices={editingIndices}
                  setEditingIndices={setEditingIndices}
                />
              </form>
            </div>
            <ProfileModalTemplate />
          </ModalTemplate>
        </>
      )}
    </PanelTemplate>
  );
};

export default Clients;
