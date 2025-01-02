import { Search } from "lucide-react";
import styles from "./FolderForm.module.css";

export default function FolderForm() {
  return (
    <div className={styles.container}>
      <div>
        <label htmlFor="folder-name" className={styles.label}>
          Nombre de la Carpeta
        </label>
        <div className={styles.inputContainer}>
          <input
            id="folder-name"
            type="text"
            placeholder="New Folder"
            className={styles.input}
          />
        </div>
      </div>

      <div>
        <label htmlFor="location" className={styles.label}>
          Location
        </label>
        <div className={styles.inputContainer}>
          <div className={styles.inputWrapper}>
            <Search className={styles.icon} />
            <input
              id="location"
              type="text"
              placeholder="/home"
              className={styles.input}
            />
          </div>
          <button className={styles.button}>Seleccionar Ubicación</button>
        </div>
      </div>
    </div>
  );
}
