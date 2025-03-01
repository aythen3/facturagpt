import { MoreVertical } from "lucide-react";
import styles from "./Preview.module.css";
import { useEffect, useRef, useState } from "react";
import sendMail from "../../assets/sendMail.svg";
import downloadIcon from "../../assets/downloadIcon.svg";
import tagIcon from "../../assets/tagIcon.svg";
import moveToFolder from "../../assets/moveToFolderIcon.svg";
import printIcon from "../../assets/printIcon.svg";
import addNoteGray from "../../assets/addNoteGray.svg";
import downloadIconUpdated from "../../assets/downloadIconUpdated.svg";
import doubleIcon from "../../assets/doubleIcon.svg";
import shareDiagonalIcon from "../../assets/shareDiagonalIcon.svg";
import gestionaEsPublico from "../../assets/gestionaEsPublicoIcon.svg";
import stripeIcon from "../../assets/stripeIconText.svg";
import winIcon from "../../assets/winIcon.svg";
import KIcon from "../../assets/KIcon.svg";

import hubSpot from "../../assets/hubspotIcon.svg";
import SendEmailModal from "../SendEmailModal/SendEmailModal";
import { ReactComponent as EyeWhiteIcon } from "../../assets/eyeWhiteIcon.svg";
import SeeBill from "./SeeBill/SeeBill";
import Button from "../Button/Button";
import EditableRow from "./EditableRow/EditableRow";
import EditableInput from "../AccountSettings/EditableInput/EditableInput";
import { ReactComponent as SeleccionarPlantilla } from "../../assets/seleccionar plantilla.svg";
import { ReactComponent as InfoPanelIcon } from "../../assets/infoPanelIcon.svg";
import { ReactComponent as OptionDots } from "../../assets/optionDots.svg";
import { ReactComponent as EditCode } from "../../assets/editCode.svg";
import { ReactComponent as ArrowLeftTextBlack } from "../../assets/ArrowLeftTextBlack.svg";
import { ReactComponent as EditCodeRays } from "../../assets/editCodeRays.svg";
import AddDiscount from "../AddDiscount/AddDiscount";
import AddTax from "../AddTax/AddTax";
import LogoSelector from "../LogoSelector/LogoSelector";
import { useDispatch } from "react-redux";
import { uploadFiles } from "../../../../actions/scaleway";
import SelectLocation from "../SelectLocation/SelectLocation";
import MoveToFolder from "../MoveToFolder/MoveToFolder";
import PanelAutomate from "../Automate/panelAutomate/PanelAutomate";
import SearchIconWithIcon from "../SearchIconWithIcon/SearchIconWithIcon";
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import { ReactComponent as StripeText } from "../../assets/stripePurple.svg";
import useFocusShortcut from "../../../../utils/useFocusShortcut";
let documentoPDF;

try {
  documentoPDF = require("../../assets/pdfs/document.pdf");
} catch (error) {
  console.warn("El archivo document.pdf no existe:", error.message);
  documentoPDF = null; // Valor por defecto si no existe el archivo
}

const ButtonActionsWithText = ({
  children,
  classStyle,
  click,
  disabledValue,
}) => {
  return (
    <button className={classStyle} onClick={click} disabled={disabledValue}>
      {children}
    </button>
  );
};
const DocumentPreview = ({
  document,
  companyInfo,
  handleAddNote,
  customStyles,
  setEditingNote,
  editingNote,
  setShowInfoMobileBill,
  setMobileSelectedDocument,
}) => {
  const [options, setOptions] = useState(0);
  const [showMovetoFolder, setShowMovetoFolder] = useState(false);
  const [mailModal, setMailModal] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [seeBill, setSeeBill] = useState(false);
  const [selectedAutomationData, setSelectedAutomationData] = useState(null);
  const [isModalAutomate, setIsModalAutomate] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSelectLocation, setShowSelectLocation] = useState(false);
  const [discountQuantity, setDiscountQuantity] = useState(10);
  const [taxQuantity, setTaxQuantity] = useState(10);
  // =======================
  const [typeContentAutomate, setTypeContentAutomate] = useState("");
  const handleCloseNewClient = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setTypeContentAutomate(false);
      setIsAnimating(false);
    }, 300);
  };
  // =======================

  const handleShowContentAutomate = (type, automationData) => {
    setIsModalAutomate(false);
    setTypeContentAutomate(type);
    setSelectedAutomationData(automationData);
  };

  const handleCloseContentAutomate = (type) => {
    setIsModalAutomate(false);
    setTypeContentAutomate("");
  };

  // ========================

  const handleSendEmail = async () => {
    const resp = await dispatch(
      sendEmail({
        // id: user.id,
        email: "info@aythen.com",
      })
    );
    console.log("resp emails", resp);
  };

  const [XMLConfiguration, setXMLConfiguration] = useState({
    filesSource: "/Inicio/",
    folderLocation: "/Inicio/",
  });

  const handleShare = (item) => {
    console.log(`${window.location.origin}/document.pdf`);
    const fileUrl = `${window.location.origin}/document.pdf`;

    if (navigator.share) {
      navigator
        .share({
          title: "Check out this file",
          text: "Have a look at this file",
          url: fileUrl,
        })
        .catch((err) => {
          console.error("Error sharing:", err);
        });
    } else {
      navigator.clipboard.writeText(fileUrl).then(
        () => {
          alert("Link copied to clipboard!");
        },
        (err) => {
          console.error("Failed to copy link:", err);
        }
      );
    }
  };
  const searchInputRef = useRef(null);
  // Llama a la función y pasa la referencia
  useFocusShortcut(searchInputRef, "k");
  const actions = [
    {
      text: "Compartir",
      icon: shareDiagonalIcon,
      click: () => {
        handleShare();
      },
    },
    {
      text: "Duplicar",
      icon: doubleIcon,
      click: () => {
        setShowSelectLocation(true);
      },
    },
    {
      text: "Enviar Correo",
      icon: sendMail,
      click: () => {
        setMailModal(true);
      },
    },
    {
      text: "Descargar",
      icon: downloadIconUpdated,
      click: () => {
        const link = document.createElement("a"); // Crea un elemento <a>
        link.href = documentoPDF; // Establece la URL del PDF
        link.download = "archivo.pdf"; // Nombre que tendrá el archivo descargado
        link.click(); // Simula un clic en el enlace
      },
    },
    {
      text: "Añadir Nota",
      icon: addNoteGray,
      click: () => {
        handleAddNote();
        setEditingNote(false);
      },
    },
    {
      text: "Mover a carpeta",
      icon: moveToFolder,
      click: () => {
        setShowMovetoFolder(true);
      },
    },
    {
      text: "Imprimir",
      icon: printIcon,
      click: () => {
        const printWindow = window.open(documentoPDF, "_blank"); // Abre el PDF en una nueva ventana o pestaña
        printWindow.onload = () => {
          printWindow.print(); // Ejecuta la acción de impresión
        };
      },
    },
    {
      text: "Buscar automatizaciones",
      icon: printIcon,
      componente: (
        <SearchIconWithIcon
          ref={searchInputRef}
          // searchTerm={searchTerm}
          // setSearchTerm={setSearchTerm}
          classNameIconRight={styles.searchContainerL}
          onClickIconRight={() => setIsFilterOpen(true)}
          placeholder="Buscar automatizaciones..."
          stylesComponent={{ padding: "0" }}
        >
          <>
            <div
              style={{ marginLeft: "5px" }}
              className={styles.searchIconsWrappers}
            >
              <img src={KIcon} alt="kIcon" />
            </div>
          </>
        </SearchIconWithIcon>
      ),
    },

    {
      icon: stripeIcon,
      click: () => {
        handleShowContentAutomate("Gmail");
      },
      classOption: styles.bgStripe,
      services: true,
    },
    {
      icon: hubSpot,
      click: () => {
        handleShowContentAutomate("Google Sheets");
      },
      classOption: styles.hubspot,
      services: true,
    },
    {
      icon: gestionaEsPublico,
      click: () => {
        handleShowContentAutomate("XML");
      },
      classOption: styles.bgGestiona,
      services: true,
    },
  ];

  const Actions = () => {
    return (
      <div className={styles.buttonActionsContainer}>
        {actions.map((action) => {
          if (action.componente) {
            return action.componente;
          } else if (action.text === "Descargar") {
            return (
              <a href={documentoPDF} download="Factura" key={action.text}>
                <img src={action.icon} alt="icon" />
                {action.text}
              </a>
            );
          } else {
            return (
              <ButtonActionsWithText
                key={action.text}
                classStyle={
                  action.text ? styles.btnWithText : action.classOption
                }
                click={action.click}
                disabledValue={action.services}
              >
                <img src={action.icon} alt="icon" />
                {action.text}
              </ButtonActionsWithText>
            );
          }
        })}
      </div>
    );
  };

  const Details = () => {
    const [showTaxModal, setShowTaxModal] = useState(false);
    const [showDiscountModal, setShowDiscountModal] = useState(false);

    const dispatch = useDispatch();
    const corporativeFileInputRef = useRef(null);
    const signatureFileInputRef = useRef(null);
    const profileFileInputRef = useRef(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const [userData, setUserData] = useState({
      selectedSignatureImage: "",
      selectedCorporativeLogo: "",
    });

    const handleAddImageClick = (type) => {
      if (type === "corporativeLogos" && corporativeFileInputRef.current) {
        corporativeFileInputRef.current.click();
      }
      if (type === "signatureImages" && signatureFileInputRef.current) {
        signatureFileInputRef.current.click();
      }
      if (type === "profileImage" && profileFileInputRef.current) {
        profileFileInputRef.current.click();
      }
    };

    const handleFileChange = (e, type) => {
      const file = e.target.files[0];
      if (!file) return;

      const currentPath =
        type === "corporativeLogos"
          ? "corporativeLogos/"
          : type === "signatureImages"
            ? "signatureImages/"
            : "profileImages/";

      dispatch(uploadFiles({ files: [file], currentPath }))
        .unwrap()
        .then((uploadResponse) => {
          console.log(`UPLOAD RESPONSE for ${type}`, uploadResponse);
          const uploadedItem = uploadResponse[0];
          const newLocation = uploadedItem?.Location;

          if (type === "profileImage") {
            setUserData({
              ...userData,
              profileImage: newLocation,
            });
            console.log("Uploaded new profile image:", newLocation);
          } else {
            const updatedArray = [...(userData?.[type] || []), newLocation];
            setUserData({
              ...userData,
              [type]: updatedArray,
            });
            console.log(`Uploaded new ${type.slice(0, -1)}:`, newLocation);
          }
        })
        .catch((error) => {
          console.error(`Error uploading new ${type.slice(0, -1)}:`, error);
        });
    };
    const handleChange = ({ name, newValue }) => {
      console.log(`Setting ${name} to ${newValue}`);
      setUserData({ ...userData, [name]: newValue });
    };
    const [stateStripe, setStateStripe] = useState("Pagado");

    return (
      <div className={styles.detailsContainer}>
        {/* <Button type="white" headerStyle={{ width: "100%" }}>
          Crea un asiento
        </Button> */}
        <div className={styles.detailsContent}>
          <div className={styles.containerEditableInput}>
            <div className={styles.state}>
              <p>Estado:</p>
              <div className={styles.stateStripeContainer}>
                <StripeText />
                <CustomDropdown
                  editable={true}
                  editing={true}
                  options={[
                    "Pagado",
                    "Pendiente",
                    "Incumplido",
                    "Vencido",
                    "Anulado",
                  ]}
                  stateStripe={true}
                  selectedOption={stateStripe}
                  setSelectedOption={(option) => {
                    console.log("optionooooooooooooooooo", option);
                    setStateStripe(option);
                  }}
                />
              </div>
            </div>

            <EditableRow label="Subtotal" oneRow={true} />
            <EditableRow
              label="Descuento"
              buttonLabel="Añadir Descuento"
              action={() => setShowDiscountModal(true)}
              hasButton
              hasPercentage={discountQuantity}
            />
            <EditableRow
              label="Impuesto"
              buttonLabel="Añadir Impuesto"
              action={() => setShowTaxModal(true)}
              hasButton
              hasPercentage={taxQuantity}
            />
            <EditableRow label="Total" oneRow={true} />
          </div>

          <div className={styles.containerEditableInput}>
            <EditableInput label="# Factura" placeholder="0001" />
            <EditableInput label="# Orden de compra" placeholder="Opcional" />
            <EditableInput label="Fecha" placeholder="25 Dec 2025" />
            <EditableInput
              label="Fecha vencimiento"
              placeholder="25 Dec 2025"
            />
          </div>
          <div className={styles.containerEditableInput}>
            <EditableInput
              label="Condiciones y formas de pago"
              placeholder="ex. Payment is due within 15 days"
              isTextarea={true}
            />
          </div>
          <LogoSelector
            text="Logo Corporativo"
            logos={userData?.corporativeLogos}
            selectedLogo={userData?.selectedCorporativeLogo}
            onAddLogo={() => handleAddImageClick("corporativeLogos")}
            // onDeleteLogo={handleDeleteLogo}
            onSelectLogo={(logo) =>
              handleChange({
                name: "selectedCorporativeLogo",
                newValue: logo,
              })
            }
            fileInputRef={corporativeFileInputRef}
            onFileChange={(e) => handleFileChange(e, "corporativeLogos")}
            buttonDown={true}
          />

          <LogoSelector
            text="Firma"
            logos={userData?.signatureImages}
            selectedLogo={userData?.selectedSignatureImage}
            onAddLogo={() => handleAddImageClick("signatureImages")}
            // onDeleteLogo={handleDeleteLogo}
            onSelectLogo={(logo) =>
              handleChange({ name: "selectedSignatureImage", newValue: logo })
            }
            fileInputRef={signatureFileInputRef}
            onFileChange={(e) => handleFileChange(e, "signatureImages")}
            buttonDown={true}
          />
          <div className={styles.btnTemplateContainer}>
            <Button
              type="white"
              headerStyle={{
                fontWeight: "500",
                width: "100%",
                alignItem: "center",
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                padding: "8px",
              }}
              disabledOption={true}
            >
              <SeleccionarPlantilla /> Seleccionar Plantilla
            </Button>
            <Button
              type="white"
              headerStyle={{
                fontWeight: "500",
                width: "100%",
                alignItem: "center",
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                padding: "8px",
              }}
              disabledOption={true}
            >
              <EditCode /> Editar Código HTML <EditCodeRays />
            </Button>
            {showDiscountModal && (
              <AddDiscount
                showDiscountModal={showDiscountModal}
                setShowDiscountModal={setShowDiscountModal}
                isAnimating={isAnimating}
                setIsAnimating={setIsAnimating}
                setDiscountQuantity={setDiscountQuantity}
              />
            )}
            {showTaxModal && (
              <AddTax
                setShowTaxModal={setShowTaxModal}
                showTaxModal={showTaxModal}
                isAnimating={isAnimating}
                setIsAnimating={setIsAnimating}
                setTaxQuantity={setTaxQuantity}
              />
            )}
          </div>
        </div>
      </div>
    );
  };
  const [fileUser, setFile] = useState(null); // Para almacenar el archivo PDF subido
  const seeBillRef = useRef();
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  // Manejador para el cambio de archivo
  const handleFileChangePdf = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile); // Guardar el archivo en el estado
      handleVisualizar();
    }
  };
  const [pdfUrl, setPdfUrl] = useState(null);

  // Mostrar el modal y generar el PDF dependiendo del archivo subido
  const handleVisualizar = () => {
    setSeeBill(true); // Mostrar el modal
    if (fileUser) {
      console.log("DESDE PREVIEWWWWWWWWWWWWWWWWWWWWWWWW");
      // Si hay un archivo PDF subido, usar ese archivo
      const fileUrl = URL.createObjectURL(fileUser);
      setPdfUrl(fileUrl);
      seeBillRef.current?.generatePDF(fileUrl); // Generar PDF desde el archivo subido
    } else {
      console.log("DESDE PREVIEWWWWWWWWWWWWWWWWWWWWWWWW22222222222222");
      // Si no hay archivo, usar el componente FacturaTemplate
      console.log("desde preview");
      seeBillRef.current?.generatePDF(); // Generar PDF desde FacturaTemplate
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add(styles.dragOver); // Agrega una clase para cambiar el estilo
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove(styles.dragOver); // Remueve la clase cuando el archivo sale del área
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove(styles.dragOver); // Remueve la clase cuando se suelta el archivo

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileChangePdf({ target: { files } });
    }
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

  return (
    <div className={styles.container} style={customStyles}>
      {isMobile && (
        <>
          <div className={styles.headerBillMobile}>
            <button onClick={() => setMobileSelectedDocument(false)}>
              <ArrowLeftTextBlack /> Atrás
            </button>
            <div className={styles.notesHeaderBillMobile}>
              <div className={styles.note}>nota</div>
              <button>+Añadir Nota</button>
              <OptionDots className={styles.verticalOptionDots} />
            </div>
          </div>
          <Button
            action={() => setShowInfoMobileBill(true)}
            headerStyle={{
              background: "transparent",
              color: "#B4B4B4",
              border: " 1px solid rgba(0, 0, 0, 0.10)",
              margin: "10px 0",
            }}
          >
            <InfoPanelIcon />
            Info
          </Button>
        </>
      )}
      <div className={styles.previewSection}>
        {documentoPDF ? (
          <div className={styles.documentWrapper}>
            <div className={styles.billContainerPreview}>
              {!documentoPDF ? (
                "No existe ninguna factura"
              ) : (
                <embed
                  src={`${documentoPDF}#zoom=10&toolbar=0`}
                  width="100%"
                  height="100%"
                  type="application/pdf"
                />
              )}
            </div>
            <div className={styles.visualizar} onClick={handleVisualizar}>
              <EyeWhiteIcon />
              Visualizar
            </div>
          </div>
        ) : (
          <div
            className={styles.emptyPreview}
            onClick={handleClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept="application/pdf"
              ref={fileInputRef}
              onChange={handleFileChangePdf}
              style={{ display: "none" }}
            />
            <span>Drop your document here</span>
            {/* <div className={styles.visualizar} onClick={handleVisualizar}>
              <EyeWhiteIcon />
              {documentoPDF ? "Visualizar" : "Crear PDF"}
            </div> */}
          </div>
        )}
      </div>
      {showSelectLocation && (
        <SelectLocation onClose={() => setShowSelectLocation(false)} />
      )}
      {showMovetoFolder && (
        <MoveToFolder
          setShowMovetoFolder={setShowMovetoFolder}
          showMovetoFolder={showMovetoFolder}
          configuration={XMLConfiguration}
          setConfiguration={setXMLConfiguration}
          isAnimating={isAnimating}
          setIsAnimating={setIsAnimating}
        />
      )}
      {seeBill && (
        <SeeBill
          ref={seeBillRef}
          document={document}
          setSeeBill={setSeeBill}
          fileUser={fileUser}
        />
      )}

      <div className={styles.actionsSection}>
        <div className={styles.actionsContainer}>
          <button
            onClick={() => setOptions(0)}
            className={options === 0 ? styles.btnActionSelected : ""}
          >
            Detalles
          </button>
          <button
            onClick={() => setOptions(1)}
            className={options === 1 ? styles.btnActionSelected : ""}
          >
            Acciones
          </button>
        </div>
        {options === 0 ? <Details /> : <Actions />}
        {typeContentAutomate && (
          <PanelAutomate
            automationData={selectedAutomationData}
            typeContent={handleShowContentAutomate}
            setIsModalAutomate={setIsModalAutomate}
            close={handleCloseNewClient}
            type={typeContentAutomate}
            isAnimating={isAnimating}
          />
        )}
      </div>
      {mailModal && (
        <SendEmailModal
          setMailModal={setMailModal}
          mailModal={mailModal}
          isAnimating={isAnimating}
          setIsAnimating={setIsAnimating}
        />
      )}
    </div>
  );
};

export default DocumentPreview;

const Details = () => {
  return (
    <div>
      ---- Estado : stripe Pagado Subtotal Editar 0,00€ Descuento Añadir
      Descuento Editar 10% 0,00€ Impuestos Añadir Impuestos Editar 21% 0,00€
      Total Editar 0,00€ #Factura 0001 #Orden de compra 0001 Fecha Editar 25 Dec
      2025 Fecha vencimiento 25 Dec 2025 Condiciones y formas de pago ex.
      Payments is due within 15 days Logo icon Añade tu Logo Firma Añade tu
      Firma Seleccionar Plantilla Editar Código HTML icon thunder
    </div>
  );
};

const PanelImpuesto = () => {
  return (
    <div>
      <div>
        <button>=!</button>
        <h2>Seleccionar Impuesto</h2>
        <div>
          <button>Cancel</button>
          <button>Seleccionar</button>
        </div>
        <div>
          <div>Nombre del Impuesto [taxname]</div>
          <div>Tasa de impuesto %</div>
          <div>icon Impuesto compuesto</div>
        </div>

        <div>
          <table>
            <tr>
              <td>Nombre del Impuesto</td>
              <td>Tasa del Impuesto</td>
              <td>Impuesto Compuesto</td>
            </tr>
          </table>
        </div>
      </div>
      <div>
        <div>
          <button>=!</button>
          <h2>Seleccionar Descuento</h2>
        </div>
        <div>
          <b>Nombre o descripción del descuento</b>
          <input type="text" placeholder="[discountname]" />
        </div>
        <div>
          <b>Descuento</b>
          <input type="text" placeholder="%" />
        </div>
        <button>Añadir Impuesto</button>
        <button>Editar 10%</button>
        <div>
          <table>
            <tr>
              <td>Nombre del Impuesto</td>
              <td>Descuento Aplicado</td>
            </tr>
            <tr>
              <td>Descuento Aplicado</td>
              <td>21.00%</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};
