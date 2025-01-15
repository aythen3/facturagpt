import React, { useState, useRef, useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import styles from "./FileExplorer.module.css";
import folderIcon from "../../assets/S3/folderIcon.svg";
import imageIcon from "../../assets/S3/imageIcon.svg";
import codeIcon from "../../assets/S3/codeIcon.svg";
import fileIcon from "../../assets/S3/fileIcon.svg";
import { Search, MoreVertical } from "lucide-react";
import searchMenuIcon from "../../assets/searchMenuIcon.svg";
import { MutatingDots } from "react-loader-spinner";
import Filter from "./Filters";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPath } from "../../../../slices/scalewaySlices";
import k from "../../assets/k.svg";
import cmd from "../../assets/cmd.svg";
import { uploadFiles } from "../../../../actions/scaleway";
import SelectLocation from "../SelectLocation/SelectLocation";

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

  const options = ["Descargar", "Compartir", "Eliminar"];

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

export default function FileExplorer({ isOpen, setIsOpen }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { currentPath, userFiles, getFilesLoading, uploadingFilesLoading } =
    useSelector((state) => state.scaleway);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activePopup, setActivePopup] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showLocationModal, setShowLocationModal] = useState(false);
  const optionsButtonRefs = useRef([]);
  const fileExplorerRef = useRef(null);

  const handleOptionsClick = (index, event) => {
    event.stopPropagation();
    setActivePopup(activePopup === index ? null : index);
  };

  useEffect(() => {
    if (user && !currentPath) {
      dispatch(setCurrentPath(user.id + "/"));
    }
  }, [user]);

  const getFileIcon = (key) => {
    if (key.endsWith("/")) {
      return folderIcon;
    }

    const extension = key.split(".").pop().toLowerCase();

    if (["png", "jpg", "jpeg", "gif"].includes(extension)) {
      return imageIcon;
    }

    if (["js", "html", "css", "json", "java"].includes(extension)) {
      return codeIcon;
    }

    return fileIcon;
  };

  const renderBreadcrumbs = () => {
    if (!currentPath) return null;

    const pathSegments = currentPath.split("/").filter(Boolean);

    const breadcrumbs = [
      <span key="inicio" className={styles.breadcrumb}>
        <div
          onClick={() => handleBreadcrumbClick(`${user.id}/`)}
          className={styles.breadcrumbButton}
        >
          Inicio
        </div>
        {pathSegments.length > 0 && (
          <span className={styles.breadcrumbSeparator}> {`>`} </span>
        )}
      </span>,
    ];

    let accumulatedPath = `${user.id}/`;

    pathSegments.forEach((segment, index) => {
      accumulatedPath += `${segment}/`;
      if (segment === user.id) {
        return;
      }
      breadcrumbs.push(
        <span key={accumulatedPath} className={styles.breadcrumb}>
          <div
            onClick={() => handleBreadcrumbClick(accumulatedPath)}
            className={styles.breadcrumbButton}
          >
            {segment}
          </div>
          {index < pathSegments.length - 1 && (
            <span className={styles.breadcrumbSeparator}> {`>`} </span>
          )}
        </span>
      );
    });

    return <div className={styles.breadcrumbs}>{breadcrumbs}</div>;
  };

  const handleBreadcrumbClick = (path) => {
    console.log("clicking on breadcrumb", path);
    dispatch(setCurrentPath(path));
  };

  useEffect(() => {
    console.log("userFiles CHANGED", userFiles);
  }, [userFiles]);

  const filteredFiles = useMemo(() => {
    const lowerSearchTerm = searchTerm.trim().toLowerCase();

    return userFiles.filter((item) => {
      const isFolder = item.Key.endsWith("/");
      const fileName = isFolder
        ? item.Key.split("/").slice(-2, -1)[0]
        : item.Key.split("/").pop();

      const normalizedCurrentPath = currentPath.replace(/\/$/, "");
      const normalizedItemPath = item.Key.replace(/\/$/, "");

      const currentSegments = normalizedCurrentPath.split("/");
      const itemSegments = normalizedItemPath.split("/");

      const isChildOfCurrent =
        itemSegments.slice(0, currentSegments.length).join("/") ===
        currentSegments.join("/");

      const isOneLevelDeeper =
        itemSegments.length === currentSegments.length + 1;

      const isNotSameAsCurrent = normalizedItemPath !== normalizedCurrentPath;

      const nameMatches =
        !lowerSearchTerm || fileName.toLowerCase().includes(lowerSearchTerm);

      return (
        isChildOfCurrent &&
        isOneLevelDeeper &&
        isNotSameAsCurrent &&
        nameMatches
      );
    });
  }, [userFiles, currentPath, searchTerm]);

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    dispatch(uploadFiles({ files, currentPath }));
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div
      className={styles.container}
      ref={fileExplorerRef}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className={styles.searchContainer}>
        <div className={styles.searchInputWrapper}>
          <div className={styles.searchIcon}>
            <Search size={20} />
          </div>
          <input
            type="text"
            placeholder="Buscar"
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div
            onClick={() => setShowLocationModal(true)}
            className={styles.searchIconsWrappers}
          >
            <img src={cmd} alt="cmdIcon" />
          </div>
          <div
            style={{ marginLeft: "5px" }}
            className={styles.searchIconsWrappers}
          >
            <img src={k} alt="kIcon" />
          </div>
        </div>
        <img
          style={{ cursor: "pointer" }}
          onClick={() => setIsFilterOpen(true)}
          src={searchMenuIcon}
          alt="searchMenuIcon"
        />
        <Filter isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
      </div>

      {renderBreadcrumbs()}

      <div className={styles.fileList}>
        {getFilesLoading ? (
          <div className={styles.loaderContainer}>
            <MutatingDots
              visible={true}
              height="100"
              width="100"
              color="#000"
              secondaryColor="#3f3f3f"
              radius="10"
              ariaLabel="mutating-dots-loading"
            />
          </div>
        ) : (
          filteredFiles?.map((item, index) => {
            const isFolder = item.Key.endsWith("/");
            const fileName = isFolder
              ? item.Key.split("/").slice(-2, -1)[0]
              : item.Key.split("/").pop();

            return (
              <div
                onClick={() => {
                  if (isFolder) {
                    console.log("setting current path to", item.Key);
                    dispatch(setCurrentPath(item.Key));
                  }
                }}
                key={index}
                className={styles.fileItem}
              >
                <div className={styles.itemInner}>
                  <img
                    src={getFileIcon(item.Key)}
                    alt="file-icon"
                    className={styles.fileIcon}
                  />
                  <span className={styles.itemText}>{fileName}</span>
                  {!isFolder && (
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
                {activePopup === index && !isFolder && (
                  <FileOptionsPopup
                    onClose={() => setActivePopup(null)}
                    style={{
                      position: "fixed",
                      top:
                        optionsButtonRefs.current[index].getBoundingClientRect()
                          .top + optionsButtonRefs.current[index].offsetHeight,
                      left: optionsButtonRefs.current[
                        index
                      ].getBoundingClientRect().left,
                    }}
                  />
                )}
              </div>
            );
          })
        )}
        {uploadingFilesLoading && (
          <div className={styles.bottomLoaderContainer}>
            <MutatingDots
              visible={true}
              height="100"
              width="100"
              color="#000"
              secondaryColor="#3f3f3f"
              radius="10"
              ariaLabel="mutating-dots-loading"
            />
          </div>
        )}
      </div>
      {showLocationModal && (
        <SelectLocation onClose={() => setShowLocationModal(false)} />
      )}
    </div>
  );
}
