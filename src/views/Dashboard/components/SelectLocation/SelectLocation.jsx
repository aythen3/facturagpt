import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./SelectLocation.module.css";
import closeGray from "../../assets/closeGray.svg";
import folderIcon from "../../assets/S3/folderIcon.svg";
import curvedLine from "../../assets/S3/curvedLine.svg";
import CustomCheckboxWithLabel from "../CustomCheckboxWithLabel/CustomCheckboxWithLabel";
import CreateFolderModal from "../CreateFolderModal/CreateFolderModal";
import blackChevron from "../../assets/blackChevron.svg";
import HeaderCard from "../HeaderCard/HeaderCard";
import Button from "../Button/Button";
const SelectLocation = ({ onClose, pickLocation = () => {} }) => {
  const { user } = useSelector((state) => state.user);
  const { userFiles } = useSelector((state) => state.scaleway);
  const [isClosing, setIsClosing] = useState(false);
  const [expandedPaths, setExpandedPaths] = useState(new Set());
  const [selectedLocation, setSelectedLocation] = useState(user?.id + "/");
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);

  const buildFolderStructure = (files) => {
    const root = {};
    files.forEach((file) => {
      const parts = file.Key.split("/").filter(Boolean);
      let current = root;
      parts.forEach((part, index) => {
        if (!current[part]) {
          current[part] = { __files: [], __folders: {} };
        }
        if (index === parts.length - 1 && !file.Key.endsWith("/")) {
          current[part].__files.push(file);
        }
        current = current[part].__folders;
      });
    });
    return root;
  };

  const folderStructure = buildFolderStructure(
    userFiles.filter((file) => file.Key.endsWith("/"))
  );

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const toggleFolder = (path) => {
    // console.log("toggling folder", path);
    setExpandedPaths((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(path)) {
        newSet.delete(path);
      } else {
        newSet.add(path);
      }
      return newSet;
    });
  };

  const renderFolders = (folders, path = "", depth = 0) => {
    return Object.keys(folders).map((folderName) => {
      const currentPath = `${path}${folderName}/`;
      const isExpanded = expandedPaths.has(currentPath);
      const subFolders = folders[folderName].__folders;
      const hasMultipleSubFolders = Object.keys(subFolders).length > 1;
      return (
        <div
          key={currentPath}
          className={`${styles.folderItem} ${isExpanded ? styles.expanded : ""}`}
        >
          <div
            style={{
              backgroundColor:
                currentPath === `${user?.id}/` ? "#F4F4F4" : "#fff",
            }}
            className={styles.folderInnerContainer}
            onClick={() => {
              toggleFolder(currentPath);
              console.log(`currentPath ${currentPath}`);
            }}
          >
            {subFolders &&
              currentPath !== `${user?.id}/` &&
              Object.keys(subFolders).length > 0 && (
                <img
                  style={{
                    transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease-in-out",
                  }}
                  className={styles.chevron}
                  src={blackChevron}
                  alt="Open Folder"
                />
              )}
            <CustomCheckboxWithLabel
              checked={selectedLocation === currentPath}
              onChange={(e) => {
                e.stopPropagation();
                setSelectedLocation((prev) =>
                  prev === currentPath && currentPath !== user?.id + "/"
                    ? `${user?.id}/`
                    : currentPath
                );
              }}
            />
            <div
              style={{
                marginLeft: depth * 40,
              }}
              className={styles.folderHeader}
            >
              {depth > 0 && (
                <img
                  className={styles.curvedLine}
                  src={curvedLine}
                  alt="Curved Line"
                />
              )}
              <img src={folderIcon} alt="Folder Icon" />
              <span>
                {folderName === `${user?.id}` ? "/Inicio" : `/${folderName}`}
              </span>
            </div>
          </div>
          {isExpanded && (
            <div className={styles.subFolders}>
              {hasMultipleSubFolders && (
                <div
                  style={{
                    left: depth * 40 + 58,
                  }}
                  className={styles.verticalLine}
                />
              )}
              {renderFolders(
                folders[folderName].__folders,
                currentPath,
                depth + 1
              )}
            </div>
          )}
        </div>
      );
    });
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
        {/* <div className={styles.headerContainer}>
          <div className={styles.headerLeft}>
            <h2>Seleccionar Ubicación</h2>
          </div>
          <div onClick={handleClose} className={styles.closeIcon}>
            <img src={closeGray} alt="closeGray" />
          </div>
        </div> */}
        <HeaderCard title={"Seleccionar Ubicación"}>
          <Button type="white" action={handleClose}>
            Cancelar
          </Button>
          <Button>Guardar</Button>
        </HeaderCard>
        {/* Content */}
        <div className={styles.contentContainer}>
          <div className={styles.content}>
            <div
              onClick={() => {
                console.log("Creating new folder on", selectedLocation);
                setShowCreateFolderModal(true);
              }}
              className={styles.newFolderButton}
            >
              Nueva Carpeta
            </div>
            {renderFolders(folderStructure)}
          </div>
        </div>
        {/* Buttons */}
        {/* <div className={styles.footerContainer}>
          <div
            onClick={() => {
              console.log("Creating new folder on", selectedLocation);
              setShowCreateFolderModal(true);
            }}
            className={styles.newFolderButton}
          >
            Nueva Carpeta
          </div>
          <div
            onClick={() => {
              pickLocation(
                `/${selectedLocation.replace(`${user.id}`, "Inicio")}`
              );
              handleClose();
            }}
            className={styles.selectButton}
          >
            Seleccionar
          </div>
        </div> */}
      </div>
      {showCreateFolderModal && (
        <CreateFolderModal
          onClose={() => setShowCreateFolderModal(false)}
          location={selectedLocation}
        />
      )}
    </div>
  );
};

export default SelectLocation;
