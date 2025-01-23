import { useState } from "react";
import { X, Info, Mail, FileText, MessageSquare, File } from "lucide-react";
import styles from "./Automation.module.css";
import { CustomSelect } from "./CustomSelect";
import { CustomCheckbox } from "./CustomCheckbox";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";

import { ReactComponent as GmailIcon } from "../../assets/gmail-icon.svg";

export function AutomationModal({ onClose }) {
  const [email, setEmail] = useState("example@email.com");
  const [includeAllRecipients, setIncludeAllRecipients] = useState(true);
  const [exactSubjectMatch, setExactSubjectMatch] = useState(true);
  const [exactBodyMatch, setExactBodyMatch] = useState(true);
  const [allowAllAttachments, setAllowAllAttachments] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);

  return (
    <>
      <div className={styles.modalOverlay}>
        <div className={styles.modal}>
          <div className={styles.header}>
            <h2 className={styles.title}>Añadir Automatización</h2>
            <button onClick={onClose} className={styles.closeButton}>
              <X size={20} />
            </button>
          </div>

          <div className={styles.content}>
            <div className={styles.accountSection}>
              <GmailIcon className={styles.gmailIcon} />
              <div className={styles.accountContent}>
                <div className={styles.selectContainer}>
                  <CustomSelect
                    value={email}
                    onChange={setEmail}
                    options={[
                      {
                        value: "example@email.com",
                        label: "example@email.com",
                      },
                    ]}
                  />
                </div>
                <a href="#" className={styles.addConnection}>
                  Añadir Conexión
                </a>
              </div>
            </div>

            <div className={styles.section}>
              <Mail className={styles.sectionIcon} />
              <div className={styles.sectionContent}>
                <label className={styles.label}>Remitentes</label>
                <div className={styles.recipientsList}>
                  <div className={styles.recipientTag}>
                    johndoe@gmail.com
                    <button className={styles.closeButton}>
                      <X size={14} />
                    </button>
                  </div>
                  <div className={styles.recipientTag}>
                    example@email.com
                    <button className={styles.closeButton}>
                      <X size={14} />
                    </button>
                  </div>
                </div>
                <CustomCheckbox
                  id="allRecipients"
                  label="Incluir todos los remitentes"
                  checked={includeAllRecipients}
                  onChange={setIncludeAllRecipients}
                />
              </div>
            </div>

            <div className={styles.section}>
              <FileText className={styles.sectionIcon} />
              <div className={styles.sectionContent}>
                <label className={styles.label}>Asunto Contiene</label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="palabras clave separadas por comas"
                />
                <CustomCheckbox
                  id="exactSubject"
                  label="Exact match"
                  checked={exactSubjectMatch}
                  onChange={setExactSubjectMatch}
                />
              </div>
            </div>

            <div className={styles.section}>
              <MessageSquare className={styles.sectionIcon} />
              <div className={styles.sectionContent}>
                <label className={styles.label}>Mensaje Contiene</label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="palabras clave separadas por comas"
                />
                <CustomCheckbox
                  id="exactBody"
                  label="Exact match"
                  checked={exactBodyMatch}
                  onChange={setExactBodyMatch}
                />
              </div>
            </div>

            <div className={styles.section}>
              <File className={styles.sectionIcon} />
              <div className={styles.sectionContent}>
                <label className={styles.label}>Attatchment Type</label>
                <CustomCheckbox
                  id="allAttachments"
                  label="Permitir todo los tipos adjuntos"
                  checked={allowAllAttachments}
                  onChange={setAllowAllAttachments}
                />
                <input
                  type="text"
                  className={styles.input}
                  defaultValue="PDF/PNG/JPG"
                />
                <div className={styles.infoBox}>
                  <Info size={16} className={styles.infoIcon} />
                  <span className={styles.infoText}>
                    Si el correo no tiene archivos adjuntos no se guardará
                    ninguna factura
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.footer}>
            <button
              className={styles.cancelButton}
              onClick={() => setShowConfirmation(true)}
            >
              Cancel
            </button>
            <button className={styles.primaryButton}>Create</button>
            <button className={styles.primaryButton}>Save</button>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={() => {
          console.log("Confirmation modal confirmed");
          setShowConfirmation(false);
        }}
        title="Discard Changes"
        message="Are you sure you want to discard changes?"
      />
    </>
  );
}
