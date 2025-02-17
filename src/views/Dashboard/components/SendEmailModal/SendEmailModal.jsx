import React, { useEffect, useRef, useState } from "react";
import styles from "./SendEmailModal.module.css";
import Toolbar from "../Toolbar/Toolbar";
import pdf from "../../assets/pdfIcon.svg";
import jpg from "../../assets/jpgIcon.svg";
import png from "../../assets/pngIcon.svg";
import txt from "../../assets/txtIcon.svg";
import csv from "../../assets/csvIcon.svg";
import xml from "../../assets/xmlIconNew.svg";
import html from "../../assets/htmlIcon.svg";
import json from "../../assets/jsonIcon.svg";
import adjuntar from "../../assets/share.svg";
import minus from "../../assets/minus.svg";
import closeMenu from "../../assets/closeMenu.svg";

import FolderIcon from "../../assets/folderIcon.svg";
import FileIcon from "../../assets/fileIcon.svg";
import CodeIcon from "../../assets/codeIcon.svg";
import ImageIcon from "../../assets/imageIcon.svg";
import ArrowWhite from "../../assets/ArrowLeftWhite.svg";

import facturaEjemplo from "../../assets/facturaEjemplo.png";
import Button from "../Button/Button";
import HeaderFormsComponent from "../HeadersFormsComponent/HeaderFormsComponent";
import { ReactComponent as DropboxIcon } from "../../assets/dropbox-icon.svg";
import HeaderCard from "../HeaderCard/HeaderCard";
import DeleteButton from "../DeleteButton/DeleteButton";
// let documentoPDF;

// try {
//   documentoPDF = require("../../assets/pdfs/document.pdf");
// } catch (error) {
//   console.warn("El archivo document.pdf no existe:", error.message);
//   documentoPDF = null; // Valor por defecto si no existe el archivo
// }

const SendEmailModal = ({
  mailModal,
  setMailModal,
  isAnimating,
  setIsAnimating,
}) => {
  const [documentoPDF, setDocumentoPDF] = useState(null);

  useEffect(() => {
    try {
      const pdfFile = require("../../assets/pdfs/document.pdf");
      setDocumentoPDF(pdfFile);
    } catch (error) {
      console.warn("El archivo document.pdf no existe:", error.message);
      setDocumentoPDF(null);
    }
  }, []);

  const handleDeletePDF = () => {
    setDocumentoPDF(null);
  };
  const files = [
    {
      img: pdf,
      title: "Titulo del archivo",
      size: "557 kb",
    },
    {
      img: jpg,
      title: "Titulo del archivo",
      size: "557 kb",
    },
    {
      img: png,
      title: "Titulo del archivo",
      size: "557 kb",
    },
    {
      img: txt,
      title: "Titulo del archivo",
      size: "557 kb",
    },
    {
      img: csv,
      title: "Titulo del archivo",
      size: "557 kb",
    },
    {
      img: xml,
      title: "Titulo del archivo",
      size: "557 kb",
    },
    {
      img: html,
      title: "Titulo del archivo",
      size: "557 kb",
    },
    {
      img: json,
      title: "Titulo del archivo",
      size: "557 kb",
    },
  ];

  const handleCloseNewClient = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setMailModal(false);
      setIsAnimating(false);
    }, 300);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && mailModal) {
        handleCloseNewClient();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mailModal]);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null); // Referencia al input de tipo file

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile)); // Genera una URL para el archivo
      setFileName(selectedFile.name); // Guarda el nombre del archivo
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Dispara el clic en el input file
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split(".").pop().toLowerCase();

    switch (extension) {
      case "pdf":
        return FileIcon;
      case "jpg":
      case "jpeg":
      case "png":
        return ImageIcon;
      case "txt":
        return FolderIcon;
      case "csv":
        return FolderIcon;
      case "xml":
        return FolderIcon;
      case "html":
      case "css":
      case "js":
      case "jsx":
      case "json":
        return CodeIcon;
      default:
        return null; // Si no hay coincidencia, no muestra icono
    }
  };
  return (
    <>
      <div className={styles.bg} onClick={handleCloseNewClient}></div>

      <div
        className={`${styles.sendEmailModal} ${isAnimating ? styles.scaleDown : styles.scaleUp}`}
      >
        <HeaderCard
          title={"Send Email"}
          setState={handleCloseNewClient}
          headerStyle={{
            position: "sticky",
            top: "0",
            // background: "white",
            zIndex: "999",
          }}
        >
          <Button action={handleCloseNewClient} type="white">
            Cancelar
          </Button>
          <Button>Enviar</Button>
          <Button>Aceptar</Button>
        </HeaderCard>

        <div className={styles.sendEmailContent}>
          <div className={styles.infOptions}>
            <input type="text" placeholder="Para: [email], ..." />
            <input type="text" placeholder="Asunto: [document_title]" />
            <Toolbar />
          </div>
        </div>
        <div className={styles.addFileEmail}>
          <div className={styles.attach}>
            <img src={adjuntar} />
          </div>
          <div className={styles.file}>
            <div className={styles.addFileRow}>
              <div style={{ color: "#1F184B" }}>Añadir Adjunto</div>
              <Button type="white" action={handleButtonClick}>
                Seleccionar Documento
              </Button>
            </div>
            <div>
              <div className={styles.fileIcon}>
                {file && (
                  <img
                    src={getFileIcon(fileName)}
                    alt="Icon"
                    className={styles.icon}
                  />
                )}
                <p className={styles.titleFile}>{fileName}</p>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }} // Ocultamos el input
                onChange={handleFileChange}
              />
              {file && (
                <div>
                  {["jpg", "jpeg", "png"].includes(
                    fileName.split(".").pop().toLowerCase()
                  ) ? (
                    <img
                      src={file}
                      alt="Vista previa de la imagen"
                      width="500"
                    />
                  ) : (
                    <embed
                      src={`${file}#zoom=50&toolbar=0`}
                      width="500"
                      height="500"
                      type="application/pdf"
                    />
                  )}
                </div>
              )}
            </div>
            {/* {documentoPDF && (
              <>
                <div className={styles.addFileRow}>
                  <div className={styles.fileIcon}>
                    <FolderIcon className={styles.icon} />
                    <FileIcon className={styles.icon} />
                    <CodeIcon className={styles.icon} />
                    <ImageIcon className={styles.icon} />
                    <p className={styles.titleFile}>Titulo del archivo</p>
                  </div>
                  <span className={styles.weight}>
                    557 KB
                    <DeleteButton action={handleDeletePDF} />
                  </span>
                </div>
                <div>
                  <embed
                    src={`${documentoPDF}#zoom=35`}
                    type=""
                    height={"400px"}
                  />
                </div>
              </>
            )} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default SendEmailModal;
