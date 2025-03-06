import React, { useState, useRef, useEffect, useMemo } from "react";
import styles from "./FileExplorer.module.css";
import folderIcon from "../../assets/folderClosed.svg";
import imageIcon from "../../assets/S3/imageIcon.svg";
import codeIcon from "../../assets/S3/codeIcon.svg";
import fileIcon from "../../assets/S3/fileIcon.svg";
import { Search } from "lucide-react";
import horizontalDots from "../../assets/S3/horizontalDots.svg";
import filterIcon from "../../assets/S3/filterIconBars.svg";
import filterIconGreen from "../../assets/filtersIconBarGreen.svg";
import { ReactComponent as Plusgreen } from "../../assets/plusIconGreen2.svg";
import { MutatingDots } from "react-loader-spinner";
import Filter from "./Filters";
import { ReactComponent as HouseContainer } from "../../assets/HouseContainerIcon.svg";
import { ReactComponent as ArrowRightText } from "../../assets/arrowRightText.svg";
import menuIcon from "../../assets/menuIconBlack.svg"; // Ícono de menú
import ImageEmpty from "../../assets/ImageEmpty.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentPath,
  setUserFiles,
} from "../../../../slices/scalewaySlices";
import l from "../../assets/lIcon.svg";
import cmd from "../../assets/cmd.svg";
import {
  deleteObject,
  moveObject,
  uploadFiles,
} from "../../../../actions/scaleway";
import SelectLocation from "../SelectLocation/SelectLocation";
import { FileOptionsPopup, FolderOptionsPopup } from "./FileOptionsPopup";
import { FaUpload } from "react-icons/fa";

import FilesFilterModal from "../FilesFilterModal/FilesFilterModal";
import SearchIconWithIcon from "../SearchIconWithIcon/SearchIconWithIcon";
import SelectCurrencyPopup from "../SelectCurrencyPopup/SelectCurrencyPopup";
import useFocusShortcut from "../../../../utils/useFocusShortcut";
import GetPlusButton from "../GetPlusButton/GetPlusButton";
import useSwipe from "../../../../utils/useSwipe";
export default function FileExplorer({
  isOpen,
  setIsOpen,
  toggleMenu,
  setMobileSelectedDocument,
  mobileSelectedDocument,
  pagePath,
  setSwiped,
  swiped,
}) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { currentPath, userFiles, getFilesLoading, uploadingFilesLoading } =
    useSelector((state) => state.scaleway);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activePopup, setActivePopup] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [userFilters, setUserFilters] = useState(null);
  const optionsButtonRefs = useRef([]);
  const fileExplorerRef = useRef(null);
  const breadCrumbsRef = useRef(null);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [symbolSelected, setSymbolSelected] = useState("$");
  const [showSelectCurrencyPopup, setShowSelectCurrencyPopup] = useState(false);
  const handleMouseDown = (e) => {
    const element = breadCrumbsRef.current;
    element.isDragging = true;
    element.startX = e.pageX - element.offsetLeft;
    element.scrollLeft = element.scrollLeft;
  };

  const handleMouseMove = (e) => {
    const element = breadCrumbsRef.current;
    if (!element.isDragging) return;
    const x = e.pageX - element.offsetLeft;
    const walk = (x - element.startX) * 0.05;
    element.scrollLeft = element.scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    const element = breadCrumbsRef.current;
    element.isDragging = false;
  };

  // ============================================ DRAG / DROP =========================================================
  const [draggedItem, setDraggedItem] = useState(null);
  const [dropTarget, setDropTarget] = useState(null);

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, item) => {
    e.preventDefault();
    setDropTarget(item);
  };

  function moveSingleFileLocally(userFiles, sourceKey, destinationKey) {
    const fileName = sourceKey.split("/").pop();
    const newKey = `${destinationKey}${fileName}`;

    const updated = userFiles.map((item) => {
      if (item.Key === sourceKey) {
        return { ...item, Key: newKey };
      }
      return item;
    });
    return updated;
  }

  function moveFolderLocally(userFiles, sourceKey, destinationKey) {
    if (!sourceKey.endsWith("/")) {
      sourceKey += "/";
    }
    if (!destinationKey.endsWith("/")) {
      destinationKey += "/";
    }

    const folderSegments = sourceKey.split("/").filter(Boolean);
    const folderName = folderSegments[folderSegments.length - 1];
    const targetFolderKey = `${destinationKey}${folderName}/`;

    const updated = userFiles.map((item) => {
      if (item.Key.startsWith(sourceKey)) {
        if (item.Key === sourceKey) {
          return { ...item, Key: targetFolderKey };
        }

        const relativePath = item.Key.slice(sourceKey.length);
        const newKey = `${targetFolderKey}${relativePath}`;
        return { ...item, Key: newKey };
      }
      return item;
    });

    const final = updated.filter((item) => item.Key !== sourceKey);

    return final;
  }

  const dispatchLocalMove = (sourceKey, destinationKey, isFolder) => {
    let updatedFiles;

    if (!isFolder) {
      updatedFiles = moveSingleFileLocally(
        userFiles,
        sourceKey,
        destinationKey
      );
    } else {
      updatedFiles = moveFolderLocally(userFiles, sourceKey, destinationKey);
    }

    dispatch(setUserFiles(updatedFiles));
  };

  const handleDrop = (e, targetItem) => {
    e.preventDefault();
    if (!targetItem.Key.endsWith("/")) {
      console.log("Dropped on a file, no action taken.");
      setDraggedItem(null);
      setDropTarget(null);
      return;
    }

    const destinationKey = targetItem.Key;
    const sourceKey = draggedItem.Key;
    const isFolder = sourceKey.endsWith("/");

    console.log("Dropping item onto folder:", destinationKey);
    console.log("Moving", isFolder ? "folder" : "file", draggedItem);

    dispatchLocalMove(sourceKey, destinationKey, isFolder);

    dispatch(
      moveObject({
        sourceKey,
        destinationKey,
        isFolder,
      })
    );

    setDraggedItem(null);
    setDropTarget(null);
  };

  const handleDragEnd = (e) => {
    setDraggedItem(null);
    setDropTarget(null);
  };

  // ==================================================================================================================

  const handleOptionsClick = (index, event) => {
    console.log("index", index);
    event.stopPropagation();
    if (activePopup !== index) {
      setActivePopup(index);
      return;
    }
    setActivePopup(null);
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

    if (["png", "jpg", "svg", "jpeg", "gif"].includes(extension)) {
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

    if (pathSegments.length && pathSegments[0] === user.id) {
      pathSegments.shift();
    }

    const breadcrumbs = [
      <span key="inicio" className={styles.breadcrumb}>
        {/* <div
          onClick={() => {
            setUserFilters();
            handleBreadcrumbClick(`${user.id}/`);
          }}
          className={styles.breadcrumbButton}
        >
          Inicio
        </div> */}
        {pathSegments.length > 0 && (
          <span className={styles.breadcrumbSeparator}>
            {" "}
            <ArrowRightText />{" "}
          </span>
        )}
      </span>,
    ];

    pathSegments.forEach((segment, index) => {
      const partialSegments = pathSegments.slice(0, index + 1);
      const partialPath = `${user.id}/${partialSegments.join("/")}/`;

      breadcrumbs.push(
        <span key={partialPath} className={styles.breadcrumb}>
          <div
            onClick={() => handleBreadcrumbClick(partialPath)}
            className={`${index == pathSegments.length - 1 && styles.finalBreadcrumbButton} ${styles.breadcrumbButton}`}
          >
            {segment}
          </div>
          {index < pathSegments.length - 1 && (
            <span className={styles.breadcrumbSeparator}>
              {" "}
              <ArrowRightText />{" "}
            </span>
          )}
        </span>
      );
    });

    return (
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUpOrLeave}
        onMouseUp={handleMouseUpOrLeave}
        ref={breadCrumbsRef}
        className={styles.breadcrumbs}
      >
        {breadcrumbs}
      </div>
    );
  };

  const handleBreadcrumbClick = (path) => {
    console.log("clicking on breadcrumb", path);
    dispatch(setCurrentPath(path));
  };

  useEffect(() => {
    console.log("userFiles CHANGED", userFiles);
  }, [userFiles]);
  const filteredFiles = useMemo(() => {
    if (!userFiles) return [];

    if (!userFilters) {
      const lowerSearchTerm = searchTerm.trim().toLowerCase();

      const result = userFiles.filter((item) => {
        const isFolder = item.Key.endsWith("/");
        const fileName = isFolder
          ? item.Key.split("/").slice(-2, -1)[0]
          : item.Key.split("/").pop();

        const normalizedCurrentPath = currentPath?.replace(/\/$/, "");
        const normalizedItemPath = item?.Key?.replace(/\/$/, "");

        const currentSegments = normalizedCurrentPath?.split("/");
        const itemSegments = normalizedItemPath?.split("/");

        const isChildOfCurrent =
          itemSegments?.slice(0, currentSegments?.length).join("/") ===
          currentSegments?.join("/");

        const isOneLevelDeeper =
          itemSegments?.length === currentSegments?.length + 1;

        const isNotSameAsCurrent = normalizedItemPath !== normalizedCurrentPath;

        const nameMatches =
          !lowerSearchTerm || fileName?.toLowerCase().includes(lowerSearchTerm);

        return (
          isChildOfCurrent &&
          isOneLevelDeeper &&
          isNotSameAsCurrent &&
          nameMatches
        );
      });

      //  Ordenar carpetas primero
      result.sort((a, b) => {
        const isFolderA = a.Key.endsWith("/");
        const isFolderB = b.Key.endsWith("/");
        if (isFolderA && !isFolderB) return -1; //  (Carpeta antes que archivo)
        if (!isFolderA && isFolderB) return 1; //  (Archivo después de carpeta)
        return 0; // (Sin cambio si ambos son iguales)
      });

      return result;
    }

    const {
      keyWord = "",
      selectedCategory,
      allFiles = false,
      selectedTypes = [],
      selectedTags = [],
    } = userFilters;

    const lowerKeyWord = keyWord.toLowerCase().trim();
    const lowerSearchTerm = searchTerm.trim().toLowerCase();

    let baseFiltered = userFiles.filter((item) => {
      const isFolder = item.Key.endsWith("/");
      const fileName = isFolder
        ? item.Key.split("/").slice(-2, -1)[0]
        : item.Key.split("/").pop();

      if (!lowerSearchTerm) {
        return true;
      } else {
        return fileName.toLowerCase().includes(lowerSearchTerm);
      }
    });

    const finalFiltered = baseFiltered.filter((item) => {
      const isFolder = item.Key.endsWith("/");
      const fileName = isFolder
        ? item.Key.split("/").slice(-2, -1)[0]
        : item.Key.split("/").pop();

      if (lowerKeyWord) {
        if (!fileName.toLowerCase().includes(lowerKeyWord)) {
          return false;
        }
      }

      // (B) Tag filtering — e.g., if item.tags is an array
      if (selectedTags.length > 0) {
        const hasAtLeastOneTag = selectedTags.some((tag) =>
          fileName.toLowerCase().includes(tag.toLowerCase())
        );
        if (!hasAtLeastOneTag) {
          return false;
        }
      }

      // (C) If allFiles is true, skip category & type checks
      if (allFiles) {
        return true;
      }

      // (D) Category-based logic
      if (selectedCategory === "Imagenes") {
        const extension = fileName.split(".").pop()?.toLowerCase() || "";
        const imageExtensions = ["png", "jpg", "jpeg", "svg", "gif"];
        if (!imageExtensions.includes(extension)) {
          return false;
        }
      } else if (selectedCategory === "Documentos") {
        const extension = fileName.split(".").pop()?.toLowerCase() || "";
        const docExtensions = ["pdf", "doc", "docx", "xlsx"];
        if (!docExtensions.includes(extension)) {
          return false;
        }
      }
      // ... other categories if needed

      // (E) File type check (e.g. "PNG", "JPEG")
      if (selectedTypes.length > 0) {
        const extension = fileName.split(".").pop()?.toLowerCase();
        const extensionMap = {
          PDF: ["pdf"],
          DOC: ["doc", "docx"],
          XLS: ["xlsx"],
          JPEG: ["jpeg", "jpg"],
          PNG: ["png"],
          SVG: ["svg"],
          GIF: ["gif"],
        };
        let matchesType = false;
        for (const t of selectedTypes) {
          const exts = extensionMap[t] || [];
          if (exts.includes(extension)) {
            matchesType = true;
            break;
          }
        }
        if (!matchesType) {
          return false;
        }
      }

      return true;
    });

    //  Ordenar carpetas primero
    finalFiltered.sort((a, b) => {
      const isFolderA = a.Key.endsWith("/");
      const isFolderB = b.Key.endsWith("/");
      if (isFolderA && !isFolderB) return -1; //  (Carpeta antes que archivo)
      if (!isFolderA && isFolderB) return 1; //  (Archivo después de carpeta)
      return 0; //  (Sin cambio si ambos son iguales)
    });

    return finalFiltered;
  }, [userFiles, currentPath, searchTerm, userFilters]);

  const handleDropFiles = (event) => {
    if (!draggedItem) {
      event.preventDefault();
      const files = Array.from(event.dataTransfer.files);
      dispatch(uploadFiles({ files, currentPath }));
    }
  };
  const [dragingOverContainer, setDragingOverContainer] = useState(false);
  const handleContainerDragOver = (event) => {
    event.preventDefault();
    setDragingOverContainer(true);
  };

  const handleDownload = (item) => {
    const location = `https://s3.fr-par.scw.cloud/factura-gpt/${item.Key}`;
    const link = document.createElement("a");
    link.href = location;
    link.target = "_blank";
    link.download = item.Key.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = (item) => {
    console.log("Deleting item:", item);

    const oldUserFiles = userFiles;
    const newUserFiles = removeItemLocally(oldUserFiles, item);

    dispatch(setUserFiles(newUserFiles));

    dispatch(deleteObject({ key: item.Key, isFolder: item.Key.endsWith("/") }))
      .unwrap()
      .catch((error) => {
        console.error("Delete failed, reverting local change:", error);
        dispatch(setUserFiles(oldUserFiles));
      });
  };

  function removeItemLocally(userFiles, item) {
    console.log("userFiles, item", userFiles, item);

    const isFolder = item.Key.endsWith("/");
    const sourceKey = item.Key;

    if (!isFolder) {
      return userFiles.filter((f) => f.Key !== sourceKey);
    } else {
      let folderKey = sourceKey;
      if (!folderKey.endsWith("/")) {
        folderKey += "/";
      }
      return userFiles.filter((f) => !f.Key.startsWith(folderKey));
    }
  }

  const handleShare = (item) => {
    console.log("Sharing item:", item);
    const fileUrl = item.Location;

    if (navigator.share) {
      navigator
        .share({
          title: "Check out this file",
          text: "Have a look at this file",
          url: fileUrl,
        })
        .catch((err) => {
          console.error("Error sharing:", err);
        });
    } else {
      navigator.clipboard.writeText(fileUrl).then(
        () => {
          alert("Link copied to clipboard!");
        },
        (err) => {
          console.error("Failed to copy link:", err);
        }
      );
    }
  };
  const handleApplyFilters = (filters) => {
    console.log("Applying filters:", filters);
    setUserFilters(filters);
    console.log(userFilters);
    // console.log(!!userFilters && Object.keys(userFilters).length > 0);
    // console.log(userFilters.keyWord !== "");
  };

  // ---------------------------------------------------

  const searchInputRef = useRef(null);

  // Add this useEffect to handle the keyboard shortcut
  // useEffect(() => {
  //   const handleKeyDown = (e) => {
  //     if (e.shiftKey && e.key === "/") {
  //       e.preventDefault();
  //       searchInputRef.current?.focus();
  //     }
  //   };

  //   document.addEventListener("keydown", handleKeyDown);
  //   return () => document.removeEventListener("keydown", handleKeyDown);
  // }, []);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Actualizar el ancho de la ventana cuando se cambie el tamaño de la pantalla
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Limpiar el evento cuando el componente se desmonta
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobile = windowWidth <= 768; // Usar el ancho de la ventana actualizado
  // Manejador para ocultar el menú

  // Llama a la función y pasa la referencia
  useFocusShortcut(searchInputRef, "/");

  useEffect(() => {
    console.log(userFilters);
  }, [userFilters]);
  const hasActiveFilters =
    userFilters &&
    (userFilters.keyWord !== "" ||
      userFilters.maxValue !== "" ||
      userFilters.minValue !== "" ||
      userFilters.selectedCategory !== "" ||
      userFilters.selectedCurrency !== "" ||
      (userFilters.selectedTags && userFilters.selectedTags.length > 0) ||
      (userFilters.selectedTypes && userFilters.selectedTypes.length > 0));

  // const [swiped, setSwiped] = useState(false);
  useSwipe(setSwiped);

  return (
    <>
      <div
        // className={`${styles.container} ${styles.asideBar} ${isMobile ? styles.mobileMenu : ""} ${swiped ? "" : styles.offAsideBar}`}
        className={`
          ${styles.container} 
          ${styles.asideBar} 
          ${isMobile ? styles.mobileMenu : ""} 
          ${swiped ? "" : styles.offAsideBar}
          `}
        // clase para que en panel no haya swipe y en otros si ${pagePath === "panel" ? styles.panel : swiped ? "" : styles.offAsideBar}
        ref={fileExplorerRef}
        onDrop={handleDropFiles}
        onDragOver={handleContainerDragOver}
        onDragLeave={() => setDragingOverContainer(false)}
      >
        <div className={styles.searchContainer}>
          {/* {isMobile && (
            <div className={styles.showMobile}>
              <img src={ImageEmpty} alt="" onClick={toggleMenu} />
            </div>
          )} */}
          {/* <div className={styles.searchContainer}> */}
          <SearchIconWithIcon
            ref={searchInputRef}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            iconRight={
              userFilters &&
              Object.keys(userFilters).length > 0 &&
              hasActiveFilters
                ? filterIconGreen
                : filterIcon
            }
            classNameIconRight={styles.searchContainerL}
            onClickIconRight={() => setIsFilterOpen(true)}
          >
            {userFilters &&
            Object.keys(userFilters).length > 0 &&
            hasActiveFilters ? (
              <img
                src={l}
                alt="filterIcon"
                className={styles.searchContainerIcon}
              />
            ) : (
              <img
                src={l}
                alt="filterIcon"
                className={styles.searchContainerIcon}
              />
            )}
            {/* <Filter isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} /> */}
            {/* </div> */}
            {/* <div className={styles.fileList}>
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
         a
       </div>
     ) : (
       filteredFiles.length === 0 && (
         <div
           style={{ marginLeft: "5px" }}
           className={styles.searchIconsWrappers}
         >
           <img src={l} alt="kIcon" />
         </div>
       )
     )}
   </div> */}
          </SearchIconWithIcon>
        </div>
        <div className={styles.filesContainer}>
          {isMobile && (
            <div className={styles.fileExplorerGetPlusContainer}>
              <div className={styles.moreGreen}>
                <Plusgreen />
              </div>
              <GetPlusButton />
            </div>
          )}
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
              (filteredFiles.length === 0 &&
                (hasActiveFilters || searchTerm !== "") && (
                  <div className={styles.noFilesContainerMessage}>
                    <h4>
                      No se han encontrado resultados con estas
                      especificaciones.
                    </h4>
                    <h4>Para añadir un documento, arrástrelo aquí.</h4>
                  </div>
                )) ||
              (filteredFiles.length === 0 && (
                <div
                  style={{ background: dragingOverContainer && "#ECECF1" }}
                  className={styles.noFilesContainer}
                >
                  <h3>Arrastra aquí tus archivos para subirlos.</h3>
                  <FaUpload size={50} color="#3a3a3a" />
                </div>
              )) ||
              filteredFiles?.map((item, index) => {
                const isFolder = item.Key.endsWith("/");
                let fileName = isFolder
                  ? item.Key.split("/").slice(-2, -1)[0]
                  : item.Key.split("/").pop();
                // console.log("item.key", fileName);

                const filePrefix = /^FILE-([^_]+)/;
                const match = fileName.match(filePrefix);
                const uuid = match ? match[1] : null;

                // Quitar el "FILE-[uuid]" del nombre
                fileName = fileName.replace(/^FILE-[^_]+/, "");

                return (
                  <div
                    onClick={() => {
                      if (isFolder) {
                        console.log("setting current path to", item.Key);
                        dispatch(setCurrentPath(item.Key));
                      }

                      if (isFolder) {
                        navigate("/admin/panel");
                      } else if (uuid) {
                        alert("111");
                        console.log("item.Key", item);
                        navigate("/admin/panel/" + uuid);
                        setMobileSelectedDocument(true);
                      } else {
                        console.log("item.Key", item);
                        navigate("/admin/panel/" + item.ETag);
                        setMobileSelectedDocument(true);
                      }
                    }}
                    key={index}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                    onDragOver={(e) => handleDragOver(e, item)}
                    onDrop={(e) => {
                      console.log("triggering drop", item);
                      handleDrop(e, item);
                    }}
                    onDragEnd={handleDragEnd}
                    className={styles.fileItem}
                  >
                    <div className={styles.itemInner}>
                      <img
                        src={getFileIcon(item.Key)}
                        alt="file-icon"
                        className={styles.fileIcon}
                      />
                      <span className={styles.itemText}>{fileName}</span>

                      <button
                        ref={(el) => (optionsButtonRefs.current[index] = el)}
                        className={styles.moreButton}
                        aria-label="More options"
                        onClick={(e) => handleOptionsClick(index, e)}
                      >
                        <img src={horizontalDots} alt="horizontalDots" />{" "}
                      </button>
                    </div>
                    {activePopup === index &&
                      (isFolder ? (
                        <FolderOptionsPopup
                          parentRef={optionsButtonRefs.current[index]}
                          onClose={() => setActivePopup(null)}
                          onRename={() => console.log("renombrar")}
                          onDelete={() => handleDelete(item)}
                          action={() => console.log("añadir etiqueta")}
                          // onClose={() => console.log("cerrar")}
                          style={{
                            position: "fixed",
                            top:
                              optionsButtonRefs.current[
                                index
                              ].getBoundingClientRect().top +
                              optionsButtonRefs.current[index].offsetHeight,
                            left: optionsButtonRefs.current[
                              index
                            ].getBoundingClientRect().left,
                          }}
                        />
                      ) : (
                        <FileOptionsPopup
                          parentRef={optionsButtonRefs.current[index]}
                          onDownload={() => handleDownload(item)}
                          onShare={() => handleShare(item)}
                          onDelete={() => handleDelete(item)}
                          onClose={() => setActivePopup(null)}
                          style={{
                            position: "fixed",
                            top:
                              optionsButtonRefs.current[
                                index
                              ].getBoundingClientRect().top +
                              optionsButtonRefs.current[index].offsetHeight,
                            left: optionsButtonRefs.current[
                              index
                            ].getBoundingClientRect().left,
                          }}
                        />
                      ))}
                  </div>
                );

                // {
                //   activePopup === index && !isFolder && (
                //     <FileOptionsPopup
                //       parentRef={optionsButtonRefs.current[index]}
                //       onDownload={() => handleDownload(item)}
                //       onShare={() => handleShare(item)}
                //       onDelete={() => handleDelete(item)}
                //       onClose={() => setActivePopup(null)}
                //       style={{
                //         position: "fixed",
                //         top:
                //           optionsButtonRefs.current[index].getBoundingClientRect()
                //             .top + optionsButtonRefs.current[index].offsetHeight,
                //         left: optionsButtonRefs.current[
                //           index
                //         ].getBoundingClientRect().left,
                //       }}
                //     />
                //   )
                // }
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
          {currentPath?.split("/").filter(Boolean).length >= 2 && (
            <div className={styles.bottomMenu}>
              <HouseContainer
                onClick={() => dispatch(setCurrentPath(user.id + "/"))}
                className={styles.icon}
              />

              {renderBreadcrumbs()}
            </div>
          )}
        </div>
        {showLocationModal && (
          <SelectLocation onClose={() => setShowLocationModal(false)} />
        )}
        <FilesFilterModal
          onClose={() => setIsFilterOpen(false)}
          handleApplyFilters={handleApplyFilters}
          isFilterOpen={isFilterOpen}
          setShowSelectCurrencyPopup={setShowSelectCurrencyPopup}
          setSelectedCurrency={setSelectedCurrency}
          selectedCurrency={selectedCurrency}
          symbolSelected={symbolSelected}
        />{" "}
        {showSelectCurrencyPopup && (
          <SelectCurrencyPopup
            setShowSelectCurrencyPopup={setShowSelectCurrencyPopup}
            setSelectedCurrency={setSelectedCurrency}
            selectedCurrency={selectedCurrency}
            setSymbolSelected={setSymbolSelected}
          />
        )}
      </div>
    </>
  );
}
