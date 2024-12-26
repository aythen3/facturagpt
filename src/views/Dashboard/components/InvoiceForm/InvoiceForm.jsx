import { useState } from 'react';
import styles from "./InvoiceForm.module.css";
import { ReactComponent as PdfIcon } from "../../assets/pdf-ico.svg";

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

export default function InvoiceForm() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("Factura");

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setIsPopupOpen(false);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleWrapper}>
          <PdfIcon className={styles.documentIcon} />
          <h1 className={styles.title}>Document Title</h1>
        </div>
        <button className={styles.saveButton}>Save Changes</button>
      </header>

      <div style={{ position: 'relative' }}>
        <div 
          className={styles.documentType}
          onClick={() => setIsPopupOpen(!isPopupOpen)}
        >
          <span>{selectedType}</span>
          <span className={styles.arrow}>▼</span>
        </div>

        {isPopupOpen && (
          <>
            <div 
              style={{ 
                position: 'fixed', 
                inset: 0, 
                zIndex: 999 
              }} 
              onClick={() => setIsPopupOpen(false)}
            />
            <div className={styles.popup}>
              {documentTypes.map((type) => (
                <button
                  key={type}
                  className={`${styles.option} ${type === selectedType ? styles.selectedOption : ''}`}
                  onClick={() => handleTypeSelect(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <div className={styles.actions}>
        <button className={styles.actionButton}>Print</button>
        <button className={styles.actionButton}>Share</button>
        <button className={styles.actionButton}>Copy</button>
        <button className={styles.actionButton}>#id</button>
      </div>

      <div className={styles.amounts}>
        <div className={styles.subtotal}>
          <span>Subtotal</span>
          <span>0,00 €</span>
        </div>
        <div className={styles.total}>
          <span>Total</span>
          <div className={styles.totalAmount}>
            <span>0,00 €</span>
          </div>
        </div>
        <button className={styles.currencySelector}>
          EUR <span className={styles.arrow}>▼</span>
        </button>
      </div>

      <div className={styles.formSection}>
        <label>De</label>
        <textarea
          placeholder="Su Empresa o Nombre, y Dirección"
          className={styles.textArea}
        />
      </div>

      <div className={styles.formSection}>
        <label>Facturar a</label>
        <textarea
          placeholder="Dirección de facturación de su cliente"
          className={styles.textArea}
        />
      </div>

      <div className={styles.formSection}>
        <label>Enviar a</label>
        <textarea
          placeholder="Dirección de envío de su cliente (opcional)"
          className={styles.textArea}
        />
      </div>

      <div className={styles.row}>
        <div className={styles.formSection}>
          <label>Nº de factura</label>
          <input type="text" placeholder="100" className={styles.input} />
        </div>
        <div className={styles.formSection}>
          <label>Nº de pedido</label>
          <input
            type="text"
            placeholder="Pedido (opcional)"
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.formSection}>
          <label>Fecha</label>
          <input
            type="text"
            placeholder="15.12.2025"
            className={styles.input}
          />
        </div>
        <div className={styles.formSection}>
          <label>Fecha vencimiento</label>
          <input
            type="text"
            placeholder="15.12.2025"
            className={styles.input}
          />
        </div>
      </div>
    </div>
  );
}

