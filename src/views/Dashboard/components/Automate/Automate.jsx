import React, { useState } from "react";
import TitleComponent from "./Components/TitleComponent";
import SearchComponent from "./Components/SearchComponent/SearchComponent";
import CardAutomate from "./Components/CardAutomate/CardAutomate";
import { data } from "./utils/automatesJson";
import styles from "./automate.module.css";
import CloseSVG from "./svgs/CloseSVG";
import { ReactComponent as PlusIcon } from "../../assets/plus.svg";

const Automate = ({ close, newData }) => {
  const [dataFilter, setDataFilter] = useState(data || newData);

  const handleDataFilter = (searchTerm) => {
    const filteredData = data.filter((card) =>
      card.automateName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDataFilter(filteredData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div style={{ justifySelf: "end" }}>
          <CloseSVG action={close} />
        </div>
        <TitleComponent title="Automatiza" />
        <SearchComponent onSearch={handleDataFilter} />

        {dataFilter.map((card) => (
          <CardAutomate
            key={card.id}
            name={card.automateName}
            image={card.image}
            contactType={card.contactType}
          />
        ))}
        <div className={styles.container_buttons_footer}>
          <button
            onClick={close}
            className={`${styles.buttons_footer} ${styles.button_back}`}
          >
            {" "}
            Atrás
          </button>
          <button className={`${styles.buttons_footer} ${styles.button_add}`}>
            <PlusIcon /> Nueva Automatización
          </button>
        </div>
      </div>
    </div>
  );
};

export default Automate;
