import React, { useState } from "react";
import styles from "./CreateFolderModal.module.css";
import closeGray from "../../assets/closeGray.svg";
import { useSelector, useDispatch } from "react-redux";
import { createFolder } from "../../../../actions/scaleway";

const CreateFolderModal = ({ onClose, location }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { createFolderLoading } = useSelector((state) => state.scaleway);
  const [isClosing, setIsClosing] = useState(false);
  const [folderName, setFolderName] = useState("");

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleCreateFolder = async () => {
    if (folderName === "") return;
    console.log("Creating folder on", `${location}${folderName}`);
    await dispatch(createFolder({ folderPath: `${location}${folderName}` }));
    setFolderName("");
    handleClose();
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        handleClose();
      }}
      className={`${styles.modalOverlay} ${isClosing ? styles.fadeOut : ""}`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`${styles.modalContent} ${isClosing ? styles.scaleDown : ""}`}
      >
        {/* Header */}
        <div className={styles.headerContainer}>
          <div className={styles.headerLeft}>
            <h2>Crear Carpeta</h2>
          </div>
          <div onClick={handleClose} className={styles.closeIcon}>
            <img src={closeGray} alt="closeGray" />
          </div>
        </div>
        {/* Content */}
        <div className={styles.contentContainer}>
          <div className={styles.contentInnerContainer}>
            <span>En el directorio</span>
            <div className={styles.location}>
              {location.replace(user.id, "Inicio")}
            </div>
          </div>
          <div className={styles.contentInnerContainer}>
            <span>Ingresa un nombre para tu carpeta</span>
            <input
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              type="text"
              placeholder="Nombre"
              className={styles.input}
            />
          </div>
        </div>
        {/* Buttons */}
        <div className={styles.footerContainer}>
          <div onClick={handleClose} className={styles.newFolderButton}>
            Cancelar
          </div>
          <div
            onClick={handleCreateFolder}
            className={`${styles.selectButton} ${folderName === "" && styles.disabledButton}`}
          >
            {createFolderLoading ? "Creando..." : "Crear"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFolderModal;
