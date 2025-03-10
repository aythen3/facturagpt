import React, { useEffect, useRef, useState } from "react";
import styles from "./Clients.module.css";
import plusIcon from "../../assets/Plus Icon.svg";
import optionDots from "../../assets/optionDots.svg";
import { useTranslation } from "react-i18next";
import emptyImage from "../../assets/ImageEmpty.svg";

import { useDispatch, useSelector } from "react-redux";
import {
  createClient,
  deleteClients,
  getAllClients,
  getOneClient,
  updateClient,
} from "@src/actions/clients";

import { clearClient, setClient } from "@src/slices/clientsSlices";
import { useNavigate } from "react-router-dom";
import { clearDoc } from "@src/slices/docsSlices";
import PanelTemplate from "../../components/PanelTemplate/PanelTemplate";
import { ReactComponent as DownloadIcon } from "../../assets/downloadIcon.svg";
import KIcon from "../../assets/KIcon.svg";
import ImportContactsAndProducts from "../../components/ImportContactsAndProducts/ImportContactsAndProducts";
import useFocusShortcut from "../../../../utils/useFocusShortcut";
import DynamicTable from "../../components/DynamicTable/DynamicTable";
import SkeletonScreen from "../../components/SkeletonScreen/SkeletonScreen";
import ClientsHeader from "../../components/ClientsHeader/ClientsHeader";
import NewContact from "../../components/NewContact/NewContact";
import FiltersDropdownContainer from "../../components/FiltersDropdownContainer/FiltersDropdownContainer";
import OptionsPopup from "../../components/OptionsPopup/OptionsPopup";
import { FaUpload } from "react-icons/fa";

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
  const [selectedIds, setSelectedIds] = useState([]);

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
    if (clientSelected.length === clients.length) {
      // Si todos los clientes están seleccionados, limpiar la selección
      setClientSelected([]);
      setSelectedIds(false);
      console.log("a");
    } else {
      // Si no todos los clientes están seleccionados, agregar todos los índices
      setSelectedIds(true);
      const allClientIndexes = clients.map((_, index) => index); // Crear un arreglo con los índices
      console.log(allClientIndexes);
      setClientSelected(allClientIndexes);
    }
  };

  // const selectAllClients = () => {
  //   if (clientSelected.length > 0) {
  //     // Si ya hay clientes seleccionados, limpiar la selección
  //     setClientSelected([]);
  //   } else {
  //     // Si no hay clientes seleccionados, agregar todos los índices
  //     const allClientIndexes = tableData.map((_, index) => index); // Crear un arreglo con los índices
  //     setClientSelected(allClientIndexes);
  //   }
  // };

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

    console.log("toggling clientId", clientId);
    console.log("allClients", allClients);
    // let singleUser = allClients[0];
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
      // const response = await dispatch(
      //   getOneClient({ userId: user?.id, clientId })
      // ).unwrap();
      // console.log("Cliente obtenido:", response);
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
  const [newContactProp, setNewContact] = useState(false);

  const handleEditAll = (value) => {
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
          onChange={() => toggleClientSelection(row?.id)}
          onClick={() => selectClient(index, row)}
          checked={clientSelected.includes(index) ? true : false}
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
              dispatch(clearDoc());
              handleGetOneClient(row?.id);
            }}
            // href="#"
          >
            Ver
          </a>
          <span>(2.345)</span>
        </div>
        <div onClick={() => handleActions(index, row)}>
          <img src={optionDots} />
        </div>
        {selectedRowIndex === index && (
          // <ul className={styles.content_menu_actions}>
          //   <li
          //     onClick={() => {
          //       handleEditClient();
          //       setSelectedRowIndex(null);
          //       setSelectedContact(row?.id);
          //       setNewContact(false);
          //     }}
          //     className={styles.item_menu_actions}
          //   >
          //     Editar
          //   </li>
          //   <li
          //     onClick={(e) => {
          //       handleDeleteClient(e, row?.id);
          //       setSelectedRowIndex(null);
          //     }}
          //     className={styles.item_menu_actions}
          //   >
          //     Eliminar
          //   </li>
          // </ul>
          <div className={styles.optionsPopupContainer}>
            <OptionsPopup
              close={() => setSelectedRowIndex(null)}
              options={[
                {
                  label: "Editar",
                  onClick: () => {
                    handleEditClient();
                    setSelectedRowIndex(null);
                    setSelectedContact(row?.id);
                    setNewContact(false);
                  },
                },
                {
                  label: "Eliminar",
                  onClick: (e) => {
                    handleDeleteClient(e, row?.id);
                    setSelectedRowIndex(null);
                  },
                },
              ]}
            />
          </div>
        )}
      </td>
      <td></td>
    </tr>
  );

  const [selectedOption, setSelectedOption] = useState("Nombre");
  const [swiped, setSwiped] = useState(false);

  return (
    <PanelTemplate setSwiped={setSwiped} swiped={swiped}>
      <div className={styles.container} onClick={() => setShowSidebar(false)}>
        <ClientsHeader
          title="Gestión de Contactos"
          ref={searchInputRef}
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
                setNewContact(true);
              },
            },
            {
              label: <FaUpload color="#e6e6e6" />,
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
              <div
                style={{ marginLeft: "5px" }}
                className={styles.searchIconsWrappers}
              >
                <img src={KIcon} alt="kIcon" />
              </div>
              {/* <div className={styles.dropdownContainer}>
                <div
                  className={styles.filterSort}
                  onClick={handleDropdownToggle}
                  ref={dropdownRef}
                >
                  Ordenar por: <b>{selectedOption}</b>
                  <FaChevronDown className={styles.chevronIcon} />
                </div>
                {isOpen && (
                  <div className={styles.dropdownOptions}>
                    {options.map((option, index) => (
                      <div
                        key={index}
                        className={styles.dropdownOption}
                        onClick={() => handleOptionClick(option)}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div> */}
              <FiltersDropdownContainer
                setSelectedOption={setSelectedOption}
                selectedOption={selectedOption}
              />
            </>
          }
        />

        {showImportContacts && (
          <ImportContactsAndProducts
            text="contactos"
            state={handleCloseNewClient}
            isAnimating={isAnimating}
            quantity={clients.length}
          />
        )}
        {clients.length == 0 ? (
          <SkeletonScreen
            labelText="No se han encontrado contactos"
            helperText="Todos los clientes y proveedores estarán listados aquí."
            showInput={true}
            enableLabelClick={false}
          />
        ) : (
          <DynamicTable
            columns={tableHeaders}
            data={clients}
            renderRow={renderRow}
            selectedIds={clientSelected}
            onSelectAll={selectAllClients}
            onSelect={toggleSelection}
          />
        )}
      </div>
      {showNewClient && (
        <>
          <NewContact
            setShowNewContact={setShowNewClient}
            newContactProp={newContactProp}
            selectedContact={selectedContact}
          />
        </>
      )}
    </PanelTemplate>
  );
};

export default Clients;
