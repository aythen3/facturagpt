import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./FileExplorer.module.css";
import { ReactComponent as FolderIcon } from "../../assets/folder.svg";
import { ReactComponent as ImageIcon } from "../../assets/image-icon.svg";
import { ReactComponent as PdfIcon } from "../../assets/pdf-ico.svg";
import { ReactComponent as TxtIcon } from "../../assets/txt-icon.svg";
import { ReactComponent as CsvIcon } from "../../assets/csv-icon.svg";
import { ReactComponent as PngIcon } from "../../assets/png-icon.svg";
import { Search, AlignRight, MoreVertical } from "lucide-react";

import Filter from './Filters';

const FileOptionsPopup = ({ onClose, style }) => {
  const popupRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const options = ["Move", "Download", "Share", "Rename", "Delete"];

  return ReactDOM.createPortal(
    <div ref={popupRef} className={styles.optionsPopup} style={style}>
      {options.map((option) => (
        <button key={option} className={styles.optionItem}>
          {option}
        </button>
      ))}
    </div>,
    document.body
  );
};

export default function FileExplorer() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activePopup, setActivePopup] = useState(null);
  const optionsButtonRefs = useRef([]);
  const fileExplorerRef = useRef(null);

  const handleOptionsClick = (index, event) => {
    event.stopPropagation();
    setActivePopup(activePopup === index ? null : index);
  };

  return (
    <div className={styles.container} ref={fileExplorerRef}>
      <div className={styles.searchContainer}>
        <div className={styles.searchInputWrapper}>
          <div className={styles.searchIcon}>
            <Search size={20} />
          </div>
          <input
            type='text'
            placeholder='Buscar'
            className={styles.searchInput}
          />
          <button
            className={styles.menuIcon}
            onClick={() => setIsFilterOpen(true)}
          >
            <AlignRight size={20} />
          </button>
        </div>

        <Filter isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
      </div>

      <div className={styles.folderSection}>
        <div className={styles.folderHeader}>2025{'>'}Q1</div>
        <div className={styles.folderItem}>
          <div className={styles.itemInner}>
            <FolderIcon />
            <span className={styles.itemText}>Facturas</span>
          </div>
        </div>
      </div>

      <div className={styles.fileList}>
        {[
          { icon: ImageIcon, text: ".jpg" },
          { icon: ImageIcon, text: ".jpg" },
          { icon: TxtIcon, text: ".txt" },
          { icon: ImageIcon, text: ".jpg" },
          { icon: PngIcon, text: ".png" },
          { icon: PdfIcon, text: ".pdf" },
          { icon: PngIcon, text: ".png" },
          { icon: CsvIcon, text: ".csv" },
          { icon: PngIcon, text: ".png" },
          { icon: FolderIcon, text: "Recibos", isFolder: true },
          { icon: PdfIcon, text: ".pdf" },
          { icon: PdfIcon, text: ".pdf" },
          { icon: PdfIcon, text: ".pdf" },
        ].map((item, index) => (
          <div
            key={index}
            className={item.isFolder ? styles.folderItem : styles.fileItem}
          >
            <div className={styles.itemInner}>
              <item.icon />
              <span className={styles.itemText}>{item.text}</span>
              {!item.isFolder && (
                <button
                  ref={(el) => (optionsButtonRefs.current[index] = el)}
                  className={styles.moreButton}
                  aria-label="More options"
                  onClick={(e) => handleOptionsClick(index, e)}
                >
                  <MoreVertical size={16} />
                </button>
              )}
            </div>
            {activePopup === index && !item.isFolder && (
              <FileOptionsPopup
                onClose={() => setActivePopup(null)}
                style={{
                  position: "fixed",
                  top:
                    optionsButtonRefs.current[index].getBoundingClientRect()
                      .top + optionsButtonRefs.current[index].offsetHeight,
                  left: optionsButtonRefs.current[index].getBoundingClientRect()
                    .left,
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
