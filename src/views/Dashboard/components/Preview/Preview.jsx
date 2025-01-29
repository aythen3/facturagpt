import { MoreVertical } from "lucide-react";
import styles from "./Preview.module.css";
import { useRef, useState } from "react";
import sendMail from "../../assets/sendMail.svg";
import downloadIcon from "../../assets/downloadIcon.svg";
import tagIcon from "../../assets/tagIcon.svg";
import moveToFolder from "../../assets/moveToFolderIcon.svg";
import printIcon from "../../assets/printIcon.svg";
import gestionaEsPublico from "../../assets/gestionaEsPublicoIcon.svg";
import stripeIcon from "../../assets/stripeIconText.svg";
import wsIcon from "../../assets/whatsappIcon.svg";
import SendEmailModal from "../SendEmailModal/SendEmailModal";
import { ReactComponent as EyeWhiteIcon } from "../../assets/eyeWhiteIcon.svg";
import SeeBill from "./SeeBill/SeeBill";

const ButtonActionsWithText = ({ children, classStyle, click }) => {
  return (
    <button className={classStyle} onClick={click}>
      {children}
    </button>
  );
};

const DocumentPreview = ({ document, companyInfo }) => {
  const [options, setOptions] = useState(0);

  const [mailModal, setMailModal] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [seeBill, setSeeBill] = useState(false);

  const actions = [
    {
      text: "Enviar Correo",
      icon: sendMail,
      click: () => {
        setMailModal(true); // Cambia el estado para mostrar el modal
      },
    },
    {
      text: "Descargar",
      icon: downloadIcon,
      click: () => {
        console.log("Documento descargado");
      },
    },
    {
      text: "Añadir Etiqueta",
      icon: tagIcon,
      click: () => {
        console.log("Etiqueta añadida");
      },
    },
    {
      text: "Mover a Carpeta",
      icon: moveToFolder,
      click: () => {
        console.log("Documento movido a carpeta");
      },
    },
    {
      text: "Imprimir",
      icon: printIcon,
      click: () => {
        console.log("Documento enviado a imprimir");
      },
    },
    {
      icon: stripeIcon,
      click: () => {
        console.log("Acción de Stripe ejecutada");
      },
      classOption: styles.bgStripe,
    },
    {
      icon: wsIcon,
      click: () => {
        console.log("Acción de WhatsApp ejecutada");
      },
      classOption: styles.bgWs,
    },
    {
      icon: gestionaEsPublico,
      click: () => {
        console.log("Gestión pública ejecutada");
      },
      classOption: styles.bgGestiona,
    },
  ];

  const Actions = () => {
    return (
      <div className={styles.buttonActionsContainer}>
        {actions.map((action) => (
          <ButtonActionsWithText
            key={action.text}
            classStyle={action.text ? styles.btnWithText : action.classOption}
            click={action.click}
          >
            <img src={action.icon} alt="icon" />
            {action.text}
          </ButtonActionsWithText>
        ))}
      </div>
    );
  };
  const seeBillRef = useRef(); // Referencia al componente SeeBill

  return (
    <div className={styles.container}>
      <div className={styles.previewSection}>
        {document ? (
          <div className={styles.documentWrapper}>
            <img
              src={document}
              alt="Document preview"
              width={400}
              height={500}
              className={styles.documentImage}
            />
            <div
              className={styles.visualizar}
              onClick={() => {
                setSeeBill(true); // Mostrar el modal
                setTimeout(() => {
                  seeBillRef.current?.generatePDF(); // Llamar a la función en el hijo
                }, 300); // Asegurar que el modal está montado
              }}
            >
              <EyeWhiteIcon />
              Visualizar
            </div>
          </div>
        ) : (
          <div className={styles.emptyPreview}>
            <span>Drop your document here</span>
          </div>
        )}
      </div>

      {seeBill && (
        <SeeBill ref={seeBillRef} document={document} setSeeBill={setSeeBill} />
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
        {options === 1 && <Actions />}
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
