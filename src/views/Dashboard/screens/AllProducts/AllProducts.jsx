import React, { useEffect, useState } from "react";
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
import winIcon from "../../assets/winIcon.svg";
import KIcon from "../../assets/KIcon.svg";
import { ReactComponent as DownloadIcon } from "../../assets/downloadIcon.svg";

import ModalTemplate from "../../components/ModalTemplate/ModalTemplate";
import EditableInput from "../Clients/EditableInput/EditableInput";
import ProfileModalTemplate from "../../components/ProfileModalTemplate/ProfileModalTemplate";
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

const AllProducts = () => {
  const { t } = useTranslation("clients");
  const [showSidebar, setShowSidebar] = useState(false);
  const [search, setSearch] = useState("");
  const [clientSelected, setClientSelected] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showImportAssets, setShowImportAssets] = useState(false);
  const [newClient, setShowNewClient] = useState(false);
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
  return (
    <PanelTemplate>
      <div className={styles.container} onClick={() => setShowSidebar(false)}>
        <div className={styles.clientsHeader}>
          <h2>Articulos</h2>
          {/* <div className={styles.searchContainer}>
            <button
              className={styles.addButton}
              onClick={() => setShowModal(true)}
            >
              Clientes y Proveedores
            </button>
            <button
              className={styles.infoBtn}
              onClick={() => setNewProductModal(true)}
            >
              Analíticas
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
            <button className={styles.moreBtn}>
              <img src={plusIcon} />
            </button>
          </div> */}
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
            // ref={searchInputRef}
            // searchTerm={searchTerm}
            // setSearchTerm={setSearchTerm}
            // iconRight={pencilSquareIcon}
            // classNameIconRight={styles.searchContainerL}
            // onClickIconRight={() => setIsFilterOpen(true)}
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
            {/* <div className={styles.inputWrapper}>
              <img src={searchGray} className={styles.inputIconInside} />
              <input
                type="text"
                placeholder={t("placeholderSearch")}
                value={search}
                onChange={handleSearchChange}
                className={styles.searchInput}
              />
          
              <div
                style={{ marginLeft: "5px" }}
                className={styles.searchIconsWrappers}
              >
                <img src={l} alt="kIcon" />
              </div>
            </div>
             */}
          </div>
        </div>
        {showImportAssets && (
          <ImportContactsAndProducts
            state={setShowImportAssets}
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
              {transactionByClient?.doc?.totalData?.productList.map(
                (product, rowIndex) => (
                  <tr key={rowIndex}>
                    <td>
                      <input
                        type="checkbox"
                        name="clientSelected"
                        onClick={() => selectClient(rowIndex)}
                        checked={
                          clientSelected.includes(rowIndex) ? true : false
                        }
                      />
                    </td>
                    <td className={styles.name}>
                      {product.productDescription}
                    </td>
                    <td>{product.productImport}</td>
                    <td>{product.quantity}</td>
                    <td>{product.productImportWithoutDiscount}</td>
                    <td>{product.productPartial}</td>
                    <td>{product.priceEn}</td>
                    <td className={styles.actions}>
                      <div className={styles.transacciones}>
                        <a href="#">Ver</a>
                      </div>
                    </td>
                    <td>
                      <div className={styles.edit}>
                        <a href="#">Editar</a>
                        <div onClick={() => handleActions(rowIndex, product)}>
                          <img src={optionDots} alt="options" />
                        </div>
                        {selectedRowIndex === rowIndex && (
                          <ul className={styles.content_menu_actions}>
                            <li
                              onClick={() => {
                                handleDelete(product.productRef);
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
                )
              )}
            </tbody>
          </table>
        </div>
        {showModal && (
          <LastTransactions setShowModal={setShowModal} showModal={showModal} />
        )}
        {newProductModal && (
          <ModalTemplate onClick={closeNewProductModal}>
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
