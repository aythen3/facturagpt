import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import styles from "./FileExplorer.module.css";

const FileOptionsPopup = ({
  onClose,
  style,
  onDownload,
  onShare,
  onDelete,
  parentRef,
}) => {
  const popupRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        popupRef.current &&
        !parentRef?.contains(event.target) &&
        !popupRef.current.contains(event.target)
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const options = ["Descargar", "Compartir", "Eliminar"];

  return ReactDOM.createPortal(
    <div ref={popupRef} className={styles.optionsPopup} style={style}>
      {options.map((option) => (
        <button
          key={option}
          className={styles.optionItem}
          onClick={() => {
            if (option === "Descargar") {
              onDownload();
              onClose();
            } else if (option === "Compartir") {
              onShare();
              onClose();
            } else if (option === "Eliminar") {
              onDelete();
              onClose();
            }
          }}
        >
          {option}
        </button>
      ))}
    </div>,
    document.body
  );
};

export default FileOptionsPopup;
