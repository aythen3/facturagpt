import styles from "./FileExplorer.module.css";
import { ReactComponent as FolderIcon } from "../../assets/folder.svg";
import { ReactComponent as ImageIcon } from "../../assets/image-icon.svg";
import { ReactComponent as PdfIcon } from "../../assets/pdf-ico.svg";
import { ReactComponent as TxtIcon } from "../../assets/txt-icon.svg";
import { ReactComponent as CsvIcon } from "../../assets/csv-icon.svg";
import { ReactComponent as PngIcon } from "../../assets/png-icon.svg";
import { Search, AlignRight } from "lucide-react";

export default function FileExplorer() {
  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <div className={styles.searchInputWrapper}>
          <div className={styles.searchIcon}>
            <Search size={20} />
          </div>
          <input
            type="text"
            placeholder="Buscar"
            className={styles.searchInput}
          />
          <button className={styles.menuIcon}>
            <AlignRight size={20} />
          </button>
        </div>
      </div>

      <div className={styles.folderSection}>
        <div className={styles.folderHeader}>2025{">"}Q1</div>
        <div className={styles.folderItem}>
          <div className={styles.itemContent}>
            <FolderIcon />
            <span className={styles.itemText}>Facturas</span>
          </div>
        </div>
      </div>

      <div className={styles.fileList}>
        <div className={styles.fileItem}>
          <div className={styles.itemContent}>
            <ImageIcon />
            <span className={styles.itemText}>.jpg</span>
          </div>
          {/* Toggle switch will be inserted here */}
        </div>
        <div className={styles.fileItem}>
          <div className={styles.itemContent}>
            <ImageIcon />
            <span className={styles.itemText}>.jpg</span>
          </div>
          {/* Toggle switch will be inserted here */}
        </div>
        <div className={styles.fileItem}>
          <div className={styles.itemContent}>
            <TxtIcon />
            <span className={styles.itemText}>.txt</span>
          </div>
          {/* Toggle switch will be inserted here */}
        </div>
        <div className={styles.fileItem}>
          <div className={styles.itemContent}>
            <ImageIcon />
            <span className={styles.itemText}>.jpg</span>
          </div>
          {/* Toggle switch will be inserted here */}
        </div>
        <div className={styles.fileItem}>
          <div className={styles.itemContent}>
            <PngIcon />
            <span className={styles.itemText}>.png</span>
          </div>
          {/* Toggle switch will be inserted here */}
        </div>
        <div className={styles.fileItem}>
          <div className={styles.itemContent}>
            {/* File icon will be inserted here */}
            <PdfIcon />
            <span className={styles.itemText}>.pdf</span>
          </div>
          <button className={styles.moreButton}>
            {/* More icon will be inserted here */}
          </button>
        </div>
        <div className={styles.fileItem}>
          <div className={styles.itemContent}>
            <PngIcon />
            <span className={styles.itemText}>.png</span>
          </div>
          {/* Toggle switch will be inserted here */}
        </div>
        <div className={styles.fileItem}>
          <div className={styles.itemContent}>
            <CsvIcon />
            <span className={styles.itemText}>.csv</span>
          </div>
          {/* Toggle switch will be inserted here */}
        </div>
        <div className={styles.fileItem}>
          <div className={styles.itemContent}>
            <PngIcon />
            <span className={styles.itemText}>.png</span>
          </div>
          {/* Toggle switch will be inserted here */}
        </div>
        <div className={styles.folderItem}>
          <div className={styles.itemContent}>
            <FolderIcon />
            <span className={styles.itemText}>Recibos</span>
          </div>
        </div>
        <div className={styles.fileItem}>
          <div className={styles.itemContent}>
            {/* File icon will be inserted here */}
            <PdfIcon />
            <span className={styles.itemText}>.pdf</span>
          </div>
          <button className={styles.moreButton}>
            {/* More icon will be inserted here */}
          </button>
        </div>
        <div className={styles.fileItem}>
          <div className={styles.itemContent}>
            {/* File icon will be inserted here */}
            <PdfIcon />
            <span className={styles.itemText}>.pdf</span>
          </div>
          <button className={styles.moreButton}>
            {/* More icon will be inserted here */}
          </button>
        </div>
        <div className={styles.fileItem}>
          <div className={styles.itemContent}>
            {/* File icon will be inserted here */}
            <PdfIcon />
            <span className={styles.itemText}>.pdf</span>
          </div>
          <button className={styles.moreButton}>
            {/* More icon will be inserted here */}
          </button>
        </div>
      </div>
    </div>
  );
}
