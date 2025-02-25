import React, { useState } from "react";
import styles from "./ArticlesTransactions.module.css";

import optionDots from "../../assets/optionDots.svg";
import plusIcon from "../../assets/Plus Icon.svg";

import DynamicTable from "../../components/DynamicTable/DynamicTable";
import PanelTemplate from "../../components/PanelTemplate/PanelTemplate";
import SearchIconWithIcon from "../../components/SearchIconWithIcon/SearchIconWithIcon";
import { ReactComponent as Arrow } from "../../assets/ArrowLeftWhite.svg";

import KIcon from "../../assets/KIcon.svg";
import winIcon from "../../assets/winIcon.svg";
import emptyimage from "../../assets/ImageEmpty.svg";
import { useSelector } from "react-redux";

import Button from "../../components/Button/Button";
import SkeletonScreen from "../../components/SkeletonScreen/SkeletonScreen";
import ClientsHeader from "../../components/ClientsHeader/ClientsHeader";
import { ReactComponent as DownloadIcon } from "../../assets/downloadIcon.svg";

const ArticlesTransactions = () => {
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const { client } = useSelector((state) => state.clients);

  const tableHeaders = [
    "Nombre o Descripción",
    "Fecha",
    "Cantidad",
    "Precio Unit",
    "Subtotal",
    "Impuesto",
    "Pagado",
    "Método de Pago",
    "",
  ];

  const tableData = [
    {
      img: "",
      name: "Producto A",
      date: "25 Dec 2025",
      quantity: 1,
      priceUnit: "00,00EUR",
      tax: ["No", "Sí,21%"],
      state: "Pagado",
      payMethod: "Mastercard ****5678",
    },
    {
      img: "",
      name: "Producto A",
      date: "25 Dec 2025",
      quantity: 1,
      priceUnit: "00,00EUR",
      tax: ["No", "Sí,21%"],
      state: "Pagado",
      payMethod: "Mastercard ****5678",
    },
  ];

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
          onChange={() => onSelect(index)}
          checked={selectedIds.includes(index)}
        />
      </td>
      <td className={styles.imgContainer}>
        <p>
          <img src={row.img || emptyimage} alt="" />
          {row.name}
        </p>
      </td>
      <td>{row.date}</td>
      <td>{row.quantity}</td>
      <td>{row.priceUnit}</td>
      <td>{row.priceUnit}</td>
      <td>
        {Array.isArray(row.tax)
          ? row.tax.map((item, i) => <p key={i}>{item}</p>)
          : row.tax}
      </td>
      <td className={styles.rowState}>{row.state}</td>
      <td>{row.payMethod}</td>
      <td className={styles.actions}>
        <div className={styles.transacciones}>
          <a href="#">stripe</a>
          <span>Refund</span>
        </div>
        <div>
          <img src={optionDots} alt="Opciones" />
        </div>
      </td>
    </tr>
  );

  return (
    <PanelTemplate>
      <div className={styles.container}>
        <ClientsHeader
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
                  <h3>
                    {client?.clientData?.clientName || "Titulo del Documento"}
                  </h3>
                </div>
                <div className={styles.clientInfo}>
                  <div className={styles.contactInfo}>
                    <span>{client?.code || "T001"}</span>
                    <span>{client?.name || "Aythen"}</span>
                    <span>{client?.email || "info@aythen.com"}</span>
                    <span>
                      {client?.clientData?.codeCountry || "+34"}{" "}
                      {client?.clientData?.numberPhone || "600 798 012"}
                    </span>
                  </div>

                  <div className={styles.info}>
                    <p>Categoría</p>
                    <span>Gasto</span>
                    <p>Fecha</p>
                    <span>25 Dec 2025</span>
                    <p>Activos</p>
                    <span>0</span>
                    <p>Subtotal</p>
                    <span>0,00</span>
                    <span>EUR</span>
                    <p>IVA</p>
                    <span>21%</span>
                    <span>No</span>
                    <p>Total</p>
                    <span>0,00</span>
                    <span>EUR</span>
                    <p>Estado</p>
                    <span>Pagado</span>
                  </div>
                </div>
              </div>
            </>
          }
          buttons={[
            {
              label: <>Editar Contacto</>,
              type: "button",
              onClick: () => console.log("Crear nuevo activo"),
            },
            {
              label: <DownloadIcon />,
              headerStyle: { padding: "6px 10px" },
              type: "white",
              onClick: () => setShowNewClient(true),
            },
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
        
          </div>
        </div> */}
        {tableData.length == 0 ? (
          <SkeletonScreen
            labelText="No se han encontrado documentos con este contacto"
            helperText="Todas las transacciones con este cliente o proveedor estarán listadas aquí."
            showInput={true}
            enableLabelClick={false}
          />
        ) : (
          <DynamicTable
            columns={tableHeaders}
            data={tableData}
            renderRow={renderRow}
            selectedIds={selectedIds}
            onSelectAll={selectAll}
            onSelect={toggleSelection}
          />
        )}
      </div>
    </PanelTemplate>
  );
};

export default ArticlesTransactions;
