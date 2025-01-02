import { useState } from "react";
import { X, Pencil, Minus, Plus } from "lucide-react";
import styles from "./FolderModal.module.css";
import { ColorPicker } from "./ColorPicker";
import AutomationModal from "./Automation";
import CollaboratorManager from "./CollaboratorManager";
import FolderForm from "./FolderForm";

import { ReactComponent as GmailIcon } from "../../assets/gmail-icon.svg";
import { ReactComponent as OutlookIcon } from "../../assets/outlook-icon.svg";
import { ReactComponent as DriveIcon } from "../../assets/drive-icon.svg";
import { ReactComponent as DropboxIcon } from "../../assets/dropbox-icon.svg";
import { ReactComponent as OnedriveIcon } from "../../assets/onedrive-icon.svg";

const services = [
  { name: "Gmail", email: "example@email.com", icon: <GmailIcon /> },
  { name: "Outlook", email: "example@email.com", icon: <OutlookIcon /> },
  { name: "Drive", email: "example@email.com", icon: <DriveIcon /> },
  { name: "OneDrive", email: "example@email.com", icon: <OnedriveIcon /> },
  { name: "Dropbox", email: "example@email.com", icon: <DropboxIcon /> },
];

export default function FolderModal({ onClose, isOpen }) {
  const [selectedColor, setSelectedColor] = useState("#4FD1C5");
  const [showAutomation, setShowAutomation] = useState(false);

  if (!isOpen) return null;

  return (
    <>
      <div
        className={styles.modalOverlay}
        style={{
          backdropFilter: showAutomation ? "blur(4px)" : "none",
        }}
      >
        <div className={styles.modal}>
          <div className={styles.header}>
            <h2 className={styles.title}>Nueva Carpeta</h2>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <ColorPicker
                selectedColor={selectedColor}
                onChange={setSelectedColor}
              />
              <button onClick={onClose} className={styles.closeButton}>
                <X size={20} />
              </button>
            </div>
          </div>

          <div className={styles.content}>
            <FolderForm />
            <CollaboratorManager />

            <button
              className={styles.addButton}
              onClick={() => setShowAutomation(true)}
            >
              <div className={styles.plusIcon}>
                <Plus size={20} fill="#000" color="#000" />
              </div>
              Añadir Automatización
            </button>

            <div className={styles.serviceList}>
              {services.map((service) => (
                <div key={service.name} className={styles.serviceItem}>
                  <div className={styles.serviceIcon}>{service.icon}</div>
                  <div className={styles.serviceInfo}>
                    <div className={styles.serviceName}>{service.name}</div>
                    <div className={styles.serviceEmail}>{service.email}</div>
                  </div>
                  <div className={styles.actions}>
                    <button className={styles.actionButton}>
                      <Pencil size={16} />
                    </button>
                    <div className={styles.minusIcon}>
                      <Minus size={20} fill="#FFF" color="#FFF" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.footer}>
            <button className={styles.cancelButton}>Cancel</button>
            <button className={styles.primaryButton}>Create</button>
            <button className={styles.primaryButton}>Save</button>
          </div>
        </div>
      </div>
      {showAutomation && (
        <AutomationModal onClose={() => setShowAutomation(false)} />
      )}
    </>
  );
}
