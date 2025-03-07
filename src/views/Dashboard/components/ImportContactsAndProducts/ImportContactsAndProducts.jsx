import React, { useRef, useState } from "react";
import styles from "./ImportContactsAndProducts.module.css";
import { ReactComponent as DownloadIcon } from "../../assets/uploadIconGreen.svg";
import HeaderCard from "../HeaderCard/HeaderCard";
import Button from "../Button/Button";
const ImportContactsAndProducts = ({ state, text, isAnimating, quantity }) => {
  const fileInputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const [uploadedFile, setUploadedFile] = useState(null);

  const handleButtonClick = () => {
    if (uploadedFile) {
      setUploadedFile(null); // Cancelar subida
    } else {
      fileInputRef.current.click(); // Subir archivo
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validExtension =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

      if (file.type !== validExtension) {
        alert("Por favor, selecciona un archivo con extensión .xlsx");
        event.target.value = ""; // Resetea el input para evitar que suba archivos inválidos
        return;
      }
      setUploadedFile(file);
      console.log("Archivo seleccionado:", file.name);
      // Aquí puedes manejar la subida del archivo
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };
  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);

    const file = event.dataTransfer.files[0];
    if (file) {
      const validExtension =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

      if (file.type !== validExtension) {
        alert("Por favor, arrastra un archivo con extensión .xlsx");
        return;
      }
      setUploadedFile(file);
      console.log("Archivo arrastrado:", file.name);
      // Aquí puedes manejar la subida del archivo
    }
  };

  const getFilePath = (text) => {
    switch (text) {
      case "productos":
      // return require("../../assets/Plantillas/TemplateProductos.xlsx");
      case "contactos":
      // return require("../../assets/Plantillas/TemplateContactos.xlsx");
      default:
        return null;
    }
  };

  const filePath = getFilePath(text);

  const handleDownload = () => {
    if (filePath) {
      const link = document.createElement("a");
      link.href = filePath;
      link.download = `muestra-${text}.xlsx`;
      link.click();
    } else {
      alert("No hay archivo de muestra disponible para esta opción.");
    }
  };
  return (
    <div className={styles.overlay}>
      <div className={styles.bg} onClick={() => state(false)}></div>

      <div
        className={`${styles.importContainer}  ${isAnimating ? styles.scaleDown : styles.scaleUp}`}
      >
        <HeaderCard title={`Importar ${text}`} setState={state}>
          <Button type="white" action={() => setShowDiscardChange(true)}>
            Cancel
          </Button>
          {uploadedFile ? (
            <Button>Importar</Button>
          ) : (
            <Button>Exportar ({quantity})</Button>
          )}
        </HeaderCard>

        <div className={styles.importContent}>
          <div className={styles.dropZoneContainer}>
            <div
              className={`${styles.dropZone} ${dragging ? styles.dragging : ""}`}
              onClick={handleButtonClick}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <DownloadIcon />
              <button
                type="button"
                className={styles.uploadButton}
                // onClick={handleButtonClick}
              >
                {uploadedFile ? "Cancelar" : "Subir archivo"}
              </button>
              <p>
                {uploadedFile
                  ? uploadedFile.name
                  : "Selecciona o arrastra tu archivo"}
              </p>
              <input
                type="file"
                ref={fileInputRef}
                className={styles.hiddenInput}
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <p className={styles.descText} onClick={handleDownload}>
            Descarga una muestra del archivo XLSX para ver el formato de
            importación
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImportContactsAndProducts;
