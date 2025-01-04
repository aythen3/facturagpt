import { MoreVertical } from "lucide-react";
import styles from "./Preview.module.css";

export default function DocumentPreview({ document, companyInfo }) {
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
            <button className={styles.menuButton}>
              <MoreVertical className={styles.menuIcon} />
            </button>
          </div>
        ) : (
          <div className={styles.emptyPreview}>
            <span>Drop your document here</span>
          </div>
        )}
      </div>

      <div className={styles.labelsWrapper}>
        <div className={styles.labelsContainer}>
          <span className={styles.labelDark}>Etiqueta</span>
          <span className={styles.labelBlue}>Etiqueta</span>
          <span className={styles.labelRed}>Etiqueta</span>
          <span className={styles.labelGreen}>Etiqueta</span>
          <span className={styles.labelPurple}>Etiqueta</span>
        </div>
      </div>

      <div className={styles.companyInfo}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.infoIcon}>!</span>
          Información de la empresa
        </h2>

        <div className={styles.formGroup}>
          <label>Email</label>
          <div className={styles.staticInfo}>{companyInfo.email}</div>
        </div>

        <div className={styles.formGroup}>
          <label>Teléfono</label>
          <div className={styles.staticInfo}>{companyInfo.phone}</div>
        </div>

        <div className={styles.formGroup}>
          <label>Sitio Web</label>
          <div className={styles.staticInfo}>{companyInfo.website}</div>
        </div>

        <div className={styles.formGroup}>
          <label>Domicilio Social</label>
          <div className={`${styles.staticInfo} ${styles.addressInfo}`}>
            {companyInfo.address}
          </div>
        </div>
      </div>
    </div>
  );
}
