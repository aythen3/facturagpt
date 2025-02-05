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
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import { ReactComponent as AiIcon } from "../../assets/AIcon.svg";
import AiIcon2 from "../../assets/AIcon.svg";
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

export default function InvoiceForm({
  hasNote,
  handleAddNote,
  noteText,
  handleNoteChange,
  handleNoteBlur,
  isEditingNote,
  handleEditNote,
}) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("Factura");
  const [sectionSelected, setSectionSelected] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setIsPopupOpen(false);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleWrapper}>
          <div className={styles.titleContent}>
            <img src={imageIcon} alt="icon" />
            <input
              type="text"
              placeholder="Document Title"
              className={styles.title}
            />
          </div>
        </div>
        <div className={styles.dropdownContainer}>
          <div className={styles.dropdown}>
            <CustomDropdown
              customStyles={styles.transparent}
              hasObject={true}
              options={[
                { value: "facturaemitida", label: "Factura Emitida" },
                { value: "facturaemitida", label: "Factura Emitida" },
                { value: "facturaemitida", label: "Factura Emitida" },
                { value: "facturaemitida", label: "Factura Emitida" },
                { value: "facturaemitida", label: "Factura Emitida" },
              ]}
            />
          </div>
          <div className={styles.dropdown}>
            <CustomDropdown
              customStyles={styles.transparent}
              hasObject={true}
              options={[
                {
                  value: "IngresoServicios",
                  label: (
                    <>
                      Ingreso - Servicios <img src={AiIcon2} alt="Icono" />
                    </>
                  ),
                },
                { value: "IngresoServicios", label: "Ingreso - Servicios" },
                { value: "IngresoServicios", label: "Ingreso - Servicios" },
                { value: "IngresoServicios", label: "Ingreso - Servicios" },
                { value: "IngresoServicios", label: "Ingreso - Servicios" },
              ]}
            />
          </div>
        </div>
        <div className={styles.addNote}>
          {hasNote && (
            <div className={styles.note}>
              <div className={styles.text}>
                {isEditingNote ? (
                  <input
                    type="text"
                    value={noteText}
                    onChange={handleNoteChange}
                    // onBlur={handleNoteBlur}
                    autoFocus
                  />
                ) : (
                  <span>{noteText || "Nueva nota"}</span>
                )}
              </div>
              <div className={styles.button} onClick={handleEditNote}>
                {isEditingNote ? "Guardar Nota" : "Editar Nota"}
              </div>
            </div>
          )}
        </div>
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
        <InfoBill isEditing={isEditing} setIsEditing={setIsEditing} />
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
