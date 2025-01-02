import React, { useState } from "react";
import { X, Search, Plus, Info } from "lucide-react";
import styles from "./Gmail.module.css";
import { GmailIcon, TagIcon } from "../Icons";

function GmailContent({ onClose }) {
  const [senderEmails, setSenderEmails] = useState([
    "johndue@gmail.com",
    "example@email.com",
  ]);

  const removeEmail = (email) => {
    setSenderEmails(senderEmails.filter((e) => e !== email));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.gmailSelector}>
          <GmailIcon />
          <span>example@email.com</span>
          <X size={16} />
        </div>
        <a href="#" className={styles.addConnection}>
          Añadir Conexión
        </a>
      </div>

      <form>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            Sube tus Facturas de Gmail en
          </label>
          <div className={styles.locationInput}>
            <div className={styles.inputWrapper}>
              <Search className={styles.searchIcon} size={16} />
              <input
                type="text"
                placeholder="/home"
                className={`${styles.input} ${styles.withIcon}`}
              />
            </div>
            <button
              type="button"
              className={`${styles.button} ${styles.primaryButton}`}
            >
              Seleccionar Ubicación
            </button>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Remitentes</label>
          <div className={styles.tagContainer}>
            {senderEmails.map((email) => (
              <span key={email} className={styles.tag}>
                {email}
                <button
                  type="button"
                  className={styles.tagCloseButton}
                  onClick={() => removeEmail(email)}
                >
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              className={styles.checkbox}
              id="allSenders"
            />
            <label htmlFor="allSenders" className={styles.checkboxLabel}>
              Incluir todos los remitentes
            </label>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Asunto Contine</label>
          <input
            type="text"
            placeholder="palabras clave separadas por comas"
            className={styles.input}
          />
          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              className={styles.checkbox}
              id="exactMatch"
            />
            <label htmlFor="exactMatch" className={styles.checkboxLabel}>
              Exact match
            </label>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Body Contine</label>
          <input
            type="text"
            placeholder="palabras clave separadas por comas"
            className={styles.input}
          />
          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              className={styles.checkbox}
              id="bodyExactMatch"
            />
            <label htmlFor="bodyExactMatch" className={styles.checkboxLabel}>
              Exact match
            </label>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Attachment Type</label>
          <div className={styles.checkboxGroup}>
            <input type="checkbox" className={styles.checkbox} id="allTypes" />
            <label htmlFor="allTypes" className={styles.checkboxLabel}>
              Permitir todo los tipos adjuntos
            </label>
          </div>
          <select className={styles.select}>
            <option>PDF/PNG/JPG</option>
          </select>
          <div className={styles.infoBox}>
            <Info size={16} className={styles.infoIcon} />
            <span className={styles.infoText}>
              Si el correo no tiene archivos adjuntos no se guardará ninguna
              factura
            </span>
          </div>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.templateSection}>
            <label className={styles.templateLabel}>
              Cambiar nombre del archivo
            </label>
            <input
              type="text"
              defaultValue="[fecha]-[empresa]-[importe]-[etiqueta]"
              className={styles.input}
            />
            <button type="button" className={styles.tagButton}>
              <TagIcon width={20} height={20} />
              Añadir etiqueta
            </button>
            <div className={styles.searchTag}>
              <input
                type="text"
                placeholder="Buscar etiqueta"
                className={styles.input}
              />
              <button type="button" className={styles.createButton}>
                Crear
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default GmailContent;
