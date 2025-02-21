import React, { useEffect, useRef, useState } from "react";
import styles from "./AllProducts.module.css";
import NavbarAdmin from "../../components/NavbarAdmin/NavbarAdmin";
import searchGray from "../../assets/searchGray.svg";
import searchWhite from "../../assets/searchWhite.png";
import newClientIcon from "../../assets/newClientIcon.svg";
import clock from "../../assets/clock.png";
import edit from "../../assets/edit.png";
import plusIcon from "../../assets/Plus Icon.svg";
import optionDots from "../../assets/optionDots.svg";
import filterSearch from "../../assets/Filters Search.png";
import { useTranslation } from "react-i18next";
import LastTransactions from "../../components/LastTransactions/LastTransactions";
import winIcon from "../../assets/winIcon.svg";
import KIcon from "../../assets/KIcon.svg";
import imageEmpty from "../../assets/ImageEmpty.svg";
import ModalTemplate from "../../components/ModalTemplate/ModalTemplate";
import EditableInput from "../Clients/EditableInput/EditableInput";
import ProfileModalTemplate from "../../components/ProfileModalTemplate/ProfileModalTemplate";
import { ReactComponent as DownloadIcon } from "../../assets/downloadIcon.svg";
import { ReactComponent as Arrow } from "../../assets/ArrowLeftWhite.svg";
import emptyimage from "../../assets/ImageEmpty.svg";

import { ParametersLabel } from "../../components/ParametersLabel/ParametersLabel";
import Tags from "../../components/Tags/Tags";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductFromTransaction,
  getOneTransactionById,
} from "../../../../actions/transactions";
import FileExplorer from "../../components/FileExplorer/FileExplorer";
import PanelTemplate from "../../components/PanelTemplate/PanelTemplate";
import SearchIconWithIcon from "../../components/SearchIconWithIcon/SearchIconWithIcon";
import Button from "../../components/Button/Button";
import ImportContactsAndProducts from "../../components/ImportContactsAndProducts/ImportContactsAndProducts";
import NewProduct from "../../components/NewProduct/NewProduct";
import NewTag from "../../components/NewTag/NewTag";
import useFocusShortcut from "../../../../utils/useFocusShortcut";
import SkeletonScreen from "../../components/SkeletonScreen/SkeletonScreen";
import DynamicTable from "../../components/DynamicTable/DynamicTable";
import ClientsHeader from "../../components/ClientsHeader/ClientsHeader";

const AllProducts = () => {
  const { t } = useTranslation("clients");
  const [showSidebar, setShowSidebar] = useState(false);
  const [search, setSearch] = useState("");
  const [clientSelected, setClientSelected] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showImportAssets, setShowImportAssets] = useState(false);
  const [newClient, setShowNewClient] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const { transactionByClient, loading } = useSelector(
    (state) => state.transactions
  );
  const [newProductModal, setNewProductModal] = useState(false);
  const [selectTypeClient, setSelectTypeClient] = useState(0);
  const dispatch = useDispatch();
  const closeNewProductModal = () => {
    setNewProductModal(false);
  };
  const [showAddTags, setShowAddTags] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState([]);
  // useEffect(() => {
  //   dispatch(getOneTransactionById({ transactionId: transactionByClient?.id }));
  // }, [loading]);

  console.log("TRANSAAAAAAAA----------", transactionByClient);

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
    "Código",
    "Nombre o Descripción",
    "Proveedor",
    "Categoría",
    ["Cantidad", "(Último mes)"],
    "Generado",
    "Precio máximo",
    "Precio mínimo",
    "Precio medio",
    "",
    "",
  ];

  const tableData = [
    {
      imageUrl: "",
      code: "9172389",
      productDescription: ["Articulo 1", "Descripción"],
      supplier: ["Aythen", "Email adress, Phone number , Zip code "],
      category: ["Gasto", "Gastos Operativos"],
      quantity: "1.0",
      generated: "00,00 EUR",
      maxPrice: "00,00 EUR",
      minPrice: "00,00 EUR",
      averagePrice: "00,00 EUR",
    },
    {
      imageUrl: "",
      code: "9172389",
      productDescription: ["Articulo 1", "Descripción"],
      supplier: ["Aythen", "Email adress, Phone number , Zip code "],
      category: ["Gasto", "Gastos Operativos"],
      quantity: "1.0",
      generated: "00,00 EUR",
      maxPrice: "00,00 EUR",
      minPrice: "00,00 EUR",
      averagePrice: "00,00 EUR",
    },
    {
      imageUrl: "",
      code: "9172389",
      productDescription: ["Articulo 1", "Descripción"],
      supplier: ["Aythen", "Email adress, Phone number , Zip code "],
      category: ["Gasto", "Gastos Operativos"],
      quantity: "1.0",
      generated: "00,00 EUR",
      maxPrice: "00,00 EUR",
      minPrice: "00,00 EUR",
      averagePrice: "00,00 EUR",
    },
  ];

  const formatCardNumber = (value) => {
    return value.replace(/\D/g, "").replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const formatPhoneNumber = (phoneNumber) => {
    return phoneNumber.replace(/(\+\d{2})(\d{3})(\d{3})(\d{3})/, "$1 $2 $3 $4");
  };
  const [editingIndices, setEditingIndices] = useState([]);

  const [clientDataInputs, setClientDataInputs] = useState({
    name: "",
    desc: "",
    unitPrice: "",
    retailPrice: "",
    parameters: [],
  });
  const [inputsEditing, setInputsEditing] = useState({
    name: false,
    desc: false,
    unitPrice: false,
    retailPrice: false,
  });

  const handleDelete = async (productRef) => {
    await dispatch(
      deleteProductFromTransaction({
        transactionId: transactionByClient?.id,
        productRef,
      })
    );
    await dispatch(
      getOneTransactionById({
        transactionId: transactionByClient?.id || transactionByClient?.doc?._id,
      })
    );
  };

  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const handleActions = (rowIndex, transaction) => {
    // dispatch(setClient(client));
    setSelectedRowIndex(selectedRowIndex === rowIndex ? null : rowIndex);
  };

  const [creatingBill, setCreatingBill] = useState(true);

  const searchInputRef = useRef(null);

  // Llama a la función y pasa la referencia
  useFocusShortcut(searchInputRef, "k");

  const handleCloseNewClient = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCreatingBill(false);
      setShowNewClient(false);
      setShowImportAssets(false);
      setIsAnimating(false);
    }, 300);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && newClient) {
        setIsAnimating(true);
        setTimeout(() => {
          setCreatingBill(false);
          setShowNewClient(false);
          setShowImportAssets(false);
          setIsAnimating(false);
        }, 300);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [newClient]);

  const [selectedIds, setSelectedIds] = useState([]);

  const renderRow = (row, index, onSelect) => (
    <tr key={index}>
      {/* Checkbox */}
      <td>
        <input
          type="checkbox"
          name="clientSelected"
          onClick={() => selectClient(index)}
          checked={clientSelected.includes(index)}
        />
      </td>

      {/* Imagen del producto */}
      <td>{row.code}</td>

      {/* Descripción del producto */}
      <td>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          {" "}
          <img
            src={row.imageUrl || imageEmpty}
            alt="Producto"
            width="50"
            height="50"
          />
          <div>
            {row.productDescription.map((desc, index) => (
              <div key={index} className={index == 0 && styles.titleInfoTd}>
                {desc}
              </div>
            ))}
          </div>
        </div>
      </td>

      {/* Proveedor */}
      <td>
        {row.supplier.map((info, index) => (
          <div key={index} className={index == 0 && styles.titleInfoTd}>
            {info}
          </div>
        ))}
      </td>

      {/* Categoría */}
      <td>
        {row.category.map((cat, index) => (
          <div key={index}>{cat}</div>
        ))}
      </td>

      {/* Cantidad */}
      <td>{row.quantity}</td>

      {/* Precios */}
      <td>{row.generated}</td>
      <td>{row.maxPrice}</td>
      <td>{row.minPrice}</td>
      <td>{row.averagePrice}</td>

      <td className={styles.actions}>
        <div className={styles.transacciones}>
          <a href="#">Ver</a>
        </div>
      </td>
      <td>
        <div className={styles.edit}>
          <a href="#">Editar</a>
          <div onClick={() => handleActions(index, row)}>
            <img src={optionDots} alt="options" />
          </div>
          {selectedRowIndex === index && (
            <ul className={styles.content_menu_actions}>
              <li
                onClick={() => {
                  handleDelete(row.productRef);
                  setSelectedRowIndex(null);
                }}
                className={styles.item_menu_actions}
              >
                Eliminar
              </li>
            </ul>
          )}
        </div>
      </td>
    </tr>
  );

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
  return (
    <PanelTemplate>
      <div className={styles.container}>
        <ClientsHeader
          title={"Gestión de Activos (X)"}
          buttons={[
            {
              label: (
                <>
                  <img src={plusIcon} alt="Nuevo cliente" />
                  Nuevo Activo
                </>
              ),
              onClick: () => {
                setCreatingBill(true);
                setShowNewClient(true);
              },
            },
            {
              label: <DownloadIcon />,
              headerStyle: { padding: "6px 10px" },
              type: "white",
              onClick: () => setShowImportAssets(true),
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
                <img src={winIcon} alt="kIcon" />
              </div>
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
          <h2>Gestión de Activos (X)</h2>

          <div className={styles.searchContainer}>
            <button
              className={`${styles.addButton} ${styles.btnNewClient}`}
              onClick={() => {
                setCreatingBill(true);
                setShowNewClient(true);
              }}
            >
              <img src={plusIcon} alt="Nuevo cliente" />
              Nuevo Activo
            </button>
            <Button
              type="white"
              headerStyle={{ padding: "6px 10px" }}
              action={() => setShowImportAssets(true)}
            >
              <DownloadIcon />
            </Button>
            <SearchIconWithIcon
              ref={searchInputRef}
           
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
        {showImportAssets && (
          <ImportContactsAndProducts
            state={handleCloseNewClient}
            isAnimating={isAnimating}
            text="productos"
          />
        )}
        {newClient && (
          <NewProduct
            setShowNewProduct={setShowNewClient}
            setShowAddTags={setShowAddTags}
            setSelectedTags={setSelectedTags}
            selectedTags={selectedTags}
            setTags={setTags}
            tags={tags}
            creatingBill={creatingBill}
          />
        )}
        {showAddTags && (
          <NewTag
            setShowNewTagModal={setShowAddTags}
            setSelectedTags={setSelectedTags}
            selectedTags={selectedTags}
            setTags={setTags}
            tags={tags}
          />
        )}
        {tableData.length == 0 ? (
          <SkeletonScreen
            labelText="No se han encontrado productos ni servicios"
            helperText="Todos tus activos estarán listados aquí."
            showInput={true}
            enableLabelClick={false}
          />
        ) : (
          <DynamicTable
            columns={tableHeaders}
            data={transactionByClient?.doc?.totalData?.productList || tableData}
            renderRow={renderRow}
            selectedIds={selectedIds}
            onSelectAll={selectAll}
            onSelect={toggleSelection}
          />
        )}

        {showModal && (
          <LastTransactions setShowModal={setShowModal} showModal={showModal} />
        )}
        {newProductModal && (
          <ModalTemplate
            onClick={closeNewProductModal}
            isAnimating={isAnimating}
          >
            <div className={styles.allProductC}>
              <form className={styles.formAllProduct}>
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
                      Proveedor{inputsEditing.name ? "enable" : "disable"}
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
                {/* <EditableInput
                  label={"Nombre"}
                  nameInput={"nombre"}
                  placeholderInput={"Añade un nombre a tu producto"}
                  isEditing={inputsEditing.name}
                  value={clientDataInputs.name}
                  onChange={(e) =>
                    setClientDataInputs({
                      ...clientDataInputs,
                      name: e.target.value,
                    })
                  }
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
                      Servicio
                    </button>
                    <button
                      className={selectTypeClient == 1 && styles.selected}
                      onClick={() => setSelectTypeClient(1)}
                      type="button"
                      disabled={!inputsEditing.name}
                    >
                      Producto
                    </button>
                  </div>
                </EditableInput> */}
                <EditableInput
                  label={"Descripción"}
                  nameInput={"description"}
                  placeholderInput={
                    "Especifica las características del artículo"
                  }
                  isEditing={inputsEditing.desc}
                  value={clientDataInputs.desc}
                  type={"textarea"}
                  onChange={(e) =>
                    setClientDataInputs({
                      ...clientDataInputs,
                      desc: e.target.value,
                    })
                  }
                  onClick={() =>
                    setInputsEditing((prev) => ({
                      ...prev,
                      desc: !prev.desc,
                    }))
                  }
                />

                <label>
                  <p>Proveedor por defecto</p>
                  <div>
                    <input type="checkbox" />
                    <span>
                      Marca la casilla si tu eres el dueño de este activo
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="Busca y selecciona proveedores"
                  />
                </label>
                <EditableInput
                  label={"Retail Price (PVP)"}
                  nameInput={"retailPrice"}
                  placeholderInput={"0.0"}
                  // isEditing={inputsEditing.floorPrice}
                  isEditing={true}
                  value={clientDataInputs.retailPrice}
                  options={false}
                  onChange={(e) =>
                    setClientDataInputs({
                      ...clientDataInputs,
                      retailPrice: e.target.value,
                    })
                  }
                  onClick={() =>
                    setInputsEditing((prev) => ({
                      ...prev,
                      retailPrice: !prev.retailPrice,
                    }))
                  }
                />
                <label className={styles.impuestos}>
                  <div>
                    <p>Impuesto</p>
                  </div>
                  <button type="button">Añadir impuesto</button>
                  <div className={styles.percent}>
                    <span>21.00%</span>
                    <div>Editar</div>
                  </div>
                </label>
                <label className={styles.sku}>
                  <div>
                    <p># (SKU)</p>
                  </div>
                  <div className={styles.autogenerated}>
                    <span>Autogenerado</span>
                    <div>Editar</div>
                  </div>
                  <input type="text" placeholder="#" />
                </label>
                <ParametersLabel
                  parameters={clientDataInputs.parameters}
                  setClientDataInputs={setClientDataInputs}
                  editingIndices={editingIndices}
                  setEditingIndices={setEditingIndices}
                  addUnit={true}
                />

                <Tags direction={"column"} />
              </form>
            </div>
            <ProfileModalTemplate />
          </ModalTemplate>
        )}
      </div>
    </PanelTemplate>
  );
};

export default AllProducts;
