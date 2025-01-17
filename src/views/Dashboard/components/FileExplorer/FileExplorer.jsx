import React, { useState, useRef, useEffect, useMemo } from "react";
import styles from "./FileExplorer.module.css";
import folderIcon from "../../assets/S3/folderIcon.svg";
import imageIcon from "../../assets/S3/imageIcon.svg";
import codeIcon from "../../assets/S3/codeIcon.svg";
import fileIcon from "../../assets/S3/fileIcon.svg";
import { Search } from "lucide-react";
import horizontalDots from "../../assets/S3/horizontalDots.svg";
import filterIcon from "../../assets/S3/filterIconBars.svg";
import { MutatingDots } from "react-loader-spinner";
import Filter from "./Filters";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentPath,
  setUserFiles,
} from "../../../../slices/scalewaySlices";
import k from "../../assets/k.svg";
import cmd from "../../assets/cmd.svg";
import {
  deleteObject,
  moveObject,
  uploadFiles,
} from "../../../../actions/scaleway";
import SelectLocation from "../SelectLocation/SelectLocation";
import FileOptionsPopup from "./FileOptionsPopup";

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
        <div
          onClick={() => handleBreadcrumbClick(`${user.id}/`)}
          className={styles.breadcrumbButton}
        >
          Inicio
        </div>
        {pathSegments.length > 0 && (
          <span className={styles.breadcrumbSeparator}> &gt; </span>
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
            className={styles.breadcrumbButton}
          >
            {segment}
          </div>
          {index < pathSegments.length - 1 && (
            <span className={styles.breadcrumbSeparator}> &gt; </span>
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

  const handleDropFiles = (event) => {
    if (!draggedItem) {
      event.preventDefault();
      const files = Array.from(event.dataTransfer.files);
      dispatch(uploadFiles({ files, currentPath }));
    }
  };

  const handleContainerDragOver = (event) => {
    event.preventDefault();
  };

  const handleDownload = (item) => {
    console.log("Downloading item:", item);

    const fileName = item.Key.split("/").pop();

    const link = document.createElement("a");
    link.href = item.Location;
    link.download = fileName;
    link.style.display = "none";

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

  return (
    <div
      className={styles.container}
      ref={fileExplorerRef}
      onDrop={handleDropFiles}
      onDragOver={handleContainerDragOver}
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
          src={filterIcon}
          alt="filterIcon"
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
                  {!isFolder && (
                    <button
                      ref={(el) => (optionsButtonRefs.current[index] = el)}
                      className={styles.moreButton}
                      aria-label="More options"
                      onClick={(e) => handleOptionsClick(index, e)}
                    >
                      <img src={horizontalDots} alt="horizontalDots" />{" "}
                    </button>
                  )}
                </div>
                {activePopup === index && !isFolder && (
                  <FileOptionsPopup
                    parentRef={optionsButtonRefs.current[index]}
                    onDownload={() => handleDownload(item)}
                    onShare={() => handleShare(item)}
                    onDelete={() => handleDelete(item)}
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
