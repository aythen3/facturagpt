import React from "react";
import styles from "./SearchIconWithIcon.module.css";
import searchMagnify from "../../assets/searchMagnify.svg";
const SearchIconWithIcon = ({
  children,
  searchInputRef,
  searchTerm,
  setSearchTerm,
  iconRight,
  classNameIconRight,
  onClickIconRight,
}) => {
  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchInputWrapper}>
        <div className={styles.searchIcon}>
          <img src={searchMagnify} alt="searchMagnify" />
        </div>
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Buscar"
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {children}
      </div>
      <img
        src={iconRight}
        className={classNameIconRight}
        onClick={onClickIconRight}
      />
    </div>
  );
};

export default SearchIconWithIcon;
