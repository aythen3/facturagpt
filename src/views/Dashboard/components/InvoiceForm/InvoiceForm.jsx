import { useState } from "react";
import styles from "./InvoiceForm.module.css";
import imageIcon from "../../assets/imageIcon.svg";
import fileIcon from "../../assets/fileIcon.svg";
import codeIcon from "../../assets/codeIcon.svg";
import arrowDown from "../../assets/arrowDownBold.svg";
import Tags from "../Tags/Tags";
import InfoContact from "../InfoContact/InfoContact";
import InfoBill from "../InfoBill/InfoBill";
import InfoActivity from "../InfoActivity/InfoActivity";
const documentTypes = [
  "Factura",
  "Factura de impuestos",
  "Recibo",
  "Recibo de la venta",
  "Recibo de efectivo",
  "Oferta",
  "Cotización",
  "Abono",
  "Pedido",
  "Nota de Entrega",
];

export default function InvoiceForm() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("Factura");
  const [sectionSelected, setSectionSelected] = useState(0);
  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setIsPopupOpen(false);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleWrapper}>
          <img src={imageIcon} alt="icon" />
          <img src={fileIcon} alt="icon" />
          <img src={codeIcon} alt="icon" />

          <h1 className={styles.title}>Document Title</h1>
        </div>
        <div className={styles.dropdownContainer}>
          <div className={styles.dropdown}>
            <span>Factura emitida</span>
            <img src={arrowDown} alt="Icon" />
          </div>
          <div className={styles.dropdown}>
            <span>Ingreso - Servicios</span>
            <img src={arrowDown} alt="Icon" />
          </div>
        </div>
        <Tags />
      </header>

      <div className={styles.btnSectionsSelector}>
        <button
          className={`${sectionSelected == 0 ? styles.sectionSelect : ""}`}
          onClick={() => setSectionSelected(0)}
        >
          Info Factura
        </button>
        <button
          className={`${sectionSelected == 1 ? styles.sectionSelect : ""}`}
          onClick={() => setSectionSelected(1)}
        >
          Info Contacto
        </button>
        <button
          className={`${sectionSelected == 2 ? styles.sectionSelect : ""}`}
          onClick={() => setSectionSelected(2)}
        >
          Info Actividad
        </button>
      </div>
      {sectionSelected == 0 ? (
        <InfoBill />
      ) : sectionSelected == 1 ? (
        <InfoContact />
      ) : sectionSelected == 2 ? (
        <InfoActivity />
      ) : (
        ""
      )}
    </div>
  );
}
