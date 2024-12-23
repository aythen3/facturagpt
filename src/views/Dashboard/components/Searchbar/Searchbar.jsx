import React from "react";
import searchLanding from "../../assets/searchLanding.svg";
import styles from "./Searchbar.module.css";

const Searchbar = () => {
  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Número de Facturas/mes"
        className={styles.input}
      />
      <button className={styles.button}>
        <img src={searchLanding} alt="searchLanding" />
      </button>
    </div>
  );
};

export default Searchbar;
