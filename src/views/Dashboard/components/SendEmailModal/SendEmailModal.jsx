import React, { useEffect, useState } from "react";
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

import { ReactComponent as FolderIcon } from "../../assets/folderIcon.svg";
import { ReactComponent as FileIcon } from "../../assets/fileIcon.svg";
import { ReactComponent as CodeIcon } from "../../assets/codeIcon.svg";
import { ReactComponent as ImageIcon } from "../../assets/imageIcon.svg";
import { ReactComponent as ArrowWhite } from "../../assets/ArrowLeftWhite.svg";

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
        {/* <header className={styles.sendEmailHeader}>
          <Button
            headerStyle={{
              padding: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            action={handleCloseNewClient}
          >
            <ArrowWhite
              style={{
                height: "15px",
                width: "15px",
              }}
            />
          </Button>
          <h2>Send Email</h2>
          <div className={styles.options}>
           
          </div>
        </header> */}
        <div className={styles.sendEmailContent}>
          {/* <HeaderFormsComponent
            placeholder="Añade una cuenta de Dropbox"
            // selectedEmailConnection={configuration.selectedDropboxConnection}
            // setSelectedEmailConnection={(value) =>
            //   handleConfigurationChange("selectedDropboxConnection", value)
            // }
            emailConnections={[
              "ejemplo@gmail.com",
              "ejemplo2@gmail.com",
              "ejemplo3@gmail.com",
            ]}
            action={() => setShowAddConnection(true)}
            icon={<DropboxIcon />}
            headerStyle={{
              flexDirection: "column",
              alignItems: "end",
            }}
          /> */}
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
              <Button type="white">Seleccionar Documento</Button>
            </div>
            {documentoPDF && (
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
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SendEmailModal;
