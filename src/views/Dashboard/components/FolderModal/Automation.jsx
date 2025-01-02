import React, { useState } from "react";
import { Bookmark, X } from "lucide-react";
import styles from "./Automation.module.css";
import GmailContent from "./Automation/Gmail";
import {
  GmailIcon,
  OutlookIcon,
  SheetsIcon,
  DriveIcon,
  DropboxIcon,
  OnedriveIcon,
  WhatsappIcon,
  StripeIcon,
  OdooIcon,
  WoltersIcon,
  HoldedIcon,
  ReportIcon,
} from "./Icons";

const INPUT_SERVICES = [
  { id: "gmail", name: "Google Gmail", icon: GmailIcon },
  { id: "outlook", name: "Microsoft Outlook", icon: OutlookIcon },
  { id: "sheets", name: "Google Sheets", icon: SheetsIcon },
  { id: "drive", name: "Google Drive", icon: DriveIcon },
  { id: "dropbox", name: "Dropbox", icon: DropboxIcon },
  { id: "onedrive", name: "Microsoft One Drive", icon: OnedriveIcon },
];

const OUTPUT_SERVICES = [
  { id: "whatsapp", name: "WhatsApp", icon: WhatsappIcon },
  { id: "stripe", name: "Stripe", icon: StripeIcon },
  { id: "odoo", name: "Odoo", icon: OdooIcon },
  { id: "wolters", name: "Wolters Kluwer A3", icon: WoltersIcon },
  { id: "holded", name: "Holded", icon: HoldedIcon },
  { id: "report", name: "Generar Informe", icon: ReportIcon },
];

function AutomationModal({ onClose }) {
  const [selectedService, setSelectedService] = useState("gmail");

  const renderContent = () => {
    switch (selectedService) {
      case "gmail":
        return <GmailContent onClose={onClose} />;
      // Add other service components here
      default:
        return null;
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Añadir Automatización</h2>
          <button onClick={onClose} className={styles.closeButton}>
            <X size={20} />
          </button>
        </div>
        <div className={styles.modalContent}>
          <div className={styles.sidebar}>
            <div className={styles.savedSection}>
              <Bookmark className={styles.savedIcon} size={16} />
              <span className={styles.savedText}>
                Automatizaciones Guardadas
              </span>
            </div>

            <div className={styles.sidebarSection}>
              <h3 className={styles.sectionTitle}>INPUT</h3>
              <div className={styles.serviceList}>
                {INPUT_SERVICES.map((service) => (
                  <div
                    key={service.id}
                    className={`${styles.serviceItem} ${selectedService === service.id ? styles.active : ""}`}
                    onClick={() => setSelectedService(service.id)}
                  >
                    <div className={styles.serviceIcon}>
                      <service.icon />
                    </div>
                    <span className={styles.serviceName}>{service.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.sidebarSection}>
              <h3 className={styles.sectionTitle}>OUTPUT</h3>
              <div className={styles.serviceList}>
                {OUTPUT_SERVICES.map((service) => (
                  <div
                    key={service.id}
                    className={`${styles.serviceItem} ${selectedService === service.id ? styles.active : ""}`}
                    onClick={() => setSelectedService(service.id)}
                  >
                    <div className={styles.serviceIcon}>
                      <service.icon />
                    </div>
                    <span className={styles.serviceName}>{service.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.mainContent}>{renderContent()}</div>
        </div>
        <div className={styles.footer}>
          <button className={styles.cancelButton}>Cancel</button>
          <button className={styles.primaryButton}>Añadir</button>
          <button className={styles.primaryButton}>Guardar</button>
        </div>
      </div>
    </div>
  );
}

export default AutomationModal;
