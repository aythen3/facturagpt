import React, { useRef, useState } from "react";
import styles from "./CustomSearchbar.module.css";
import FilesFilterModal from "../FilesFilterModal/FilesFilterModal";
import k from "../../assets/k.svg";
import cmd from "../../assets/cmd.svg";
import searchMagnify from "../../assets/searchMagnify.svg";
import filterIcon from "../../assets/S3/filterIconBars.svg";
import useFocusShortcut from "../../../../utils/useFocusShortcut";

const CustomSearchbar = ({
  searchTerm,
  setSearchTerm,
  height = "35px",
  padding = "0px 9px",
  filter = false,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const searchInputRef = useRef(null);

  // Llama a la función y pasa la referencia
  useFocusShortcut(searchInputRef, "k");

  return (
    <div className={styles.searchContainer}>
      <div style={{ height, padding }} className={styles.searchInputWrapper}>
        <div className={styles.searchIcon}>
          <img src={searchMagnify} alt="searchMagnify" />
        </div>
        <input
          type="text"
          placeholder="Buscar"
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          ref={searchInputRef}
        />
        {/* <div
          onClick={() => setShowLocationModal(true)}
          className={styles.searchIconsWrappers}
        >
          <img src={cmd} alt="cmdIcon" />
        </div> */}
        <div
          style={{ marginLeft: "5px" }}
          className={styles.searchIconsWrappers}
        >
          <img src={k} alt="kIcon" />
        </div>
      </div>
      {filter && (
        <img
          style={{ cursor: "pointer" }}
          onClick={() => setIsFilterOpen(true)}
          src={filterIcon}
          alt="filterIcon"
        />
      )}
      {/* <Filter isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} /> */}
      {isFilterOpen && (
        <FilesFilterModal
          onClose={() => setIsFilterOpen(false)}
          handleApplyFilters={() => {}}
        />
      )}
    </div>
  );
};

export default CustomSearchbar;
