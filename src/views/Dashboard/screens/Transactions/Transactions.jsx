import React, { useEffect, useRef, useState } from "react";
import styles from "./Transactions.module.css";
import NavbarAdmin from "../../components/NavbarAdmin/NavbarAdmin";
import searchGray from "../../assets/searchGray.svg";
import optionDots from "../../assets/optionDots.svg";
import plusIcon from "../../assets/Plus Icon.svg";
import filterSearch from "../../assets/Filters Search.png";
import creditCard from "../../assets/creditCardIcon.png";
import closeIcon from "../../assets/closeMenu.svg";
import pdf from "../../assets/fileIcon.svg";
import KIcon from "../../assets/KIcon.svg";
import arrow from "../../assets/arrow.svg";
import winIcon from "../../assets/winIcon.svg";
import emptyimage from "../../assets/ImageEmpty.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteDocs,
  getAllDocsByClient,
} from "../../../../actions/docs";
import { updateClient } from "../../../../actions/user";
import {
  clearTransaction,
  setTransaction,
} from "../../../../slices/docsSlices";
import { useNavigate } from "react-router-dom";
import { clearClient } from "../../../../slices/clientsSlices";
import FileExplorer from "../../components/FileExplorer/FileExplorer";
import PanelTemplate from "../../components/PanelTemplate/PanelTemplate";
import NewBIll from "../../components/NewBIll/NewBIll";
import SearchIconWithIcon from "../../components/SearchIconWithIcon/SearchIconWithIcon";
import Button from "../../components/Button/Button";
import SkeletonScreen from "../../components/SkeletonScreen/SkeletonScreen";
import { ReactComponent as Arrow } from "../../assets/ArrowLeftWhite.svg";
import DynamicTable from "../../components/DynamicTable/DynamicTable";
import ClientsHeader from "../../components/ClientsHeader/ClientsHeader";
import NewContact from "../../components/NewContact/NewContact";
import useFocusShortcut from "../../../../utils/useFocusShortcut";
import FiltersDropdownContainer from "../../components/FiltersDropdownContainer/FiltersDropdownContainer";

const Docs = () => {
  const [clientSelected, setClientSelected] = useState([]);
  const [showNewClient, setShowNewClient] = useState(false);
  const [showEditContact, setShowEditContact] = useState(false);
  const [selectedTransactionIds, setSelectedTransactionIds] = useState([]);

  const dispatch = useDispatch();
  const { client } = useSelector((state) => state.clients);
  const { docsByClient, loading } = useSelector(
    (state) => state.docs
  );
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      getAllDocsByClient({ idsEmails: client?.processedemails })
    );
  }, [loading]);

  const selectClient = (rowIndex) => {
    setClientSelected((prevItem) => {
      if (prevItem.includes(rowIndex)) {
        return prevItem.filter((i) => i !== rowIndex);
      } else {
        return [...prevItem, rowIndex];
      }
    });
  };
  const [mockTransactions, setMockTransactions] = useState([]);

  const selectAllClients = () => {
    if (clientSelected.length === mockTransactions.length) {
      // Si todos los clientes están seleccionados, limpiar la selección
      setClientSelected([]);
      setSelectedIds(false);
    } else {
      // Si no todos los clientes están seleccionados, agregar todos los índices
      setSelectedIds(true);
      const allClientIndexes = mockTransactions.map((_, index) => index); // Crear un arreglo con los índices
      setClientSelected(allClientIndexes);
    }
  };
  const selectAll = () => {
    setSelectedIds(
      selectedIds.length === tableData.length
        ? []
        : tableData.map((_, index) => index)
    );
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
    "Notas",
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

  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const handleActions = (rowIndex) => {
    // dispatch(setClient(client));
    setSelectedRowIndex(selectedRowIndex === rowIndex ? null : rowIndex);
  };

  const handleDeleteDocs = (e) => {
    e.preventDefault();
    console.log("IDSSSSSS EN ACTION", selectedTransactionIds);

    dispatch(
      deleteDocs({
        docsIds: selectedTransactionIds,
      })
    )
      .then((result) => {
        if (result.meta.requestStatus === "fulfilled") {
          console.log("Transaction deleted successfully");
          setSelectedTransactionIds([]);
        } else {
          console.error("Error deleting transaction:", result.error);
        }
      })
      .catch((error) => {
        console.error("Unexpected error:", error);
      });
  };

  const toggleTransactionSelection = (transactionId) => {
    setSelectedTransactionIds((prev) =>
      prev.includes(transactionId)
        ? prev.filter((id) => id !== transactionId)
        : [...prev, transactionId]
    );
  };

  console.log("TRANSACTIONS SELECTED IDS----", selectedTransactionIds);


  const [mockDocs, setMockDocs] = useState([]);


  const toggleSelection = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const renderRow = (row, index, onSelect) => (
    <tr key={index}>
      <td>
        <input
          type="checkbox"
          name="clientSelected"
          onChange={() => toggleTransactionSelection(row.id)}
          onClick={() => selectClient(index)}
          checked={clientSelected.includes(index) ? true : false}
        />
      </td>
      <td className={styles.idContainer}>
        <p>
          {" "}
          <img src={pdf} className={styles.pdfIcon} />
          {row.id}
        </p>
      </td>
      {/* <td>
{Array.isArray(row.desc)
 ? row.desc.map((item, itemIndex) => (
     <p key={itemIndex}>{item}</p>
   ))
 : row.desc}
</td> */}
      <td>
        <p
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          {row?.doc?.totalData?.description
            ? row?.doc?.totalData?.description.map((item, index) => (
                <span key={index}>{item}</span>
              ))
            : "Sin descripción"}
        </p>
      </td>
      <td>
        <div className={styles.tags}>
          <span
            className={`${styles.tag} ${styles[row?.doc?.totalData?.tag]}`}
          ></span>
          {/* <span
          className={`${styles.tag} ${styles.tagRed}`}
        ></span>
        <span
          className={`${styles.tag} ${styles.tagOrange}`}
        ></span>
        <span
          className={`${styles.tag} ${styles.tagYellow}`}
        ></span>
        <span
          className={`${styles.tag} ${styles.tagGreen}`}
        ></span>
        <span
          className={`${styles.tag} ${styles.tagBlue}`}
        ></span>
        <span
          className={`${styles.tag} ${styles.tagViolet}`}
        ></span>
        <span
          className={`${styles.tag} ${styles.tagPink}`}
        ></span> */}
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
          <span className={getStateClass(row.state[0])}>&bull;</span>

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
              navigate("/admin/products");
              dispatch(setTransaction(row));
            }}
            href="#"
          >
            Ver Articulos
          </a>
          <span>(2.345)</span>
        </div>
        <div
          onClick={() => {
            toggleTransactionSelection(row.id);
            handleActions(index, row);
          }}
        >
          <img src={optionDots} />
        </div>
        {selectedRowIndex === index && (
          <ul className={styles.content_menu_actions}>
            <li
              onClick={() => {
                setShowNewClient(true);
                setSelectedRowIndex(null);
              }}
              className={styles.item_menu_actions}
            >
              Editar
            </li>
            <li
              onClick={(e) => {
                handleDeleteDocs(e);
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

  useEffect(() => {
    // Si docsByClient está vacío, usamos datos de ejemplo
    if (docsByClient.length === 0) {
      setMockDocs([
        {
          id: "M001",
          doc: {
            totalData: {
              description: ["Gasto", "Gastos Operativos"],
              totalAmount: "150,00 EUR",
              invoiceIssueDate: "2025-01-15",
              expirationDateYear: "2025",
              expirationDateMonth: "02",
              expirationDateDay: "15",
              payMethod: "Visa ****1234",
              status: "Pendiente",
              tag: "tagRed",
            },
          },
          state: ["Pendiente", "stripe"],
        },
        {
          id: "M002",
          doc: {
            totalData: {
              description: ["Gasto", "Gastos Operativos"],
              totalAmount: "1.200,00 EUR",
              invoiceIssueDate: "2025-01-10",
              expirationDateYear: "2025",
              expirationDateMonth: "02",
              expirationDateDay: "10",
              payMethod: "Transferencia bancaria",
              status: "Pagada",
              tag: "tagYellow",
            },
          },
          state: ["Pagada"],
        },
        {
          id: "M003",
          doc: {
            totalData: {
              description: ["Gasto", "Gastos Operativos"],
              totalAmount: "3.500,00 EUR",
              invoiceIssueDate: "2024-12-01",
              expirationDateYear: "2025",
              expirationDateMonth: "01",
              expirationDateDay: "01",
              payMethod: "Mastercard ****5678",
              status: "Vencida",
              tag: "tagWhite",
            },
          },
          state: ["Vencida"],
        },
      ]);
    }
  }, [docsByClient]);
  console.log(mockDocs);

  const searchInputRef = useRef(null);

  // Llama a la función y pasa la referencia
  useFocusShortcut(searchInputRef, "k");
  const [selectedOption, setSelectedOption] = useState("Nombre");

  return (
    <PanelTemplate>
      <div className={styles.container}>
        <ClientsHeader
          ref={searchInputRef}
          additionalInfo={
            <>
              <div className={styles.infoClient}>
                <div className={styles.arrowContainer}>
                  <div
                    className={styles.iconContainer}
                    onClick={() => navigate("/admin/clients")}
                  >
                    <Arrow />
                  </div>
                </div>
                <img src={emptyimage} alt="" />
                <div className={styles.clientInfo}>
                  <div className={styles.contactInfo}>
                    <h3>{client?.clientData?.clientName || "Aythen"}</h3>
                    <span>{client?.email || "info@aythen.com"}</span>
                    <span>
                      {client?.clientData?.codeCountry || "+34"}{" "}
                      {client?.clientData?.numberPhone || "600 798 012"}
                    </span>
                  </div>
                  <div className={styles.info}>
                    <p>Número Fiscal</p>
                    <span>
                      {client?.clientData?.taxNumber || "Desconocido"}
                    </span>
                  </div>
                  <div className={styles.info}>
                    <p># Transacciones</p>
                    <span>0</span>
                    <p>Total</p>
                    <span>0,0 EUR en los últimos 30 días</span>
                  </div>
                </div>
              </div>
            </>
          }
          buttons={[
            {
              label: <>Editar Contacto</>,
              type: "button",
              onClick: () => setShowEditContact(true),
            },
            {
              label: (
                <>
                  <img src={plusIcon} alt="" />
                  Nueva transacción
                </>
              ),
              onClick: () => setShowNewClient(true),
            },
            // {
            //   label: <DownloadIcon />,
            //   headerStyle: { padding: "6px 10px" },
            //   type: "white",
            //   onClick: () => console.log("Importar datos"),
            // },
          ]}
          searchProps={
            {
              // ref={searchInputRef}
              // searchTerm={searchTerm}
              // setSearchTerm={setSearchTerm}
              // iconRight={pencilSquareIcon}
              // classNameIconRight={styles.searchContainerL}
              // onClickIconRight={() => setIsFilterOpen(true)}
            }
          }
          searchChildren={
            <>
              <div
                style={{ marginLeft: "5px" }}
                className={styles.searchIconsWrappers}
              >
                <img src={KIcon} alt="kIcon" />
              </div>
              <FiltersDropdownContainer
                setSelectedOption={setSelectedOption}
                selectedOption={selectedOption}
              />
            </>
          }
        />

        {/* <div className={styles.clientsHeader}>
          <div className={styles.infoClient}>
            <div className={styles.arrowContainer}>
              <div
                className={styles.iconContainer}
                onClick={() => navigate("/admin/clients")}
              >
                <Arrow />
              </div>
            </div>
            <img src={emptyimage} alt="" />
            <div className={styles.clientInfo}>
              <div className={styles.contactInfo}>
                <h3>{client?.clientData?.clientName || "Aythen"}</h3>
                <span>{client?.email || "info@aythen.com"}</span>
                <span>
                  {client?.clientData?.codeCountry || "+34"}{" "}
                  {client?.clientData?.numberPhone || "600 798 012"}
                </span>
              </div>
              <div className={styles.info}>
                <p>Número Fiscal</p>
                <span>{client?.clientData?.taxNumber || "Desconocido"}</span>
              </div>
              <div className={styles.info}>
                <p># Transacciones</p>
                <span>0</span>
                <p>Total</p>
                <span>0,0 EUR en los últimos 30 días</span>
              </div>
            </div>
          </div>
          <div className={styles.searchContainer}>
            <div className={styles.button}>Editar Contacto</div>
            <Button action={() => setShowNewClient(true)}>
              <img src={plusIcon} alt="" />
              Nueva transacción
            </Button>

            <SearchIconWithIcon
      
            >
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

        {mockDocs.length == 0 ? (
          <SkeletonScreen
            labelText="No se han encontrado documentos con este contacto"
            helperText="Todas las transacciones con este cliente o proveedor estarán listadas aquí."
            showInput={true}
            enableLabelClick={false}
          />
        ) : (
          <DynamicTable
            columns={tableHeaders}
            data={
              docsByClient.length > 0
                ? docsByClient
                : mockDocs
            }
            renderRow={renderRow}
            selectedIds={clientSelected}
            onSelectAll={selectAllClients}
            onSelect={toggleSelection}
          />
        )}
      </div>
      <div>
        {showEditContact && (
          <NewContact
            setShowNewContact={setShowEditContact}
            typeTextHeader={"Editar"}
          />
        )}
        {showNewClient && <NewBIll setShowNewBill={setShowNewClient} />}
      </div>
    </PanelTemplate>
  );
};

export default Docs;
