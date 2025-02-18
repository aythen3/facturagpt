import React from "react";
import styles from "./SearchIconWithIcon.module.css";
import searchMagnify from "../../assets/searchMagnify.svg";
const SearchIconWithIcon = ({
  children,
  hola,
  searchTerm,
  setSearchTerm,
  iconRight,
  classNameIconRight,
  onClickIconRight,
  placeholder = "Buscar",
  stylesComponent = {},
  ref,
}) => {
  return (
    <div className={styles.searchContainer} style={{ ...stylesComponent }}>
      <div className={styles.searchInputWrapper}>
        <div className={styles.searchIcon}>
          <img src={searchMagnify} alt="searchMagnify" />
        </div>
        <input
          ref={ref}
          type="text"
          placeholder={placeholder}
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
