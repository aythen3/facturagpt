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
import CreateNotePopup from "../CreateNotePopup/CreateNotePopup";
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
  setHasNote,
  handleAddNote,
  noteText,
  handleNoteChange,
  handleNoteBlur,
  isEditingNote,
  handleEditNote,
  customStyles = {},
  setNoteColor,
  noteColor,
}) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("Factura");
  const [sectionSelected, setSectionSelected] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [createdNote, setCreatedNote] = useState(false);
  const [editorContentFinal, setEditorContentFinal] = useState("");

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setIsPopupOpen(false);
  };

  return (
    <div className={styles.container} style={customStyles}>
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
              biggerWidth={true}
              options={[
                {
                  value: "facturaordinaria",
                  label: (
                    <div className={styles.facturaContainer}>
                      <p>Factura Ordinaria</p>
                      <span>
                        La más común, refleja una operación de venta o servicio.
                      </span>
                    </div>
                  ),
                },
                {
                  value: "facturasimplificada",
                  label: (
                    <div className={styles.facturaContainer}>
                      <p>Factura Simplificada</p>
                      <span>
                        Usada en operaciones de bajo importe (tickets de caja)
                      </span>
                    </div>
                  ),
                },
                {
                  value: "facturarectificativa",
                  label: (
                    <div className={styles.facturaContainer}>
                      <p>Factura Rectificativa</p>
                      <span>
                        Corrige errores o realiza devoluciones sobre facturas
                        previas.
                      </span>
                    </div>
                  ),
                },
                {
                  value: "facturarecapitulativa",
                  label: (
                    <div className={styles.facturaContainer}>
                      <p>Factura Recapitulativa </p>
                      <span>
                        Agrupa varias operaciones de un mismo cliente en un
                        período.
                      </span>
                    </div>
                  ),
                },
              ]}
            />
          </div>
          <div className={styles.dropdown}>
            <CustomDropdown
              customStyles={styles.transparent}
              hasObject={true}
              textStyles={{
                display: "flex",
                // align: "center",

                gap: "5px",
                fontWeight: 500,
                color: "#3d3c42",
                marginLeft: "6px",
                userSelect: "none",
              }}
              placeholder={
                <>
                  Seleccionar Categoria{" "}
                  <img src={AiIcon2} alt="Icono" height={"15px"} />
                </>
              }
              multioption={true}
              options={[
                {
                  title: "Ingreso",
                  items: [
                    {
                      value: "Ventas de Productos",
                      label: "Ventas de Productos",
                    },
                    {
                      value: "Servicios",
                      label: "Servicios",
                    },
                    {
                      value: "Ingresos Recurrentes",
                      label: "Ingresos Recurrentes",
                    },
                    { value: "Otros Ingresos", label: "Otros Ingresos" },
                  ],
                },
                {
                  title: "Gasto",
                  items: [
                    {
                      value: "Operativos",
                      label: "Operativos",
                    },
                    {
                      value: "Administrativos",
                      label: "Administrativos",
                    },
                    {
                      value: "Comerciales",
                      label: "Comerciales",
                    },
                    {
                      value: "Financieros",
                      label: "Financieros",
                    },
                    {
                      value: "Personales",
                      label: "Personales",
                    },
                    {
                      value: "Infraestructura",
                      label: "Infraestructura",
                    },
                    {
                      value: "Otro Gastos",
                      label: "Otro Gastos",
                    },
                  ],
                },
              ]}
            />
          </div>
        </div>
        <div className={styles.addNote}>
          {createdNote && (
            <div className={`${styles.note} ${styles[noteColor]}`}>
              <div className={styles.text}>
                <span>{editorContentFinal || "Nueva nota"}</span>
              </div>
              <div className={styles.button} onClick={handleAddNote}>
                Editar Nota
              </div>
            </div>
          )}
        </div>
        {hasNote && (
          <>
            <CreateNotePopup
              setHasNote={setHasNote}
              noteColor={noteColor}
              setNoteColor={setNoteColor}
              setCreatedNote={setCreatedNote}
              editorContentFinal={editorContentFinal}
              setEditorContentFinal={setEditorContentFinal}
            />
          </>
        )}
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
