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
import { ReactComponent as HouseContainer } from "../../assets/blackHouse.svg";
import FolderClosed from "../../assets/folderClosed.svg";
import Button from "../Button/Button";

import { useDispatch } from "react-redux";
import { goAutomate } from "@src/actions/automate";

const SelectLocation = ({
  onClose,
  pickLocation = () => {},
  state,
  setSelectedLocationNew,
  showNewFolder = true,
}) => {
  const dispatch = useDispatch();


  const { user } = useSelector((state) => state.user);
  const { userFiles } = useSelector((state) => state.scaleway);
  const [isClosing, setIsClosing] = useState(false);
  const [expandedPaths, setExpandedPaths] = useState(new Set());
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(user?.id + "/");

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
  // Verifica si la ruta está vacía o si es la ruta seleccionada para expandir

  const renderFolders = (folders, path = "", depth = 0) => {
    return Object.keys(folders).map((folderName) => {
      const currentPath = `${path}${folderName}/`;
      const isExpanded = expandedPaths.has(currentPath) || currentPath === "";
      const subFolders = folders[folderName].__folders;
      const hasMultipleSubFolders = Object.keys(subFolders).length > 1;
      // Si currentPath es vacío, siempre aplicar 'expanded'
      const shouldExpand = path === "" || isExpanded;

      return (
        <div
          key={currentPath}
          className={`${styles.folderItem} ${shouldExpand ? styles.expanded : ""}`}
        >
          <div
            style={{
              backgroundColor:
                currentPath === `${user?.id}/` ? "#F4F4F4" : "#fff",
            }}
            className={styles.folderInnerContainer}
            onClick={() => {
              toggleFolder(currentPath);
              // console.log(`currentPath ${currentPath}`);
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
                marginLeft: depth * 40 - 13,
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
              {path == "" ? (
                <HouseContainer />
              ) : isExpanded ? (
                <img src={folderIcon} alt="Folder Icon" />
              ) : (
                <img src={FolderClosed} alt="Folder Icon" />
                // <FolderClosed className={styles.closedFolder} />
              )}

              <span>
                {folderName === `${user?.id}` ? "/Inicio" : `/${folderName}`}
              </span>
            </div>
          </div>
          {(path === "" || isExpanded) && (
            <div className={styles.subFolders}>
              {hasMultipleSubFolders && (
                <div
                  style={{
                    left: depth * 40 + 72,
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

  const handleUploadFile = async () => {
    try {
      // Create file input element
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = '.pdf,.jpg,.jpeg,.png'; 
      
      fileInput.onchange = async (e) => {
        const file = e.target.files[0];
        console.log("file", file)
        if (!file) return;

        console.log('file!!!!!!!!!!!', file)

        // Convert to PNG if needed
        const img = new Image();
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const objectUrl = URL.createObjectURL(file);

        console.log('objectUrl', objectUrl)

        const response = await dispatch(goAutomate({
          userId: user?.id || "randomId",
          file: file,
          // email: user.tokenEmail,
          // password: user.tokenPassword,
          // query: user.emailQueries,
          // tokenGpt: user.tokenGPT,
        }))

        console.log('response', response)

        img.src = objectUrl;
      };

      fileInput.click();
    } catch (error) {
      console.error('Error in handleUploadFile:', error);
    }
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
        <HeaderCard title={"Seleccionar Ubicación"} setState={handleClose}>
          <Button type="white" action={handleClose}>
            Cancelar
          </Button>
          <Button
            action={() => {

              if(1){
                handleUploadFile()
              }

              setSelectedLocationNew(selectedLocation);
              handleClose();
            }}
          >
            Seleccionar
          </Button>
        </HeaderCard>
        {/* Content */}
        <div className={styles.contentContainer}>
          <div className={styles.content}>
            {renderFolders(folderStructure)}
            {showNewFolder && (
              <div
                onClick={() => {
                  console.log("Creating new folder on", selectedLocation);
                  setShowCreateFolderModal(true);
                }}
                className={styles.newFolderButton}
              >
                Nueva Carpeta
              </div>
            )}
          </div>
        </div>
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
