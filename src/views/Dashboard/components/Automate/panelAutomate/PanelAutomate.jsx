import React, { useState } from "react";
import Automate from "../Automate";
import styles from "./panelAutomate.module.css";
import CloseSVG from "../svgs/CloseSVG";
import TitleComponent from "../Components/TitleComponent";
import SearchComponent from "../Components/SearchComponent/SearchComponent";
import CardAutomate from "../Components/CardAutomate/CardAutomate";
import { useDispatch } from "react-redux";
import { data } from "../utils/automatesJson";
import { ReactComponent as PlusIcon } from "../../../assets/plus.svg";

const PanelAutomate = ({ type, close }) => {
  const [dataFilter, setDataFilter] = useState(data || newData);
  const dispach = useDispatch();
  const handleDataFilter = (searchTerm) => {
    const filteredData = data.filter((card) =>
      card.automateName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDataFilter(filteredData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.content_header}>
          <div className={styles.header}>
            <TitleComponent title="Añadir Automatización" />
            <div>
              <CloseSVG action={close} />
            </div>
          </div>
        </div>
        <div className={styles.body}>
          <div>
            <SearchComponent onSearch={handleDataFilter} />
            <div className={styles.buttons_header}>
              <button
                className={`${styles.button_header} ${styles.button_header_all}`}
              >
                Todas
              </button>
              <button className={`${styles.button_header}`}>
                Entrada / Input
              </button>
              <button className={`${styles.button_header}`}>
                Salida / Output
              </button>
            </div>
            {dataFilter.map((card) => (
              <CardAutomate
                type={card.type}
                key={card.id}
                name={card.automateName}
                image={card.image}
                contactType={card.contactType}
              />
            ))}
          </div>
          <div>
            <h1>Hola desde {type}</h1>
          </div>
        </div>
        <div className={styles.container_buttons_footer}>
          <button
            onClick={close}
            className={`${styles.buttons_footer} ${styles.button_back}`}
          >
            {" "}
            Atrás
          </button>
          <button className={`${styles.buttons_footer} ${styles.button_add}`}>
            Añadir{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PanelAutomate;
