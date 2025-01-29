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
        {options === 0 ? (
          <Actions />
        ) : (
          <Actions />
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
      ----
      Estado : stripe Pagado

      Subtotal
      Editar
      0,00€

      Descuento
      Añadir Descuento
      Editar
      10%
      0,00€

      Impuestos
      Añadir Impuestos
      Editar
      21%
      0,00€

      Total
      Editar
      0,00€


      #Factura
      0001

      #Orden de compra
      0001

      Fecha
      Editar
      25 Dec 2025

      Fecha vencimiento
      25 Dec 2025

      Condiciones y formas de pago

      ex. Payments is due within 15 days

      Logo
      icon
      Añade tu Logo


      Firma
      Añade tu Firma

      Seleccionar Plantilla

      Editar Código HTML
      icon thunder
    </div>
  )
}


const PanelImpuesto = () => {
  return (
    <div>
      <div>
        <button>
          =!
        </button>
        <h2>
          Seleccionar Impuesto
        </h2>
        <div>
          <button>
            Cancel
          </button>
          <button>
            Seleccionar
          </button>
        </div>
        <div>
          <div>
            Nombre del Impuesto
            [taxname]
          </div>
          <div>
            Tasa de impuesto
            %
          </div>
          <div>
            icon
            Impuesto compuesto
          </div>
        </div>

        <div>
          <table>
            <tr>
              <td>
                Nombre del Impuesto
              </td>
              <td>
                Tasa del Impuesto
              </td>
              <td>
                Impuesto Compuesto
              </td>
            </tr>
          </table>
        </div>

      </div>
      <div>
        <div>
          <button>
            =!
          </button>
          <h2>
            Seleccionar Descuento
          </h2>
        </div>
        <div>
          <b>
            Nombre o descripción del descuento
          </b>
          <input
            type="text"
            placeholder="[discountname]"
          />
        </div>
        <div>
          <b>
            Descuento
          </b>
          <input
            type="text"
            placeholder="%"
          />
        </div>
        <button>
          Añadir Impuesto
        </button>
        <button>
          Editar
          10%
        </button>
        <div>
          <table>
            <tr>
              <td>
                Nombre del Impuesto
              </td>
              <td>
                Descuento Aplicado
              </td>
            </tr>
            <tr>
              <td>
                Descuento Aplicado
              </td>
              <td>
                21.00%
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  )
}