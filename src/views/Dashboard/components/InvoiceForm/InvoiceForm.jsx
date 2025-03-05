import { useEffect, useState } from "react";
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
import { ReactComponent as OptionDots } from "../../assets/optionDots.svg";
import { ReactComponent as ArrowLeftTextBlack } from "../../assets/ArrowLeftTextBlack.svg";
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
  setEditingNote,
  editingNote,
  idFile,
  showInfoMobileBill,
  setShowInfoMobileBill,
  setCreatedNote,
  createdNote,
  setEditorContentFinal,
  editorContentFinal,
  isEditing,
  setIsEditing,
}) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("Factura");
  const [sectionSelected, setSectionSelected] = useState(0);

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setIsPopupOpen(false);
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Actualizar el ancho de la ventana cuando se cambie el tamaño de la pantalla
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Limpiar el evento cuando el componente se desmonta
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobile = windowWidth <= 768;
  const [typeExpense, setTypeExpense] = useState();
  const [typeBill, setTypeBill] = useState();
  return (
    <div
      className={`${styles.container} ${showInfoMobileBill && styles.showInfoMobileBill}`}
      style={customStyles}
    >
      {isMobile && (
        <div className={styles.headerBillMobile}>
          {/* <button onClick={() => setShowInfoMobileBill(false)}>Ir atras</button> */}
          <button onClick={() => setShowInfoMobileBill(false)}>
            <ArrowLeftTextBlack /> Título del Documento
          </button>
          <div className={styles.headerBillMobile}>
            <div className={styles.notesHeaderBillMobile}>
              <button
                onClick={() => {
                  handleAddNote();
                  setEditingNote(false);
                }}
              >
                +Añadir Nota
              </button>
              <OptionDots className={styles.verticalOptionDots} />
            </div>
          </div>
        </div>
      )}
      {!isMobile && (
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
                selectedOption={typeBill}
                setSelectedOption={(option) => setTypeBill(option)}
                options={[
                  {
                    value: "factura ordinaria",
                    label: (
                      <div className={styles.facturaContainer}>
                        <p>Factura Ordinaria</p>
                        <span>
                          La más común, refleja una operación de venta o
                          servicio.
                        </span>
                      </div>
                    ),
                  },
                  {
                    value: "factura simplificada",
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
                    value: "factura rectificativa",
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
                    value: "factura recapitulativa",
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
                selectedOption={typeExpense}
                setSelectedOption={(option) => setTypeExpense(option)}
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
                  <span
                    dangerouslySetInnerHTML={{ __html: editorContentFinal }}
                  ></span>
                </div>
                <div
                  className={styles.button}
                  onClick={() => {
                    handleAddNote();
                    setEditingNote(true);
                  }}
                >
                  Editar Nota
                </div>
              </div>
            )}
          </div>
        </header>
      )}
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
        <InfoContact idFile={idFile} />
      ) : sectionSelected == 2 ? (
        <InfoActivity />
      ) : (
        ""
      )}
    </div>
  );
}
