import React, { useState } from "react";
import SearchSVG from "../../svgs/SearchSVG";
import styles from "./searchComponent.module.css";

const SearchComponent = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className={styles.content}>
      <SearchSVG />
      <input
        className={styles.input}
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchComponent;
