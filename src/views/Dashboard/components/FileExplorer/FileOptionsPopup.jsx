// src/components/Popups/FileOptionsPopup.js
import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import styles from "./FileExplorer.module.css";

// 🔹 Componente Base Reutilizable
const PopupBase = ({ onClose, style, options, parentRef }) => {
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
  }, [onClose, parentRef]);

  return ReactDOM.createPortal(
    <div ref={popupRef} className={styles.optionsPopup} style={style}>
      {options.map(({ label, onClick }) => (
        <button
          key={label}
          className={styles.optionItem}
          onClick={() => {
            onClick();
            onClose();
          }}
        >
          {label}
        </button>
      ))}
    </div>,
    document.body
  );
};

// 🔹 Componente para Archivos
export const FileOptionsPopup = ({
  onClose,
  style,
  onDownload,
  onShare,
  onDelete,
  parentRef,
}) => {
  const fileOptions = [
    { label: "Descargar", onClick: onDownload },
    { label: "Compartir", onClick: onShare },
    { label: "Eliminar", onClick: onDelete },
  ];

  return (
    <PopupBase
      onClose={onClose}
      style={style}
      options={fileOptions}
      parentRef={parentRef}
    />
  );
};

// 🔹 Componente para Carpetas
export const FolderOptionsPopup = ({
  onClose,
  style,
  onRename,
  action,
  onDelete,
  parentRef,
}) => {
  const folderOptions = [
    { label: "Renombrar", onClick: onRename },
    { label: "Eliminar Carpeta", onClick: onDelete },
    { label: "Añadir Etiqueta", onClick: action },
  ];

  return (
    <PopupBase
      onClose={onClose}
      style={style}
      options={folderOptions}
      parentRef={parentRef}
    />
  );
};
