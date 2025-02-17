import React, { useRef, useState } from "react";
import styles from "./ImportContactsAndProducts.module.css";
import { ReactComponent as DownloadIcon } from "../../assets/uploadIconGreen.svg";
import HeaderCard from "../HeaderCard/HeaderCard";
import Button from "../Button/Button";
const ImportContactsAndProducts = ({ state, text }) => {
  const fileInputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
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
      console.log("Archivo arrastrado:", file.name);
      // Aquí puedes manejar la subida del archivo
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.bg} onClick={() => state(false)}></div>

      <div className={styles.importContainer}>
        <HeaderCard title={`Importar ${text}`} setState={state}>
          <Button type="white" action={() => setShowDiscardChange(true)}>
            Cancel
          </Button>
          <Button>Importar</Button>
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
                onClick={handleButtonClick}
              >
                Subir archivo
              </button>
              <p>Selecciona o arrastra tu archivo</p>
              <input
                type="file"
                ref={fileInputRef}
                className={styles.hiddenInput}
                onChange={handleFileChange}
              />
            </div>
          </div>
          <p className={styles.descText}>
            Descarga una muestra del archivo XLSX para ver el formato de
            importación
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImportContactsAndProducts;
