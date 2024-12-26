import { X } from "lucide-react";
import styles from "./Filters.module.css";

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
  "Nota de Entrega"
];

export default function Filter({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Filtrar</h2>
          <button onClick={onClose} className={styles.closeButton}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.filterSection}>
            <label>Search by document title</label>
            <input type="text" placeholder="Text" className={styles.input} />
          </div>

          <div className={styles.filterSection}>
            <label>Search by email</label>
            <input
              type="email"
              placeholder="example@email.com"
              className={styles.input}
            />
          </div>

          <div className={styles.filterSection}>
            <label>Search by category</label>
            <select className={styles.select}>
              {documentTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className={styles.filterSection}>
            <label>Search by type</label>
            <input
              type="text"
              placeholder="JPG,PNG,PDF,TXT"
              className={styles.input}
            />
          </div>

          <div className={styles.filterSection}>
            <label>Search by amount</label>
            <div className={styles.amountContainer}>
              <div className={styles.amountInput}>
                <span>$</span>
                <input type="text" placeholder="Min" />
              </div>
              <span>-</span>
              <div className={styles.amountInput}>
                <span>$</span>
                <input type="text" placeholder="Max" />
              </div>
              <select className={styles.currencySelect}>
                <option>EUR</option>
              </select>
            </div>
          </div>

          <div className={styles.filterSection}>
            <label>Search by Tag</label>
            <div>
              <input
                type="text"
                placeholder="Search tag"
                className={styles.input}
              />
            </div>
            <div className={styles.tags}>
              <span
                className={styles.tag}
                style={{ backgroundColor: "#333333" }}
              >
                Etiqueta
              </span>
              <span
                className={styles.tag}
                style={{ backgroundColor: "#4339F2" }}
              >
                Etiqueta
              </span>
              <span
                className={styles.tag}
                style={{ backgroundColor: "#FF3838" }}
              >
                Etiqueta
              </span>
              <span
                className={styles.tag}
                style={{ backgroundColor: "#34B53A" }}
              >
                Etiqueta
              </span>
              <span
                className={styles.tag}
                style={{ backgroundColor: "#7B61FF" }}
              >
                Etiqueta
              </span>
              <span
                className={styles.tag}
                style={{ backgroundColor: "#892CDC" }}
              >
                Etiqueta
              </span>
              <span
                className={styles.tag}
                style={{ backgroundColor: "#FF8A00" }}
              >
                Etiqueta
              </span>
              <span
                className={styles.tag}
                style={{ backgroundColor: "#2CCCC3" }}
              >
                Etiqueta
              </span>
              <span
                className={styles.tag}
                style={{ backgroundColor: "#E73C7E" }}
              >
                Etiqueta
              </span>
              <span
                className={styles.tag}
                style={{ backgroundColor: "#FFCD38" }}
              >
                Etiqueta
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
